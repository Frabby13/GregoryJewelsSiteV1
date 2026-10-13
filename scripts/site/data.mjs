// Shared factual content — identical across the three concepts.
// Every spec string comes from the existing homepages. Nothing here is invented:
// collections are groupings by jewelry type of the pieces already shown on the homes.

export const EMAIL = 'info@gregoryjewels.com';
export const INSTAGRAM = 'https://www.instagram.com/gregoryjewels/';
export const PRIVACY = 'https://www.gregoryjewels.com/privacy.html';

export const pieces = {
  'creoli-torchon': { name: 'Creoli Torchon', metal: 'Oro giallo 18 kt', stones: '', img: 'img/filosofia-orecchini-oro.jpg', pos: '50% 50%',
    alt: 'Creoli in oro giallo intrecciato appoggiati a un ciottolo bianco, nella luce radente del mattino' },
  'lobo-lumiere': { name: 'Lobo Lumière', metal: 'Oro bianco', stones: 'Diamanti taglio brillante, halo', img: 'img/lab-incastonatura.jpg', pos: '50% 35%',
    alt: 'Coppia di orecchini a lobo in oro bianco con diamante centrale e halo di brillanti' },
  'notte-blu': { name: 'Notte Blu', metal: 'Pendenti', stones: 'Pietra blu a goccia, baguette', img: 'img/gallery-orecchini-pendenti.jpg', pos: '50% 45%',
    alt: 'Orecchini pendenti con pietra blu a goccia e baguette di cristallo su foglia verde' },
  'solitario-aurora': { name: 'Solitario Aurora', metal: 'Platino e oro rosa 18 kt', stones: 'Diamante taglio brillante, pavé', img: 'img/gallery-anello-solitario.jpg', pos: '50% 50%',
    alt: 'Anello solitario con diamante taglio brillante in castone di oro rosa e pavé, su base nera' },
  'anello-rubino': { name: 'Anello Rubino', metal: 'Oro 22 kt, smalti rossi', stones: 'Rubini cabochon', img: 'img/bespoke-bozzetto-rubini.jpg', pos: '50% 52%', bespoke: true,
    alt: 'Bozzetto colorato di una parure di rubini con un anello in oro e smalti rossi, lente e pinze' },
  'luna-crescente': { name: 'Luna Crescente', metal: 'Oro giallo 18 kt', stones: 'Pietra di colore, brillanti', img: 'img/gallery-collana-pietra-colore.jpg', pos: '50% 32%',
    alt: 'Collana a più fili in oro con pietra blu sfaccettata e mezzaluna di brillanti' },
  'parure-giardino': { name: 'Parure Giardino', metal: 'Oro 22 kt, smalti', stones: 'Smeraldi, peridoti', img: 'img/bespoke-bozzetto-collier.jpg', pos: '50% 55%', bespoke: true,
    alt: 'Parure in oro con smalti e smeraldi accanto al bozzetto a matita da cui è nata' },
  'bracciale-paisley': { name: 'Bracciale Paisley', metal: 'Oro giallo e bianco', stones: 'Pavé di diamanti', img: 'img/gallery-bracciale-oro.jpg', pos: '50% 50%',
    alt: 'Bracciale rigido in oro con motivi paisley tempestati di piccoli diamanti, su fondo rosato' },
};

