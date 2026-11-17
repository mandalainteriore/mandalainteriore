import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DoorIcon from "@/components/DoorIcon";
import SiteFooter from "@/components/SiteFooter";
import NavbarSito from "@/components/NavbarSito";

export const metadata: Metadata = {
  title: "Pagina non trovata",
};

export default function NonTrovata() {
  return (
    <>
      <NavbarSito />
      <main className="relative flex min-h-[90svh] md:portrait:min-h-[60svh] flex-col items-center justify-center gap-6 overflow-hidden px-6 pt-28 pb-16 text-center">
        <Image
          src="/sfondo_pergamena.jpg"
          alt=""
          fill
          priority
          className="object-cover -z-10"
        />

        <DoorIcon className="text-heading h-24 w-auto" />

        <p className="font-heading text-heading/60 text-sm font-semibold uppercase tracking-[0.2em]">
          Errore 404
        </p>
        <h1 className="font-heading text-heading max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Questa porta non si apre
        </h1>
        <p className="font-body max-w-md text-xl italic">
          La pagina che cerchi non esiste o è stata spostata. Ogni cammino però
          ha sempre un&rsquo;altra via.
        </p>

        <Link
          href="/"
          className="font-heading bg-heading text-background hover:bg-transparent hover:text-heading border-heading mt-2 rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
        >
          Torna alla homepage
        </Link>
      </main>

      <SiteFooter />
    </>
  );
}
