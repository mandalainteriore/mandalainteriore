"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import MandalaLogo from "./MandalaLogo";

const chiavi = [
  { titolo: "Counseling transpersonale – Biotransenergetica", href: "/counseling-transpersonale" },
  { titolo: "Yoga Anukalana e meditazione", href: "/yoga-anukalana-meditazione" },
  { titolo: "Mandala – arteterapia", href: "/mandala-arteterapia" }
];

function MenuMobile({ aperto, onClose }: { aperto: boolean; onClose: () => void }) {
  const [chiaviAperte, setChiaviAperte] = useState(false);

  useEffect(() => {
    if (!aperto) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [aperto, onClose]);

  return (
    <div
      id="menu-mobile"
      inert={!aperto}
      aria-hidden={!aperto}
      className={`bg-background fixed inset-0 z-50 flex flex-col items-center overflow-y-auto px-6 pt-5 pb-[100px] transition-[translate,visibility] duration-500 ease-out motion-reduce:transition-none xl:hidden ${
        aperto ? "visible translate-y-0" : "invisible -translate-y-full"
      }`}
    >
      {/* Stessa altezza della barra, così la X compare dove c'era l'icona del menu */}
      <div className="flex h-20 w-full items-center justify-end">
        <button
          onClick={onClose}
          aria-label="Chiudi menu"
          className="text-heading cursor-pointer p-1 transition-opacity hover:opacity-70"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M5,5 L19,19 M19,5 L5,19" />
          </svg>
        </button>
      </div>

      <nav
        className={`font-heading text-heading my-auto flex flex-col items-center gap-7 py-10 text-center text-lg font-semibold uppercase tracking-[0.03em] transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none ${
          aperto ? "translate-y-0 opacity-100 delay-200" : "-translate-y-4 opacity-0"
        }`}
      >
        <Link href="/la-mia-storia" onClick={onClose} className="hover:opacity-70 transition-opacity">
          La mia storia
        </Link>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setChiaviAperte((v) => !v)}
            aria-expanded={chiaviAperte}
            aria-controls="menu-mobile-chiavi"
            className="flex cursor-pointer items-center gap-2 uppercase transition-opacity hover:opacity-70"
          >
            Chiavi
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 transition-transform duration-300 ${chiaviAperte ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M6,9 L12,15 L18,9" />
            </svg>
          </button>
          {chiaviAperte && (
            <div id="menu-mobile-chiavi" className="flex flex-col items-center gap-3">
              {chiavi.map((chiave) => (
                <Link
                  key={chiave.titolo}
                  href={chiave.href}
                  onClick={onClose}
                  className="font-body text-lg font-normal normal-case tracking-normal italic hover:opacity-70 transition-opacity"
                >
                  {chiave.titolo}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/percorsi" onClick={onClose} className="hover:opacity-70 transition-opacity">
          Percorsi
        </Link>
        <Link href="/mandala" onClick={onClose} className="hover:opacity-70 transition-opacity">
          Mandala
        </Link>

        <Link
          href="/contatti"
          onClick={onClose}
          className="bg-heading text-background border-heading mt-4 rounded-full border px-8 py-3 text-sm transition-colors hover:bg-transparent hover:text-heading"
        >
          Inizia il tuo viaggio
        </Link>
      </nav>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuMobile, setMenuMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const chiudiMenuMobile = useCallback(() => setMenuMobile(false), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="absolute top-0 left-0 right-0 z-10 w-full px-6 py-5">
      {/* Mobile e tablet: logo al centro, pulsante menu a destra */}
      <div className="flex items-center justify-between xl:hidden">
        <Link href="/" aria-label="Mandala Interiore" className="hover:opacity-70 transition-opacity">
          <MandalaLogo className="h-20 w-auto" />
        </Link>
        <button
          onClick={() => setMenuMobile(true)}
          aria-label="Apri menu"
          aria-expanded={menuMobile}
          aria-controls="menu-mobile"
          className="cursor-pointer p-1 transition-opacity hover:opacity-70"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M3,7 H21 M3,12 H21 M3,17 H21" />
          </svg>
        </button>
      </div>

      <MenuMobile aperto={menuMobile} onClose={chiudiMenuMobile} />

      {/* Desktop */}
      <nav className="relative hidden items-center justify-center xl:flex">
        <div className="flex items-center gap-8 font-heading text-sm font-semibold tracking-[0.03em] uppercase">
          <Link href="/la-mia-storia" className="hover:opacity-70 transition-opacity">
            La mia storia
          </Link>

          <div ref={ref} className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              Chiavi
            </button>

            {open && (
              <div className="border-heading/20 bg-background absolute left-1/2 top-full mt-3 flex w-72 -translate-x-1/2 flex-col gap-1 rounded-lg border py-2 shadow-lg normal-case">
                {chiavi.map((chiave) => (
                  <Link
                    key={chiave.titolo}
                    href={chiave.href}
                    onClick={() => setOpen(false)}
                    className="font-body text-heading px-4 py-2 text-base tracking-normal hover:opacity-70 transition-opacity"
                  >
                    {chiave.titolo}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/" aria-label="Mandala Interiore" className="hover:opacity-70 transition-opacity">
            <MandalaLogo className="h-[90px] w-auto" />
          </Link>
          <Link href="/percorsi" className="hover:opacity-70 transition-opacity">
            Percorsi
          </Link>
          <Link href="/mandala" className="hover:opacity-70 transition-opacity">
            Mandala
          </Link>
        </div>

        <Link
          href="/contatti"
          className="absolute right-0 font-heading text-sm font-semibold tracking-[0.03em] uppercase border border-current rounded-full px-5 py-2 transition-colors hover:bg-heading hover:text-background"
        >
          Inizia il tuo viaggio
        </Link>
      </nav>
    </header>
  );
}