export const collections = [
  { slug: 'orecchini', title: 'Orecchini', kicker: 'Tre paia',
    line: ['La luce', 'vicino al viso.'],
    intro: 'Creoli in oro giallo intrecciato, orecchini a lobo con diamante e halo di brillanti, pendenti con una pietra blu a goccia. Tre modi diversi di portare la luce all’altezza del viso.',
    short: 'Creoli, lobo e pendenti: tre modi di portare la luce all’altezza del viso.',
    pieces: ['creoli-torchon', 'lobo-lumiere', 'notte-blu'],
    hero: 'creoli-torchon',
    bench: { img: 'img/lab-banco-strumenti.jpg', pos: '50% 50%', cap: 'Dal banco: filo, pinze e componenti in oro',
      alt: 'Bobina di filo, pinze e piccole componenti in oro sul banco di lavoro' } },
  { slug: 'anelli', title: 'Anelli', kicker: 'Due pezzi',
    line: ['Una pietra,', 'al centro.'],
    intro: 'Un solitario con diamante taglio brillante e pavé, un anello su misura con rubini cabochon e smalti rossi. Due modi di mettere una pietra al centro e lasciare che sia lei a parlare.',
    short: 'Un solitario in platino e oro rosa, un anello su misura con rubini cabochon.',
    pieces: ['solitario-aurora', 'anello-rubino'],
    hero: 'solitario-aurora',
    bench: { img: 'img/lab-saldatura-flusso.jpg', pos: '50% 50%', cap: 'Dal banco: la saldatura di un anello',
      alt: 'Una mano applica il flusso su un anello mentre la fiamma lo scalda' } },
  { slug: 'collane-e-parure', title: 'Collane e parure', kicker: 'Due pezzi',
    line: ['Dal disegno', 'a ciò che si porta.'],
    intro: 'Una collana a più fili con pietra di colore e mezzaluna di brillanti, una parure in oro con smalti e smeraldi accanto al bozzetto a matita da cui è nata.',
    short: 'Una collana a più fili e una parure con smalti, nata da un bozzetto a matita.',
    pieces: ['luna-crescente', 'parure-giardino'],
    hero: 'parure-giardino',
    bench: { img: 'img/storia-mani-artigiane.jpg', pos: '50% 50%', cap: 'Dal banco: perle d’oro su un telaietto',
      alt: 'Mani che infilano perle d’oro su un telaietto, accanto a una pinza e a un sacchetto di velluto nero' } },
  { slug: 'bracciali', title: 'Bracciali', kicker: 'Un pezzo',
    line: ['Il polso,', 'in oro.'],
    intro: 'Un bracciale rigido in oro giallo e bianco, con motivi paisley coperti da un pavé di diamanti. Il disegno è la decorazione; il pavé la rende luminosa.',
    short: 'Un bracciale rigido in oro giallo e bianco con motivi paisley e pavé di diamanti.',
    pieces: ['bracciale-paisley'],
    hero: 'bracciale-paisley',
    bench: { img: 'img/hero-contatti.jpg', pos: '50% 50%', cap: 'Bracciali in oro su cuscinetti di velluto',
      alt: 'Bracciali in oro su cuscinetti di velluto in una vetrina luminosa' } },
];

