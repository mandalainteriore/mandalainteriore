// Contenuti delle pagine nella stessa forma dei documenti di Sanity.
// Servono da riserva (se Sanity non risponde o una pagina non è ancora stata pubblicata)
// e come punto di partenza per l'importazione (scripts/importa-sanity.mts).
// Nessun import di valori qui: il file viene letto anche direttamente da Node.

// ——— Tipi ———

export type Foto = {
  src: string;
  alt: string;
  /** Punto focale per i ritagli, es. "60% 50%" */
  posizione?: string;
};

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type Link = { _type: "link"; _key: string; href: string };
export type Blocco = {
  _type: "block";
  _key: string;
  style: "normal";
  listItem?: "bullet";
  level?: number;
  markDefs: Link[];
  children: Span[];
};
/** Testo con paragrafi, grassetto, corsivo, link ed elenchi puntati */
export type Testo = Blocco[];

export type Invito = { titolo: string; frase: string; pulsante: string };
export type Seo = { titolo?: string; descrizione?: string };
export type Hero = { titolo: string; sfondo: Foto; sfondoMobile?: Foto };

export type Homepage = {
  hero: { titolo: string; sottotitolo: string; testo: Testo };
  eventi: { titolo: string; frase: string };
  chiavi: { titolo: string; frase: string; testo: Testo };
  storia: { titolo: string; frase: string; testo: Testo; foto: Foto };
  mandala: { titolo: string; frase: string; testo: Testo; foto: Foto };
  invito: Invito;
  seo: Seo;
};

export type LaMiaStoria = {
  hero: Hero;
  primoBlocco: { testo: Testo; foto: Foto };
  secondoBlocco: { testo: Testo; foto: Foto };
  approccio: { titolo: string; frase: string; valori: { titolo: string; descrizione: string }[] };
  studi: {
    titolo: string;
    frase: string;
    elenco: { anni: string; titolo: string; dove?: string }[];
    testo: Testo;
    foto: Foto;
  };
  invito: Invito;
  seo: Seo;
};

export type Percorsi = {
  hero: Hero;
  frase: string;
  percorsi: {
    titolo: string;
    frase: string;
    testo: Testo;
    titoloElenco?: string;
    elenco: string[];
    foto: Foto;
  }[];
  invito: Invito;
  seo: Seo;
};

export type IdChiave = "chiave-counseling" | "chiave-yoga" | "chiave-mandala";

export type Chiave = {
  titolo: string;
  /** Titolo in apertura della pagina, se diverso da quello delle card */
  titoloPagina?: string;
  /** Nome nel menu in alto, se diverso dal titolo */
  titoloMenu?: string;
  sottotitolo?: string;
  /** Testo della card in homepage */
  descrizione: string;
  /** Riassunto per le pillole nella pagina Percorsi */
  sintesi: string;
  sfondo: Foto;
  sfondoMobile?: Foto;
  cosE: { titolo: string; frase?: string; testo: Testo };
  primaFoto?: Foto;
  come: { titolo: string; frase?: string; testo: Testo };
  secondaFoto?: Foto;
  destinatari?: { titolo: string; voci: { titolo: string; descrizione: string }[] };
  invito: Invito;
  seo: Seo;
};

export type PaginaMandala = {
  hero: Hero;
  frase: string;
  testo: Testo;
  testoGalleria: Testo;
  invito: Invito;
  seo: Seo;
};

export type Contatti = {
  hero: Hero;
  frase: string;
  email: string;
  telefono: string;
  seo: Seo;
};

export type Impostazioni = {
  /** Firma del sito: apertura della home e footer */
  motto?: string;
  instagram?: string;
  facebook?: string;
};

export type Privacy = {
  titolo: string;
  aggiornamento: string;
  introduzione: Testo;
  sezioni: { titolo: string; testo: Testo }[];
  seo: Seo;
};

// ——— Aiuti per scrivere i testi ———

let contatore = 0;
const chiave = () => `k${(contatore++).toString(36)}`;

