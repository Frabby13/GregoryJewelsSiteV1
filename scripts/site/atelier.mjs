// Concept 01 — Atelier: ivory, editorial 12-column grid, mask-line headlines, hairline rules, framed images.
// Every composition below extends home-1-atelier.html (hero split, staggered "piece" grid, sticky column, ink principles band).
import { collections, articles, pieces, phases, principles, detailImages, EMAIL, INSTAGRAM } from './data.mjs';
import { makeCtx, head, menu, footer, skip, navItems, navLink, boutiqueLink, maskLines, em, pieceSpec, contactForm, write } from './lib.mjs';

const KEY = 'atelier';

function shell(x, active, meta, body, { scripts } = {}) {
  const { u, R } = x;
  const items = navItems(x);
  return `${head(x, { ...meta, scripts })}
<body class="atelier">

${skip('focus:bg-ink focus:text-ivory')}

<header class="site-header sticky top-0 border-b border-hair bg-ivory">
  <div class="flex items-center justify-between px-gutter py-3">
    <a href="${u(R.home)}" class="logo-lock enter-fade" style="--d:0" aria-label="Gregory Jewels — Home">
      <img src="${u('img/logo-mark.png')}" width="269" height="400" alt="">
      <span class="logo-word">GREGORY JEWELS</span>
    </a>
    <nav class="hidden items-center gap-7 lg:flex xl:gap-9" aria-label="Principale">
      ${items.map((it) => navLink(it, active)).join('\n      ')}
      ${boutiqueLink(x)}
    </nav>
    <button class="burger label lg:hidden" popovertarget="menu" aria-label="Apri il menu">Menu<span class="burger__bars" aria-hidden="true"></span></button>
  </div>
</header>

${menu(x, active)}

<main id="contenuto">
${body}
</main>

${footer(x, active, { bg: 'bg-ivory-deep', dark: false, logo: 'img/logo-mark.png', mute: 'text-ink-soft' })}

</body>
</html>
`;
}

// Page opening: label in the left column, large headline, short intro.
function pageHead(kicker, lines, intro, id = 'h-page') {
  return `  <section class="px-gutter pb-16 pt-12 md:pb-24 md:pt-20" aria-labelledby="${id}">
    <div class="grid gap-x-8 gap-y-10 md:grid-cols-12">
      <p class="label label--gold enter md:col-span-3" style="--d:.05">${kicker}</p>
      <h1 id="${id}" class="text-[clamp(2.9rem,7.2vw,7.6rem)] leading-[.97] tracking-[-.015em] md:col-span-9">
          ${maskLines(lines)}
      </h1>
      ${intro ? `<p class="lead enter max-w-[34rem] md:col-span-5 md:col-start-4" style="--d:.6">${intro}</p>` : ''}
    </div>
  </section>`;
}

const closing = (x, { kicker = 'Contatti', lines, text, ctaLabel, to }) => `  <section class="bg-ivory-deep px-gutter py-section" aria-labelledby="h-closing">
    <div class="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
      <p class="label label--gold md:col-span-3" data-reveal>${kicker}</p>
      <div class="md:col-span-9">
        <h2 id="h-closing" class="text-h2" data-reveal="mask">${maskLines(lines, 'reveal')}</h2>
        <p class="prose-it mt-8" data-reveal>${text}</p>
        <a href="${x.u(to)}" class="cta mt-10" data-reveal>${ctaLabel} <span class="cta__arrow" aria-hidden="true"></span></a>
      </div>
    </div>
  </section>`;

