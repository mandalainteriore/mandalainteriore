"use client";

import { useState } from "react";
import Image from "next/image";

// Titoli e descrizioni sono segnaposto, in attesa dei testi della cliente.
const mandala = ["/mandala_1.jpg", "/mandala_2.jpg", "/mandala_3.jpg", "/mandala_4.jpg"].map(
  (immagine, i) => ({
    n: i + 1,
    titolo: `Titolo mandala ${i + 1}`,
    descrizione: "Breve descrizione del mandala, del suo significato e di come è nato.",
    immagine,
  }),
);

export default function MandalaGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const goTo = (delta: number) => {
    if (selected === null) return;
    const total = mandala.length;
    setSelected(((selected - 1 + delta + total) % total) + 1);
  };

  return (
    <>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3">
        {mandala.map(({ n, titolo, descrizione, immagine }) => (
          <figure key={n} className="flex flex-col gap-3">
            <button
              onClick={() => setSelected(n)}
              aria-label={`Apri ${titolo}`}
              className="border-heading/20 bg-heading/5 group relative aspect-square overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-1 hover:border-heading/50 hover:shadow-lg cursor-pointer"
            >
              <Image
                src={immagine}
                alt={titolo}
                fill
                sizes="(min-width: 896px) 290px, (min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
            <figcaption className="flex flex-col gap-1">
              <span className="font-heading text-heading text-xs font-semibold sm:text-sm uppercase tracking-[0.03em]">
                {titolo}
              </span>
              <span className="font-body text-base">{descrizione}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-12 sm:px-6"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            aria-label="Chiudi"
            className="text-background absolute top-6 right-6 font-heading text-2xl transition-opacity hover:opacity-70 cursor-pointer"
          >
            ×
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goTo(-1);
            }}
            aria-label="Precedente"
            className="text-background absolute left-4 font-heading text-3xl transition-opacity hover:opacity-70 cursor-pointer sm:left-8"
          >
            ‹
          </button>

          <figure
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-md flex-col items-center gap-4"
          >
            <div className="bg-background relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={mandala[selected - 1].immagine}
                alt={mandala[selected - 1].titolo}
                fill
                sizes="(min-width: 448px) 448px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="text-background flex flex-col items-center gap-1 text-center">
              <span className="font-heading text-base font-semibold uppercase tracking-[0.03em]">
                {mandala[selected - 1].titolo}
              </span>
              <span className="font-body text-lg">{mandala[selected - 1].descrizione}</span>
            </figcaption>
          </figure>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goTo(1);
            }}
            aria-label="Successivo"
            className="text-background absolute right-4 font-heading text-3xl transition-opacity hover:opacity-70 cursor-pointer sm:right-8"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
