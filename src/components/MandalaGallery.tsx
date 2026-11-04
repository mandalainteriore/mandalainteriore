"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Mandala } from "@/data/mandala";

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
  mandala,
  indice,
  onCambia,
  onChiudi,
}: {
  mandala: Mandala[];
  indice: number;
  onCambia: (delta: number) => void;
  onChiudi: () => void;
}) {
  const inizioTocco = useRef<number | null>(null);
  const corrente = mandala[indice];
  // Su mobile la descrizione si apre in un pannello dal basso (su desktop è a destra della foto).
  // Indice del mandala di cui è aperto il pannello: cambiando mandala si richiude da solo.
  const [cassettoDi, setCassettoDi] = useState<number | null>(null);
  const cassettoAperto = cassettoDi === indice;

  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (cassettoAperto) setCassettoDi(null);
        else onChiudi();
      }
      if (event.key === "ArrowLeft") onCambia(-1);
      if (event.key === "ArrowRight") onCambia(1);
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [onCambia, onChiudi, cassettoAperto]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={corrente.titolo}
      className="fixed inset-0 z-50 flex flex-col bg-black text-white"
      onClick={onChiudi}
      onTouchStart={(e) => {
        inizioTocco.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (inizioTocco.current === null || cassettoAperto) return;
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

      {/* Scheda dell'opera: su desktop foto a sinistra e testo a destra, su mobile foto centrata */}
      <figure
        className={`scheda-al-centro flex min-h-0 flex-1 flex-col items-center gap-6 overflow-y-auto pb-8 lg:flex-row lg:items-center lg:justify-center lg:gap-12 lg:overflow-visible lg:px-24 lg:pb-12`}
        style={{ "--r": corrente.larghezza / corrente.altezza } as React.CSSProperties}
      >
        {/* Foto intera nelle sue proporzioni, grande quanto lo spazio consente */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative shrink-0 w-[min(100vw,calc((100svh-12rem)*var(--r)))] lg:w-[min(calc(100vw-40rem),calc((100svh-8rem)*var(--r)))]"
          style={{ aspectRatio: `${corrente.larghezza} / ${corrente.altezza}` }}
        >
          <Image
            key={corrente.immagine}
            src={corrente.immagine}
            alt={corrente.titolo}
            fill
            priority
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-contain"
          />
        </div>

        <figcaption
          onClick={(e) => e.stopPropagation()}
          className="flex max-w-xl flex-col items-center gap-4 px-6 text-center lg:w-80 lg:shrink-0 lg:items-start lg:px-0 lg:text-left"
        >
          <span className="font-heading text-lg font-semibold uppercase tracking-[0.03em]">
            {corrente.titolo}
          </span>
          {corrente.descrizione && (
            <>
              {/* Su mobile la descrizione sta nel pannello: qui si vede solo da desktop */}
              <span
                aria-hidden="true"
                className="hidden h-px w-12 bg-white/40 lg:block"
              />
              <span
                className="font-body hidden text-lg leading-relaxed text-white/85 lg:block"
              >
                {corrente.descrizione}
              </span>
              <button
                  onClick={() => setCassettoDi(indice)}
                  aria-expanded={cassettoAperto}
                  aria-controls="descrizione-mandala"
                  className="font-heading flex cursor-pointer items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.03em] transition-colors hover:bg-white/10 lg:hidden"
                >
                  Leggi la descrizione
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M6,15 L12,9 L18,15" />
                  </svg>
                </button>
            </>
          )}
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

      {/* Pannello della descrizione (solo mobile) */}
      {corrente.descrizione && (
        <div className="lg:hidden" onClick={(e) => e.stopPropagation()}>
          <div
            aria-hidden="true"
            onClick={() => setCassettoDi(null)}
            className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
              cassettoAperto ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />
          <div
            id="descrizione-mandala"
            role="region"
            aria-label={`Descrizione di ${corrente.titolo}`}
            inert={!cassettoAperto}
            className={`fixed inset-x-0 bottom-0 z-[61] max-h-[65svh] overflow-y-auto rounded-t-2xl bg-neutral-900 px-6 pt-3 pb-8 text-center shadow-2xl transition-transform duration-300 ease-out ${
              cassettoAperto ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <span aria-hidden="true" className="mx-auto mb-5 block h-1 w-10 rounded-full bg-white/30" />
            <p className="font-heading mb-3 text-base font-semibold uppercase tracking-[0.03em]">
              {corrente.titolo}
            </p>
            <p className="font-body text-lg leading-relaxed text-white/85">{corrente.descrizione}</p>
            <button
              onClick={() => setCassettoDi(null)}
              className="font-heading mt-6 cursor-pointer rounded-full border border-white/40 px-6 py-2 text-xs font-semibold uppercase tracking-[0.03em] transition-colors hover:bg-white/10"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MandalaGallery({ mandala }: { mandala: Mandala[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  const cambia = useCallback(
    (delta: number) =>
      setSelected((i) => (i === null ? i : (i + delta + mandala.length) % mandala.length)),
    [mandala.length],
  );
  const chiudi = useCallback(() => setSelected(null), []);

  return (
    <>
      <div className="grid w-full max-w-4xl grid-cols-1 items-start gap-x-10 gap-y-8 sm:grid-cols-3">
        {mandala.map(({ titolo, immagine }, i) => (
          <figure key={immagine} className="flex flex-col gap-3">
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
              {/* Icona di ingrandimento, solo al passaggio del mouse */}
              <span
                aria-hidden="true"
                className="text-heading absolute top-3 right-3 rounded-full bg-white/80 p-1.5 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14,4 H20 V10 M10,20 H4 V14 M20,4 L13.5,10.5 M4,20 L10.5,13.5" />
                </svg>
              </span>
            </button>
            <figcaption className="font-heading text-heading text-center text-xs font-semibold uppercase tracking-[0.03em] sm:text-sm">
              {titolo}
            </figcaption>
          </figure>
        ))}
      </div>

      {selected !== null && (
        <Visualizzatore mandala={mandala} indice={selected} onCambia={cambia} onChiudi={chiudi} />
      )}
    </>
  );
}
