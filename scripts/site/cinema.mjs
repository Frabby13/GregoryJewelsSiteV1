// Concept 02 — Cinema: night palette, full-viewport "scenes", word-by-word display headline, gold hairlines.
// Every composition extends home-2-cinema.html (video hero, .full scenes, 4-column gold-rule steps, offset principles).
import { collections, articles, pieces, phases, principles, detailImages, EMAIL, INSTAGRAM } from './data.mjs';
import { makeCtx, head, menu, footer, skip, navItems, navLink, boutiqueLink, maskLines, em, pieceSpec, contactForm, write } from './lib.mjs';

const KEY = 'cinema';
const gold = (t) => em(t, 'text-gold');

function shell(x, active, meta, body, { scripts } = {}) {
  const { u, R } = x;
  const items = navItems(x);
  return `${head(x, { ...meta, theme: '#12100C', scripts })}
<body class="cinema on-dark">

${skip('focus:bg-gold focus:text-ink')}

<header class="site-header hdr-solid fixed inset-x-0 top-0 isolate text-night-text">
  <div class="flex items-center justify-between px-gutter py-3">
    <a href="${u(R.home)}" class="logo-lock enter-fade" style="--d:0" aria-label="Gregory Jewels — Home">
      <img src="${u('img/logo-mark-light.png')}" width="269" height="400" alt="">
      <span class="logo-word">GREGORY JEWELS</span>
    </a>
    <nav class="hidden items-center gap-7 lg:flex xl:gap-9 enter-fade" style="--d:.1" aria-label="Principale">
      ${items.map((it) => navLink(it, active)).join('\n      ')}
      ${boutiqueLink(x, active)}
    </nav>
    <button class="burger label lg:hidden" popovertarget="menu" aria-label="Apri il menu">Menu<span class="burger__bars" aria-hidden="true"></span></button>
  </div>
</header>

${menu(x, active, { dark: false })}

<main id="contenuto">
${body}
</main>

${footer(x, active, { bg: 'bg-night-2', dark: false, logo: 'img/logo-mark-light.png', mute: 'opacity-80' })}

</body>
</html>
`;
}

// Display headline, one word at a time (same .words choreography as the homepage)
const words = (arr, emFrom) => arr.map((w, i) => `<span style="--i:${i}">${emFrom !== undefined && i >= emFrom ? em(w, 'text-gold-bright') : w}</span>`).join('');
const split = (lines, emLine = 1) => {
  const w = []; let from;
  lines.forEach((l, i) => l.split(' ').forEach((t) => { if (i === emLine && from === undefined) from = w.length; w.push(t); }));
  return words(w, from);
};

// Full-viewport opening scene: image behind, headline in the lower third.
function scene(x, { src, alt, pos, kicker, h1, intro, min = '82svh', cta, media }) {
  return `  <section class="full" style="min-height:${min}" aria-labelledby="h-page">
    <div class="frame bg-night">
      ${media || x.img(src, alt, { cls: 'kenburns', pos, eager: true })}
      <div class="absolute inset-0 bg-night/35"></div>
    </div>
    <div class="relative z-10 w-full px-gutter pb-10 pt-32 md:pb-14">
      <p class="label label--gold enter-fade" style="--d:.2">${kicker}</p>
      <h1 id="h-page" class="words mt-6 max-w-[16ch] text-hero md:max-w-[14ch]">${h1}</h1>
      <span class="enter-draw mt-10 block h-px w-full bg-gold" style="--d:.7" aria-hidden="true"></span>
      <div class="mt-6 flex flex-wrap items-end justify-between gap-8">
        <p class="prose-it enter" style="--d:.85">${intro}</p>
        ${cta ? `<a href="${cta.href}" class="cta enter" style="--d:1">${cta.label} <span class="cta__arrow" aria-hidden="true"></span></a>` : ''}
      </div>
    </div>
  </section>`;
}

