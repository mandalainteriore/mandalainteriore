import type { Simbolo } from "@/components/KeyIcon";

export type Chiave = {
  titolo: string;
  /** Testo delle card in homepage */
  descrizione: string;
  /** Riassunto di una riga per le pillole nella pagina Percorsi */
  sintesi: string;
  href: string;
  simbolo: Simbolo;
};

export const chiavi: Chiave[] = [
  {
    titolo: "Counseling transpersonale",
    descrizione:
      "Uno spazio di ascolto autentico per comprenderti, sciogliere i blocchi interiori e ritrovare il tuo centro.",
    sintesi: "Ascolto e parola per sciogliere i blocchi e ritrovare il tuo centro.",
    href: "/counseling-transpersonale",
    simbolo: "fiore-della-vita",
  },
  {
    titolo: "Yoga Anukalana e meditazione",
    descrizione:
      "Movimento, respiro e presenza si uniscono per riportare equilibrio, vitalità e armonia nella tua vita.",
    sintesi: "Movimento, respiro e presenza per ritrovare equilibrio e armonia.",
    href: "/yoga-anukalana-meditazione",
    simbolo: "pentagramma",
  },
  {
    titolo: "Mandala – arteterapia",
    descrizione:
      "Colori, simboli e geometrie sacre diventano strumenti per dare forma al tuo mondo interiore e favorire la trasformazione.",
    sintesi: "Colori e simboli per dare forma al tuo mondo interiore.",
    href: "/mandala-arteterapia",
    simbolo: "esagramma",
  },
];
