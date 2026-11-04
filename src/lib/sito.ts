// Indirizzo pubblico del sito, usato per anteprime social, sitemap e robots.txt.
// Ordine di priorità:
// 1. NEXT_PUBLIC_SITE_URL, da impostare con il dominio definitivo (es. https://mandalainteriore.it)
// 2. URL, fornita in automatico da Netlify (indirizzo principale del sito)
// 3. VERCEL_PROJECT_PRODUCTION_URL, fornita in automatico da Vercel
// 4. localhost in sviluppo
export const URL_SITO =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
