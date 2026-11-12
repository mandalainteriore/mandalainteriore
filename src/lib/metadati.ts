import type { Metadata } from "next";
import type { Seo } from "@/data/pagine";

export const NOME_SITO = "Mandala Interiore";

// Parti comuni dell'anteprima social. Vanno ripetute in ogni pagina perché Next
// sostituisce l'intero blocco openGraph invece di unirlo a quello del layout.
export const OPEN_GRAPH_BASE = {
  type: "website",
  locale: "it_IT",
  siteName: NOME_SITO,
  images: [
    {
      url: "/anteprima-social.jpg",
      width: 1200,
      height: 630,
      alt: "Mandala Interiore con Roxana Zlate: Counseling Transpersonale, Mandala, Yoga e Meditazione",
    },
  ],
};

/**
 * Titolo, descrizione, indirizzo canonico e anteprima social di una pagina.
 * Titolo e descrizione arrivano dal pannello; se mancano si usa il titolo della pagina.
 */
export function metadatiPagina(titolo: string, seo: Seo | undefined, percorso: string): Metadata {
  const titoloPagina = seo?.titolo || titolo;
  return {
    title: titoloPagina,
    ...(seo?.descrizione ? { description: seo.descrizione } : {}),
    alternates: { canonical: percorso },
    openGraph: {
      ...OPEN_GRAPH_BASE,
      title: `${titoloPagina} · ${NOME_SITO}`,
      ...(seo?.descrizione ? { description: seo.descrizione } : {}),
      url: percorso,
    },
  };
}