function collectionsPage() {
  const from = `${KEY}/collezioni.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const V = [
    { i: 'md:col-span-8 aspect-[3/2]', t: 'md:col-span-4 flex flex-col justify-end' },
    { i: 'md:col-span-5 md:col-start-7 md:order-2 aspect-[4/5]', t: 'md:col-span-4 md:col-start-2 md:order-1 md:self-end' },
    { i: 'md:col-span-5 md:col-start-2 aspect-[2/3]', t: 'md:col-span-4 md:col-start-8 md:mt-44' },
    { i: 'md:col-span-8 md:col-start-5 md:order-2 aspect-[16/10]', t: 'md:col-span-3 md:col-start-1 md:order-1 md:self-end' },
  ];
  const items = collections.map((c, n) => {
    const p = pieces[c.hero];
    const v = V[n];
    const href = u(R.collection(c.slug));
    return `      <li class="grid gap-x-8 gap-y-6 md:grid-cols-12">
        <a href="${href}" class="block ${v.i}" tabindex="-1" aria-hidden="true">
          <div class="frame h-full w-full" data-reveal="image">${img(p.img, '', { pos: p.pos })}</div>
        </a>
        <div class="${v.t}" data-reveal>
          <p class="label label--gold">${c.kicker}</p>
          <h2 class="mt-3 text-h2 leading-[1]"><a class="link-u" href="${href}">${c.title}</a></h2>
          <p class="prose-it mt-5">${c.short}</p>
          <a href="${href}" class="link-u label mt-6 self-start">Scopri la collezione</a>
        </div>
      </li>`;
  }).join('\n');
  const body = `${pageHead('Collezioni', ['Quattro famiglie,', `${em('nessuna serie.')}`], 'Raggruppiamo i pezzi per tipo, non per stagione. Ogni gioiello resta un esemplare unico: qui sono semplicemente accanto ai suoi simili.')}

  <section class="bg-ivory-deep px-gutter py-section" aria-label="Elenco delle collezioni">
    <ul class="grid gap-y-24 md:gap-y-40">
${items}
    </ul>
  </section>

${closing(x, { kicker: 'Su misura', lines: ['Non trovi', em('il tuo pezzo?')], text: 'Un gioiello nasce da una conversazione. Raccontaci l’idea o la pietra da reinterpretare: ti riceviamo in atelier o in videochiamata.', ctaLabel: 'Prenota una consulenza', to: R.contact })}`;
  return [from, shell(x, 'collezioni', { title: 'Collezioni', desc: 'Le collezioni Gregory Jewels: orecchini, anelli, collane e parure, bracciali. Pezzi unici, presentati come in una mostra.' }, body)];
}

function collectionPage(c) {
  const from = `${KEY}/collezioni/${c.slug}.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const hp = pieces[c.hero];
  const others = collections.filter((o) => o.slug !== c.slug);
  const pcs = c.pieces.map((s, n) => {
    const p = pieces[s];
    const wide = n % 2 === 0;
    return `      <li class="grid gap-x-8 gap-y-6 md:grid-cols-12">
        <div class="frame ${wide ? 'aspect-[3/2] md:col-span-8' : 'aspect-[4/5] md:col-span-5 md:col-start-6 md:order-2'}" data-reveal="image">${img(p.img, p.alt, { pos: p.pos })}</div>
        <div class="${wide ? 'md:col-span-4 flex flex-col justify-end' : 'md:col-span-4 md:col-start-1 md:order-1 md:self-end'}" data-reveal>
          ${p.bespoke ? '<span class="label label--gold">Su misura</span>' : ''}
          <h3 class="piece__name text-h3 ${p.bespoke ? 'mt-2' : ''}">${p.name}</h3>
          <p class="piece__spec mt-1">${pieceSpec(p)}</p>
        </div>
      </li>`;
  }).join('\n');
  const specs = c.pieces.map((s, n) => {
    const p = pieces[s];
    return `        <div class="spec-row hair-t${n === c.pieces.length - 1 ? ' hair-b' : ''}" style="--i:${n}"><dt class="font-serif text-2xl">${p.name}</dt><dd class="prose-it text-sm">${p.metal}</dd><dd class="prose-it text-sm">${p.stones || '—'}</dd></div>`;
  }).join('\n');
  const body = `  <section class="px-gutter pb-16 pt-10 md:pb-24 md:pt-14" aria-labelledby="h-page">
    <div class="grid items-end gap-x-8 gap-y-12 md:grid-cols-12 md:min-h-[calc(100svh-9rem)]">
      <div class="md:col-span-7 md:pb-4">
        <p class="enter"><a class="label link-u" href="${u(R.collections)}">Collezioni</a> <span class="label text-ink-soft" aria-hidden="true">/</span> <span class="label label--gold">${c.kicker}</span></p>
        <h1 id="h-page" class="mt-8 text-[clamp(2.9rem,6.5vw,7.2rem)] leading-[.98] tracking-[-.015em]">
          ${maskLines([c.line[0], em(c.line[1])])}
        </h1>
        <div class="mt-10 grid gap-8 md:grid-cols-[minmax(0,26rem)_auto] md:items-end md:gap-14">
          <p class="prose-it enter" style="--d:.6">${c.intro}</p>
          <a href="#pezzi" class="cta enter justify-self-start" style="--d:.8">Guarda i pezzi <span class="cta__arrow" aria-hidden="true"></span></a>
        </div>
      </div>
      <figure class="relative md:col-span-5 md:-mr-gutter">
        <div class="frame enter-unveil aspect-[4/5] md:aspect-auto md:h-[calc(100svh-10rem)]" style="--d:0">${img(hp.img, hp.alt, { cls: 'kenburns', pos: hp.pos, eager: true })}</div>
        <figcaption class="label mt-4 flex justify-between text-ink-soft enter-fade" style="--d:1"><span>${hp.name}</span><span>${hp.metal}</span></figcaption>
      </figure>
    </div>
  </section>

  <section id="pezzi" class="bg-ivory-deep px-gutter py-section" aria-labelledby="h-pezzi">
    <div class="flex flex-wrap items-end justify-between gap-6 hair-b pb-8">
      <h2 id="h-pezzi" class="text-h2" data-reveal="mask"><span class="ml"><span>I pezzi</span></span></h2>
      <p class="prose-it" data-reveal>${c.pieces.length === 1 ? 'Un solo esemplare, presentato da solo.' : `${c.pieces.length === 2 ? 'Due' : 'Tre'} esemplari unici, uno accanto all’altro.`}</p>
    </div>
    <ul class="mt-16 grid gap-y-20 md:gap-y-32">
${pcs}
    </ul>
  </section>

  <section class="px-gutter py-section" aria-labelledby="h-det">
    <div class="grid gap-y-12 md:grid-cols-12 md:gap-x-8">
      <p class="label md:col-span-3">Materiali e dettagli</p>
      <div class="md:col-span-9">
        <h2 id="h-det" class="sr-only">Materiali e dettagli</h2>
        <dl data-reveal="stagger">
${specs}
        </dl>
      </div>
      <figure class="md:col-span-7 md:col-start-4">
        <div class="frame aspect-[16/10]" data-reveal="image">${img(c.bench.img, c.bench.alt, { pos: c.bench.pos })}</div>
        <figcaption class="label mt-3 text-ink-soft">${c.bench.cap}</figcaption>
      </figure>
    </div>
  </section>

  <section class="hair-t px-gutter py-section" aria-labelledby="h-altre">
    <div class="grid gap-y-10 md:grid-cols-12 md:gap-x-8">
      <h2 id="h-altre" class="label md:col-span-3">Altre collezioni</h2>
      <ul class="md:col-span-9" data-reveal="stagger">
${others.map((o, n) => `        <li class="hair-b" style="--i:${n}"><a href="${u(R.collection(o.slug))}" class="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-7"><span class="link-u font-serif text-3xl leading-tight md:text-4xl">${o.title}</span><span class="prose-it text-sm">${o.kicker}</span></a></li>`).join('\n')}
      </ul>
    </div>
  </section>

${closing(x, { lines: ['I pezzi si conoscono', em('di persona.')], text: 'Nessun listino: ogni gioiello si presenta in atelier o in videochiamata, alla luce naturale.', ctaLabel: 'Chiedi un appuntamento', to: R.contact })}`;
  return [from, shell(x, 'collezioni', { title: `${c.title} — Collezioni`, desc: c.short }, body)];
}