// Trasforma una riga in un blocco: **grassetto** e [testo](indirizzo) per i link.
function blocco(riga: string, listItem?: "bullet"): Blocco {
  const markDefs: Link[] = [];
  const children: Span[] = [];
  for (const pezzo of riga.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/)) {
    if (!pezzo) continue;
    const grassetto = pezzo.match(/^\*\*([^*]+)\*\*$/);
    const link = pezzo.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (grassetto) {
      children.push({ _type: "span", _key: chiave(), text: grassetto[1], marks: ["strong"] });
    } else if (link) {
      const def: Link = { _type: "link", _key: chiave(), href: link[2] };
      markDefs.push(def);
      children.push({ _type: "span", _key: chiave(), text: link[1], marks: [def._key] });
    } else {
      children.push({ _type: "span", _key: chiave(), text: pezzo, marks: [] });
    }
  }
  return {
    _type: "block",
    _key: chiave(),
    style: "normal",
    ...(listItem ? { listItem, level: 1 } : {}),
    markDefs,
    children,
  };
}

/** Paragrafi; una voce che inizia con "- " diventa un punto elenco. */
export function testo(...righe: string[]): Testo {
  return righe.map((r) => (r.startsWith("- ") ? blocco(r.slice(2), "bullet") : blocco(r)));
}

/** Testo semplice di un Testo (per descrizioni, anteprime). */
export function testoSemplice(valore: Testo) {
  return valore.map((b) => b.children.map((c) => c.text).join("")).join("\n\n");
}

const foto = (src: string, alt: string, posizione?: string): Foto =>
  posizione ? { src, alt, posizione } : { src, alt };

const INIZIA = "Inizia il tuo viaggio";
const VIAGGIO = "Il tuo viaggio può iniziare ora";
const EMAIL = "roxana.zlate11@gmail.com";

// ——— Contenuti ———

export const homepage: Homepage = {
  hero: {
    titolo: "Mandala Interiore",
    sottotitolo: "con Roxana Zlate",
    testo: testo(
      "Ti accompagno attraverso percorsi di Counseling Transpersonale radicati nella Biotransenergetica, la creazione dei Mandala e le pratiche di Yoga e Meditazione, per risvegliare le tue qualità più autentiche.",
    ),
  },
  eventi: {
    titolo: "Eventi",
    frase: "Momenti di incontro, pratica e condivisione.",
  },
  chiavi: {
    titolo: "Scegli le chiavi che ti risuonano",
    frase:
      "Custodisci dentro di te risorse infinite: a volte serve soltanto la chiave giusta per ritrovarle.",
    testo: testo(
      "Ti accompagno in un percorso di chiarezza, radicamento e consapevolezza verso la realizzazione del tuo Sé.",
      "Insieme daremo forma a un percorso integrato che possa accompagnarti nel tuo cammino.",
    ),
  },
  storia: {
    titolo: "Un cammino nato dall’ascolto",
    frase: "Anche io, prima di accompagnare gli altri, ho attraversato la mia porta.",
    testo: testo(
      "Da anni percorro un cammino di consapevolezza e trasformazione, intrecciando il Counseling Transpersonale, la creazione dei Mandala, le pratiche Yoga e la Meditazione.",
      "Oggi desidero mettere ciò che ho incontrato e imparato lungo il mio percorso al servizio di chi sente il bisogno di fermarsi, guardarsi dentro e ritrovarsi.",
    ),
    foto: foto("/roxana_albero.jpg", "Roxana Zlate"),
  },
  mandala: {
    titolo: "Il mandala come specchio",
    frase: "Ogni mandala che prende forma è un’espressione dell’anima.",
    testo: testo(
      "Un linguaggio antico, attraverso cui l’inconscio parla là dove le parole non riescono ad arrivare.",
      "Attraverso colori, simboli e geometrie sacre, il mandala diventa uno strumento di ascolto profondo e di espressione autentica: un modo per dare forma al proprio mondo interiore e accompagnare la trasformazione, ritornando al proprio centro.",
    ),
    foto: foto("/disegno_mandala_home.jpeg", "Disegno di un mandala con il fiore della vita"),
  },
  invito: {
    titolo: VIAGGIO,
    frase: "Ogni porta si apre solo quando decidi di attraversarla.",
    pulsante: INIZIA,
  },
  seo: {
    descrizione:
      "Percorsi di Counseling Transpersonale e Biotransenergetica, Mandala, Yoga Anukalana e Meditazione con Roxana Zlate, per ritrovare il tuo centro.",
  },
};

