import type { Impostazioni } from "@/data/pagine";

/** Icone di Instagram e Facebook: compaiono solo i profili indicati nel pannello. */
export default function IconeSocial({
  social,
  classeIcona,
}: {
  social: Impostazioni;
  classeIcona: string;
}) {
  return (
    <div className="text-heading flex justify-center gap-4">
      {social.instagram && (
        <a
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:opacity-70 transition-opacity"
        >
          <svg viewBox="0 0 24 24" className={classeIcona} fill="none" stroke="currentColor" strokeWidth="1.3">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4.2" />
            <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
          </svg>
        </a>
      )}
      {social.facebook && (
        <a
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:opacity-70 transition-opacity"
        >
          <svg viewBox="0 0 24 24" className={classeIcona} fill="none" stroke="currentColor" strokeWidth="1.3">
            <circle cx="12" cy="12" r="9.5" />
            <path d="M14,8.5 h-1.5 a2,2 0 0 0 -2,2 V12 H8 v2.5 h2.5 V21 h2.5 v-6.5 H15 L15.3,12 H13 v-1.2 c0,-0.5 0.3,-0.8 0.8,-0.8 H14 Z" />
          </svg>
        </a>
      )}
    </div>
  );
}
