import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // In sviluppo serve le immagini originali, così un file sostituito in /public
    // si vede subito; in produzione restano ottimizzate.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
