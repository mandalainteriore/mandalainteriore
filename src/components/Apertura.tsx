import SfondoResponsive from "./SfondoResponsive";
import type { Foto } from "@/data/pagine";

/** Apertura a tutto schermo delle pagine interne: immagine di sfondo e titolo. */
export default function Apertura({
  titolo,
  sottotitolo,
  sfondo,
  sfondoMobile,
  classeSenzaMobile,
}: {
  titolo: string;
  sottotitolo?: string;
  sfondo?: Foto;
  sfondoMobile?: Foto;
  classeSenzaMobile?: string;
}) {
  // Su tablet in verticale lo schermo è molto alto: lì l'apertura è più bassa.
  return (
    <main className="relative flex h-[90svh] flex-col items-center justify-center overflow-hidden md:portrait:h-[70svh]">
      {sfondo?.src && (
        <SfondoResponsive
          src={sfondo.src}
          srcMobile={sfondoMobile?.src}
          posizione={sfondo.posizione}
          posizioneMobile={sfondoMobile?.posizione}
          classeSenzaMobile={classeSenzaMobile}
          priority
        />
      )}

      <div className="flex flex-col items-center gap-2 px-6 text-center">
        <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight">{titolo}</h1>
        {sottotitolo && <p className="font-body text-heading text-2xl italic">{sottotitolo}</p>}
      </div>
    </main>
  );
}
