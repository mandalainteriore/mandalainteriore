import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import Divider from "@/components/Divider";
import TestoRicco from "@/components/TestoRicco";
import { formattaData } from "@/data/eventi";
import { leggiPrivacy } from "@/sanity/pagine";
import { metadatiPagina } from "@/lib/metadati";

export async function generateMetadata(): Promise<Metadata> {
  const pagina = await leggiPrivacy();
  return metadatiPagina(pagina.titolo, pagina.seo, "/privacy");
}

export default async function Privacy() {
  const pagina = await leggiPrivacy();

  return (
    <>
      <main className="flex flex-col items-center gap-6 px-6 pt-32 md:pt-40 pb-10 text-center">
        <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight">
          {pagina.titolo}
        </h1>
        {pagina.aggiornamento && (
          <p className="font-body italic text-lg">
            Ultimo aggiornamento: {formattaData(pagina.aggiornamento)}
          </p>
        )}
        <Divider className="text-heading h-4 w-40" />
      </main>

      <article className="font-body mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 pb-16 md:pb-24 text-lg leading-relaxed">
        {pagina.introduzione?.length > 0 && (
          <div className="flex flex-col gap-3">
            <TestoRicco valore={pagina.introduzione} />
          </div>
        )}

        {(pagina.sezioni ?? []).map((sezione, i) => (
          <section key={i} className="flex flex-col gap-3">
            <h2 className="font-heading text-heading text-lg font-semibold tracking-tight">
              {sezione.titolo}
            </h2>
            <TestoRicco valore={sezione.testo} />
          </section>
        ))}
      </article>

      <SiteFooter />
    </>
  );
}
