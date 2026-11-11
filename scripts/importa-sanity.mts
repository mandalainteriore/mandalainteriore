// Carica su Sanity i contenuti che oggi sono nel codice (src/data): pagine, mandala ed eventi, con le foto.
// Uso:  node --env-file=.env.local scripts/importa-sanity.mts
// Si può rilanciare senza rischi: non sovrascrive i documenti già presenti nel pannello.
import fs from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";
import { LexoRank } from "lexorank";
import { mandala } from "../src/data/mandala.ts";
import { eventi } from "../src/data/eventi.ts";
import * as pagine from "../src/data/pagine.ts";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("Manca SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: "7zhx02ln",
  dataset: "production",
  apiVersion: "2026-11-01",
  token,
  useCdn: false,
});

const caricate = new Map<string, string>();

async function caricaImmagine(percorso: string) {
  if (caricate.has(percorso)) return caricate.get(percorso)!;
  const file = path.join(process.cwd(), "public", percorso);
  // Sanity riconosce i file identici: ricaricare la stessa foto non crea doppioni.
  const asset = await client.assets.upload("image", fs.createReadStream(file), {
    filename: path.basename(file),
  });
  caricate.set(percorso, asset._id);
  return asset._id;
}

const immagine = (id: string) => ({ _type: "image", asset: { _type: "reference", _ref: id } });

const transazione = client.transaction();

let rank = LexoRank.middle();
for (const m of mandala) {
  const file = path.join(process.cwd(), "public", m.immagine);
  if (!fs.existsSync(file)) {
    console.warn("Salto (foto mancante):", m.titolo);
    continue;
  }
  const nome = path.basename(m.immagine, path.extname(m.immagine));
  transazione.createIfNotExists({
    _id: `mandala-${nome}`,
    _type: "mandala",
    orderRank: rank.toString(),
    titolo: m.titolo,
    ...(m.descrizione ? { descrizione: m.descrizione } : {}),
    immagine: immagine(await caricaImmagine(m.immagine)),
  });
  rank = rank.genNext().genNext();
  console.log("Mandala:", m.titolo);
}

for (const e of eventi) {
  transazione.createIfNotExists({
    _id: `evento-${e.slug}`,
    _type: "evento",
    titolo: e.titolo,
    slug: { _type: "slug", current: e.slug },
    data: e.data,
    luogo: e.luogo,
    descrizione: e.descrizione,
    immagine: immagine(await caricaImmagine(e.immagine)),
    contenuto: e.contenuto,
  });
  console.log("Evento:", e.titolo);
}

// ——— Pagine ———

// Nome del tipo per ogni elenco di riquadri (serve a Sanity per riconoscerli).
const TIPO_VOCE: Record<string, string> = {
  valori: "valore",
  elenco: "studio",
  percorsi: "percorso",
  voci: "voce",
  sezioni: "sezione",
};

let numero = 0;
const nuovaChiave = () => `i${(numero++).toString(36)}`;

// Trasforma i contenuti di riserva nel formato di Sanity: le foto diventano immagini caricate,
// i riquadri degli elenchi ricevono tipo e chiave.
async function perSanity(valore: unknown, campo = ""): Promise<unknown> {
  if (Array.isArray(valore)) {
    return Promise.all(
      valore.map(async (voce) => {
        const convertita = await perSanity(voce);
        if (typeof convertita !== "object" || convertita === null) return convertita;
        const oggetto = convertita as Record<string, unknown>;
        return {
          _key: oggetto._key ?? nuovaChiave(),
          ...(oggetto._type ? {} : { _type: TIPO_VOCE[campo] }),
          ...oggetto,
        };
      }),
    );
  }
  if (typeof valore === "object" && valore !== null) {
    const oggetto = valore as Record<string, unknown>;
    if (typeof oggetto.src === "string" && "alt" in oggetto) {
      const sfondo = campo === "sfondo" || campo === "sfondoMobile";
      const posizione = typeof oggetto.posizione === "string" ? oggetto.posizione.match(/(\d+)% (\d+)%/) : null;
      return {
        _type: sfondo ? "sfondo" : "foto",
        asset: { _type: "reference", _ref: await caricaImmagine(oggetto.src) },
        ...(sfondo || !oggetto.alt ? {} : { alt: oggetto.alt }),
        ...(posizione
          ? {
              hotspot: {
                _type: "sanity.imageHotspot",
                x: Number(posizione[1]) / 100,
                y: Number(posizione[2]) / 100,
                width: 1,
                height: 1,
              },
            }
          : {}),
      };
    }
    const risultato: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(oggetto)) risultato[k] = await perSanity(v, k);
    return risultato;
  }
  return valore;
}

const documenti: [string, string, unknown][] = [
  ["homepage", "homepage", pagine.homepage],
  ["laMiaStoria", "laMiaStoria", pagine.laMiaStoria],
  ["percorsi", "percorsi", pagine.percorsi],
  ["paginaMandala", "paginaMandala", pagine.paginaMandala],
  ["contatti", "contatti", pagine.contatti],
  ["impostazioni", "impostazioni", pagine.impostazioni],
  ["privacy", "privacy", pagine.privacy],
  ...Object.entries(pagine.chiavi).map(([id, c]) => [id, "chiave", c] as [string, string, unknown]),
];

for (const [id, tipo, contenuto] of documenti) {
  const corpo = (await perSanity(contenuto)) as Record<string, unknown>;
  transazione.createIfNotExists({ _id: id, _type: tipo, ...corpo });
  console.log("Pagina:", id);
}

await transazione.commit();
console.log("Fatto: contenuti pubblicati su Sanity.");
