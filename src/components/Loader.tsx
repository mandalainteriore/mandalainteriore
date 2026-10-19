"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MandalaLogo from "./MandalaLogo";

// Oltre questo tempo il loader sparisce comunque, anche se qualche immagine è lenta.
const ATTESA_MASSIMA = 4000;

function attendi(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Aspetta i font e le immagini visibili nel primo schermo.
async function contenutoPronto() {
  await attendi(0);
  const visibili = Array.from(document.images).filter((img) => {
    const r = img.getBoundingClientRect();
    return r.width > 0 && r.top < window.innerHeight && r.bottom > 0;
  });
  await Promise.all([
    document.fonts.ready,
    ...visibili.map((img) => {
      // Le immagini "lazy" già visibili partono subito invece di aspettare.
      img.loading = "eager";
      return img.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          });
    }),
  ]);
}

export default function Loader() {
  const pathname = usePathname();
  const [visibile, setVisibile] = useState(true);

  // A ogni pagina (anche la prima) nasconde il loader quando il contenuto è pronto.
  useEffect(() => {
    let annullato = false;
    Promise.race([contenutoPronto(), attendi(ATTESA_MASSIMA)]).then(() => {
      if (!annullato) setVisibile(false);
    });
    return () => {
      annullato = true;
    };
  }, [pathname]);

  // Mostra il loader appena si clicca un link verso un'altra pagina del sito,
  // così la nuova pagina non compare con le immagini ancora vuote.
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      setVisibile(true);
      // Sicurezza nel caso la navigazione non avvenga.
      setTimeout(() => {
        if (window.location.pathname !== url.pathname) setVisibile(false);
      }, ATTESA_MASSIMA);
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <div
      aria-hidden={!visibile}
      role="status"
      aria-label="Caricamento"
      className={`bg-background fixed inset-0 z-[60] flex items-center justify-center transition-[opacity,visibility] duration-500 ${
        visibile ? "loader-sicurezza visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <MandalaLogo className="text-logo h-28 w-auto animate-pulse motion-reduce:animate-none" />
    </div>
  );
}