const closing = (x, { lines, text, ctaLabel, to }) => `  <section class="px-gutter py-section" aria-labelledby="h-closing">
    <div class="grid gap-y-8 md:grid-cols-12 md:gap-x-8">
      <h2 id="h-closing" class="text-h2 md:col-span-8" data-reveal="mask">${maskLines(lines, 'reveal')}</h2>
      <div class="grid content-end gap-8 md:col-span-3 md:col-start-10">
        <p class="prose-it" data-reveal>${text}</p>
        <a href="${x.u(to)}" class="cta self-start" data-reveal>${ctaLabel} <span class="cta__arrow" aria-hidden="true"></span></a>
      </div>
    </div>
  </section>`;

function collectionsPage() {
  const from = `${KEY}/collezioni.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const hp = pieces['lobo-lumiere'];
  const scenes = collections.map((c, n) => {
    const p = pieces[c.hero];
    const right = n % 2 === 1;
    return `    <a href="${u(R.collection(c.slug))}" class="full group mt-3 focus-visible:outline-offset-[-8px]" aria-label="${c.title}: scopri la collezione">
      <div class="frame" data-reveal="image">${img(p.img, '', { pos: p.pos })}</div>
      <div class="relative z-10 px-gutter pb-12 md:pb-16 ${right ? 'md:text-right' : ''}" data-reveal>
        <p class="label label--gold">${c.kicker}</p>
        <h2 class="mt-3 text-h2">${c.title}</h2>
        <p class="prose-it mt-4 ${right ? 'md:ml-auto' : ''}">${c.short}</p>
        <span class="cta mt-8">Scopri la collezione <span class="cta__arrow" aria-hidden="true"></span></span>
      </div>
    </a>`;
  }).join('\n');
  const body = `${scene(x, { src: 'img/gallery-bracciale-oro.jpg', alt: 'Bracciale rigido in oro con motivi paisley tempestati di piccoli diamanti, su fondo rosato', pos: '50% 40%', kicker: 'Collezioni', h1: split(['Quattro famiglie,', 'nessuna serie.']), intro: 'Raggruppiamo i pezzi per tipo, non per stagione. Ogni gioiello resta un esemplare unico.', min: '78svh', cta: { href: '#famiglie', label: 'Entra nelle scene' } })}

  <section id="famiglie" class="mt-3" aria-label="Elenco delle collezioni">
${scenes}
  </section>

${closing(x, { lines: ['Non trovi', gold('il tuo pezzo?')], text: 'Un gioiello nasce da una conversazione. Raccontaci l’idea o la pietra da reinterpretare.', ctaLabel: 'Prenota una consulenza', to: R.contact })}`;
  return [from, shell(x, 'collezioni', { title: 'Collezioni', desc: 'Le collezioni Gregory Jewels: orecchini, anelli, collane e parure, bracciali. Pezzi unici, in scena.' }, body)];
}

function collectionPage(c) {
  const from = `${KEY}/collezioni/${c.slug}.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const hp = pieces[c.hero];
  const n = c.pieces.length;
  const others = collections.filter((o) => o.slug !== c.slug);
  const offsets = ['', ' md:mt-16', ' md:mt-32'];
  const cols = n === 1 ? 'md:grid-cols-1' : n === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';
  const cards = c.pieces.map((s, i) => {
    const p = pieces[s];
    return `      <li class="piece bg-night-2 p-6 md:p-8${n === 1 ? ' md:mx-auto md:max-w-xl' : offsets[i]}" style="--i:${i}">
        <div class="frame ${n === 1 ? 'aspect-[4/3]' : 'aspect-[4/5]'}">${img(p.img, p.alt, { pos: p.pos })}</div>
        <div class="piece__meta mt-5">${p.bespoke ? '<span class="label label--gold">Su misura</span>' : ''}<h3 class="piece__name">${p.name}</h3><p class="piece__spec">${pieceSpec(p)}</p></div>
      </li>`;
  }).join('\n');
  const body = `${scene(x, { src: hp.img, alt: hp.alt, pos: hp.pos, kicker: `Collezione · ${c.kicker}`, h1: split(c.line), intro: c.intro, min: '100svh', cta: { href: '#pezzi', label: 'Guarda i pezzi' } })}

  <section id="pezzi" class="px-gutter py-section" aria-labelledby="h-pezzi">
    <div class="flex flex-wrap items-end justify-between gap-6 pb-12">
      <h2 id="h-pezzi" class="text-h2" data-reveal="mask"><span class="ml"><span>I ${gold('pezzi')}</span></span></h2>
      <p class="prose-it" data-reveal><a class="link-u" href="${u(R.collections)}">Tutte le collezioni</a></p>
    </div>
    <ul class="grid gap-3 ${cols}" data-reveal="stagger">
${cards}
    </ul>
  </section>

  <section class="full relative grid min-h-[80svh] items-end overflow-clip" aria-label="Dal banco">
    <div class="frame" data-reveal="image">${img(c.bench.img, c.bench.alt, { pos: c.bench.pos })}</div>
    <p class="label relative z-10 px-gutter pb-10" data-reveal>${c.bench.cap}</p>
  </section>

  <section class="px-gutter py-section" aria-labelledby="h-det">
    <div class="grid gap-y-8 md:grid-cols-12 md:gap-x-8">
      <p class="label label--gold md:col-span-2" data-reveal>Materiali</p>
      <h2 id="h-det" class="text-h2 md:col-span-7" data-reveal="mask">${maskLines(['Che cosa', gold('c’è dentro.')], 'reveal')}</h2>
    </div>
    <ol class="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-${Math.min(n, 3)}">
${c.pieces.map((s) => { const p = pieces[s]; return `      <li><span class="block h-px bg-gold" data-reveal="rule"></span><h3 class="mt-3 text-h3">${p.name}</h3><p class="prose-it mt-3 text-sm" data-reveal>${p.metal}${p.stones ? `<br>${p.stones}` : ''}</p></li>`; }).join('\n')}
    </ol>
  </section>

  <section class="px-gutter pb-section" aria-labelledby="h-altre">
    <h2 id="h-altre" class="label label--gold" data-reveal>Altre collezioni</h2>
    <ul class="mt-6" data-reveal="stagger">
${others.map((o, i) => `      <li class="hair-t${i === others.length - 1 ? ' hair-b' : ''}" style="--i:${i}"><a href="${u(R.collection(o.slug))}" class="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-6"><span class="link-u font-serif text-3xl md:text-5xl">${o.title}</span><span class="prose-it text-sm">${o.kicker}</span></a></li>`).join('\n')}
    </ul>
  </section>

${closing(x, { lines: ['I pezzi si conoscono', gold('di persona.')], text: 'Nessun listino: ogni gioiello si presenta in atelier o in videochiamata, alla luce naturale.', ctaLabel: 'Chiedi un appuntamento', to: R.contact })}`;
  return [from, shell(x, 'collezioni', { title: `${c.title} — Collezioni`, desc: c.short }, body)];
}

