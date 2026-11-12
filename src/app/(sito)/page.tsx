import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PortaEntra from "@/components/PortaEntra";
import KeyIcon from "@/components/KeyIcon";
import Divider from "@/components/Divider";
import SiteFooter from "@/components/SiteFooter";
import EventiGrid from "@/components/EventiGrid";
import Foto from "@/components/Foto";
import TestoRicco from "@/components/TestoRicco";
import InvitoFinale from "@/components/InvitoFinale";
import { leggiEventi } from "@/sanity/contenuti";
import { leggiChiavi, leggiContatti, leggiHomepage, leggiImpostazioni } from "@/sanity/pagine";
import DatiStrutturati from "@/components/DatiStrutturati";
import { datiSito } from "@/lib/datiStrutturati";
import { OPEN_GRAPH_BASE } from "@/lib/metadati";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await leggiHomepage();
  const titolo = seo?.titolo || "Mandala Interiore - Roxana Zlate";
  return {
    title: { absolute: titolo },
    ...(seo?.descrizione ? { description: seo.descrizione } : {}),
    alternates: { canonical: "/" },
    openGraph: {
      ...OPEN_GRAPH_BASE,
      title: titolo,
      ...(seo?.descrizione ? { description: seo.descrizione } : {}),
      url: "/",
    },
  };
}

