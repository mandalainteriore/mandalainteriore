export type Mandala = {
  titolo: string;
  /** Breve testo sotto la foto (facoltativo, circa 200 caratteri al massimo) */
  descrizione?: string;
  /** Percorso in /public; con Sanity diventerà l'immagine caricata dalla cliente */
  immagine: string;
  /** Dimensioni originali, servono a mostrare la foto intera nelle sue proporzioni */
  larghezza: number;
  altezza: number;
  /** Punto focale per i ritagli (es. "50% 30%"), impostato nel pannello */
  posizione?: string;
};

// In attesa del CMS (Sanity): stessa struttura del futuro modello "Mandala".
// L'ordine qui è l'ordine in pagina (dal documento della cliente).
export const mandala: Mandala[] = [
  {
    titolo: "La Freccia della Chiarezza",
    descrizione:
      "Questo Mandala è dedicato a Oxóssi, Orixá delle foreste che con la sua saggezza mi ha guidata lungo i sentieri del mio essere per riportarmi più vicino alla mia essenza.",
    immagine: "/mandala/la-freccia-della-chiarezza.jpg",
    larghezza: 946,
    altezza: 946,
  },
  {
    titolo: "Albero della Visione",
    descrizione:
      "A seguito di un seminario sull’Archetipo di Nanà, ha preso forma l’Albero della Visione, simbolo della consapevolezza che le nostre radici, salde e profonde, nutrite dalla Madre Terra, ci consentono di espandere i nostri rami verso l’infinito e di aprirci alla conoscenza e alla saggezza Divina.",
    immagine: "/mandala/lalbero-della-visione.jpg",
    larghezza: 1197,
    altezza: 1440,
  },
  {
    titolo: "Oxum – La signora delle acque dolci",
    descrizione:
      "Mandala Archetipico che nasce dopo un intenso lavoro di Biotransenergetica, attraverso l’incontro profondo con l’Archetipo delle Acque Dolci.",
    immagine: "/mandala/oxum.jpg",
    larghezza: 1617,
    altezza: 2000,
  },
  {
    titolo: "Riflesso del Macrocosmo nel Microcosmo",
    descrizione:
      "Rappresentazione simbolica della profonda connessione tra l’essere umano e l’Universo, tra il mondo interiore e quello cosmico.",
    immagine: "/mandala/riflesso-del-macrocosmo-nel-microcosmo.jpg",
    larghezza: 1080,
    altezza: 1080,
  },
  {
    titolo: "Discesa nelle profondità",
    descrizione:
      "Mandala nato dopo un periodo di grandi prove nella mia vita, un tempo di trasformazione attraverso la discesa nelle parti più profonde di me stessa. Ne sono emersa con una consapevolezza preziosa: non si scende nelle profondità per perdersi, ma per ritrovare se stessi.",
    immagine: "/mandala/discesa-nelle-profondita.jpg",
    larghezza: 1589,
    altezza: 2000,
  },
  {
    titolo: "L’Universo dentro di me",
    immagine: "/mandala/luniverso-dentro-di-me.jpg",
    larghezza: 1080,
    altezza: 944,
  },
  {
    titolo: "Connessioni – Unità nella diversità",
    immagine: "/mandala/connessioni.jpg",
    larghezza: 1080,
    altezza: 1080,
  },
  {
    titolo: "Irradiazione – La luce che nasce da dentro",
    immagine: "/mandala/irradiazione-la-luce-da-dentro.jpg",
    larghezza: 1080,
    altezza: 1080,
  },
  {
    titolo: "Il custode dei Sogni",
    immagine: "/mandala/il-custode-dei-sogni.jpg",
    larghezza: 1080,
    altezza: 1080,
  },
  {
    titolo: "Il Terzo Occhio",
    descrizione:
      "Il terzo occhio visto in meditazione secondo gli insegnamenti di Paramahansa Yogananda.",
    immagine: "/mandala/il-terzo-occhio.jpg",
    larghezza: 1440,
    altezza: 1440,
  },
  {
    titolo: "Viaggio Astrale",
    immagine: "/mandala/viaggio-astrale.jpg",
    larghezza: 1080,
    altezza: 1350,
  },
  {
    titolo: "Lo sguardo dell’Infinito",
    descrizione:
      "Uno sguardo che va oltre ciò che gli occhi possono vedere, aprendosi al mistero dell’esistenza e alla connessione profonda tra il nostro mondo interiore e l’infinito.",
    immagine: "/mandala/lo-sguardo-dellinfinito.jpg",
    larghezza: 1080,
    altezza: 1080,
  },
  {
    titolo: "Amore Materno",
    descrizione:
      "L’essenza dell’amore materno, un’energia primordiale che accoglie, nutre, protegge e accompagna la vita nel suo divenire.",
    immagine: "/mandala/amore-materno.jpg",
    larghezza: 1440,
    altezza: 1440,
  },
];