function maisonPage() {
  const from = `${KEY}/maison.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const body = `${scene(x, { src: 'img/storia-mani-artigiane.jpg', alt: 'Mani che infilano perle d’oro su un telaietto, accanto a una pinza e a un sacchetto di velluto nero', pos: '50% 45%', kicker: 'La maison', h1: split(['Un gioiello', 'per una persona sola.']), intro: 'Gregory Jewels è un atelier italiano. Ogni pezzo nasce da un colloquio, diventa un bozzetto, passa per le mani di chi lo costruisce e non viene mai replicato.', min: '100svh' })}

  <section class="px-gutter py-section" aria-labelledby="h-tempo">
    <div class="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
      <p class="label label--gold md:col-span-2" data-reveal>Il metodo</p>
      <h2 id="h-tempo" class="text-h2 md:col-span-6" data-reveal="mask">${maskLines(['L’artigianato italiano', `non si ${gold('accelera.')}`], 'reveal')}</h2>
      <div class="grid content-end gap-6 md:col-span-3 md:col-start-10" data-reveal="stagger">
        <p class="prose-it" style="--i:0">Lavoriamo l’oro, il platino e le pietre con tecniche che richiedono tempo: fusione, saldatura, cesello, incastonatura a mano.</p>
        <p class="prose-it" style="--i:1">Non produciamo serie. Costruiamo un pezzo alla volta, nel tempo che serve, e lo consegniamo insieme al bozzetto da cui è partito.</p>
      </div>
    </div>
  </section>

  <section class="px-gutter pb-section" aria-labelledby="h-valori">
    <h2 id="h-valori" class="sr-only">Principi dell’atelier</h2>
    <div class="grid gap-x-8 gap-y-14 md:grid-cols-12" data-reveal="stagger">
      <div class="hair-t pt-6 md:col-span-5" style="--i:0"><span class="label label--gold">${principles[0].name}</span><p class="mt-5 font-serif text-h3">${principles[0].text}</p></div>
      <div class="hair-t pt-6 md:col-span-4 md:col-start-7 md:mt-24" style="--i:1"><span class="label label--gold">${principles[1].name}</span><p class="mt-5 font-serif text-h3">${principles[1].text}</p></div>
      <div class="hair-t pt-6 md:col-span-3 md:col-start-10 md:mt-48" style="--i:2"><span class="label label--gold">${principles[2].name}</span><p class="mt-5 font-serif text-h3">${principles[2].text}</p></div>
    </div>
  </section>

  <section class="full relative grid min-h-svh items-end overflow-clip" aria-labelledby="h-frase">
    <div class="frame" data-reveal="image">${img('img/hero-chi-sono.jpg', 'Le mani di un gioielliere, con la lente sul volto, incastonano una pietra su un anello d’oro', { pos: '50% 40%' })}</div>
    <div class="relative z-10 grid gap-6 px-gutter pb-12 md:grid-cols-12 md:gap-x-8 md:pb-16">
      <p class="label label--gold md:col-span-2">Atelier</p>
      <h2 id="h-frase" class="text-h2 md:col-span-8" data-reveal="mask">${maskLines(['Dal banco escono solo', 'i pezzi che indosseremmo noi.'], 'reveal')}</h2>
    </div>
  </section>

${closing(x, { lines: ['Ti riceviamo', gold('su appuntamento.')], text: 'In atelier o in videochiamata, con calma e senza impegno.', ctaLabel: 'Scrivici', to: R.contact })}`;
  return [from, shell(x, 'maison', { title: 'La Maison', desc: 'Gregory Jewels è un atelier italiano: un gioiello alla volta, dal colloquio al bozzetto fino alla pietra incastonata.' }, body)];
}

function mestierePage() {
  const from = `${KEY}/mestiere.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const media = `${img('img/hero-chi-sono.jpg', '', { cls: 'kenburns', eager: true })}
      <video class="absolute inset-0" autoplay muted loop playsinline preload="metadata" poster="${u('img/hero-chi-sono.jpg')}" aria-hidden="true" tabindex="-1">
        <source src="${u('video/video_gioiello_gregory.mp4')}" type="video/mp4">
      </video>`;
  const body = `${scene(x, { media, kicker: 'Atelier · il mestiere', h1: split(['Il tempo', 'è un materiale.']), intro: 'Fusione, saldatura, cesello, incastonatura: quattro passaggi, tutti fatti a mano.', min: '100svh', cta: { href: '#fasi', label: 'Segui il percorso' } })}

  <section id="fasi" class="px-gutter py-section" aria-labelledby="h-fasi">
    <div class="grid gap-y-8 md:grid-cols-12 md:gap-x-8">
      <p class="label label--gold md:col-span-2" data-reveal>Le fasi</p>
      <h2 id="h-fasi" class="text-h2 md:col-span-7" data-reveal="mask">${maskLines(['Dal bozzetto', gold('all’incastonatura.')], 'reveal')}</h2>
    </div>
    <ol class="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-4">
${phases.map((p) => `      <li><span class="block h-px bg-gold" data-reveal="rule"></span><h3 class="mt-3 text-h3">${p.name}</h3><p class="prose-it mt-3 text-sm" data-reveal>${p.text}</p></li>`).join('\n')}
    </ol>
  </section>

  <section class="full relative grid min-h-svh items-end overflow-clip" aria-labelledby="h-fuoco">
    <div class="frame" data-reveal="image">${img('img/lab-fusione-fiamma.jpg', 'Fiamma blu di saldatura su un anello d’oro appoggiato a un blocco di pomice', { pos: '50% 40%' })}</div>
    <div class="relative z-10 grid gap-6 px-gutter pb-12 md:grid-cols-12 md:gap-x-8 md:pb-16">
      <p class="label label--gold md:col-span-2">Lavorazione</p>
      <h2 id="h-fuoco" class="text-h2 md:col-span-8" data-reveal="mask">${maskLines(['Il fuoco, la mano,', 'la pazienza.'], 'reveal')}</h2>
    </div>
  </section>

  <section class="px-gutter py-section" aria-labelledby="h-det">
    <div class="flex flex-wrap items-end justify-between gap-6 hair-b pb-6">
      <h2 id="h-det" class="text-h3" data-reveal>Il dettaglio, ${gold('da vicino')}</h2>
      <a href="${u(R.collections)}" class="link-u label">Vedi le collezioni</a>
    </div>
    <ul class="mt-8 grid grid-cols-2 items-end gap-3 md:grid-cols-4" data-reveal="stagger">
${detailImages.map((d, i) => `      <li style="--i:${i}"><figure><div class="frame ${['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]'][i]}">${img(d.img, d.alt, { pos: d.pos })}</div><figcaption class="label mt-3 opacity-80">${d.cap}</figcaption></figure></li>`).join('\n')}
    </ul>
  </section>

${closing(x, { lines: ['Il risultato,', gold('pezzo per pezzo.')], text: 'Orecchini, anelli, collane e parure, bracciali: gli esemplari nati da questo lavoro.', ctaLabel: 'Vedi le collezioni', to: R.collections })}`;
  return [from, shell(x, 'mestiere', { title: 'Il mestiere', desc: 'Fusione, saldatura, cesello, incastonatura: le quattro fasi con cui nasce un gioiello Gregory Jewels.' }, body)];
}

