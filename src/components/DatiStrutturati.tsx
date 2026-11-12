/**
 * Dati strutturati (JSON-LD) per Google: descrivono sito, persona ed eventi
 * in un formato che i motori di ricerca leggono direttamente.
 */
export default function DatiStrutturati({ dati }: { dati: object }) {
  return (
    <script
      type="application/ld+json"
      // "<" codificato: nessun testo dei contenuti può chiudere il tag script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dati).replace(/</g, "\u003c") }}
    />
  );
}
