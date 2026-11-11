import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import SiteFooter from "@/components/SiteFooter";
import MandalaGallery from "@/components/MandalaGallery";
import Divider from "@/components/Divider";
import Apertura from "@/components/Apertura";
import TestoRicco from "@/components/TestoRicco";
import InvitoFinale from "@/components/InvitoFinale";
import { leggiMandala } from "@/sanity/contenuti";
import { leggiPaginaMandala } from "@/sanity/pagine";
import { metadatiPagina } from "@/lib/metadati";

export async function generateMetadata(): Promise<Metadata> {
  const pagina = await leggiPaginaMandala();
  return metadatiPagina(pagina.hero.titolo, pagina.seo);
}

export default async function Mandala() {
  const [pagina, mandala] = await Promise.all([leggiPaginaMandala(), leggiMandala()]);
  // Le foto di riserva stanno in /public: mostra solo quelle davvero presenti.
  const mandalaPresenti = mandala.filter(
    (m) => !m.immagine.startsWith("/") || fs.existsSync(path.join(process.cwd(), "public", m.immagine)),
  );
  const { hero } = pagina;

  return (
    <>
      <Apertura
        titolo={hero.titolo}
        sfondo={hero.sfondo}
        sfondoMobile={hero.sfondoMobile}
        classeSenzaMobile="object-[15%_center] md:object-center"
      />

      <section className="flex flex-col items-center gap-10 px-6 pt-16 md:pt-24 pb-16 text-center">
        <div className="font-body flex max-w-xl flex-col gap-3">
          {pagina.frase && (
            <p className="italic text-[1.375rem] leading-snug md:text-2xl">{pagina.frase}</p>
          )}
          <TestoRicco valore={pagina.testo} classe="text-lg" />
        </div>

        <Divider className="text-heading h-4 w-40" />

        {pagina.testoGalleria?.length > 0 && (
          <div className="font-body mb-6 flex max-w-xl flex-col gap-3 text-lg">
            <TestoRicco valore={pagina.testoGalleria} />
          </div>
        )}

        <MandalaGallery mandala={mandalaPresenti} />
      </section>

      <InvitoFinale invito={pagina.invito} />

      <SiteFooter />
    </>
  );
}
