// Shared helpers for the page generator: routes, relative links, images, head, nav, contact form.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EMAIL, INSTAGRAM, PRIVACY, pieces, shop, priceOf, collections, collectionOf } from './data.mjs';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const P = path.posix;

export const CONCEPTS = {
  atelier: { dir: 'atelier', home: 'home-1-atelier.html', name: 'Atelier' },
  cinema: { dir: 'cinema', home: 'home-2-cinema.html', name: 'Cinema' },
  maison: { dir: 'maison', home: 'home-3-maison.html', name: 'Maison' },
};

export function routes(c) {
  const d = c.dir;
  return {
    home: c.home,
    collections: `${d}/collezioni.html`,
    collection: (s) => `${d}/collezioni/${s}.html`,
    maison: `${d}/maison.html`,
    mestiere: `${d}/mestiere.html`,
    journal: `${d}/journal.html`,
    article: (s) => `${d}/journal/${s}.html`,
    contact: `${d}/contatti.html`,
    shop: `${d}/boutique.html`,
    product: (s) => `${d}/boutique/${s}.html`,
    cart: `${d}/carrello.html`,
  };
}

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// --- JPEG intrinsic size, so every <img> carries width/height (no layout shift)
const sizeCache = {};
export function dims(src) {
  if (sizeCache[src]) return sizeCache[src];
  const b = fs.readFileSync(path.join(ROOT, src));
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
      return (sizeCache[src] = { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) });
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  throw new Error('no size for ' + src);
}

// Per-page context: link(to) resolves any root-relative target from the current page.
export function makeCtx(conceptKey, from) {
  const c = CONCEPTS[conceptKey];
  const R = routes(c);
  const u = (to) => {
    const [file, hash] = to.split('#');
    const rel = P.relative(P.dirname(from), file);
    return (rel || P.basename(file)) + (hash ? '#' + hash : '');
  };
  const img = (src, alt, { cls = '', pos, eager = false, extra = '', style: st = '' } = {}) => {
    const { w, h } = dims(src);
    const decl = [pos && pos !== '50% 50%' ? `object-position:${pos}` : '', st].filter(Boolean).join(';');
    const style = decl ? ` style="${decl}"` : '';
    return `<img${cls ? ` class="${cls}"` : ''} src="${u(src)}" width="${w}" height="${h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}${style}${extra ? ' ' + extra : ''}>`;
  };
  return { c, R, u, img, from, key: conceptKey };
}