function maisonPage() {
  const from = `${KEY}/maison.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const body = `${pageHead('Maison', ['Un gioiello alla volta,', em('per una persona sola.')], '')}

  <section class="px-gutter pb-section" aria-label="La maison">
    <div class="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
      <figure class="md:col-span-5 md:col-start-1">
        <div class="frame aspect-[3/2]" data-reveal="image">${img('img/storia-mani-artigiane.jpg', 'Mani che infilano perle d’oro su un telaietto, accanto a una pinza e a un sacchetto di velluto nero', { eager: true })}</div>
        <figcaption class="label mt-3 text-ink-soft">Il banco, di mattina</figcaption>
      </figure>
      <div class="grid content-start gap-6 md:col-span-5 md:col-start-8 md:mt-20" data-reveal="stagger">
        <p class="lead" style="--i:0">Gregory Jewels è un atelier italiano. Ogni pezzo nasce da un colloquio, diventa un bozzetto, passa per le mani di chi lo costruisce e non viene mai replicato.</p>
        <p class="prose-it" style="--i:1">Lavoriamo l’oro, il platino e le pietre con tecniche che richiedono tempo: fusione, saldatura, cesello, incastonatura a mano. Il tempo, per noi, è uno dei materiali.</p>
        <p class="prose-it" style="--i:2">Non produciamo serie. Costruiamo un pezzo alla volta, nel tempo che serve, e lo consegniamo insieme al bozzetto da cui è partito.</p>
        <a href="${u(R.mestiere)}" class="link-u label self-start" style="--i:3">Entra nell’atelier</a>
      </div>
    </div>
  </section>

  <section class="bg-ink px-gutter py-section text-ivory on-dark" aria-labelledby="h-valori">
    <div class="grid gap-y-12 md:grid-cols-12 md:gap-x-8">
      <p class="label md:col-span-3">Principi</p>
      <h2 id="h-valori" class="sr-only">Principi dell’atelier</h2>
      <ul class="md:col-span-9" data-reveal="stagger">
${principles.map((p, n) => `        <li class="grid gap-4 hair-t ${n === principles.length - 1 ? 'hair-b ' : ''}py-10 md:grid-cols-[1fr_20rem] md:items-end" style="--i:${n}"><h3 class="text-h2">${p.name}</h3><p class="prose-it">${p.text}</p></li>`).join('\n')}
      </ul>
    </div>
  </section>

  <section class="relative" aria-labelledby="h-frase">
    <div class="frame aspect-[4/5] md:aspect-[16/8]" data-reveal="image">${img('img/hero-chi-sono.jpg', 'Le mani di un gioielliere, con la lente sul volto, incastonano una pietra su un anello d’oro')}</div>
    <div class="px-gutter py-12 md:absolute md:inset-x-0 md:bottom-0 md:py-14 md:text-ivory on-dark">
      <div class="grid gap-6 md:grid-cols-12 md:gap-x-8">
        <p class="label md:col-span-3">Atelier</p>
        <h2 id="h-frase" class="text-h3 md:col-span-7 md:text-[clamp(1.8rem,3.4vw,3.2rem)]" data-reveal>Dal banco escono solo i pezzi che indosseremmo noi.</h2>
      </div>
    </div>
  </section>

${closing(x, { lines: ['Parliamone', em('di persona.')], text: 'Ti riceviamo in atelier o in videochiamata, con calma e senza impegno.', ctaLabel: 'Scrivici', to: R.contact })}`;
  return [from, shell(x, 'maison', { title: 'La Maison', desc: 'Gregory Jewels è un atelier italiano: un gioiello alla volta, dal colloquio al bozzetto fino alla pietra incastonata.' }, body)];
}

function mestierePage() {
  const from = `${KEY}/mestiere.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const aspects = ['aspect-[4/5]', 'aspect-[3/2]', 'aspect-[4/5]', 'aspect-[3/2]'];
  const body = `${pageHead('Atelier · il mestiere', ['Il tempo', em('è uno dei materiali.')], 'Fusione, saldatura, cesello, incastonatura: quattro passaggi, tutti fatti a mano. Nessuno di questi si può accorciare senza che il gioiello se ne accorga.')}

  <section class="px-gutter pb-section" aria-labelledby="h-fasi">
    <div class="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
      <div class="md:col-span-4">
        <div class="md:sticky md:top-28">
          <p class="label">Le fasi</p>
          <h2 id="h-fasi" class="mt-8 text-h2" data-reveal="mask">${maskLines(['Dal bozzetto', em('all’incastonatura.')], 'reveal')}</h2>
        </div>
      </div>
      <ol class="grid gap-y-20 md:col-span-7 md:col-start-6 md:gap-y-28">
${phases.map((p, n) => `        <li data-reveal="stagger"><div style="--i:0" class="frame ${aspects[n]}" data-reveal="image">${img(p.img, p.alt, { pos: p.pos })}</div><div style="--i:1"><h3 class="mt-6 text-h3">${p.name}</h3><p class="prose-it mt-3">${p.text}</p></div></li>`).join('\n')}
      </ol>
    </div>
  </section>

  <section class="bg-ivory-deep px-gutter py-section" aria-labelledby="h-det">
    <div class="flex flex-wrap items-end justify-between gap-6 hair-b pb-8">
      <h2 id="h-det" class="text-h2" data-reveal="mask">${maskLines([`Il ${em('dettaglio')}`], 'reveal')}</h2>
      <p class="prose-it" data-reveal>Cose che si vedono solo da vicino: il pavé, il filo, l’intreccio, la pietra.</p>
    </div>
    <ul class="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-12">
      <li class="md:col-span-5"><figure><div class="frame aspect-[3/2]" data-reveal="image">${img(detailImages[0].img, detailImages[0].alt, { pos: detailImages[0].pos })}</div><figcaption class="label mt-3 text-ink-soft">${detailImages[0].cap}</figcaption></figure></li>
      <li class="md:col-span-4 md:col-start-7 md:mt-32"><figure><div class="frame aspect-[2/3]" data-reveal="image">${img(detailImages[1].img, detailImages[1].alt, { pos: detailImages[1].pos })}</div><figcaption class="label mt-3 text-ink-soft">${detailImages[1].cap}</figcaption></figure></li>
      <li class="md:col-span-4 md:col-start-2"><figure><div class="frame aspect-[4/3]" data-reveal="image">${img(detailImages[2].img, detailImages[2].alt, { pos: detailImages[2].pos })}</div><figcaption class="label mt-3 text-ink-soft">${detailImages[2].cap}</figcaption></figure></li>
      <li class="md:col-span-4 md:col-start-8 md:-mt-16"><figure><div class="frame aspect-[4/5]" data-reveal="image">${img(detailImages[3].img, detailImages[3].alt, { pos: detailImages[3].pos })}</div><figcaption class="label mt-3 text-ink-soft">${detailImages[3].cap}</figcaption></figure></li>
    </ul>
  </section>

${closing(x, { kicker: 'Collezioni', lines: ['Il risultato,', em('pezzo per pezzo.')], text: 'Orecchini, anelli, collane e parure, bracciali: gli esemplari nati da questo lavoro.', ctaLabel: 'Vedi le collezioni', to: R.collections })}`;
  return [from, shell(x, 'mestiere', { title: 'Il mestiere', desc: 'Fusione, saldatura, cesello, incastonatura: le quattro fasi con cui nasce un gioiello Gregory Jewels.' }, body)];
}

