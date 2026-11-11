import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

type SorgenteImmagine = Parameters<typeof builder.image>[0];

// Indirizzo dell'immagine originale sulla CDN di Sanity (next/image poi la ridimensiona).
export function urlImmagine(sorgente: SorgenteImmagine) {
  return builder.image(sorgente).auto("format").url();
}