// --- <head>
export function head(x, { title, desc, theme, scripts = [] }) {
  const { u } = x;
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — Gregory Jewels</title>
<meta name="description" content="${esc(desc)}">${theme ? `\n<meta name="theme-color" content="${theme}">` : ''}
<link rel="icon" href="${u('favicon.ico')}" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="${u('favicon-32x32.png')}">
<link rel="apple-touch-icon" href="${u('apple-touch-icon.png')}">
<link rel="preload" href="${u('fonts/cormorant-400.ttf')}" as="font" type="font/ttf" crossorigin>
<link rel="preload" href="${u('fonts/montserrat-300.ttf')}" as="font" type="font/ttf" crossorigin>
<link rel="stylesheet" href="${u('css/tailwind.css')}">
<script src="${u('js/reveal.js')}"></script>
<script src="${u('js/shop.js')}" defer></script>${scripts.map((s) => `\n<script src="${u(s)}" defer></script>`).join('')}
</head>`;
}

// --- Navigation model shared by header, mobile menu and footer.
export function navItems(x) {
  const { R, u } = x;
  return [
    { key: 'maison', label: 'Maison', href: u(R.maison) },
    { key: 'collezioni', label: 'Collezioni', href: u(R.collections) },
    { key: 'su-misura', label: 'Su Misura', href: u(R.home + '#su-misura') },
    { key: 'mestiere', label: 'Atelier', href: u(R.mestiere) },
    { key: 'journal', label: 'Journal', href: u(R.journal) },
    { key: 'contatti', label: 'Contatti', href: u(R.contact) },
  ];
}

export const aria = (active, key) => (active === key ? ' aria-current="page"' : '');
export const navLink = (it, active) =>
  `<a class="nav-link link-u${active === it.key ? ' link-u--on' : ''}" href="${it.href}"${aria(active, it.key)}>${it.label}</a>`;
const cartCount = '<span class="cart-count" data-cart-count hidden></span>';
export const boutiqueLink = (x, active) =>
  `<a class="nav-link link-u${active === 'boutique' ? ' link-u--on' : ''}" href="${x.u(x.R.shop)}"${aria(active, 'boutique')}>Boutique</a>
      <a class="nav-link link-u${active === 'carrello' ? ' link-u--on' : ''}" href="${x.u(x.R.cart)}"${aria(active, 'carrello')} data-cart-link>Carrello${cartCount}</a>`;

export function menu(x, active, { dark = true } = {}) {
  const items = navItems(x);
  const logo = x.u('img/logo-mark-light.png');
  return `<nav id="menu" popover class="menu${dark ? ' on-dark' : ''}" aria-label="Menu principale">
  <div class="flex h-full flex-col overflow-y-auto px-gutter py-3">
    <div class="flex items-center justify-between">
      <a class="logo-lock" href="${x.u(x.R.home)}" aria-label="Gregory Jewels — Home"><img src="${logo}" width="269" height="400" alt=""><span class="logo-word">GREGORY JEWELS</span></a>
      <button class="burger label" popovertarget="menu" popovertargetaction="hide" aria-label="Chiudi il menu">Chiudi</button>
    </div>
    <ul class="my-auto py-8 font-serif text-[clamp(2.4rem,11vw,4.2rem)] leading-[1.15]">
${items.map((it, i) => `      <li class="menu__item" style="--i:${i}"><a href="${it.href}"${aria(active, it.key)}>${it.label}</a></li>`).join('\n')}
      <li class="menu__item" style="--i:${items.length}"><a href="${x.u(x.R.shop)}"${aria(active, 'boutique')}>Boutique</a></li>
      <li class="menu__item" style="--i:${items.length + 1}"><a href="${x.u(x.R.cart)}"${aria(active, 'carrello')} data-cart-link>Carrello${cartCount}</a></li>
    </ul>
    <p class="label label--gold pb-6">${EMAIL} · @gregoryjewels</p>
  </div>
</nav>`;
}

export const skip = (cls) =>
  `<a href="#contenuto" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] ${cls} focus:px-4 focus:py-2">Vai al contenuto</a>`;

export function footer(x, active, { bg, dark, logo, mute }) {
  const items = navItems(x);
  return `<footer class="${bg} px-gutter pb-8 pt-section${dark ? ' on-dark' : ''}">
  <div class="grid gap-y-12 md:grid-cols-12 md:gap-x-8">
    <div class="md:col-span-6">
      <p class="label label--gold">Contatti</p>
      <a href="mailto:${EMAIL}" class="link-u link-u--on mt-6 font-serif text-[clamp(1.5rem,3vw,2.6rem)]">${EMAIL}</a>
      <p class="label mt-8 leading-loose">Instagram<br><a class="link-u" href="${INSTAGRAM}">@gregoryjewels</a></p>
    </div>
    <nav class="md:col-span-4 md:col-start-9" aria-label="Piè di pagina">
      <ul class="grid gap-1 font-serif text-2xl leading-tight">
${items.map((it) => `        <li><a class="link-u${active === it.key ? ' link-u--on' : ''}" href="${it.href}"${aria(active, it.key)}>${it.label}</a></li>`).join('\n')}
      </ul>
    </nav>
  </div>
  <div class="hair-t mt-24 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-6">
    <a href="${x.u(x.R.home)}" class="logo-lock" aria-label="Gregory Jewels — Home"><img src="${x.u(logo)}" width="269" height="400" alt=""><span class="logo-word">GREGORY JEWELS</span></a>
    <ul class="label flex flex-wrap gap-x-6 gap-y-2 ${mute}">
      <li><a class="link-u" href="https://www.gregoryjewels.com/privacy.html">Privacy</a></li>
      <li><a class="link-u" href="https://www.gregoryjewels.com/cookie.html">Cookie</a></li>
      <li><a class="link-u" href="https://www.gregoryjewels.com/termini.html">Termini</a></li>
      <li>© 2026 Gregory Jewels</li>
    </ul>
  </div>
</footer>`;
}

