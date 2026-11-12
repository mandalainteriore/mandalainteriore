import type { MetadataRoute } from "next";
import { URL_SITO } from "@/lib/sito";

export default function robots(): MetadataRoute.Robots {
  return {
    // Il pannello di gestione e gli indirizzi tecnici non vanno nei risultati di ricerca.
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
    sitemap: `${URL_SITO}/sitemap.xml`,
  };
}
