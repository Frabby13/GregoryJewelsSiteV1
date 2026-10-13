// Concept 03 — Maison: centred-logo header, split-screen openings with curtain reveal, catalogue rows,
// horizontal "rail", sticky image column on ink. Every composition extends home-3-maison.html.
import { collections, articles, pieces, phases, principles, detailImages, EMAIL, INSTAGRAM } from './data.mjs';
import { makeCtx, head, menu, footer, skip, navItems, navLink, boutiqueLink, maskLines, em, pieceSpec, contactForm, write } from './lib.mjs';

const KEY = 'maison';

function shell(x, active, meta, body, { scripts } = {}) {
  const { u, R } = x;
  const items = navItems(x);
  const left = items.slice(0, 3);
  const right = items.slice(3);
  return `${head(x, { ...meta, scripts })}
<body class="maison">

${skip('focus:bg-ink focus:text-ivory')}

<header class="site-header sticky top-0 border-b border-hair bg-ivory">
  <div class="grid grid-cols-[1fr_auto] items-center px-gutter py-3 lg:grid-cols-[1fr_auto_1fr]">
    <nav class="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Principale">
      ${left.map((it) => navLink(it, active)).join('\n      ')}
    </nav>
    <a href="${u(R.home)}" class="logo-lock enter-fade lg:justify-self-center" style="--d:0" aria-label="Gregory Jewels — Home">
      <img src="${u('img/logo-mark.png')}" width="269" height="400" alt="">
      <span class="logo-word">GREGORY JEWELS</span>
    </a>
    <nav class="hidden items-center justify-end gap-6 lg:flex xl:gap-8" aria-label="Secondaria">
      ${right.map((it) => navLink(it, active)).join('\n      ')}
      ${boutiqueLink(x)}
    </nav>
    <button class="burger label justify-self-end lg:hidden" popovertarget="menu" aria-label="Apri il menu">Menu<span class="burger__bars" aria-hidden="true"></span></button>
  </div>
</header>

${menu(x, active)}

<main id="contenuto">
${body}
</main>

${footer(x, active, { bg: 'bg-ink text-ivory', dark: true, logo: 'img/logo-mark-light.png', mute: 'opacity-80' })}

</body>
</html>
`;
}

// Split-screen opening: text left, image right behind a gold + ink curtain.
function splitHead(x, { kicker, lines, intro, cta, src, alt, pos, id = 'h-page', min = 'md:min-h-[calc(78svh-4.5rem)]', imgFirst = false }) {
  return `  <section class="grid ${min} md:grid-cols-2" aria-labelledby="${id}">
    <div class="flex flex-col justify-between gap-12 px-gutter pb-12 pt-12 md:pb-14 md:pt-16 ${imgFirst ? 'md:order-2' : ''}">
      <p class="label label--gold enter" style="--d:.1">${kicker}</p>
      <div>
        <h1 id="${id}" class="text-[clamp(2.8rem,6.4vw,6.8rem)] leading-[.96] tracking-[-.015em]">
          ${maskLines(lines, 'enter', 0.25)}
        </h1>
        ${intro ? `<p class="prose-it mt-8 enter" style="--d:.7">${intro}</p>` : ''}
        ${cta ? `<a href="${cta.href}" class="cta mt-10 enter" style="--d:.9">${cta.label} <span class="cta__arrow" aria-hidden="true"></span></a>` : ''}
      </div>
    </div>
    <div class="frame relative aspect-[4/5] md:aspect-auto md:h-full ${imgFirst ? 'md:order-1' : ''}">
      ${x.img(src, alt, { cls: 'settle-in', pos, eager: true, style: '--d:.3' })}
      <span class="curtain curtain--gold" aria-hidden="true"></span>
      <span class="curtain" aria-hidden="true"></span>
    </div>
  </section>`;
}

