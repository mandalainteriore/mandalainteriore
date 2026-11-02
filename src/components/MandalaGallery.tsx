"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

// Distanza minima in pixel perché un trascinamento col dito conti come "swipe".
const SOGLIA_SWIPE = 50;

function Freccia({ verso }: { verso: "sinistra" | "destra" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d={verso === "sinistra" ? "M15,5 L8,12 L15,19" : "M9,5 L16,12 L9,19"} />
    </svg>
  );
}

function Visualizzatore({
  indice,
  onCambia,
  onChiudi,
}: {
  indice: number;
  onCambia: (delta: number) => void;
  onChiudi: () => void;
}) {
  const inizioTocco = useRef<number | null>(null);
  const corrente = mandala[indice];

  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onChiudi();
      if (event.key === "ArrowLeft") onCambia(-1);
      if (event.key === "ArrowRight") onCambia(1);
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [onCambia, onChiudi]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={corrente.titolo}
      className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white"
      onClick={onChiudi}
      onTouchStart={(e) => {
        inizioTocco.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (inizioTocco.current === null) return;
        const delta = e.changedTouches[0].clientX - inizioTocco.current;
        inizioTocco.current = null;
        if (Math.abs(delta) > SOGLIA_SWIPE) onCambia(delta < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-heading text-sm tracking-[0.03em] text-white/70">
          {indice + 1} / {mandala.length}
        </span>
        <button
          onClick={onChiudi}
          aria-label="Chiudi"
          className="cursor-pointer p-1 transition-opacity hover:opacity-70"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M5,5 L19,19 M19,5 L5,19" />
          </svg>
        </button>
      </div>

      <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 pb-6">
        {/* Quadrato grande quanto lo schermo consente, lasciando spazio a barra e didascalia */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative aspect-square w-[min(100vw,calc(100svh-12rem))] sm:w-[min(92vw,calc(100svh-12rem))]"
        >
          <Image
            key={corrente.immagine}
            src={corrente.immagine}
            alt={corrente.titolo}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>
        <figcaption
          onClick={(e) => e.stopPropagation()}
          className="flex max-w-xl flex-col items-center gap-1 px-6 text-center"
        >
          <span className="font-heading text-base font-semibold uppercase tracking-[0.03em]">
            {corrente.titolo}
          </span>
          <span className="font-body text-lg text-white/85">{corrente.descrizione}</span>
        </figcaption>
      </figure>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onCambia(-1);
        }}
        aria-label="Precedente"
        className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer rounded-full bg-black/40 p-2 transition-colors hover:bg-white/15 sm:left-6"
      >
        <Freccia verso="sinistra" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCambia(1);
        }}
        aria-label="Successivo"
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full bg-black/40 p-2 transition-colors hover:bg-white/15 sm:right-6"
      >
        <Freccia verso="destra" />
      </button>
    </div>
  );
}

export default function MandalaGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const cambia = useCallback(
    (delta: number) =>
      setSelected((i) => (i === null ? i : (i + delta + mandala.length) % mandala.length)),
    [],
  );
  const chiudi = useCallback(() => setSelected(null), []);

  return (
    <>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3">
        {mandala.map(({ n, titolo, descrizione, immagine }, i) => (
          <figure key={n} className="flex flex-col gap-3">
            <button
              onClick={() => setSelected(i)}
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
        <Visualizzatore indice={selected} onCambia={cambia} onChiudi={chiudi} />
      )}
    </>
  );
}
