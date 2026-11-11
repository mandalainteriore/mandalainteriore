import { mandala } from "./mandala";
import { evento } from "./evento";
import { foto, invito, seo, sfondo, testoRicco } from "./comuni";
import {
  chiave,
  contatti,
  homepage,
  impostazioni,
  laMiaStoria,
  paginaMandala,
  percorsi,
  privacy,
} from "./pagine";

export const tipi = [
  foto,
  sfondo,
  testoRicco,
  invito,
  seo,
  homepage,
  laMiaStoria,
  percorsi,
  chiave,
  paginaMandala,
  contatti,
  impostazioni,
  privacy,
  mandala,
  evento,
];

/** Pagine uniche: non si creano né si eliminano, si modificano soltanto. */
export const tipiUnici = new Set([
  "homepage",
  "laMiaStoria",
  "percorsi",
  "chiave",
  "paginaMandala",
  "contatti",
  "impostazioni",
  "privacy",
]);
