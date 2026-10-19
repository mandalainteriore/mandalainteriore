import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MandalaLogo from "@/components/MandalaLogo";
import SiteFooter from "@/components/SiteFooter";
import Divider from "@/components/Divider";
import { eventi, formattaData, trovaEvento } from "@/data/eventi";

export function generateStaticParams() {
  return eventi.map((evento) => ({ slug: evento.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/eventi/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const evento = trovaEvento(slug);
  if (!evento) return {};
  return {
    title: evento.titolo,
    description: evento.descrizione,
  };
}

export default async function PaginaEvento({
  params,
}: PageProps<"/eventi/[slug]">) {
  const { slug } = await params;
  const evento = trovaEvento(slug);
  if (!evento) notFound();

  return (
    <>
      <main className="flex flex-col items-center gap-6 px-6 pt-32 md:pt-40 pb-12 text-center">
        <Link
          href="/#eventi"
          className="font-heading text-heading text-xs font-semibold uppercase tracking-[0.03em] transition-opacity hover:opacity-70"
        >
          ← Tutti gli eventi
        </Link>
        <h1 className="font-heading text-heading max-w-2xl text-4xl font-semibold tracking-tight">
          {evento.titolo}
        </h1>
        <p className="font-body text-lg italic">
          <time dateTime={evento.data}>{formattaData(evento.data)}</time>
          {" · "}
          {evento.luogo}
        </p>
        <Divider className="text-heading h-4 w-40" />
      </main>

      <article className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 pb-16 md:pb-24">
        <div className="border-heading/20 relative mx-auto aspect-[2/3] w-full max-w-[352px] overflow-hidden rounded-lg border shadow-sm">
          <Image
            src={evento.immagine}
            alt={evento.titolo}
            fill
            priority
            sizes="(min-width: 352px) 352px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="font-body flex flex-col gap-5 text-lg leading-relaxed">
          <p className="text-xl italic">{evento.descrizione}</p>
          {evento.contenuto.map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}
        </div>
      </article>

      <section className="flex flex-col items-center gap-6 px-6 pt-8 pb-16 md:pb-24 text-center">
        <MandalaLogo className="text-logo h-20 w-auto" />
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-tight">
          Il tuo viaggio può iniziare ora
        </h2>
        <p className="font-body italic text-xl max-w-md">
          Ogni porta si apre solo quando decidi di attraversarla.
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
