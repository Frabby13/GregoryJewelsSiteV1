// Shop: blocks shared by the three concepts (each concept file only chooses the layout around them).
import { EMAIL, pieces, shop, priceOf, collections, collectionOf } from './data.mjs';
import { dims } from './lib.mjs';

export const shopNote = 'Prezzi e condizioni di spedizione sono segnaposto dimostrativi, in attesa dei dati dell’atelier.';

// Price + add-to-cart (or "request" for bespoke pieces). Behaviour lives in js/shop.js.
export function buyBlock(x, slug) {
  const p = pieces[slug];
  if (shop[slug].price == null) {
    return `<div class="buy">
      <p class="price">Su richiesta</p>
      <p class="prose-it mt-3 text-sm">Un pezzo su misura non si acquista a scaffale: si parte da un colloquio e da un bozzetto.</p>
      <a class="cta mt-8" href="${x.u(x.R.contact)}">Richiedi questo pezzo <span class="cta__arrow" aria-hidden="true"></span></a>
    </div>`;
  }
  return `<div class="buy">
      <p class="price">${priceOf(slug)}</p>
      <p class="prose-it mt-3 text-sm">Esemplare unico, disponibile in un solo pezzo.</p>
      <button type="button" class="cta mt-8" data-add="${slug}" data-cart="${x.u(x.R.cart)}">Aggiungi al carrello <span class="cta__arrow" aria-hidden="true"></span></button>
      <p class="mt-4 min-h-6 text-sm" data-add-status role="status" aria-live="polite"></p>
      <noscript><p class="mt-4 text-sm">Il carrello richiede JavaScript. In alternativa scrivi a <a class="link-u link-u--on" href="mailto:${EMAIL}?subject=${encodeURIComponent('Richiesta: ' + p.name)}">${EMAIL}</a>.</p></noscript>
    </div>`;
}

export function specList(slug) {
  const p = pieces[slug];
  const row = (k, v) => `<div class="hair-t flex flex-wrap justify-between gap-x-6 gap-y-1 py-4"><dt class="label">${k}</dt><dd class="text-right text-sm">${v}</dd></div>`;
  return `<dl class="hair-b">
        ${row('Collezione', collectionOf(slug).title)}
        ${row('Metallo', p.metal)}
        ${p.stones ? row('Pietre', p.stones) : ''}
        ${row('Edizione', p.bespoke ? 'Su misura' : 'Esemplare unico')}
      </dl>`;
}

// Filter chips by collection (behaviour in js/shop.js; items carry data-cat).
export function filterBar(extra = '') {
  const btn = (key, label, on) => `<button type="button" class="chip label" data-filter="${key}" aria-pressed="${on}">${label}</button>`;
  return `<div class="flex flex-wrap gap-3 ${extra}" role="group" aria-label="Filtra per collezione">
      ${btn('tutti', 'Tutti', true)}
      ${collections.map((c) => btn(c.slug, c.title, false)).join('\n      ')}
    </div>
    <p class="sr-only" role="status" aria-live="polite" data-filter-status></p>`;
}

// Cart page body: filled by js/shop.js from the catalog below (ids kept in localStorage).
export function cartSection(x, { wrap = 'px-gutter py-section' } = {}) {
  const catalog = {};
  for (const [slug, p] of Object.entries(pieces)) {
    if (shop[slug].price == null) continue;
    const { w, h } = dims(p.img);
    catalog[slug] = { name: p.name, spec: [p.metal, p.stones].filter(Boolean).join(' · '), price: shop[slug].price, img: x.u(p.img), href: x.u(x.R.product(slug)), w, h };
  }
  const json = JSON.stringify(catalog).replace(/</g, '\\u003c');
  return `  <section class="${wrap}" aria-labelledby="h-carrello" data-cart-page data-mail="${EMAIL}">
    <h2 id="h-carrello" class="sr-only">Il tuo carrello</h2>
    <div data-cart-empty hidden>
      <p class="lead max-w-[30rem]">Il carrello è vuoto.</p>
      <p class="prose-it mt-4">Ogni gioiello è un esemplare unico: quando ne scegli uno, lo trovi qui.</p>
      <a class="cta mt-8" href="${x.u(x.R.shop)}">Sfoglia la boutique <span class="cta__arrow" aria-hidden="true"></span></a>
    </div>
    <noscript><p class="lead">Il carrello richiede JavaScript. Per ordinare un pezzo scrivi a <a class="link-u link-u--on" href="mailto:${EMAIL}">${EMAIL}</a>.</p></noscript>
    <div class="grid gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,1fr)_22rem]" data-cart-full hidden>
      <ul data-cart-list aria-label="Pezzi nel carrello"></ul>
      <aside class="cart-summary" aria-labelledby="h-riepilogo">
        <h3 id="h-riepilogo" class="label label--gold">Riepilogo</h3>
        <dl class="mt-6 grid gap-3 text-sm">
          <div class="flex justify-between gap-4"><dt>Pezzi</dt><dd data-cart-n></dd></div>
          <div class="flex justify-between gap-4"><dt>Spedizione</dt><dd>Da concordare</dd></div>
          <div class="hair-t flex items-baseline justify-between gap-4 pt-4"><dt class="label">Totale</dt><dd class="price" data-cart-total></dd></div>
        </dl>
        <a class="cta mt-8 w-full justify-between" data-checkout href="mailto:${EMAIL}">Richiedi l’ordine <span class="cta__arrow" aria-hidden="true"></span></a>
        <p class="prose-it mt-5 text-sm">Il sito non incassa pagamenti: il pulsante apre la tua posta con l’elenco dei pezzi già pronto, indirizzato a ${EMAIL}. L’atelier conferma disponibilità e modalità di pagamento.</p>
        <p class="prose-it mt-3 text-sm">${shopNote}</p>
      </aside>
    </div>
    <script type="application/json" id="catalog">${json}</script>
  </section>`;
}
