export type Evento = {
  /** Parte finale dell'indirizzo della pagina: /eventi/<slug> */
  slug: string;
  titolo: string;
  /** Breve testo mostrato nella card */
  descrizione: string;
  /** Formato AAAA-MM-GG */
  data: string;
  luogo: string;
  immagine: string;
  /** Punto focale per i ritagli (es. "50% 30%"), impostato nel pannello */
  posizione?: string;
  /** Testo della pagina dell'evento, un elemento per paragrafo */
  contenuto: string[];
};

// In attesa del CMS (Sanity). L'ordine non conta, in pagina vengono ordinati dal più recente.
export const eventi: Evento[] = [
  {
    slug: "viaggio-archetipo-madre-terra",
    titolo: "Viaggio nell'archetipo della Madre Terra",
    descrizione:
      "Un incontro esperienziale all'aperto tra Biotransenergetica, Counseling Transpersonale, mandala e canti medicina.",
    data: "2026-10-03",
    luogo: "Sangiano, Lago Maggiore",
    immagine: "/evento_3_ottobre_2026_nana.jpg",
    contenuto: [
      "«Dove la Terra respira»: un incontro esperienziale all'aperto, alle 14:00 sulle rive del Lago Maggiore, per un viaggio nell'archetipo di Nanà, la Madre Terra, principio di nutrimento e trasformazione.",
      "Rilasciare per rinnovare, lasciare spazio alla nuova vita. Un viaggio nelle nostre profondità per incontrare ciò che è pronto a essere lasciato andare, affidarlo alla Terra e aprire spazio al rinnovamento: rilasciare ciò che non ci appartiene più, affidare alla Madre Terra ciò che può essere trasformato, accogliere lo spazio fertile che prepara nuova vita.",
      "Ascolta. Uno spazio di ascolto di sé e di connessione con l'archetipo della Madre Terra, per ritrovare presenza, radicamento e contatto con il proprio sentire.",
      "Crea. Un'esperienza di Arteterapia attraverso la creazione di un mandala collettivo con elementi naturali: un gesto creativo e condiviso per ritrovare il proprio centro e dare forma a ciò che emerge.",
      "Lascia andare e accogli. Un'esperienza di Counseling Transpersonale e Biotransenergetica attraverso pratiche psicocorporee, danza libera, mindfulness e canti medicina, dedicate al lasciare andare ciò che non serve più e creare spazio per accogliere il nuovo.",
      "Un tempo per rallentare, ascoltarsi e tornare al proprio centro.",
    ],
  },
];

export function trovaEvento(slug: string) {
  return eventi.find((evento) => evento.slug === slug);
}

const mesi = [
  "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
  "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
];

// Formattata a mano per evitare differenze di fuso orario tra server e browser.
export function formattaData(data: string) {
  const [anno, mese, giorno] = data.split("-").map(Number);
  return `${giorno} ${mesi[mese - 1]} ${anno}`;
}