export const laMiaStoria: LaMiaStoria = {
  hero: {
    titolo: "La mia storia",
    sfondo: foto("/sfondo_la_mia_storia.jpg", ""),
    sfondoMobile: foto("/sfondo_la_mia_storia_mobile.jpg", ""),
  },
  primoBlocco: {
    testo: testo(
      "Per molti anni ho lavorato nella consulenza internazionale come ingegnere gestionale, coordinando progetti e gruppi di lavoro.",
      "Parallelamente cresceva in me una domanda: come possiamo vivere con più autenticità, presenza e armonia?",
      "Nella vita ho attraversato, come te, diverse soglie: momenti di crisi, transizione e cambiamento che mi hanno spinta a cercare strumenti capaci di sostenere questi passaggi.",
    ),
    foto: foto("/roxana_primo_piano.jpg", "Ritratto di Roxana Zlate"),
  },
  secondoBlocco: {
    testo: testo(
      "Da più di dieci anni percorro la via dello Yoga e della meditazione; il Counseling Transpersonale mi ha aperto al mondo archetipico, offrendo mappe e una metodologia per i processi di risveglio. Il disegno dei Mandala mi ha mostrato la potenza del simbolo come via di trasformazione e centratura.",
      "Un incontro fondamentale è stato quello con gli insegnamenti di Paramahansa Yogananda, più di otto anni fa: da allora accompagnano e orientano il mio cammino.",
      "Passo dopo passo, da questo percorso è nato un progetto: **Il Mandala Interiore**, uno spazio di ascolto, presenza e scoperta, in cui tornare al proprio centro e riconnettersi con la propria essenza.",
      "Oggi unisco ciò che ho maturato nella mia esperienza — metodo, intuito e sensibilità — per accompagnare chi sente il bisogno di fermarsi, ascoltarsi più profondamente, trovare chiarezza e vivere il cambiamento come un’opportunità di crescita.",
    ),
    foto: foto("/foto_roxana_gruppo.jpg", "Roxana Zlate durante un incontro di gruppo"),
  },
  approccio: {
    titolo: "Il mio approccio",
    frase: "Tre principi che guidano ogni percorso che accompagno.",
    valori: [
      {
        titolo: "Consapevolezza",
        descrizione:
          "Camminiamo insieme in uno spazio autentico di accettazione, presenza e non giudizio. Un luogo di osservazione consapevole in cui puoi lasciarti vedere nella tua autenticità e ritrovare la connessione con la tua vera essenza.",
      },
      {
        titolo: "Sensibilità",
        descrizione:
          "Un ascolto attivo e intuitivo, dove la sensibilità diventa sensitività per percepire ciò che emerge oltre le parole, lasciando spazio a ciò che il momento rivela.",
      },
      {
        titolo: "Trasformazione",
        descrizione:
          "Accompagno con consapevolezza ciò che si muove e chiede di essere visto, affinché possa trovare spazio e nuova vita. Un processo di trasformazione che nasce dal riconoscere intuizioni, sensazioni e movimenti interiori come porte verso nuove possibilità.",
      },
    ],
  },
  studi: {
    titolo: "I miei studi",
    frase:
      "Siamo in una continua evoluzione, lo studio e la pratica personale sono fondamentali quanto gli incontri in cui scelgo di accompagnarti.",
    elenco: [
      {
        anni: "2024 – in corso",
        titolo:
          "Formazione Quadriennale in Counseling Transpersonale Integrale – Metodo Biotransenergetica (BTE)",
        dove: "Scuola OmVerbania",
      },
      {
        anni: "2019 – 2023",
        titolo: "Formazione Triennale Insegnante Yoga, specializzazione Anukalana Yoga",
        dove: "Scuola Samadhi Yoga – Firenze",
      },
      {
        anni: "2021",
        titolo: "Corso di Aromaterapia e Oli Essenziali",
        dove: "con il Dott. Leonardo Paoluzzi",
      },
    ],
    testo: testo(
      "Dal 2020 coltivo il disegno dei mandala e delle geometrie sacre attraverso un percorso personale nato spontaneamente dall’esperienza diretta e approfondito nel tempo attraverso la pratica e la ricerca continua.",
    ),
    foto: foto("/roxana_profilo_bianco_nero.jpg", "Ritratto in bianco e nero di Roxana Zlate", "60% 50%"),
  },
  invito: {
    titolo: VIAGGIO,
    frase: "Ogni viaggio inizia quando troviamo il coraggio di aprire la porta.",
    pulsante: INIZIA,
  },
  seo: {
    descrizione:
      "Chi è Roxana Zlate: dalla consulenza internazionale al Counseling Transpersonale, allo Yoga e ai Mandala. La storia e la formazione dietro Mandala Interiore.",
  },
};