// Sample articles. Titles come from the homepages; body text is provisional
// and limited to what the existing project states or what the images show.
export const articles = [
  { slug: 'come-nasce-un-bozzetto', title: 'Come nasce un bozzetto', cat: 'Bozzetto',
    img: 'img/bespoke-bozzetto-collier.jpg', pos: '50% 50%', alt: 'Parure in oro con smalti e smeraldi accanto al bozzetto a matita da cui è nata',
    excerpt: 'Il gioiello esiste prima su carta: matita, acquerello, proporzioni.', collection: 'collane-e-parure',
    lead: 'Il gioiello esiste prima su carta. Il bozzetto è il luogo in cui si decide quasi tutto.',
    body: [
      'Si parte da un colloquio: per chi sarà il gioiello, per quale occasione, che cosa deve ricordare. Portare un’immagine aiuta, ma non è necessario.',
      'Il disegno è fatto a mano, a matita e acquerello, con proporzioni e volumi. Non è un’illustrazione decorativa: serve a vedere come la pietra siederà nel metallo e come il pezzo starà addosso.',
      'Poi lo si corregge insieme, quante volte serve, finché somiglia a ciò che si aveva in mente. Solo allora si passa al metallo.',
      'Il bozzetto non si butta. Viene consegnato insieme al gioiello: la Parure Giardino, qui accanto, nasce da quel disegno a matita.' ],
    fig: { img: 'img/bespoke-bozzetto-rubini.jpg', pos: '50% 50%', cap: 'Un bozzetto a colori, con la lente e le pinze', alt: 'Bozzetto colorato di una parure di rubini con un anello in oro e smalti rossi, lente e pinze' } },
  { slug: 'il-rubino-cabochon', title: 'Il rubino cabochon, una lettura da vicino', cat: 'Pietre',
    img: 'img/bespoke-bozzetto-rubini.jpg', pos: '50% 52%', alt: 'Bozzetto colorato di una parure di rubini con un anello in oro e smalti rossi, lente e pinze',
    excerpt: 'Una pietra liscia e curva, senza sfaccettature: come si guarda e come dialoga con lo smalto.', collection: 'anelli',
    lead: 'Un rubino cabochon non ha sfaccettature: ha una superficie liscia e curva, e si guarda in modo diverso.',
    body: [
      'Il taglio cabochon arrotonda la pietra invece di sfaccettarla. Non cerca il riflesso a scintilla del brillante: restituisce un colore pieno, che si legge dalla superficie.',
      'Nell’Anello Rubino le pietre sono incastonate in oro 22 kt con smalti rossi. Il colore dello smalto e quello delle pietre dialogano, e il bozzetto a colori lo mostra prima ancora che l’anello esista.',
      'Per leggere una pietra così servono la lente e la luce naturale. È lo stesso gesto che proponiamo a chi sceglie le gemme per un pezzo su misura: guardarle una accanto all’altra.' ],
    fig: { img: 'img/lab-incastonatura.jpg', pos: '40% 50%', cap: 'Pietre alla luce, prima di essere scelte', alt: 'Due diamanti taglio brillante con halo, alla luce, pronti per essere scelti' } },
  { slug: 'diamanti-tracciabili', title: 'Diamanti tracciabili: cosa chiediamo ai fornitori', cat: 'Pietre',
    img: 'img/gallery-anello-solitario.jpg', pos: '50% 50%', alt: 'Anello solitario con diamante taglio brillante in castone di oro rosa e pavé, su base nera',
    excerpt: 'Provenienza documentata e nessun legame con zone di conflitto.', collection: 'anelli',
    lead: 'Usiamo solo diamanti tracciabili. Ecco che cosa significa, in poche righe.',
    body: [
      'Per noi un diamante è tracciabile quando la sua provenienza è documentata. Non basta il certificato della pietra: conta sapere da dove arriva.',
      'Chiediamo inoltre che non abbia alcun legame con zone di conflitto.',
      'Il Solitario Aurora, con il suo diamante taglio brillante e il pavé, è un esempio di pezzo costruito con queste regole.',
      'Nota per la redazione: questo testo è provvisorio. I dettagli sul rapporto con i fornitori vanno forniti dall’atelier prima della pubblicazione.' ],
    fig: { img: 'img/lab-incastonatura.jpg', pos: '50% 35%', cap: 'Diamanti taglio brillante con halo', alt: 'Coppia di orecchini a lobo in oro bianco con diamante centrale e halo di brillanti' } },
  { slug: 'come-si-salda-un-anello', title: 'Come si salda un anello', cat: 'Il banco',
    img: 'img/lab-saldatura-flusso.jpg', pos: '50% 50%', alt: 'Una mano applica il flusso su un anello mentre la fiamma lo scalda',
    excerpt: 'Il flusso, la fiamma, il blocco di pomice: la saldatura vista da vicino.', collection: 'anelli',
    lead: 'La saldatura è uno dei gesti in cui l’oro prende forma al banco.',
    body: [
      'Prima del calore, il flusso: una mano lo applica sulla giuntura, perché il metallo d’apporto scorra dove deve e non altrove.',
      'Poi la fiamma. L’anello poggia su un blocco di pomice, che sopporta il calore, e si scalda finché la saldatura corre lungo la giuntura.',
      'Segue il lavoro di lima, di cesello e di finitura. La saldatura è solo uno dei passaggi tra il bozzetto e la pietra incastonata, ma è uno di quelli in cui si vede meglio che il tempo è un materiale.' ],
    fig: { img: 'img/lab-fusione-fiamma.jpg', pos: '45% 50%', cap: 'La fiamma su un anello d’oro, appoggiato alla pomice', alt: 'Fiamma blu di saldatura su un anello d’oro appoggiato a un blocco di pomice' } },
  { slug: 'sul-banco', title: 'Sul banco: gli attrezzi dell’atelier', cat: 'Il banco',
    img: 'img/lab-banco-strumenti.jpg', pos: '50% 50%', alt: 'Bobina di filo, pinze e piccole componenti in oro sul banco di lavoro',
    excerpt: 'Una bobina di filo, le pinze, piccole componenti in oro: un banco guardato da vicino.', collection: 'orecchini',
    lead: 'Un banco, pochi strumenti, mani esperte. Ci piace che tutto resti abbastanza piccolo da poter essere guardato da vicino.',
    body: [
      'Sul banco ci sono una bobina di filo, delle pinze, piccole componenti in oro. Non c’è altro di necessario: il resto lo fanno le mani.',
      'La lente è l’attrezzo più personale. Serve per le incastonature e per controllare ogni giuntura, griffe dopo griffe.',
      'Questa è una nota in bozza: l’elenco completo degli attrezzi può essere aggiunto dall’atelier.' ],
    fig: { img: 'img/storia-mani-artigiane.jpg', pos: '50% 50%', cap: 'Il banco, di mattina', alt: 'Mani che infilano perle d’oro su un telaietto, accanto a una pinza e a un sacchetto di velluto nero' } },
];