function journalPage() {
  const from = `${KEY}/journal.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const [f, ...rest] = articles;
  const body = `${scene(x, { src: 'img/lab-banco-strumenti.jpg', alt: 'Bobina di filo, pinze e piccole componenti in oro sul banco di lavoro', pos: '50% 50%', kicker: 'Journal', h1: split(['Note', 'dall’atelier.']), intro: 'Appunti sul bozzetto, sulle pietre e sul banco di lavoro. Poche voci, scritte con calma.', min: '70svh' })}

  <section aria-labelledby="h-primo" class="mt-3">
    <h2 id="h-primo" class="sr-only">In primo piano</h2>
    <a href="${u(R.article(f.slug))}" class="full group focus-visible:outline-offset-[-8px]">
      <div class="frame" data-reveal="image">${img(f.img, f.alt, { pos: f.pos })}</div>
      <div class="relative z-10 px-gutter pb-12 md:pb-16" data-reveal>
        <p class="label label--gold">${f.cat}</p>
        <p class="mt-3 max-w-[18ch] font-serif text-h2">${f.title}</p>
        <p class="prose-it mt-4">${f.excerpt}</p>
        <span class="cta mt-8">Leggi la nota <span class="cta__arrow" aria-hidden="true"></span></span>
      </div>
    </a>
  </section>

  <section class="px-gutter py-section" aria-labelledby="h-altre">
    <h2 id="h-altre" class="label label--gold" data-reveal>Altre note</h2>
    <ul class="mt-8 grid gap-3 md:grid-cols-2" data-reveal="stagger">
${rest.map((a, i) => `      <li class="${i % 2 ? 'md:mt-24' : ''}" style="--i:${i}"><a href="${u(R.article(a.slug))}" class="group block bg-night-2 p-6 md:p-8"><div class="frame ${i % 2 ? 'aspect-[3/2]' : 'aspect-[4/3]'}">${img(a.img, '', { pos: a.pos })}</div><p class="label label--gold mt-5">${a.cat}</p><p class="mt-2 font-serif text-3xl leading-tight md:text-4xl link-u">${a.title}</p><p class="prose-it mt-3 text-sm">${a.excerpt}</p></a></li>`).join('\n')}
    </ul>
    <p class="prose-it mt-16 text-sm" data-reveal>Le note sono testi provvisori: servono a mostrare l’impaginazione e vanno riviste dall’atelier prima della pubblicazione. Il resto del banco: <a class="link-u link-u--on" href="${INSTAGRAM}">@gregoryjewels</a>.</p>
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
  <header class="full" style="min-height:88svh">
    <div class="frame bg-night">${img(a.img, a.alt, { cls: 'kenburns', pos: a.pos, eager: true })}<div class="absolute inset-0 bg-night/35"></div></div>
    <div class="relative z-10 w-full px-gutter pb-10 pt-32 md:pb-14">
      <p class="enter-fade" style="--d:.2"><a class="link-u label" href="${u(R.journal)}">Journal</a> <span class="label" aria-hidden="true">/</span> <span class="label label--gold">${a.cat}</span></p>
      <h1 class="mt-6 max-w-[20ch] text-[clamp(2.6rem,6.4vw,6.6rem)] leading-[.98]">${maskLines([a.title])}</h1>
      <span class="enter-draw mt-8 block h-px w-full bg-gold" style="--d:.7" aria-hidden="true"></span>
    </div>
  </header>

  <div class="px-gutter py-section">
    <p class="read-lead md:mx-auto" data-reveal>${a.lead}</p>
    <div class="read mt-12 md:mx-auto" data-reveal>
      ${a.body.map((p) => `<p>${p}</p>`).join('\n      ')}
    </div>
  </div>

  <figure class="px-gutter pb-section">
    <div class="frame aspect-[4/3] md:aspect-[16/8]" data-reveal="image">${img(a.fig.img, a.fig.alt, { pos: a.fig.pos })}</div>
    <figcaption class="label mt-3 opacity-80">${a.fig.cap}</figcaption>
  </figure>
  </article>

  <nav class="px-gutter pb-section" aria-label="Continua a leggere">
    <div class="grid gap-x-8 gap-y-12 md:grid-cols-3">
      <div class="hair-t pt-6" data-reveal><p class="label label--gold">Dalla collezione</p><a class="link-u mt-4 font-serif text-3xl leading-tight" href="${u(R.collection(col.slug))}">${col.title}</a></div>
      <div class="hair-t pt-6" data-reveal><p class="label label--gold">Prossima nota</p><a class="link-u mt-4 font-serif text-3xl leading-tight" href="${u(R.article(next.slug))}">${next.title}</a></div>
      <div class="hair-t pt-6" data-reveal><p class="label label--gold">Indice</p><a class="link-u mt-4 font-serif text-3xl leading-tight" href="${u(R.journal)}">Tutto il journal</a></div>
    </div>
  </nav>`;
  return [from, shell(x, 'journal', { title: a.title, desc: a.excerpt }, body)];
}

function contactPage() {
  const from = `${KEY}/contatti.html`;
  const x = makeCtx(KEY, from);
  const { R, img } = x;
  const body = `${scene(x, { src: 'img/hero-contatti.jpg', alt: 'Bracciali in oro su cuscinetti di velluto in una vetrina luminosa', pos: '50% 50%', kicker: 'Contatti', h1: split(['Ti riceviamo', 'su appuntamento.']), intro: 'In atelier o in videochiamata, con calma e senza impegno. Se hai già un’idea o una pietra di famiglia, portala.', min: '70svh' })}

  <section class="bg-night-2 px-gutter py-section" aria-labelledby="form-title">
    <div class="grid gap-y-16 md:grid-cols-12 md:gap-x-8">
      <div class="md:col-span-4">
        <p class="label label--gold" data-reveal>Scrivici direttamente</p>
        <a href="mailto:${EMAIL}" class="link-u link-u--on mt-5 break-all font-serif text-[clamp(1.4rem,2.6vw,2.2rem)]" data-reveal>${EMAIL}</a>
        <p class="label mt-10 leading-loose" data-reveal>Instagram<br><a class="link-u" href="${INSTAGRAM}">@gregoryjewels</a></p>
      </div>
      <div class="md:col-span-7 md:col-start-6" data-reveal>
        <span class="block h-px bg-gold" data-reveal="rule"></span>
        <h2 id="form-title" class="mt-6 text-h3">Oppure ${gold('raccontaci l’idea')}</h2>
        <div class="mt-10">${contactForm()}</div>
      </div>
    </div>
  </section>`;
  return [from, shell(x, 'contatti', { title: 'Contatti', desc: 'Contatta Gregory Jewels: info@gregoryjewels.com. Ti riceviamo in atelier o in videochiamata.' }, body, { scripts: ['js/contact.js'] })];
}

// ---------------------------------------------------------------- Boutique (shop)
import { buyBlock, specList, filterBar, cartSection, shopNote } from './shop-lib.mjs';
import { shop, priceOf, collectionOf } from './data.mjs';

const shopCard = (x, slug, extra = '') => {
  const p = pieces[slug];
  return `<li class="piece bg-night-2${extra}" data-cat="${collectionOf(slug).slug}">
        <a href="${x.u(x.R.product(slug))}" class="group block p-6 md:p-8">
          <div class="frame aspect-[4/5]">${x.img(p.img, p.alt, { pos: p.pos })}</div>
          <div class="piece__meta mt-5">
            ${p.bespoke ? '<span class="label label--gold">Su misura</span>' : `<span class="label label--gold">${collectionOf(slug).title}</span>`}
            <h3 class="piece__name"><span class="link-u">${p.name}</span></h3>
            <p class="piece__spec">${pieceSpec(p)}</p>
            <p class="price mt-2 text-[1.35rem]">${priceOf(slug)}</p>
          </div>
        </a>
      </li>`;
};

function shopPage() {
  const from = `${KEY}/boutique.html`;
  const x = makeCtx(KEY, from);
  const { R } = x;
  const cards = Object.keys(pieces).map((s) => shopCard(x, s)).join('\n      ');
  const body = `${scene(x, { src: 'img/gallery-anello-solitario.jpg', alt: 'Anello solitario con diamante taglio brillante in castone di oro rosa e pavé, su base nera', pos: '50% 50%', kicker: 'Boutique', h1: split(['Pezzi unici,', 'uno alla volta.']), intro: 'Otto gioielli, ciascuno in un solo esemplare. Scegli quello che ti parla e aggiungilo al carrello.', min: '78svh', cta: { href: '#elenco', label: 'Guarda i pezzi' } })}

  <section id="elenco" class="px-gutter py-section" aria-labelledby="h-elenco">
    <div class="flex flex-wrap items-end justify-between gap-6 pb-12">
      <h2 id="h-elenco" class="text-h2" data-reveal="mask"><span class="ml"><span>Tutti i ${gold('pezzi')}</span></span></h2>
      ${filterBar()}
    </div>
    <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      ${cards}
    </ul>
    <p class="prose-it mt-16 text-sm">${shopNote}</p>
  </section>

${closing(x, { lines: ['Cerchi qualcosa', gold('di diverso?')], text: 'Un gioiello può nascere da zero: raccontaci l’idea o la pietra da reinterpretare.', ctaLabel: 'Prenota una consulenza', to: R.contact })}`;
  return [from, shell(x, 'boutique', { title: 'Boutique', desc: 'La boutique Gregory Jewels: otto gioielli, ciascuno in un solo esemplare. Scegli un pezzo e aggiungilo al carrello.' }, body)];
}

function productPage(slug) {
  const from = `${KEY}/boutique/${slug}.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const p = pieces[slug];
  const c = collectionOf(slug);
  const rel = Object.keys(pieces).filter((s) => s !== slug && collectionOf(s).slug !== c.slug).slice(0, 4);
  const body = `  <section class="px-gutter pb-3 pt-24 md:pt-28" aria-labelledby="h-page">
    <p class="enter-fade"><a class="label link-u" href="${u(R.shop)}">Boutique</a> <span class="label opacity-60" aria-hidden="true">/</span> <a class="label link-u" href="${u(R.collection(c.slug))}">${c.title}</a></p>
    <div class="mt-6 grid gap-3 md:grid-cols-12">
      <div class="frame enter-unveil aspect-[4/5] md:col-span-7 md:aspect-auto md:h-[calc(100svh-9rem)]" style="--d:0">${img(p.img, p.alt, { cls: 'kenburns', pos: p.pos, eager: true })}</div>
      <div class="flex flex-col justify-end bg-night-2 p-6 md:col-span-5 md:p-12">
        <p class="label label--gold enter-fade" style="--d:.3">${p.bespoke ? 'Su misura' : 'Esemplare unico'}</p>
        <h1 id="h-page" class="words mt-5 text-[clamp(2.6rem,5vw,5rem)] leading-[.98]">${words(p.name.split(' '), 1)}</h1>
        <span class="enter-draw mt-8 block h-px w-full bg-gold" style="--d:.7" aria-hidden="true"></span>
        <p class="prose-it mt-6 enter" style="--d:.85">${pieceSpec(p)}</p>
        <p class="lead mt-6 enter" style="--d:.95">${shop[slug].desc}</p>
        <div class="mt-10 enter" style="--d:1.05">${buyBlock(x, slug)}</div>
        <div class="mt-12">${specList(slug)}</div>
        <p class="prose-it mt-6 text-sm">${shopNote}</p>
      </div>
    </div>
  </section>

  <section class="full relative mt-3 grid min-h-[70svh] items-end overflow-clip" aria-label="Dal banco">
    <div class="frame" data-reveal="image">${img(c.bench.img, c.bench.alt, { pos: c.bench.pos })}</div>
    <p class="label relative z-10 px-gutter pb-10" data-reveal>${c.bench.cap}</p>
  </section>

  <section class="px-gutter py-section" aria-labelledby="h-altri">
    <div class="flex flex-wrap items-end justify-between gap-6 pb-12">
      <h2 id="h-altri" class="text-h2" data-reveal="mask"><span class="ml"><span>Altri ${gold('pezzi')}</span></span></h2>
      <a class="label link-u" href="${u(R.shop)}">Tutta la boutique</a>
    </div>
    <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      ${rel.map((s) => shopCard(x, s)).join('\n      ')}
    </ul>
  </section>`;
  return [from, shell(x, 'boutique', { title: p.name + ' — Boutique', desc: shop[slug].desc }, body)];
}