export const percorsi: Percorsi = {
  hero: {
    titolo: "Percorsi",
    sfondo: foto("/sfondo_percorsi.jpg", ""),
    sfondoMobile: foto("/sfondo_percorsi_mobile.jpg", ""),
  },
  frase:
    "Ogni cammino ha una forma diversa: può essere un viaggio in solitaria o un percorso condiviso, intrecciando le chiavi che più ti risuonano.",
  percorsi: [
    {
      titolo: "Individuali",
      frase: "Un tempo e uno spazio interamente dedicati a te.",
      testo: testo(
        "Un percorso costruito sui tuoi ritmi e sulle tue necessità, in un rapporto di ascolto diretto e continuativo. Le sedute individuali permettono di esplorare in profondità ciò che emerge, con la libertà di seguire il ritmo che ti è più naturale.",
      ),
      elenco: [
        "Sedute di Counseling Transpersonale",
        "Espressione creativa attraverso il disegno dei Mandala",
        "Lezioni di Yoga e Meditazione",
      ],
      foto: foto("/foto_seduta.jpg", "Una seduta individuale"),
    },
    {
      titolo: "Di gruppo",
      frase: "Nel gruppo, ogni storia diventa specchio per le altre.",
      testo: testo(
        "Ogni persona è una parte viva del campo: lo informa, lo sostiene e ne amplifica la forza. Ogni incontro si trasforma così in un campo vivo, un luogo in cui l’energia collettiva sostiene il processo individuale e dove le pratiche si aprono come porte d’accesso a stati di presenza, intuizione e consapevolezza profonda.",
      ),
      elenco: [
        "Seminari esperienziali di Biotransenergetica ed espressione creativa",
        "Laboratori di disegno Mandala",
        "Lezioni di Yoga",
        "Meditazioni in presenza e online",
      ],
      foto: foto("/foto_gruppo.jpg", "Un percorso di gruppo con Roxana Zlate"),
    },
    {
      titolo: "Aziendali",
      frase: "Anche i team hanno bisogno di ritrovare il proprio centro.",
      testo: testo(
        "In sedici anni di lavoro in azienda ho visto come l’energia di un gruppo può fluire… oppure disperdersi. Ho imparato che le vere difficoltà non nascono dai processi tecnici, ma dalle relazioni: da ciò che accade negli spazi invisibili tra le persone. Quando collaborazione, empatia e ascolto emergono, il gruppo respira, si muove insieme e raggiunge risultati con più serenità e meno sforzo.",
      ),
      titoloElenco: "Team building aziendali",
      elenco: [
        "Seminari esperienziali di Biotransenergetica ed espressione creativa",
        "Laboratori di disegno Mandala",
        "Lezioni di Yoga e Meditazione",
      ],
      foto: foto("/foto_roxana_ufficio.jpeg", "Roxana Zlate al lavoro con un gruppo in azienda"),
    },
  ],
  invito: {
    titolo: VIAGGIO,
    frase: "Ci sono porte che si aprono solo da dentro.",
    pulsante: INIZIA,
  },
  seo: {
    descrizione:
      "Percorsi individuali, di gruppo e aziendali di Counseling Transpersonale, Biotransenergetica, Mandala, Yoga e Meditazione, in presenza e online.",
  },
};