export const phases = [
  { name: 'Bozzetto', text: 'Il gioiello esiste prima su carta: matita, acquerello, proporzioni. Si corregge finché somiglia all’idea.',
    img: 'img/bespoke-bozzetto-rubini.jpg', pos: '50% 50%', alt: 'Bozzetto colorato di gioielli con rubini, accanto a una lente e a pinze da orafo' },
  { name: 'Selezione delle pietre', text: 'Gemme certificate, confrontate alla luce naturale. Contano il colore, la purezza, il taglio e da dove vengono.',
    img: 'img/lab-incastonatura.jpg', pos: '40% 50%', alt: 'Due diamanti taglio brillante con halo, alla luce, pronti per essere scelti' },
  { name: 'Lavorazione', text: 'Fusione, saldatura, limatura, cesello. L’oro prende forma al banco, con la fiamma e la pazienza.',
    img: 'img/lab-fusione-fiamma.jpg', pos: '45% 50%', alt: 'Fiamma blu di saldatura su un anello d’oro appoggiato a un blocco di pomice' },
  { name: 'Incastonatura', text: 'L’ultimo gesto, il più delicato: la pietra viene fissata a mano, griffe dopo griffe, sotto la lente.',
    img: 'img/hero-chi-sono.jpg', pos: '62% 50%', alt: 'Le mani di un gioielliere, con la lente sul volto, incastonano una pietra su un anello d’oro' },
];

export const principles = [
  { name: 'Pietre rare', text: 'Cerchiamo gemme con carattere, non solo con certificato: colore vivo, taglio onesto, origine dichiarata.' },
  { name: 'Diamanti etici', text: 'Solo diamanti tracciabili, con provenienza documentata e nessun legame con zone di conflitto.' },
  { name: 'Esemplare unico', text: 'Il disegno non viene replicato. Se un pezzo è tuo, resta soltanto tuo.' },
];

export const detailImages = [
  { img: 'img/gallery-bracciale-oro.jpg', pos: '50% 50%', cap: 'Pavé di diamanti sui motivi paisley', alt: 'Bracciale rigido in oro con motivi paisley tempestati di piccoli diamanti, su fondo rosato' },
  { img: 'img/gallery-collana-pietra-colore.jpg', pos: '50% 32%', cap: 'Pietra sfaccettata e mezzaluna di brillanti', alt: 'Collana a più fili in oro con pietra blu sfaccettata e mezzaluna di brillanti' },
  { img: 'img/lab-banco-strumenti.jpg', pos: '50% 50%', cap: 'Filo, pinze, componenti in oro', alt: 'Bobina di filo, pinze e piccole componenti in oro sul banco di lavoro' },
  { img: 'img/filosofia-orecchini-oro.jpg', pos: '50% 50%', cap: 'L’oro intrecciato dei creoli', alt: 'Creoli in oro giallo intrecciato appoggiati a un ciottolo bianco, nella luce radente del mattino' },
];
