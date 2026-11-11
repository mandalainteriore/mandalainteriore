import type { Metadata } from "next";
import type { Seo } from "@/data/pagine";

/** Titolo e descrizione per Google: quelli del pannello, altrimenti il titolo della pagina. */
export function metadatiPagina(titolo: string, seo?: Seo): Metadata {
  return {
    title: seo?.titolo || titolo,
    ...(seo?.descrizione ? { description: seo.descrizione } : {}),
  };
}
