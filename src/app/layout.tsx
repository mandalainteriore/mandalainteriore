import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import { URL_SITO } from "@/lib/sito";
import { OPEN_GRAPH_BASE } from "@/lib/metadati";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Mandala Interiore - Roxana Zlate",
    template: "%s · Mandala Interiore - Roxana Zlate",
  },
  description:
    "Percorsi di Counseling Transpersonale e Biotransenergetica, Mandala, Yoga Anukalana e Meditazione con Roxana Zlate, per ritrovare il tuo centro.",
  metadataBase: new URL(URL_SITO),
  openGraph: OPEN_GRAPH_BASE,
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${cinzel.variable} ${cormorantGaramond.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