const closing = (x, { kicker, lines, text, ctaLabel, to }) => `  <section class="bg-ink px-gutter py-section text-ivory on-dark" aria-labelledby="h-closing">
    <div class="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
      <div class="md:col-span-7">
        <p class="label label--gold" data-reveal>${kicker}</p>
        <h2 id="h-closing" class="mt-6 text-h2" data-reveal="mask">${maskLines(lines, 'reveal')}</h2>
      </div>
      <div class="grid content-end gap-8 md:col-span-4 md:col-start-9">
        <p class="prose-it" data-reveal>${text}</p>
        <a href="${x.u(to)}" class="cta self-start" data-reveal>${ctaLabel} <span class="cta__arrow" aria-hidden="true"></span></a>
      </div>
    </div>
  </section>`;

function collectionsPage() {
  const from = `${KEY}/collezioni.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const all = Object.entries(pieces);
  const colOf = (slug) => collections.find((c) => c.pieces.includes(slug));
  const rows = collections.map((c) => {
    const p = pieces[c.hero];
    const href = u(R.collection(c.slug));
    return `      <li class="hair-b grid items-center gap-x-8 gap-y-5 py-10 md:grid-cols-[1fr_1.1fr_22rem]">
        <div data-reveal><p class="label label--gold">${c.kicker}</p><h2 class="mt-2 text-h2 leading-[1]"><a class="link-u" href="${href}">${c.title}</a></h2></div>
        <div data-reveal><p class="prose-it">${c.short}</p><p class="piece__spec mt-3">${c.pieces.map((s) => pieces[s].name).join(' · ')}</p></div>
        <a href="${href}" class="block" tabindex="-1" aria-hidden="true"><div class="frame aspect-[3/2]" data-reveal="image">${img(p.img, '', { pos: p.pos })}</div></a>
      </li>`;
  }).join('\n');
  const rail = all.map(([slug, p]) => `      <li>
        <a href="${u(R.collection(colOf(slug).slug))}" class="block"><div class="frame aspect-[4/5]">${img(p.img, p.alt, { pos: p.pos })}</div>
        <p class="piece__name mt-3">${p.name}</p><p class="piece__spec">${colOf(slug).title}</p></a>
      </li>`).join('\n');
  const body = `${splitHead(x, { kicker: 'Maison · collezioni', lines: ['Quattro famiglie,', em('nessuna serie.')], intro: 'Raggruppiamo i pezzi per tipo, non per stagione. Ogni gioiello resta un esemplare unico: qui sono semplicemente accanto ai suoi simili.', cta: { href: '#famiglie', label: 'Sfoglia le collezioni' }, src: 'img/gallery-collana-pietra-colore.jpg', alt: 'Collana a più fili in oro con pietra blu sfaccettata e mezzaluna di brillanti', pos: '50% 32%' })}

  <section id="famiglie" class="bg-ivory-deep px-gutter py-section" aria-labelledby="h-fam">
    <div class="grid gap-y-6 hair-b pb-8 md:grid-cols-12 md:gap-x-8">
      <h2 id="h-fam" class="text-h2 md:col-span-7" data-reveal="mask">${maskLines([`Le ${em('collezioni')}`], 'reveal')}</h2>
      <p class="prose-it md:col-span-4 md:col-start-9 md:self-end" data-reveal>Un catalogo senza prezzi: ogni pezzo è un esemplare unico e si presenta di persona.</p>
    </div>
    <ul>
${rows}
    </ul>
  </section>

  <section class="py-section" aria-labelledby="h-rail">
    <div class="flex flex-wrap items-end justify-between gap-6 px-gutter pb-12">
      <h2 id="h-rail" class="text-h2" data-reveal="mask">${maskLines([`Tutti i ${em('pezzi')}`], 'reveal')}</h2>
      <p class="label text-ink-soft" data-reveal>Scorri <span aria-hidden="true">→</span></p>
    </div>
    <ol class="rail" tabindex="0" aria-label="I pezzi delle collezioni">
${rail}
    </ol>
  </section>

${closing(x, { kicker: 'Su misura', lines: ['Non trovi', em('il tuo pezzo?')], text: 'Un gioiello nasce da una conversazione. Raccontaci l’idea o la pietra da reinterpretare: ti riceviamo in atelier o in videochiamata.', ctaLabel: 'Prenota una consulenza', to: R.contact })}`;
  return [from, shell(x, 'collezioni', { title: 'Collezioni', desc: 'Le collezioni Gregory Jewels: orecchini, anelli, collane e parure, bracciali. Un catalogo senza prezzi, dove ogni pezzo è unico.' }, body)];
}

const uniq = (arr) => [...new Set(arr.filter(Boolean))];

function collectionPage(c) {
  const from = `${KEY}/collezioni/${c.slug}.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const hp = pieces[c.hero];
  const others = collections.filter((o) => o.slug !== c.slug);
  const pcs = c.pieces.map((s, i) => {
    const p = pieces[s];
    return `      <li class="piece hair-b grid items-center gap-x-8 gap-y-5 py-10 md:grid-cols-[1fr_1.1fr_22rem]">
        <div class="piece__meta" data-reveal><h3 class="piece__name text-h3">${p.name}</h3>${p.bespoke ? '<span class="label label--gold mt-1">Su misura</span>' : ''}</div>
        <p class="piece__spec md:text-base" data-reveal>${p.metal}${p.stones ? `<br>${p.stones}` : ''}</p>
        <div class="frame ${i % 2 ? 'aspect-[4/5]' : 'aspect-[3/2]'}" data-reveal="image">${img(p.img, p.alt, { pos: p.pos })}</div>
      </li>`;
  }).join('\n');
  const metals = uniq(c.pieces.map((s) => pieces[s].metal)).join('; ');
  const stones = uniq(c.pieces.map((s) => pieces[s].stones)).join('; ');
  const hasBespoke = c.pieces.some((s) => pieces[s].bespoke);
  const body = `${splitHead(x, { kicker: `Collezione · ${c.kicker}`, lines: [c.line[0], em(c.line[1])], intro: c.intro, cta: { href: '#pezzi', label: 'Guarda i pezzi' }, src: hp.img, alt: hp.alt, pos: hp.pos, min: 'md:min-h-[calc(100svh-4.5rem)]' })}

  <section id="pezzi" class="bg-ivory-deep px-gutter py-section" aria-labelledby="h-pezzi">
    <div class="grid gap-y-6 hair-b pb-8 md:grid-cols-12 md:gap-x-8">
      <h2 id="h-pezzi" class="text-h2 md:col-span-7" data-reveal="mask">${maskLines([`I ${em('pezzi')}`], 'reveal')}</h2>
      <p class="prose-it md:col-span-4 md:col-start-9 md:self-end" data-reveal><a class="link-u" href="${u(R.collections)}">Tutte le collezioni</a></p>
    </div>
    <ul>
${pcs}
    </ul>
  </section>

  <section class="bg-ink px-gutter py-section text-ivory on-dark" aria-labelledby="h-det">
    <div class="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
      <div class="md:col-span-5">
        <div class="sticky-col">
          <div class="frame aspect-[4/5] max-w-md" data-reveal="image">${img(c.bench.img, c.bench.alt, { pos: c.bench.pos })}</div>
          <p class="label mt-3 opacity-70">${c.bench.cap}</p>
        </div>
      </div>
      <div class="md:col-span-6 md:col-start-7">
        <p class="label label--gold" data-reveal>Materiali e dettagli</p>
        <h2 id="h-det" class="mt-8 text-h2" data-reveal="mask">${maskLines(['Che cosa', `${em('c’è dentro', 'text-gold')}.`], 'reveal')}</h2>
        <div class="mt-14 grid gap-14">
          <div class="hair-t pt-6" data-reveal><p class="label label--gold">Metalli</p><p class="prose-it mt-4">${metals}.</p></div>
          <div class="hair-t pt-6" data-reveal><p class="label label--gold">Pietre</p><p class="prose-it mt-4">${stones}.</p></div>
          ${hasBespoke ? `<div class="hair-t pt-6" data-reveal><p class="label label--gold">Su misura</p><p class="prose-it mt-4">${c.pieces.filter((s) => pieces[s].bespoke).map((s) => pieces[s].name).join(' e ')} ${c.pieces.filter((s) => pieces[s].bespoke).length > 1 ? 'nascono' : 'nasce'} da un bozzetto disegnato a mano.</p></div>` : ''}
        </div>
        <a href="${u(R.contact)}" class="cta mt-14" data-reveal>Chiedi di vedere i pezzi <span class="cta__arrow" aria-hidden="true"></span></a>
      </div>
    </div>
  </section>

  <section class="px-gutter py-section" aria-labelledby="h-altre">
    <div class="flex flex-wrap items-end justify-between gap-6 hair-b pb-6">
      <h2 id="h-altre" class="text-h3" data-reveal>Altre <em class="ml-i">collezioni</em></h2>
    </div>
    <ul class="mt-2" data-reveal="stagger">
${others.map((o, i) => `      <li class="hair-b" style="--i:${i}"><a href="${u(R.collection(o.slug))}" class="grid items-center gap-x-8 gap-y-3 py-6 md:grid-cols-[1fr_1.1fr_8rem]"><span class="link-u justify-self-start font-serif text-3xl md:text-4xl">${o.title}</span><span class="prose-it text-sm">${o.short}</span><span class="frame hidden aspect-[3/2] md:block">${img(pieces[o.hero].img, '', { pos: pieces[o.hero].pos })}</span></a></li>`).join('\n')}
    </ul>
  </section>`;
  return [from, shell(x, 'collezioni', { title: `${c.title} — Collezioni`, desc: c.short }, body)];
}