const sfondoChiave = foto("/sfondo_chiave.jpg", "");
const sfondoChiaveMobile = foto("/sfondo_chiave_mobile.jpg", "");
const invitoChiave: Invito = {
  titolo: VIAGGIO,
  frase: "Ogni chiave apre una possibilità.",
  pulsante: INIZIA,
};

export const chiavi: Record<IdChiave, Chiave> = {
  "chiave-counseling": {
    titolo: "Counseling Transpersonale",
    titoloMenu: "Counseling Transpersonale – Biotransenergetica",
    sottotitolo: "Biotransenergetica",
    descrizione:
      "Uno spazio autentico di consapevolezza per ritrovare il tuo centro e risvegliare le tue potenzialità più profonde.",
    sintesi:
      "Uno spazio autentico di consapevolezza per ritrovare il tuo centro e risvegliare le tue potenzialità più profonde.",
    sfondo: sfondoChiave,
    sfondoMobile: sfondoChiaveMobile,
    cosE: {
      titolo: "Cos’è",
      testo: testo(
        "Il Counseling Transpersonale è un percorso di crescita che aiuta a riconoscere e sviluppare le qualità più autentiche, favorendo un rinnovamento della coscienza e una maggiore sintonia con la propria natura profonda.",
        "Si radica nella Biotransenergetica (BTE), una via esperienziale che integra psicologia transpersonale, pratiche corporee e spirituali, meditazione e antiche tradizioni sciamaniche.",
        "Considera la persona nella sua totalità — corpo, emozioni, mente, energia e dimensione spirituale — e si fonda sull’idea che ognuno possieda risorse interiori che possono essere risvegliate attraverso esperienze consapevoli e trasformative.",
      ),
    },
    come: {
      titolo: "Come si svolge",
      testo: testo(
        "Attraverso incontri individuali di Counseling, in presenza oppure online, ti accompagno nell’esplorazione del mondo interiore e nel ritrovare le tue potenzialità autentiche. Meditazioni, respirazione, lavoro con le emozioni e pratiche psico-corporee e archetipiche diventano strumenti per ritrovare libertà interiore e un contatto più vivo con il proprio Sé.",
        "I **Seminari di Biotransenergetica (BTE)** di gruppo sono esperienze immersive che permettono di entrare in relazione diretta con le Forze Archetipiche: qualità universali che abitano la psiche e il campo. Attraverso meditazioni guidate, pratiche psicocorporee e rituali di gruppo, si attiva un processo di trasformazione che fa emergere saggezze profonde, portando chiarezza, centratura e insight.",
      ),
    },
    invito: invitoChiave,
    seo: {
      titolo: "Counseling Transpersonale e Biotransenergetica",
      descrizione:
        "Counseling Transpersonale e Biotransenergetica (BTE): incontri individuali, in presenza o online, e seminari di gruppo per ritrovare libertà interiore.",
    },
  },
  "chiave-yoga": {
    titolo: "Yoga Anukalana e Meditazione",
    titoloPagina: "Yoga Anukalana e Meditazione",
    descrizione:
      "Movimento, respiro e presenza si uniscono per riportare equilibrio, vitalità e armonia nella tua vita.",
    sintesi: "Movimento, respiro e presenza per ritrovare equilibrio e armonia.",
    sfondo: sfondoChiave,
    sfondoMobile: sfondoChiaveMobile,
    cosE: {
      titolo: "Cos’è",
      testo: testo(
        "Anukalana Yoga è un approccio che nasce dall’idea di integrazione: unire la tradizione tantrica con conoscenze moderne di biomeccanica, scienze motorie, osteopatia e arti del movimento.",
        "Accoglie la persona nella sua totalità, adattandosi alle sue esigenze e favorendo trasformazioni profonde. È un metodo che aiuta a ritrovare naturalezza, presenza e radicamento, rendendo la pratica accessibile, piacevole e profondamente rigenerante.",
        "La pratica si basa sulla natura “liquida” del corpo umano e favorisce movimenti morbidi, continui e organici, che riducono la fatica e aumentano la percezione interna.",
        "L’integrazione con elementi del Tai Chi e della danza sostiene la fluidità, mentre la respirazione organismica guida il ritmo e apre lo spazio alla meditazione.",
      ),
    },
    come: {
      titolo: "Come si svolge",
      testo: testo(
        "Le pratiche di Anukalana Yoga si svolgono in presenza, con movimenti fluidi e naturali che rispettano la tua costituzione e favoriscono ascolto, radicamento e presenza.",
        "Le meditazioni possono essere anche online, oltre ai gruppi in presenza, per offrirti uno spazio di centratura e consapevolezza ovunque tu sia.",
      ),
    },
    invito: invitoChiave,
    seo: {
      titolo: "Yoga Anukalana e Meditazione",
      descrizione:
        "Yoga Anukalana e Meditazione: movimenti fluidi e naturali, respiro e presenza. Lezioni di yoga in presenza e meditazioni anche online.",
    },
  },
  "chiave-mandala": {
    titolo: "Mandala – Creatività Consapevole",
    sottotitolo: "Geometrie sacre",
    descrizione:
      "Colori, simboli e geometrie sacre diventano strumenti per dare forma al tuo mondo interiore e favorire la trasformazione.",
    sintesi: "Colori e simboli per dare forma al tuo mondo interiore.",
    sfondo: sfondoChiave,
    sfondoMobile: sfondoChiaveMobile,
    cosE: {
      titolo: "Cos’è",
      testo: testo(
        "Nel linguaggio della psicologia archetipica, il Mandala è una forma che richiama il Sé e porta ordine dove c’è caos. Il disegno circolare diventa un linguaggio simbolico e antico: attraverso colori, forme e geometrie sacre permette di esprimere ciò che spesso non trova parole.",
        "La bellezza non è nel risultato, ma nel viaggio: un processo che apre spazio alla trasformazione mentre il Mandala si rivela.",
      ),
    },
    primaFoto: foto("/mandala_oxossi.jpg", "Mandala di Oxossi"),
    come: {
      titolo: "Come si svolge",
      frase: "Non serve saper disegnare: il Mandala non chiede talento, chiede presenza.",
      testo: testo(
        "Ogni incontro si apre con uno spazio in cui forme, colori e simboli sacri diventano voce di parti profonde di te. Si dà voce a ciò che emerge dall’inconscio, dal campo e dalla propria dimensione intuitiva.",
        "Il processo creativo può essere accompagnato da pratiche meditative e di Biotransenergetica, favorendo ascolto, presenza, centratura e trasformazione.",
      ),
    },
    secondaFoto: foto("/mandala_4.jpg", "Mandala con stella su fondo scuro"),
    destinatari: {
      titolo: "A chi si rivolge",
      voci: [
        {
          titolo: "A chi cerca un altro linguaggio",
          descrizione:
            "Per chi desidera esprimersi in modo diverso, lasciando che forme e colori diventino voce del proprio mondo interiore.",
        },
        {
          titolo: "A chi desidera esplorare sé stesso",
          descrizione:
            "Per chi vuole concedersi un tempo tutto per sé, in cui il gesto creativo diventa un’occasione di ascolto e consapevolezza.",
        },
        {
          titolo: "A chi attraversa un cambiamento",
          descrizione:
            "Quando la mente cerca ordine, spesso disegna cerchi. Il Mandala può offrire uno spazio di quiete e centratura nei momenti di caos o transizione.",
        },
      ],
    },
    invito: invitoChiave,
    seo: {
      descrizione:
        "Mandala e geometrie sacre come linguaggio simbolico per ascoltarsi e trasformarsi: incontri di creatività consapevole. Non serve saper disegnare.",
    },
  },
};