function journalPage() {
  const from = `${KEY}/journal.html`;
  const x = makeCtx(KEY, from);
  const { u, R, img } = x;
  const [f, ...rest] = articles;
  const body = `${pageHead('Journal', ['Note', em('dall’atelier.')], 'Appunti sul bozzetto, sulle pietre e sul banco di lavoro. Poche voci, scritte con calma.')}

  <section class="px-gutter pb-section" aria-labelledby="h-primo">
    <h2 id="h-primo" class="sr-only">In primo piano</h2>
    <a href="${u(R.article(f.slug))}" class="group grid gap-x-8 gap-y-6 md:grid-cols-12">
      <div class="frame aspect-[3/2] md:col-span-8" data-reveal="image">${img(f.img, f.alt, { pos: f.pos, eager: true })}</div>
      <div class="flex flex-col justify-end md:col-span-4" data-reveal>
        <p class="label label--gold">${f.cat}</p>
        <p class="mt-3 text-h3 font-serif link-u self-start">${f.title}</p>
        <p class="prose-it mt-4">${f.excerpt}</p>
        <span class="label mt-6">Leggi la nota</span>
      </div>
    </a>
  </section>

  <section class="bg-ivory-deep px-gutter py-section" aria-labelledby="h-altre">
    <h2 id="h-altre" class="text-h3 hair-b pb-6" data-reveal>Altre note</h2>
    <ul data-reveal="stagger">
${rest.map((a, n) => `      <li class="hair-b" style="--i:${n}"><a href="${u(R.article(a.slug))}" class="group grid items-center gap-x-8 gap-y-4 py-8 md:grid-cols-12"><p class="label label--gold md:col-span-2">${a.cat}</p><div class="md:col-span-7"><p class="link-u font-serif text-3xl leading-tight md:text-4xl">${a.title}</p><p class="prose-it mt-3 text-sm">${a.excerpt}</p></div><div class="frame aspect-[4/3] md:col-span-3 md:col-start-10">${img(a.img, '', { pos: a.pos })}</div></a></li>`).join('\n')}
    </ul>
  </section>

  <section class="px-gutter py-section" aria-labelledby="h-ig">
    <div class="grid gap-y-8 md:grid-cols-12 md:gap-x-8">
      <p class="label label--gold md:col-span-3">Instagram</p>
      <div class="md:col-span-7">
        <h2 id="h-ig" class="text-h3" data-reveal>Il resto del banco, <em class="ml-i">ogni giorno.</em></h2>
        <a href="${INSTAGRAM}" class="link-u label mt-6" data-reveal>@gregoryjewels</a>
        <p class="prose-it mt-10 text-sm" data-reveal>Le note qui sopra sono testi provvisori: servono a mostrare l’impaginazione e vanno riviste dall’atelier prima della pubblicazione.</p>
      </div>
    </div>
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
  <header class="px-gutter pb-12 pt-10 md:pb-16 md:pt-16">
    <div class="grid gap-x-8 gap-y-8 md:grid-cols-12">
      <p class="enter md:col-span-3"><a class="link-u label" href="${u(R.journal)}">Journal</a> <span class="label text-ink-soft" aria-hidden="true">/</span> <span class="label label--gold">${a.cat}</span></p>
      <h1 class="text-[clamp(2.5rem,5.8vw,6rem)] leading-[1] tracking-[-.012em] md:col-span-9">${maskLines([a.title])}</h1>
      <p class="read-lead enter md:col-span-6 md:col-start-4" style="--d:.5">${a.lead}</p>
    </div>
  </header>

  <div class="px-gutter"><div class="frame enter-unveil aspect-[3/2] md:aspect-[16/8]">${img(a.img, a.alt, { cls: 'kenburns', pos: a.pos, eager: true })}</div></div>

  <div class="px-gutter py-section">
    <div class="grid gap-y-14 md:grid-cols-12 md:gap-x-8">
      <div class="read md:col-span-6 md:col-start-4" data-reveal>
        ${a.body.map((p) => `<p>${p}</p>`).join('\n        ')}
      </div>
      <figure class="md:col-span-7 md:col-start-4">
        <div class="frame aspect-[3/2]" data-reveal="image">${img(a.fig.img, a.fig.alt, { pos: a.fig.pos })}</div>
        <figcaption class="label mt-3 text-ink-soft">${a.fig.cap}</figcaption>
      </figure>
    </div>
  </div>
  </article>

  <nav class="hair-t px-gutter py-section" aria-label="Continua a leggere">
    <div class="grid gap-x-8 gap-y-12 md:grid-cols-12">
      <div class="md:col-span-4 md:col-start-4" data-reveal>
        <p class="label label--gold">Dalla collezione</p>
        <a class="link-u mt-3 font-serif text-3xl leading-tight" href="${u(R.collection(col.slug))}">${col.title}</a>
      </div>
      <div class="md:col-span-4 md:col-start-9" data-reveal>
        <p class="label label--gold">Prossima nota</p>
        <a class="link-u mt-3 font-serif text-3xl leading-tight" href="${u(R.article(next.slug))}">${next.title}</a>
      </div>
      <p class="md:col-span-3 md:col-start-1 md:row-start-1" data-reveal><a class="link-u label" href="${u(R.journal)}">Torna al journal</a></p>
    </div>
  </nav>`;
  return [from, shell(x, 'journal', { title: a.title, desc: a.excerpt }, body)];
}

