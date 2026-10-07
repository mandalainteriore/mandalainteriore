import fs from "node:fs";
import path from "node:path";
import Image, { getImageProps } from "next/image";

function esisteInPublic(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * Immagine di sfondo a tutto riquadro (hero, footer). Se `srcMobile` esiste in /public,
 * su telefono (sotto i 768px) mostra quella; altrimenti ritaglia `src`.
 * - `className`: sempre applicata (es. object-bottom)
 * - `classeSenzaMobile`: applicata solo quando manca l'immagine mobile,
 *   per spostare il ritaglio di `src` sul telefono
 */
export default function SfondoResponsive({
  src,
  srcMobile,
  className = "",
  classeSenzaMobile = "",
  priority = false,
}: {
  src: string;
  srcMobile?: string;
  className?: string;
  classeSenzaMobile?: string;
  priority?: boolean;
}) {
  if (!srcMobile || !esisteInPublic(srcMobile)) {
    return (
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        className={`object-cover -z-10 ${className} ${classeSenzaMobile}`}
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

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source srcSet={mobile} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...rest} className={`object-cover -z-10 ${className}`} />
    </picture>
  );
}