export default async function Home() {
  const [pagina, eventi, chiavi, impostazioni, contatti] = await Promise.all([
    leggiHomepage(),
    leggiEventi(),
    leggiChiavi(),
    leggiImpostazioni(),
    leggiContatti(),
  ]);
  const { motto } = impostazioni;
  const { hero, storia, mandala } = pagina;

  return (
    <>
      <DatiStrutturati
        dati={datiSito({
          descrizione: pagina.seo?.descrizione,
          contatti,
          impostazioni,
          foto: pagina.storia.foto?.src,
        })}
      />
      <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden pt-28 pb-32">
        <Image
          src="/sfondo_pergamena.jpg"
          alt=""
          fill
          priority
          className="object-cover -z-10"
        />

        <section className="flex flex-col items-center gap-4 text-center px-6">
          <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight">
            {hero.titolo}
          </h1>
          {hero.sottotitolo && (
            <p className="text-heading flex items-center gap-4">
              <span aria-hidden="true" className="bg-heading/40 h-px w-10 sm:w-16" />
              <span className="font-script text-3xl sm:text-4xl">{hero.sottotitolo}</span>
              <span aria-hidden="true" className="bg-heading/40 h-px w-10 sm:w-16" />
            </p>
          )}
          <div className="font-body mt-3 flex max-w-xl flex-col gap-3">
            {motto && <p className="italic text-lg sm:text-xl">{motto}</p>}
            <TestoRicco valore={hero.testo} classe="text-base sm:text-lg" />
          </div>
        </section>

        <PortaEntra href="#eventi" />
      </main>

      <section
        id="eventi"
        className="flex flex-col items-center gap-8 px-6 pt-10 pb-12 text-center md:pt-12"
      >
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-tight">
            {pagina.eventi.titolo}
          </h2>
          {pagina.eventi.frase && (
            <p className="font-body italic text-xl max-w-md">{pagina.eventi.frase}</p>
          )}
        </div>

        <Divider className="text-heading h-4 w-40" />

        <EventiGrid eventi={eventi} />
      </section>

      <section
        id="percorso"
        className="flex flex-col items-center gap-8 px-6 pt-16 pb-16 md:pt-20 md:pb-24 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-heading text-heading max-w-xl text-3xl font-semibold tracking-tight">
            {pagina.chiavi.titolo}
          </h2>
          <div className="font-body text-lg max-w-xl">
            {pagina.chiavi.frase && <p className="mb-3 italic">{pagina.chiavi.frase}</p>}
            <TestoRicco valore={pagina.chiavi.testo} />
          </div>
        </div>

        <Divider className="text-heading h-4 w-40" />

        {/* Righe centrate: su tablet (due per riga) la terza chiave sta al centro, non da sola a sinistra. */}
        <div className="flex w-full max-w-4xl flex-wrap justify-center gap-10 sm:gap-12 lg:gap-14 [&>*]:w-full sm:[&>*]:w-[calc((100%-3rem)/2)] lg:[&>*]:w-[calc((100%-7rem)/3)]">
          {chiavi.map((chiave) => (
            <Link
              key={chiave.href}
              href={chiave.href}
              className="group border-heading/20 flex cursor-pointer flex-col items-center gap-3 rounded-lg border bg-[url(/sfondo_card.jpg)] bg-cover bg-center px-5 py-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-heading/50 hover:shadow-lg"
            >
              <KeyIcon simbolo={chiave.simbolo} className="text-heading h-20 w-auto transition-transform duration-300 group-hover:scale-110" />
              <div className="flex flex-col items-center gap-1">
                <h3 className="font-heading text-heading text-sm font-semibold uppercase tracking-[0.03em]">
                  {chiave.titolo}
                </h3>
                {chiave.sottotitolo && (
                  <p className="font-body text-heading text-lg font-semibold italic">{chiave.sottotitolo}</p>
                )}
              </div>
              <p className="font-body text-base max-w-52">
                {chiave.descrizione}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="storia"
        className="grid grid-cols-1 items-center justify-items-center gap-8 px-6 py-16 md:h-screen md:grid-cols-2 md:overflow-hidden md:py-8 md:portrait:h-auto md:portrait:py-24 md:gap-6 md:px-16"
      >
        <div className="border-heading/20 relative aspect-[4/5] h-72 shrink-0 overflow-hidden rounded-lg border md:h-96">
          <Foto foto={storia.foto} sizes="(min-width: 768px) 308px, 230px" />
        </div>
        <div className="flex max-w-md flex-col items-start gap-4 text-left">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
            {storia.titolo}
          </h2>
          {storia.frase && <p className="font-body italic text-xl">{storia.frase}</p>}
          <TestoRicco valore={storia.testo} classe="font-body text-lg" />

          <div className="mt-2 flex flex-wrap gap-4">
            <a
              href="/la-mia-storia"
              className="font-heading text-heading border-heading hover:bg-heading hover:text-background rounded-full border px-6 py-2 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
            >
              La mia storia
            </a>
            <a
              href="#percorso"
              className="font-heading bg-heading text-background border-heading hover:bg-transparent hover:text-heading rounded-full border px-6 py-2 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
            >
              Percorsi
            </a>
          </div>
        </div>
      </section>

      <section
        id="mandala"
        className="grid grid-cols-1 items-center justify-items-center gap-8 px-6 py-16 md:h-screen md:grid-cols-2 md:overflow-hidden md:py-8 md:portrait:h-auto md:portrait:py-24 md:gap-6 md:px-16"
      >
        <div className="order-2 flex max-w-md flex-col items-start gap-4 text-left md:order-1">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-tight">
            {mandala.titolo}
          </h2>
          {mandala.frase && <p className="font-body italic text-xl">{mandala.frase}</p>}
          <TestoRicco valore={mandala.testo} classe="font-body text-lg" />

          <a
            href="/mandala"
            className="font-heading text-heading border-heading hover:bg-heading hover:text-background mt-2 rounded-full border px-6 py-2 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
          >
            Mandala
          </a>
        </div>

        <div className="border-heading/20 bg-heading/5 relative order-1 h-56 w-56 shrink-0 overflow-hidden rounded-full border md:order-2 md:h-80 md:w-80">
          <Foto foto={mandala.foto} sizes="(min-width: 768px) 320px, 224px" />
        </div>
      </section>

      <InvitoFinale invito={pagina.invito} />

      <SiteFooter />
    </>
  );
}