function maisonPage() {
  const from = `${KEY}/maison.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const body = `${splitHead(x, { kicker: 'La maison', lines: ['Un mestiere', em('che si impara con le mani.')], intro: 'Gregory Jewels nasce dall’idea che l’alta gioielleria sia prima di tutto un lavoro di bottega: disegno, metallo, fuoco, pietra. Ogni passaggio resta in mano a chi lo conosce.', src: 'img/hero-chi-sono.jpg', alt: 'Le mani di un gioielliere, con la lente sul volto, incastonano una pietra su un anello d’oro', pos: '60% 50%' })}

  <section class="bg-ivory-deep px-gutter py-section" aria-labelledby="h-maison">
    <div class="grid items-start gap-y-14 md:grid-cols-12 md:gap-x-8">
      <div class="md:col-span-7">
        <p class="label label--gold" data-reveal>Maison</p>
        <h2 id="h-maison" class="mt-8 text-h2" data-reveal="mask">${maskLines(['Un gioiello alla volta,', em('nel tempo che serve.')], 'reveal')}</h2>
        <div class="mt-12 grid gap-8 md:grid-cols-2" data-reveal="stagger">
          <p class="prose-it" style="--i:0">Gregory Jewels è un atelier italiano. Ogni pezzo nasce da un colloquio, diventa un bozzetto, passa per le mani di chi lo costruisce e non viene mai replicato.</p>
          <p class="prose-it" style="--i:1">Non produciamo serie. Costruiamo un pezzo alla volta e lo consegniamo insieme al bozzetto da cui è partito.</p>
        </div>
      </div>
      <figure class="md:col-span-4 md:col-start-9 md:mt-24">
        <div class="frame aspect-[4/5]" data-reveal="image">${img('img/storia-mani-artigiane.jpg', 'Mani che infilano perle d’oro su un telaietto, accanto a una pinza e a un sacchetto di velluto nero')}</div>
        <figcaption class="label mt-3 text-ink-soft">Il banco, di mattina</figcaption>
      </figure>
    </div>
  </section>

  <section class="px-gutter py-section" aria-labelledby="h-valori">
    <h2 id="h-valori" class="sr-only">Le nostre promesse</h2>
    <p class="max-w-[22ch] font-serif text-[clamp(2.2rem,5.6vw,5.4rem)] leading-[1.04] md:max-w-[26ch]" data-reveal>
      Lavoriamo solo con <em class="ml-i text-gold-deep">pietre rare</em>, scelte una a una; con <em class="ml-i text-gold-deep">diamanti etici</em>, tracciabili fino all’origine; e con una regola sola: ogni gioiello è <em class="ml-i text-gold-deep">unico</em>.
    </p>
    <ul class="mt-16 grid gap-6 hair-t pt-6 md:grid-cols-3 md:gap-x-8" data-reveal="stagger">
${principles.map((p, i) => `      <li style="--i:${i}"><p class="label label--gold">${p.name}</p><p class="prose-it mt-3 text-sm">${p.text}</p></li>`).join('\n')}
    </ul>
  </section>

  <section class="bg-ink px-gutter py-section text-ivory on-dark" aria-labelledby="h-closing">
    <div class="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
      <div class="md:col-span-7">
        <p class="label label--gold" data-reveal>Su misura</p>
        <h2 id="h-closing" class="mt-6 text-h2" data-reveal="mask">${maskLines(['Il gioiello che', em('solo tu puoi chiedere.', 'text-gold')], 'reveal')}</h2>
      </div>
      <div class="grid content-end gap-8 md:col-span-4 md:col-start-9">
        <p class="prose-it" data-reveal>Un colloquio in atelier o in videochiamata, senza impegno. Poi il bozzetto, le pietre, la consegna.</p>
        <div class="flex flex-wrap items-center gap-x-8 gap-y-4" data-reveal>
          <a href="${u(R.contact)}" class="cta">Scrivici <span class="cta__arrow" aria-hidden="true"></span></a>
          <a href="${u(R.home + '#su-misura')}" class="link-u label">Come funziona</a>
        </div>
      </div>
    </div>
  </section>`;
  return [from, shell(x, 'maison', { title: 'La Maison', desc: 'Gregory Jewels è un atelier italiano: un gioiello alla volta, dal colloquio al bozzetto fino alla pietra incastonata.' }, body)];
}

function mestierePage() {
  const from = `${KEY}/mestiere.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const body = `${splitHead(x, { kicker: 'Atelier · il mestiere', lines: ['Dal bozzetto', em('all’incastonatura.')], intro: 'Fusione, saldatura, cesello, incastonatura: quattro passaggi, tutti fatti a mano. Il tempo, per noi, è uno dei materiali.', cta: { href: '#processo', label: 'Segui il percorso' }, src: 'img/lab-fusione-fiamma.jpg', alt: 'Fiamma blu di saldatura su un anello d’oro appoggiato a un blocco di pomice', pos: '45% 50%', imgFirst: true })}

  <section id="processo" class="py-section" aria-labelledby="h-processo">
    <div class="flex flex-wrap items-end justify-between gap-6 px-gutter pb-12">
      <h2 id="h-processo" class="text-h2" data-reveal="mask">${maskLines([`Le quattro ${em('fasi')}`], 'reveal')}</h2>
      <p class="label text-ink-soft" data-reveal>Scorri <span aria-hidden="true">→</span></p>
    </div>
    <span class="mx-gutter mb-10 block h-px bg-ink/30" data-reveal="rule" aria-hidden="true"></span>
    <ol class="rail" tabindex="0" aria-label="Le quattro fasi della lavorazione">
${phases.map((p) => `      <li><div class="frame aspect-[4/5]">${img(p.img, p.alt, { pos: p.pos })}</div><h3 class="mt-1 text-h3">${p.name}</h3><p class="prose-it mt-3 text-sm">${p.text}</p></li>`).join('\n')}
    </ol>
  </section>

  <section class="bg-ivory-deep px-gutter py-section" aria-labelledby="h-det">
    <div class="grid gap-y-6 hair-b pb-8 md:grid-cols-12 md:gap-x-8">
      <h2 id="h-det" class="text-h2 md:col-span-7" data-reveal="mask">${maskLines([`Il ${em('dettaglio')}`], 'reveal')}</h2>
      <p class="prose-it md:col-span-4 md:col-start-9 md:self-end" data-reveal>Cose che si vedono solo da vicino: il pavé, il filo, l’intreccio, la pietra.</p>
    </div>
    <ul class="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:items-start" data-reveal="stagger">
${detailImages.map((d, i) => `      <li class="${['', 'md:mt-16', 'md:mt-8', 'md:mt-24'][i]}" style="--i:${i}"><figure><div class="frame ${['aspect-[4/5]', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]'][i]}">${img(d.img, d.alt, { pos: d.pos })}</div><figcaption class="label mt-3 text-ink-soft">${d.cap}</figcaption></figure></li>`).join('\n')}
    </ul>
  </section>

${closing(x, { kicker: 'Collezioni', lines: ['Il risultato,', em('pezzo per pezzo.')], text: 'Orecchini, anelli, collane e parure, bracciali: gli esemplari nati da questo lavoro.', ctaLabel: 'Vedi le collezioni', to: R.collections })}`;
  return [from, shell(x, 'mestiere', { title: 'Il mestiere', desc: 'Fusione, saldatura, cesello, incastonatura: le quattro fasi con cui nasce un gioiello Gregory Jewels.' }, body)];
}