function contactPage() {
  const from = `${KEY}/contatti.html`;
  const x = makeCtx(KEY, from);
  const { R, img } = x;
  const body = `${pageHead('Contatti', ['Parliamone', em('di persona.')], 'Ti riceviamo in atelier o in videochiamata, con calma e senza impegno. Se hai già un’idea o una pietra di famiglia, portala.')}

  <section class="px-gutter pb-section" aria-labelledby="form-title">
    <div class="grid gap-y-16 md:grid-cols-12 md:gap-x-8">
      <div class="md:col-span-5">
        <p class="label label--gold" data-reveal>Scrivici direttamente</p>
        <a href="mailto:${EMAIL}" class="link-u link-u--on mt-5 font-serif text-[clamp(1.5rem,3vw,2.6rem)]" data-reveal>${EMAIL}</a>
        <p class="label mt-10 leading-loose" data-reveal>Instagram<br><a class="link-u" href="${INSTAGRAM}">@gregoryjewels</a></p>
        <div class="frame mt-14 hidden aspect-[4/3] md:block" data-reveal="image">${img('img/hero-contatti.jpg', 'Bracciali in oro su cuscinetti di velluto in una vetrina luminosa')}</div>
      </div>
      <div class="md:col-span-6 md:col-start-7" data-reveal>
        <h2 id="form-title" class="text-h3">Oppure raccontaci l’idea</h2>
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
