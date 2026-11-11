"use client";

import { useEffect, useState } from "react";
import MandalaLogo from "@/components/MandalaLogo";

/** Evento lanciato dal pannello quando ha finito di caricarsi (vedi LayoutStudio). */
export const STUDIO_PRONTO = "studio-pronto";

// Oltre questo tempo il loader sparisce comunque.
const ATTESA_MASSIMA = 15000;

/**
 * Loader del sito (il loto che pulsa) mostrato mentre il pannello si avvia.
 * Sparisce quando il pannello è pronto, oppure quando compare la schermata di accesso.
 */
export default function CaricamentoStudio() {
  const [visibile, setVisibile] = useState(true);

  useEffect(() => {
    const nascondi = () => setVisibile(false);
    window.addEventListener(STUDIO_PRONTO, nascondi);
    // La schermata di accesso non passa dal layout del pannello: la riconosciamo dai pulsanti
    // dei metodi di accesso.
    const osservatore = new MutationObserver(() => {
      if (document.querySelector('a[href*="/auth/login/"], a[href*="auth/login"]')) nascondi();
    });
    osservatore.observe(document.body, { childList: true, subtree: true });
    const timer = setTimeout(nascondi, ATTESA_MASSIMA);
    return () => {
      window.removeEventListener(STUDIO_PRONTO, nascondi);
      osservatore.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      aria-hidden={!visibile}
      role="status"
      aria-label="Caricamento del pannello"
      style={{ animationDelay: `${ATTESA_MASSIMA}ms` }}
      className={`bg-background fixed inset-0 z-[1000] flex items-center justify-center transition-[opacity,visibility] duration-500 ${
        visibile ? "loader-sicurezza visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <MandalaLogo className="text-logo h-28 w-auto animate-pulse motion-reduce:animate-none" />
    </div>
  );
}
