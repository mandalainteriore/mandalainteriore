import type { Metadata } from "next";
import MandalaLogo from "@/components/MandalaLogo";
import SiteFooter from "@/components/SiteFooter";
import MandalaGallery from "@/components/MandalaGallery";
import SfondoResponsive from "@/components/SfondoResponsive";
import Divider from "@/components/Divider";
import fs from "node:fs";
import path from "node:path";
import { mandala } from "@/data/mandala";

export const metadata: Metadata = {
  title: "Mandala",
  description:
    "La galleria dei mandala di Roxana Zlate: opere uniche nate da un cammino interiore. Puoi scegliere un mandala o chiederne uno personalizzato.",
};

export default function Mandala() {
  // Mostra solo i mandala la cui foto è davvero presente in /public.
  const mandalaPresenti = mandala.filter((m) =>
    fs.existsSync(path.join(process.cwd(), "public", m.immagine)),
  );

  return (
    <>
      <main className="relative flex h-[90svh] flex-col items-center justify-center overflow-hidden">
        <SfondoResponsive src="/sfondo_mandala.jpg" srcMobile="/sfondo_mandala_mobile.jpg" classeSenzaMobile="object-[15%_center] md:object-center" priority />

        <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight text-center px-6">
          Mandala
        </h1>
      </main>

      <section className="flex flex-col items-center gap-10 px-6 pt-16 md:pt-24 pb-16 text-center">
        <div className="font-body flex max-w-xl flex-col gap-3">
          <p className="italic text-[1.375rem] leading-snug md:text-2xl">
            Ogni mandala è un frammento di un cammino, una storia che ha preso
            forma.
          </p>
          <p className="text-lg">
            Nel cerchio, il Sé si manifesta come un viaggio verso il centro, dove
            l&rsquo;anima si ricompone e ritrova l&rsquo;unità dell&rsquo;essere.
          </p>
        </div>

        <Divider className="text-heading h-4 w-40" />

        <p className="font-body mb-6 max-w-xl text-lg">
          Puoi scegliere il mandala che più risuona con te oppure chiedere una
          creazione personalizzata, un&rsquo;opera unica che prende forma dalla
          tua storia, dalla tua energia e dal tuo cammino.
        </p>

        <MandalaGallery mandala={mandalaPresenti} />
      </section>

      <section className="flex flex-col items-center gap-6 px-6 pt-8 pb-16 md:pb-24 text-center">
        <MandalaLogo className="text-logo h-20 w-auto" />
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-tight">
          Il tuo viaggio può iniziare ora
        </h2>
        <p className="font-body italic text-xl max-w-md">
          La trasformazione inizia da una porta che scegli di aprire.
        </p>
        <a
          href="/contatti"
          className="font-heading bg-heading text-background hover:bg-transparent hover:text-heading border-heading mt-2 rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
        >
          Inizia il tuo viaggio
        </a>
      </section>

      <SiteFooter />
    </>
  );
}
