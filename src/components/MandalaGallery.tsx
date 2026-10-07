"use client";

import { useState } from "react";

const mandala = Array.from({ length: 9 }, (_, i) => ({
  n: i + 1,
  titolo: `Titolo mandala ${i + 1}`,
}));

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
        {mandala.map(({ n, titolo }) => (
          <figure key={n} className="flex flex-col gap-3">
            <button
              onClick={() => setSelected(n)}
              aria-label={`Apri ${titolo}`}
              className="border-heading/20 bg-heading/5 group aspect-square overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-1 hover:border-heading/50 hover:shadow-lg cursor-pointer"
            >
              <div className="text-heading/40 font-heading flex h-full w-full items-center justify-center text-sm transition-transform duration-300 group-hover:scale-105">
                {n}
              </div>
            </button>
            <figcaption className="font-heading text-heading text-xs font-semibold sm:text-sm uppercase tracking-[0.03em]">
              {titolo}
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
            <div className="bg-background flex aspect-square w-full items-center justify-center rounded-lg">
              <span className="text-heading/40 font-heading text-2xl">
                {selected}
              </span>
            </div>
            <figcaption className="font-heading text-background text-base font-semibold uppercase tracking-[0.03em]">
              {mandala[selected - 1].titolo}
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