function cartPage() {
  const from = `${KEY}/carrello.html`;
  const x = makeCtx(KEY, from);
  const body = `  <section class="px-gutter pb-12 pt-36 md:pt-44" aria-labelledby="h-page">
    <p class="label label--gold enter-fade" style="--d:.2">Carrello</p>
    <h1 id="h-page" class="words mt-6 text-hero">${split(['Il tuo', 'carrello.'])}</h1>
    <span class="enter-draw mt-10 block h-px w-full bg-gold" style="--d:.7" aria-hidden="true"></span>
    <p class="prose-it mt-6 enter" style="--d:.85">Ogni pezzo è un esemplare unico, quindi qui compare una volta sola. Quando sei pronto, chiedi l’ordine: ti risponde l’atelier.</p>
  </section>

${cartSection(x, { wrap: 'px-gutter pb-section pt-8' })}`;
  return [from, shell(x, 'carrello', { title: 'Carrello', desc: 'Il tuo carrello Gregory Jewels.' }, body)];
}

export function build() {
  const out = [shopPage(), ...Object.keys(pieces).map(productPage), cartPage(), collectionsPage(), ...collections.map(collectionPage), maisonPage(), mestierePage(), journalPage(), ...articles.map(articlePage), contactPage()];
  out.forEach(([p, h]) => write(p, h));
  return out.map(([p]) => p);
}
