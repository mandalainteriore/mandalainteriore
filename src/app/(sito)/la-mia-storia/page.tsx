import type { Metadata } from "next";
import PillarIcon from "@/components/PillarIcon";
import SiteFooter from "@/components/SiteFooter";
import Apertura from "@/components/Apertura";
import Foto from "@/components/Foto";
import TestoRicco from "@/components/TestoRicco";
import InvitoFinale from "@/components/InvitoFinale";
import { leggiLaMiaStoria } from "@/sanity/pagine";
import { metadatiPagina } from "@/lib/metadati";

// Un'icona per principio, nell'ordine.
const ICONE = ["accoglienza", "ascolto", "trasformazione"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const pagina = await leggiLaMiaStoria();
  return metadatiPagina(pagina.hero.titolo, pagina.seo, "/la-mia-storia");
}

export default async function LaMiaStoria() {
  const { hero, primoBlocco, secondoBlocco, approccio, studi, invito } = await leggiLaMiaStoria();

  return (
    <>
      <Apertura titolo={hero.titolo} sfondo={hero.sfondo} sfondoMobile={hero.sfondoMobile} />

      <section className="flex flex-col items-center gap-10 px-6 pt-16 md:pt-24 pb-12 md:flex-row md:justify-center md:gap-20 md:px-16">
        <div className="border-heading/20 bg-heading/5 relative aspect-[4/5] w-full max-w-xs shrink-0 overflow-hidden rounded-lg border">
          <Foto foto={primoBlocco.foto} sizes="320px" />
        </div>

        <div className="flex max-w-md flex-col items-start gap-4 text-left">
          <TestoRicco valore={primoBlocco.testo} classe="font-body text-lg" />
        </div>
      </section>

      <section className="flex flex-col items-center gap-10 px-6 pt-16 md:pt-24 pb-12 md:flex-row md:justify-center md:gap-20 md:px-16">
        <div className="order-2 flex max-w-md flex-col items-start gap-4 text-left md:order-1">
          <TestoRicco valore={secondoBlocco.testo} classe="font-body text-lg" />
        </div>

        <div className="order-1 md:order-2 border-heading/20 bg-heading/5 relative aspect-[4/5] w-full max-w-xs shrink-0 overflow-hidden rounded-lg border">
          <Foto foto={secondoBlocco.foto} sizes="320px" />
        </div>
      </section>

      <section className="flex flex-col items-center gap-14 px-6 pt-12 pb-16 md:pb-24 text-center">
        <div className="flex flex-col items-center gap-3">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
            {approccio.titolo}
          </h2>
          {approccio.frase && <p className="font-body italic text-xl max-w-xl">{approccio.frase}</p>}
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 max-w-4xl">
          {(approccio.valori ?? []).map((valore, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <PillarIcon variant={ICONE[i % ICONE.length]} className="text-heading h-14 w-14" />
              <h3 className="font-heading text-heading text-sm font-semibold uppercase tracking-[0.03em]">
                {valore.titolo}
              </h3>
              <p className="font-body text-base max-w-64">{valore.descrizione}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-10 px-6 pt-12 pb-16 md:pb-24 md:flex-row md:justify-center md:gap-20 md:px-16">
        <div className="order-2 flex max-w-md flex-col items-start gap-4 text-left md:order-1">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
            {studi.titolo}
          </h2>
          {studi.frase && <p className="font-body italic text-xl">{studi.frase}</p>}
          <ul className="font-body flex flex-col gap-4 text-lg">
            {(studi.elenco ?? []).map((studio, i) => (
              <li key={i} className="flex flex-col">
                <span className="font-heading text-heading text-sm font-semibold tracking-[0.03em]">
                  {studio.anni}
                </span>
                <span>{studio.titolo}</span>
                {studio.dove && <span className="italic">{studio.dove}</span>}
              </li>
            ))}
          </ul>
          <TestoRicco valore={studi.testo} classe="font-body text-lg" />
        </div>

        <div className="order-1 md:order-2 border-heading/20 bg-heading/5 relative aspect-[4/5] w-full max-w-xs shrink-0 overflow-hidden rounded-lg border">
          <Foto foto={studi.foto} sizes="320px" />
        </div>
      </section>

      <InvitoFinale invito={invito} />

      <SiteFooter />
    </>
  );
}
