// Lettura delle pagine uniche da Sanity. Se la pagina non è ancora pubblicata
// o Sanity non risponde, si usano i contenuti attuali (src/data/pagine.ts).
import { cache } from "react";
import { ETICHETTA_CACHE, client } from "./client";
import { urlImmagine } from "./image";
import * as riserva from "@/data/pagine";
import type { Chiave, Foto, IdChiave } from "@/data/pagine";
import type { Simbolo } from "@/components/KeyIcon";

// Il webhook (/api/revalidate) aggiorna il sito appena si pubblica;
// in ogni caso i contenuti vengono ricontrollati almeno ogni minuto.
// In sviluppo niente cache: ogni modifica pubblicata si vede ricaricando la pagina.
const AGGIORNAMENTO = process.env.NODE_ENV === "development" ? 0 : 60;

type ImmagineSanity = {
  asset: { _ref: string };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: unknown;
};

function eImmagine(valore: unknown): valore is ImmagineSanity {
  return (
    typeof valore === "object" &&
    valore !== null &&
    typeof (valore as ImmagineSanity).asset?._ref === "string"
  );
}

// Le immagini di Sanity diventano { src, alt, posizione }, come quelle di riserva.
function converti(valore: unknown): unknown {
  if (Array.isArray(valore)) return valore.map(converti).filter((v) => v !== undefined);
  if (eImmagine(valore)) {
    const foto: Foto = { src: urlImmagine(valore), alt: valore.alt ?? "" };
    if (valore.hotspot) {
      foto.posizione = `${Math.round(valore.hotspot.x * 100)}% ${Math.round(valore.hotspot.y * 100)}%`;
    }
    return foto;
  }
  if (typeof valore === "object" && valore !== null) {
    // Un'immagine senza file (ad esempio appena rimossa) viene tolta del tutto.
    if (TIPI_IMMAGINE.has((valore as { _type?: string })._type ?? "")) return undefined;
    return Object.fromEntries(
      Object.entries(valore)
        .map(([k, v]) => [k, converti(v)])
        .filter(([, v]) => v !== null && v !== undefined),
    );
  }
  return valore;
}

const TIPI_IMMAGINE = new Set(["foto", "sfondo", "image"]);

const QUERY = `*[_id == $id][0]`;

const leggiDocumento = cache(async (id: string): Promise<unknown | null> => {
  try {
    return await client.fetch(QUERY, { id }, { next: { revalidate: AGGIORNAMENTO, tags: [ETICHETTA_CACHE, id] } });
  } catch (errore) {
    console.error(`Sanity non raggiungibile (${id}), uso i contenuti di riserva:`, errore);
    return null;
  }
});

async function leggiPagina<T>(id: string, predefinito: T): Promise<T> {
  const documento = await leggiDocumento(id);
  return documento ? (converti(documento) as T) : predefinito;
}

export const leggiHomepage = () => leggiPagina("homepage", riserva.homepage);
export const leggiLaMiaStoria = () => leggiPagina("laMiaStoria", riserva.laMiaStoria);
export const leggiPercorsi = () => leggiPagina("percorsi", riserva.percorsi);
export const leggiPaginaMandala = () => leggiPagina("paginaMandala", riserva.paginaMandala);
export const leggiContatti = () => leggiPagina("contatti", riserva.contatti);
export const leggiImpostazioni = () => leggiPagina("impostazioni", riserva.impostazioni);
export const leggiPrivacy = () => leggiPagina("privacy", riserva.privacy);

// Indirizzo e simbolo di ogni chiave restano fissi: si modificano solo i contenuti.
export const CHIAVI: Record<IdChiave, { href: string; simbolo: Simbolo }> = {
  "chiave-counseling": { href: "/counseling-transpersonale", simbolo: "fiore-della-vita" },
  "chiave-yoga": { href: "/yoga-anukalana-meditazione", simbolo: "pentagramma" },
  "chiave-mandala": { href: "/mandala-creativita-consapevole", simbolo: "esagramma" },
};

export const leggiChiave = (id: IdChiave) => leggiPagina<Chiave>(id, riserva.chiavi[id]);

export async function leggiChiavi() {
  const ids = Object.keys(CHIAVI) as IdChiave[];
  const chiavi = await Promise.all(ids.map(leggiChiave));
  return chiavi.map((chiave, i) => ({ ...chiave, ...CHIAVI[ids[i]] }));
}
