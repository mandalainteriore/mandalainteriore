import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
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

export const metadata: Metadata = {
  title: {
    default: "Mandala Interiore - Roxana Zlate",
    template: "%s · Mandala Interiore - Roxana Zlate",
  },
  description: "Mandala Interiore",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${cinzel.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Loader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
