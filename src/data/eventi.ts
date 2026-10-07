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
  /** Testo della pagina dell'evento, un elemento per paragrafo */
  contenuto: string[];
};

// Contenuti di esempio, in attesa del CMS (Sanity). L'ordine non conta,
// in pagina vengono ordinati dal più recente.
export const eventi: Evento[] = [
  {
    slug: "cerchio-di-meditazione-equinozio",
    titolo: "Cerchio di meditazione d'autunno",
    descrizione:
      "Una serata di respiro e silenzio condiviso per accogliere il cambio di stagione.",
    data: "2026-09-20",
    luogo: "Spazio Anukalana, Milano",
    immagine: "/placeholder_quadrato.jpg",
    contenuto: [
      "L'equinozio d'autunno è un momento di equilibrio tra luce e buio: un invito a fermarsi, raccogliere ciò che l'estate ci ha lasciato e prepararci a un tempo più raccolto.",
      "Ci siamo ritrovati in cerchio per una serata di meditazione guidata, pratiche di respiro e momenti di silenzio condiviso. Ognuno ha portato un'intenzione da affidare alla nuova stagione.",
      "La serata si è conclusa con una breve condivisione e una tisana calda insieme. Grazie a tutte le persone che hanno scelto di esserci.",
    ],
  },
  {
    slug: "laboratorio-mandala-estate",
    titolo: "Laboratorio di mandala",
    descrizione:
      "Colori, forme e geometrie sacre per dare voce al proprio mondo interiore.",
    data: "2026-07-12",
    luogo: "Giardino della Casa delle Arti, Bergamo",
    immagine: "/placeholder_quadrato.jpg",
    contenuto: [
      "Un pomeriggio all'aperto dedicato al disegno del mandala come strumento di ascolto di sé. Non servivano esperienze artistiche: solo la disponibilità a lasciarsi guidare dalle forme e dai colori.",
      "Dopo un breve rilassamento iniziale, ogni partecipante ha costruito il proprio mandala partendo dal centro, seguendo il ritmo del respiro e le sensazioni del momento.",
      "Abbiamo chiuso il laboratorio osservando insieme i mandala nati durante il pomeriggio, ognuno unico come la persona che lo ha creato.",
    ],
  },
  {
    slug: "yoga-anukalana-al-parco",
    titolo: "Yoga Anukalana al parco",
    descrizione:
      "Movimento consapevole e meditazione all'aria aperta, al ritmo della natura.",
    data: "2026-05-30",
    luogo: "Parco Sempione, Milano",
    immagine: "/placeholder_quadrato.jpg",
    contenuto: [
      "Una mattina di primavera dedicata allo Yoga Anukalana, una pratica che unisce movimento, respiro e presenza per ritrovare armonia tra corpo e mente.",
      "La lezione, adatta a tutti i livelli, si è svolta sul prato sotto gli alberi, con una sequenza dolce seguita da una meditazione guidata in ascolto dei suoni della natura.",
    ],
  },
  {
    slug: "serata-counseling-di-gruppo",
    titolo: "Serata di counseling di gruppo",
    descrizione:
      "Uno spazio di ascolto e condivisione per esplorare insieme un tema della vita quotidiana.",
    data: "2026-04-18",
    luogo: "Studio Mandala Interiore, Milano",
    immagine: "/placeholder_quadrato.jpg",
    contenuto: [
      "Un incontro di counseling transpersonale in piccolo gruppo dedicato al tema del cambiamento: come accoglierlo, attraversarlo e trasformarlo in risorsa.",
      "Attraverso brevi esercizi di consapevolezza e momenti di condivisione, ogni partecipante ha potuto ascoltarsi e riconoscersi nell'esperienza degli altri, in un clima di fiducia e rispetto.",
    ],
  },
  {
    slug: "ritiro-di-primavera",
    titolo: "Ritiro di primavera",
    descrizione:
      "Una giornata intera tra yoga, mandala e meditazione per rinascere con la stagione.",
    data: "2026-03-07",
    luogo: "Agriturismo Il Melograno, Lago di Como",
    immagine: "/placeholder_quadrato.jpg",
    contenuto: [
      "Una giornata immersa nella natura per integrare le tre chiavi del percorso: il movimento dello yoga, l'espressione del mandala e l'ascolto del counseling.",
      "La mattina è stata dedicata alla pratica corporea, il pomeriggio al laboratorio creativo, mentre la sera ci siamo salutati con una meditazione al tramonto sul lago.",
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
