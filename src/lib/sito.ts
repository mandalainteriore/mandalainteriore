// Indirizzo pubblico del sito, usato per indirizzi canonici, anteprime social, sitemap e robots.txt.
const DOMINIO = "https://mandalainteriore.it";

// Ordine di priorità:
// 1. NEXT_PUBLIC_SITE_URL, se impostata sull'hosting
// 2. il dominio definitivo, per il sito pubblicato su Vercel
// 3. l'indirizzo provvisorio delle anteprime di Vercel
// 4. localhost in sviluppo
export const URL_SITO =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_ENV === "production"
    ? DOMINIO
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