export const paginaMandala: PaginaMandala = {
  hero: {
    titolo: "Mandala",
    sfondo: foto("/sfondo_mandala.jpg", ""),
    sfondoMobile: foto("/sfondo_mandala_mobile.jpg", ""),
  },
  frase: "Ogni mandala è un frammento di un cammino, una storia che ha preso forma.",
  testo: testo(
    "Nel cerchio, il Sé si manifesta come un viaggio verso il centro, dove l’anima si ricompone e ritrova l’unità dell’essere.",
  ),
  testoGalleria: testo(
    "Puoi scegliere il mandala che più risuona con te oppure chiedere una creazione personalizzata, un’opera unica che prende forma dalla tua storia, dalla tua energia e dal tuo cammino.",
  ),
  invito: {
    titolo: VIAGGIO,
    frase: "La trasformazione inizia da una porta che scegli di aprire.",
    pulsante: INIZIA,
  },
  seo: {
    descrizione:
      "La galleria dei mandala di Roxana Zlate: opere uniche nate da un cammino interiore. Puoi scegliere un mandala o chiederne uno personalizzato.",
  },
};

export const contatti: Contatti = {
  hero: {
    titolo: "Inizia il tuo viaggio",
    sfondo: foto("/sfondo_contatti.jpg", ""),
    sfondoMobile: foto("/sfondo_contatti_mobile.jpg", ""),
  },
  frase: "Scrivimi per raccontarmi cosa cerchi, o per qualsiasi domanda sui percorsi.",
  email: EMAIL,
  telefono: "+39 328 701 9457",
  seo: {
    titolo: "Contatti",
    descrizione:
      "Contatta Roxana Zlate per informazioni sui percorsi di Counseling Transpersonale, Mandala, Yoga e Meditazione: scrivi, chiama o compila il modulo.",
  },
};