function journalPage() {
  const from = `${KEY}/journal.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const [f, s1, s2, ...rest] = articles;
  const body = `${splitHead(x, { kicker: 'Journal', lines: ['Quaderno', em('dell’atelier.')], intro: 'Appunti sul bozzetto, sulle pietre e sul banco di lavoro. Poche voci, scritte con calma.', src: 'img/lab-saldatura-flusso.jpg', alt: 'Una mano applica il flusso su un anello mentre la fiamma lo scalda', pos: '50% 50%', min: 'md:min-h-[calc(70svh-4.5rem)]' })}

  <section class="bg-ivory-deep px-gutter py-section" aria-labelledby="h-journal">
    <div class="flex flex-wrap items-end justify-between gap-6 hair-b pb-6">
      <h2 id="h-journal" class="text-h3" data-reveal>In <em class="ml-i">primo piano</em></h2>
      <a href="${INSTAGRAM}" class="link-u label">@gregoryjewels</a>
    </div>
    <div class="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-12" data-reveal="stagger">
      <a href="${u(R.article(f.slug))}" class="group md:col-span-7" style="--i:0">
        <div class="frame aspect-[4/3]">${img(f.img, f.alt, { pos: f.pos })}</div>
        <p class="label label--gold mt-4">${f.cat}</p><h3 class="mt-1 text-h3 link-u">${f.title}</h3><p class="prose-it mt-3 text-sm">${f.excerpt}</p>
      </a>
      <div class="grid content-between gap-10 md:col-span-4 md:col-start-9">
        <a href="${u(R.article(s1.slug))}" style="--i:1"><div class="frame aspect-[4/3]">${img(s1.img, s1.alt, { pos: s1.pos })}</div><p class="label label--gold mt-4">${s1.cat}</p><h3 class="mt-1 text-h3 link-u">${s1.title}</h3></a>
        <a href="${u(R.article(s2.slug))}" style="--i:2"><p class="label label--gold">${s2.cat}</p><h3 class="mt-1 text-h3 link-u">${s2.title}</h3><p class="prose-it mt-3 text-sm">${s2.excerpt}</p></a>
      </div>
    </div>
  </section>

  <section class="px-gutter py-section" aria-labelledby="h-altre">
    <h2 id="h-altre" class="sr-only">Altre note</h2>
    <ul>
${rest.map((a, i) => `      <li class="hair-b ${i === 0 ? 'hair-t ' : ''}"><a href="${u(R.article(a.slug))}" class="grid items-center gap-x-8 gap-y-5 py-10 md:grid-cols-[1fr_1.1fr_15rem]"><div data-reveal><p class="label label--gold">${a.cat}</p><p class="link-u mt-1 justify-self-start font-serif text-3xl leading-tight">${a.title}</p></div><p class="prose-it" data-reveal>${a.excerpt}</p><div class="frame aspect-[3/2]" data-reveal="image">${img(a.img, '', { pos: a.pos })}</div></a></li>`).join('\n')}
    </ul>
    <p class="prose-it mt-12 text-sm" data-reveal>Le note sono testi provvisori: servono a mostrare l’impaginazione e vanno riviste dall’atelier prima della pubblicazione.</p>
  </section>`;
  return [from, shell(x, 'journal', { title: 'Journal', desc: 'Note dall’atelier Gregory Jewels: il bozzetto, le pietre, il banco di lavoro.' }, body)];
}

function articlePage(a, idx) {
  const from = `${KEY}/journal/${a.slug}.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const next = articles[(idx + 1) % articles.length];
  const col = collections.find((c) => c.slug === a.collection);
  const body = `  <article>
${splitHead(x, { kicker: `<a class="link-u" href="${u(R.journal)}">Journal</a> / ${a.cat}`, lines: [a.title], intro: a.lead, src: a.img, alt: a.alt, pos: a.pos, min: 'md:min-h-[calc(86svh-4.5rem)]' }).replace('text-[clamp(2.8rem,6.4vw,6.8rem)] leading-[.96]', 'text-[clamp(2.4rem,5vw,5.2rem)] leading-[1]')}

  <div class="px-gutter py-section">
    <div class="read md:mx-auto" data-reveal>
      ${a.body.map((p) => `<p>${p}</p>`).join('\n      ')}
    </div>
    <figure class="mt-section md:mx-auto md:max-w-3xl">
      <div class="frame aspect-[3/2]" data-reveal="image">${img(a.fig.img, a.fig.alt, { pos: a.fig.pos })}</div>
      <figcaption class="label mt-3 text-ink-soft">${a.fig.cap}</figcaption>
    </figure>
  </div>
  </article>

  <nav class="bg-ivory-deep px-gutter py-section" aria-label="Continua a leggere">
    <div class="grid gap-x-8 gap-y-10 md:grid-cols-3">
      <div class="hair-t pt-6" data-reveal><p class="label label--gold">Dalla collezione</p><a class="link-u mt-3 font-serif text-3xl leading-tight" href="${u(R.collection(col.slug))}">${col.title}</a></div>
      <div class="hair-t pt-6" data-reveal><p class="label label--gold">Prossima nota</p><a class="link-u mt-3 font-serif text-3xl leading-tight" href="${u(R.article(next.slug))}">${next.title}</a></div>
      <div class="hair-t pt-6" data-reveal><p class="label label--gold">Indice</p><a class="link-u mt-3 font-serif text-3xl leading-tight" href="${u(R.journal)}">Tutto il quaderno</a></div>
    </div>
  </nav>`;
  return [from, shell(x, 'journal', { title: a.title, desc: a.excerpt }, body)];
}

