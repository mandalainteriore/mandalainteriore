import type { MetadataRoute } from "next";
import { leggiEventi } from "@/sanity/contenuti";
import { URL_SITO } from "@/lib/sito";

const pagine = [
  "",
  "/la-mia-storia",
  "/percorsi",
  "/mandala",
  "/counseling-transpersonale",
  "/yoga-anukalana-meditazione",
  "/mandala-creativita-consapevole",
  "/contatti",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const eventi = await leggiEventi();
  return [
    ...pagine.map((pagina) => ({
      url: `${URL_SITO}${pagina}`,
      priority: pagina === "" ? 1 : pagina === "/privacy" ? 0.3 : 0.8,
    })),
    ...eventi.map((evento) => ({
      url: `${URL_SITO}/eventi/${evento.slug}`,
      lastModified: evento.data,
      priority: 0.6,
    })),
  ];
}
