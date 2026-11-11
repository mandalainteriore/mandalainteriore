// Dati pubblici del progetto Sanity (non sono segreti: servono anche al browser).
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "7zhx02ln";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
// Data fissa: Sanity garantisce che le risposte non cambino forma per questa versione.
export const apiVersion = "2026-11-01";
