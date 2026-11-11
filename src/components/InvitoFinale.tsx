import MandalaLogo from "./MandalaLogo";
import type { Invito } from "@/data/pagine";

/** Riquadro in fondo alle pagine con il logo e il pulsante verso i contatti. */
export default function InvitoFinale({ invito }: { invito: Invito }) {
  return (
    <section className="flex flex-col items-center gap-6 px-6 pt-8 pb-16 md:pb-24 text-center">
      <MandalaLogo className="text-logo h-20 w-auto" />
      <h2 className="font-heading text-heading text-3xl font-semibold tracking-tight">
        {invito.titolo}
      </h2>
      {invito.frase && <p className="font-body italic text-xl max-w-md">{invito.frase}</p>}
      <a
        href="/contatti"
        className="font-heading bg-heading text-background hover:bg-transparent hover:text-heading border-heading mt-2 rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
      >
        {invito.pulsante}
      </a>
    </section>
  );
}
