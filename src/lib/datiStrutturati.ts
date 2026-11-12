import { URL_SITO } from "./sito";
import { NOME_SITO } from "./metadati";
import type { Contatti, Impostazioni } from "@/data/pagine";
import type { Evento } from "@/data/eventi";

/** Indirizzo completo a partire da un percorso del sito (es. "/percorsi"). */
export const assoluto = (percorso: string) => new URL(percorso, URL_SITO).toString();

const ID_SITO = `${URL_SITO}/#sito`;
const ID_ROXANA = `${URL_SITO}/#roxana-zlate`;

/** Sito e persona: aiutano Google a mostrare il nome del sito e a collegare i profili social. */
export function datiSito({
  descrizione,
  contatti,
  impostazioni,
  foto,
}: {
  descrizione?: string;
  contatti: Contatti;
  impostazioni: Impostazioni;
  foto?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ID_SITO,
        name: NOME_SITO,
        alternateName: `${NOME_SITO} - Roxana Zlate`,
        url: assoluto("/"),
        inLanguage: "it-IT",
        ...(descrizione ? { description: descrizione } : {}),
        publisher: { "@id": ID_ROXANA },
      },
      {
        "@type": "Person",
        "@id": ID_ROXANA,
        name: "Roxana Zlate",
        jobTitle: "Counselor Transpersonale e insegnante di Yoga",
        url: assoluto("/la-mia-storia"),
        ...(foto ? { image: foto.startsWith("/") ? assoluto(foto) : foto } : {}),
        email: `mailto:${contatti.email}`,
        telephone: contatti.telefono.replace(/[^\d+]/g, ""),
        knowsAbout: [
          "Counseling Transpersonale",
          "Biotransenergetica",
          "Mandala",
          "Yoga Anukalana",
          "Meditazione",
        ],
        sameAs: [impostazioni.instagram, impostazioni.facebook].filter(Boolean),
      },
    ],
  };
}

/** Evento: permette a Google di mostrarlo nei risultati dedicati agli eventi. */
export function datiEvento(evento: Evento) {
  const immagine = evento.immagine.startsWith("/") ? assoluto(evento.immagine) : evento.immagine;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: evento.titolo,
    description: evento.descrizione,
    startDate: evento.data,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: evento.luogo, address: evento.luogo },
    image: [immagine],
    url: assoluto(`/eventi/${evento.slug}`),
    organizer: { "@type": "Person", name: "Roxana Zlate", url: assoluto("/") },
    inLanguage: "it-IT",
  };
}