function contactPage() {
  const from = `${KEY}/contatti.html`;
  const x = makeCtx(KEY, from);
  const body = `${splitHead(x, { kicker: 'Contatti', lines: ['Un caffè in atelier,', em('prima di tutto.')], intro: 'In atelier o in videochiamata, con calma e senza impegno. Se hai già un’idea o una pietra di famiglia, portala.', src: 'img/hero-contatti.jpg', alt: 'Bracciali in oro su cuscinetti di velluto in una vetrina luminosa', pos: '50% 50%', min: 'md:min-h-[calc(70svh-4.5rem)]' })}

  <section class="bg-ivory-deep px-gutter py-section" aria-labelledby="form-title">
    <div class="grid gap-y-16 md:grid-cols-12 md:gap-x-8">
      <div class="md:col-span-4">
        <p class="label label--gold" data-reveal>Scrivici direttamente</p>
        <a href="mailto:${EMAIL}" class="link-u link-u--on mt-5 break-all font-serif text-[clamp(1.4rem,2.6vw,2.2rem)]" data-reveal>${EMAIL}</a>
        <p class="label mt-10 leading-loose" data-reveal>Instagram<br><a class="link-u" href="${INSTAGRAM}">@gregoryjewels</a></p>
      </div>
      <div class="md:col-span-7 md:col-start-6" data-reveal>
        <h2 id="form-title" class="text-h3">Oppure raccontaci <em class="ml-i">l’idea</em></h2>
        <div class="mt-10">${contactForm()}</div>
      </div>
    </div>
  </section>`;
  return [from, shell(x, 'contatti', { title: 'Contatti', desc: 'Contatta Gregory Jewels: info@gregoryjewels.com. Ti riceviamo in atelier o in videochiamata.' }, body, { scripts: ['js/contact.js'] })];
}

export function build() {
  const out = [collectionsPage(), ...collections.map(collectionPage), maisonPage(), mestierePage(), journalPage(), ...articles.map(articlePage), contactPage()];
  out.forEach(([p, h]) => write(p, h));
  return out.map(([p]) => p);
}
