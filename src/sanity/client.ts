import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/** Etichetta di tutte le letture da Sanity: il webhook la usa per rinnovare la cache. */
export const ETICHETTA_CACHE = "sanity";

// Lettura pubblica dei contenuti pubblicati, senza token.
// Niente CDN di Sanity: la cache la gestisce già Next, e così dopo il webhook
// le pagine leggono subito la versione appena pubblicata.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
