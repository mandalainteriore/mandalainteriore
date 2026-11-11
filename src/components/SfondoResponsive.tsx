import fs from "node:fs";
import path from "node:path";
import Image, { getImageProps } from "next/image";

// Le immagini di Sanity (indirizzi https) esistono sempre; quelle locali vanno cercate in /public.
function esiste(src: string) {
  return !src.startsWith("/") || fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * Immagine di sfondo a tutto riquadro (hero, footer). Se `srcMobile` esiste in /public,
 * su telefono (sotto i 768px) mostra quella; altrimenti ritaglia `src`.
 * - `className`: sempre applicata (es. object-bottom)
 * - `classeSenzaMobile`: applicata solo quando manca l'immagine mobile,
 *   per spostare il ritaglio di `src` sul telefono
 * - `posizione` / `posizioneMobile`: punto focale scelto nel pannello (es. "50% 30%")
 */
export default function SfondoResponsive({
  src,
  srcMobile,
  className = "",
  classeSenzaMobile = "",
  priority = false,
  posizione,
  posizioneMobile,
}: {
  src: string;
  srcMobile?: string;
  className?: string;
  classeSenzaMobile?: string;
  priority?: boolean;
  posizione?: string;
  posizioneMobile?: string;
}) {
  if (!srcMobile || !esiste(srcMobile)) {
    return (
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        className={`object-cover -z-10 ${className} ${classeSenzaMobile}`}
        style={posizione ? { objectPosition: posizione } : undefined}
      />
    );
  }

  const comuni = { alt: "", fill: true, sizes: "100vw", priority };
  // Con le immagini non ottimizzate (in sviluppo) srcSet è vuoto: si ripiega su src.
  const { props: desktopProps } = getImageProps({ ...comuni, src });
  const desktop = desktopProps.srcSet || desktopProps.src;
  const {
    props: { srcSet, ...rest },
  } = getImageProps({ ...comuni, src: srcMobile });
  const mobile = srcSet || rest.src;

  // Il punto focale passa da una variabile CSS, così cambia insieme all'immagine.
  const stile = {
    ...rest.style,
    "--pos-mobile": posizioneMobile ?? "50% 50%",
    "--pos-desktop": posizione ?? "50% 50%",
  } as React.CSSProperties;

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source srcSet={mobile} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        {...rest}
        style={stile}
        className={`object-cover -z-10 ${posizione || posizioneMobile ? "[object-position:var(--pos-mobile)] md:[object-position:var(--pos-desktop)]" : ""} ${className}`}
      />
    </picture>
  );
}
