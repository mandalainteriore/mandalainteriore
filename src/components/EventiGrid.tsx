"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formattaData, type Evento } from "@/data/eventi";

const VISIBILI = 3;

function CardEvento({ evento }: { evento: Evento }) {
  return (
    <Link
      href={`/eventi/${evento.slug}`}
      className="group flex cursor-pointer flex-col gap-4"
    >
      <div className="border-heading/20 relative aspect-[4/5] w-full overflow-hidden rounded-lg border shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-heading/50 group-hover:shadow-lg">
        <Image
          src={evento.immagine}
          alt={evento.titolo}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-center gap-1 px-2">
        <time
          dateTime={evento.data}
          className="font-body text-foreground text-sm italic"
        >
          {formattaData(evento.data)}
        </time>
        <h3 className="font-heading text-heading text-sm font-semibold uppercase tracking-[0.03em]">
          {evento.titolo}
        </h3>
        <p className="font-body text-base">{evento.descrizione}</p>
      </div>
    </Link>
  );
}

export default function EventiGrid({ eventi }: { eventi: Evento[] }) {
  const [mostraPassati, setMostraPassati] = useState(false);

  const ordinati = [...eventi].sort((a, b) => b.data.localeCompare(a.data));
  const recenti = ordinati.slice(0, VISIBILI);
  const passati = ordinati.slice(VISIBILI);

  return (
    <>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {recenti.map((evento) => (
          <CardEvento key={evento.slug} evento={evento} />
        ))}
        {mostraPassati &&
          passati.map((evento) => (
            <CardEvento key={evento.slug} evento={evento} />
          ))}
      </div>

      {passati.length > 0 && (
        <button
          onClick={() => setMostraPassati((v) => !v)}
          aria-expanded={mostraPassati}
          className="font-heading text-heading border-heading hover:bg-heading hover:text-background rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-[0.03em] transition-colors cursor-pointer"
        >
          {mostraPassati
            ? "Nascondi eventi passati"
            : `Vedi eventi passati (${passati.length})`}
        </button>
      )}
    </>
  );
}
