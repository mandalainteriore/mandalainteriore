import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import Divider from "@/components/Divider";
import KeyIcon from "@/components/KeyIcon";
import Apertura from "@/components/Apertura";
import Foto from "@/components/Foto";
import TestoRicco from "@/components/TestoRicco";
import InvitoFinale from "@/components/InvitoFinale";
import { leggiChiavi, leggiPercorsi } from "@/sanity/pagine";
import { metadatiPagina } from "@/lib/metadati";

// Elenco puntato con un piccolo rombo al posto del pallino.
function Elenco({ voci }: { voci: string[] }) {
  return (
    <ul className="font-body flex flex-col gap-2 text-lg">
      {voci.map((voce, i) => (
        <li key={i} className="flex items-baseline gap-3">
          <span aria-hidden="true" className="bg-heading size-1.5 shrink-0 -translate-y-0.5 rotate-45" />
          {voce}
        </li>
      ))}
    </ul>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const pagina = await leggiPercorsi();
  return metadatiPagina(pagina.hero.titolo, pagina.seo, "/percorsi");
}

export default async function Percorsi() {
  const [pagina, chiavi] = await Promise.all([leggiPercorsi(), leggiChiavi()]);
  const { hero } = pagina;

  return (
    <>
      <Apertura
        titolo={hero.titolo}
        sfondo={hero.sfondo}
        sfondoMobile={hero.sfondoMobile}
        classeSenzaMobile="object-[15%_center] md:object-center"
      />

      <section className="flex flex-col items-center gap-4 px-6 pt-16 md:pt-24 pb-12 text-center">
        {pagina.frase && (
          <p className="font-body max-w-2xl text-[1.375rem] leading-snug italic md:text-2xl">
            {pagina.frase}
          </p>
        )}

        <ul className="mt-4 mb-2 grid w-full max-w-4xl grid-cols-1 gap-4 lg:grid-cols-3">
          {chiavi.map((chiave) => (
            <li key={chiave.href}>
              <Link
                href={chiave.href}
                className="group border-heading/30 hover:border-heading/60 flex h-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-colors"
              >
                <KeyIcon
                  simbolo={chiave.simbolo}
                  className="text-heading h-14 w-auto shrink-0 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="flex flex-col gap-1">
                  <span className="font-heading text-heading text-xs font-semibold uppercase tracking-[0.03em]">
                    {chiave.titolo}
                  </span>
                  {chiave.sottotitolo && (
                    <span className="font-body text-heading -mt-1 text-base font-semibold italic">{chiave.sottotitolo}</span>
                  )}
                  <span className="font-body text-base leading-snug">{chiave.sintesi}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Divider className="text-heading h-4 w-40" />
      </section>

      {(pagina.percorsi ?? []).map((percorso, i) => {
        // Si alternano: foto a sinistra, poi a destra (su telefono la foto è sempre sopra).
        const fotoADestra = i % 2 === 1;
        return (
          <section
            key={i}
            className="grid grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2 md:py-16 md:gap-16 md:px-16"
          >
            <div
              className={`border-heading/20 bg-heading/5 relative aspect-[3/2] w-full max-w-md justify-self-center overflow-hidden rounded-lg border ${fotoADestra ? "md:order-2" : ""}`}
            >
              <Foto foto={percorso.foto} sizes="(min-width: 768px) 448px, 100vw" />
            </div>

            <div
              className={`flex max-w-md flex-col items-start gap-4 text-left ${fotoADestra ? "md:order-1 md:justify-self-end" : ""}`}
            >
              <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
                {percorso.titolo}
              </h2>
              {percorso.frase && <p className="font-body italic text-xl">{percorso.frase}</p>}
              <TestoRicco valore={percorso.testo} classe="font-body text-lg" />
              {percorso.titoloElenco && (
                <h3 className="font-heading text-heading text-sm font-semibold uppercase tracking-[0.03em]">
                  {percorso.titoloElenco}
                </h3>
              )}
              {percorso.elenco?.length > 0 && <Elenco voci={percorso.elenco} />}
              <a
                href="/contatti"
                className="font-heading text-heading border-heading hover:bg-heading hover:text-background mt-2 rounded-full border px-6 py-2 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
              >
                Richiedi informazioni
              </a>
            </div>
          </section>
        );
      })}

      <InvitoFinale invito={pagina.invito} />

      <SiteFooter />
    </>
  );
}
