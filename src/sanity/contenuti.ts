// Lettura dei contenuti da Sanity, con i dati attuali del sito come riserva:
// se Sanity non risponde, il sito mostra comunque i contenuti salvati nel codice.
import { defineQuery } from "next-sanity";
import { ETICHETTA_CACHE, client } from "./client";
import { mandala as mandalaLocali, type Mandala } from "@/data/mandala";
import { eventi as eventiLocali, type Evento } from "@/data/eventi";

// Il webhook (/api/revalidate) aggiorna il sito appena si pubblica;
// in ogni caso i contenuti vengono ricontrollati almeno ogni minuto.
// In sviluppo niente cache: ogni modifica pubblicata si vede ricaricando la pagina.
const AGGIORNAMENTO = process.env.NODE_ENV === "development" ? 0 : 60;

async function leggi<T>(query: string, params: Record<string, unknown>, riserva: T): Promise<T> {
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: AGGIORNAMENTO, tags: [ETICHETTA_CACHE] } });
  } catch (errore) {
    console.error("Sanity non raggiungibile, uso i contenuti di riserva:", errore);
    return riserva;
  }
}

// Punto focale scelto nel pannello → posizione CSS per i ritagli (es. "50% 30%").
const POSIZIONE = `select(defined(immagine.hotspot) => string(round(immagine.hotspot.x * 100)) + "% " + string(round(immagine.hotspot.y * 100)) + "%")`;

const QUERY_MANDALA = defineQuery(`*[_type == "mandala" && defined(immagine.asset)] | order(orderRank) {
  titolo,
  descrizione,
  "immagine": immagine.asset->url,
  "larghezza": immagine.asset->metadata.dimensions.width,
  "altezza": immagine.asset->metadata.dimensions.height,
  "posizione": ${POSIZIONE}
}`);

const CAMPI_EVENTO = `
  titolo,
  "slug": slug.current,
  descrizione,
  data,
  luogo,
  "immagine": immagine.asset->url,
  "posizione": ${POSIZIONE},
  "contenuto": coalesce(contenuto, [])
`;

const QUERY_EVENTI = defineQuery(
  `*[_type == "evento" && defined(slug.current) && defined(immagine.asset)] | order(data desc) {${CAMPI_EVENTO}}`,
);

type ConNull<T> = { [K in keyof T]: T[K] | null };

function pulisci<T extends object>(voce: ConNull<T>): T {
  return Object.fromEntries(Object.entries(voce).filter(([, v]) => v !== null)) as T;
}

export async function leggiMandala(): Promise<Mandala[]> {
  const voci = await leggi<ConNull<Mandala>[] | null>(QUERY_MANDALA, {}, null);
  return voci ? voci.map((v) => pulisci<Mandala>(v)) : mandalaLocali;
}

export async function leggiEventi(): Promise<Evento[]> {
  const voci = await leggi<ConNull<Evento>[] | null>(QUERY_EVENTI, {}, null);
  return voci ? voci.map((v) => pulisci<Evento>(v)) : eventiLocali;
}

export async function leggiEvento(slug: string) {
  const eventi = await leggiEventi();
  return eventi.find((evento) => evento.slug === slug);
}
