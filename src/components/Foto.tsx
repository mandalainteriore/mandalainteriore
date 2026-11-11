import Image from "next/image";
import type { Foto as TipoFoto } from "@/data/pagine";

/** Foto che riempie il suo riquadro, rispettando il punto focale scelto nel pannello. */
export default function Foto({
  foto,
  sizes,
  className = "",
  priority = false,
}: {
  foto?: TipoFoto;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  if (!foto?.src) return null;
  return (
    <Image
      src={foto.src}
      alt={foto.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      style={foto.posizione ? { objectPosition: foto.posizione } : undefined}
    />
  );
}