export const impostazioni: Impostazioni = {
  motto: "L’arte di ritornare a Sé",
  instagram: "https://www.instagram.com/mandala.univers/",
  facebook: "https://www.facebook.com/zlate.roxana",
};

export const privacy: Privacy = {
  titolo: "Privacy Policy",
  aggiornamento: "2026-10-06",
  introduzione: testo(
    "Questa informativa descrive come vengono trattati i dati personali di chi visita il sito Mandala Interiore e di chi mi contatta, ai sensi del Regolamento (UE) 2016/679 (“GDPR”) e del D.Lgs. 196/2003 (“Codice Privacy”).",
  ),
  sezioni: [
    {
      titolo: "1. Titolare del trattamento",
      testo: testo(
        "Il titolare del trattamento è Roxana Zlate.",
        `Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a [${EMAIL}](mailto:${EMAIL}).`,
      ),
    },
    {
      titolo: "2. Quali dati raccolgo",
      testo: testo(
        "**Dati di navigazione.** I sistemi che fanno funzionare il sito registrano, come avviene per qualsiasi sito web, alcuni dati tecnici: indirizzo IP, tipo di browser, data e ora della richiesta, pagine visitate. Servono solo a garantire il funzionamento e la sicurezza del sito e non vengono usati per identificarti.",
        "**Dati che mi invii.** Quando compili il modulo di contatto, mi scrivi un’email o mi telefoni, tratto i dati che mi comunichi: nome, indirizzo email, eventuale numero di telefono e il contenuto del messaggio.",
        "**Dati particolari.** Ti chiedo di non inserire nel messaggio informazioni sulla tua salute o altri dati particolarmente delicati: potremo parlarne con calma durante un primo incontro. Se scegli comunque di condividerli, li tratterò esclusivamente per rispondere alla tua richiesta, sulla base del tuo consenso esplicito, che puoi revocare in qualsiasi momento.",
      ),
    },
    {
      titolo: "3. Perché tratto i dati e su quale base",
      testo: testo(
        "- **Rispondere alle tue richieste** di informazioni o di appuntamento: base giuridica è l’esecuzione di misure precontrattuali richieste da te (art. 6.1.b GDPR).",
        "- **Gestire il sito e la sua sicurezza**: base giuridica è il legittimo interesse del titolare (art. 6.1.f GDPR).",
        "- **Adempiere a obblighi di legge**, ad esempio fiscali o contabili, se nasce un rapporto professionale (art. 6.1.c GDPR).",
        "Non uso i tuoi dati per inviarti newsletter o comunicazioni promozionali, e non li vendo né li cedo a terzi.",
      ),
    },
    {
      titolo: "4. Per quanto tempo li conservo",
      testo: testo(
        "I dati dei messaggi vengono conservati per il tempo necessario a rispondere e, se non nasce un percorso insieme, al massimo per 12 mesi. Se inizi un percorso, i dati sono conservati per la durata del rapporto e poi per il tempo previsto dagli obblighi di legge. I dati di navigazione sono conservati per un periodo limitato dal fornitore di hosting.",
      ),
    },
    {
      titolo: "5. Chi può accedere ai dati",
      testo: testo(
        "I dati sono trattati da me personalmente. Possono inoltre essere trattati, in qualità di responsabili del trattamento, i fornitori dei servizi tecnici che uso:",
        "- hosting del sito: Vercel Inc.;",
        "- invio dei messaggi del modulo di contatto: Sendinblue SAS (Brevo), con sede in Francia;",
        "- servizio di posta elettronica: Google LLC (Gmail).",
        "Alcuni di questi fornitori potrebbero trattare dati al di fuori dell’Unione Europea. In questi casi il trasferimento avviene sulla base di una decisione di adeguatezza della Commissione Europea (ad esempio l’EU-US Data Privacy Framework) o delle clausole contrattuali standard.",
      ),
    },
    {
      titolo: "6. Cookie",
      testo: testo(
        "Questo sito non usa cookie di profilazione né strumenti di statistica o pubblicità. I caratteri tipografici sono ospitati direttamente sul sito, senza collegamenti a servizi esterni. Eventuali cookie tecnici, necessari al funzionamento, non richiedono il tuo consenso.",
      ),
    },
    {
      titolo: "7. Link ai social network",
      testo: testo(
        "Il sito contiene semplici link ai profili Instagram e Facebook. Non sono pulsanti integrati: nessun dato viene inviato a questi servizi finché non clicchi il link. Una volta sulle loro pagine, vale l’informativa privacy di Meta Platforms.",
      ),
    },
    {
      titolo: "8. I tuoi diritti",
      testo: testo(
        "In qualsiasi momento puoi chiedermi di:",
        "- accedere ai tuoi dati e riceverne una copia;",
        "- correggerli o aggiornarli;",
        "- cancellarli;",
        "- limitarne il trattamento od opporti a esso;",
        "- riceverli in un formato leggibile (portabilità);",
        "- revocare il consenso eventualmente dato.",
        `Basta scrivere a [${EMAIL}](mailto:${EMAIL}). Se ritieni che il trattamento non sia corretto, puoi presentare reclamo al Garante per la protezione dei dati personali ([www.garanteprivacy.it](https://www.garanteprivacy.it)).`,
      ),
    },
    {
      titolo: "9. Modifiche a questa informativa",
      testo: testo(
        "Questa informativa può essere aggiornata nel tempo. La data dell’ultima modifica è indicata in cima alla pagina.",
      ),
    },
  ],
  seo: {
    descrizione:
      "Informativa sul trattamento dei dati personali del sito Mandala Interiore di Roxana Zlate.",
  },
};
