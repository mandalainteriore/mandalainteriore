import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/mandala-arteterapia",
        destination: "/mandala-creativita-consapevole",
        permanent: true,
      },
    ];
  },
  images: {
    // In sviluppo serve le immagini originali, così un file sostituito in /public
    // si vede subito; in produzione restano ottimizzate.
    unoptimized: process.env.NODE_ENV === "development",
    // Immagini caricate dalla cliente nel pannello di Sanity
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/7zhx02ln/**" }],
  },
};

export default nextConfig;