// --- Mask-line heading helper: lines = ['text', '<em class="ml-i">..</em>'] ; mode 'enter' (page load) or 'reveal' (scroll)
export function maskLines(lines, mode = 'enter', d = 0.15) {
  return lines
    .map((l, i) => (mode === 'enter'
      ? `<span class="ml enter-line"><span style="--d:${d};--i:${i}">${l}</span></span>`
      : `<span class="ml"><span style="--i:${i}">${l}</span></span>`))
    .join('\n          ');
}
export const em = (t, extra = '') => `<em class="ml-i${extra ? ' ' + extra : ''}">${t}</em>`;

export const pieceSpec = (p) => [p.metal, p.stones].filter(Boolean).join(' · ');

// --- Contact form (progressively enhanced by js/contact.js; falls back to a mailto: submit)
export function contactForm() {
  const f = (id, label, control, hint = '') =>
    `<div class="grid gap-1">
      <label class="label label--gold" for="${id}">${label}</label>${hint ? `\n      <p class="text-sm opacity-80" id="${id}-hint">${hint}</p>` : ''}
      ${control}
      <p class="field-err" id="${id}-err" hidden></p>
    </div>`;
  const d = (id, hint) => `aria-describedby="${id}-err${hint ? ` ${id}-hint` : ''}"`;
  return `<form class="grid gap-8" data-contact action="mailto:${EMAIL}" method="post" enctype="text/plain" aria-labelledby="form-title">
      <div class="form-summary" data-summary tabindex="-1" role="alert" hidden>
        <p class="label label--gold">Controlla questi campi</p>
        <ul class="mt-2 grid gap-1 text-sm" data-summary-list></ul>
      </div>
      ${f('c-nome', 'Nome', `<input class="field" id="c-nome" name="nome" type="text" autocomplete="name" required ${d('c-nome')}>`)}
      ${f('c-email', 'Email', `<input class="field" id="c-email" name="email" type="email" autocomplete="email" spellcheck="false" required ${d('c-email')}>`)}
      ${f('c-tema', 'Di che cosa vuoi parlare?', `<select class="field" id="c-tema" name="tema" required ${d('c-tema')}>
        <option value="">Scegli un argomento</option>
        <option>Un gioiello su misura</option>
        <option>Una creazione che ho visto</option>
        <option>Un appuntamento in atelier o in videochiamata</option>
        <option>Altro</option>
      </select>`)}
      ${f('c-msg', 'Messaggio', `<textarea class="field" id="c-msg" name="messaggio" rows="5" required minlength="10" ${d('c-msg', 1)}></textarea>`, 'Poche righe bastano: per chi, per quando, che cosa deve ricordare.')}
      <div class="grid gap-1">
        <label class="flex items-start gap-3 py-1 text-sm">
          <input class="mt-1 size-5 shrink-0 accent-gold-deep" id="c-privacy" name="privacy" type="checkbox" required aria-describedby="c-privacy-err">
          <span>Ho letto l’<a class="link-u link-u--on" href="${PRIVACY}">informativa sulla privacy</a>.</span>
        </label>
        <p class="field-err" id="c-privacy-err" hidden></p>
      </div>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <button class="cta" type="submit">Prepara il messaggio <span class="cta__arrow" aria-hidden="true"></span></button>
      </div>
      <p class="text-sm opacity-80" data-note>Il sito non invia messaggi da solo: il pulsante apre il tuo programma di posta con il testo già pronto, indirizzato a ${EMAIL}.</p>
      <p class="form-status" data-status role="status" aria-live="polite"></p>
    </form>`;
}

export function write(relPath, html) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html.replace(/\n{3,}/g, '\n\n'));
}

export { pieces };
