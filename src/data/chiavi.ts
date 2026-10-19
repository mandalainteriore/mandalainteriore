import type { Simbolo } from "@/components/KeyIcon";

export type Chiave = {
  titolo: string;
  /** Riga in corsivo sotto il titolo (facoltativa) */
  sottotitolo?: string;
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
    sottotitolo: "Biotransenergetica",
    descrizione:
      "Uno spazio autentico di consapevolezza per ritrovare il tuo centro e risvegliare le tue potenzialità più profonde.",
    sintesi:
      "Uno spazio autentico di consapevolezza per ritrovare il tuo centro e risvegliare le tue potenzialità più profonde.",
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
    titolo: "Mandala – Creatività consapevole",
    sottotitolo: "Geometrie sacre",
    descrizione:
      "Colori, simboli e geometrie sacre diventano strumenti per dare forma al tuo mondo interiore e favorire la trasformazione.",
    sintesi: "Colori e simboli per dare forma al tuo mondo interiore.",
    href: "/mandala-creativita-consapevole",
    simbolo: "esagramma",
  },
];
