"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MandalaLogo from "./MandalaLogo";

const chiavi = [
  { titolo: "Counceling transpersonale", href: "/counseling-transpersonale" },
  { titolo: "Yoga Anukalana e meditazione", href: "/yoga-anukalana-meditazione" },
  { titolo: "Mandala – arteterapia", href: "/mandala-arteterapia" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      <nav className="relative flex items-center justify-center">
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
              <div className="border-heading/20 bg-background absolute left-1/2 top-full mt-3 flex w-56 -translate-x-1/2 flex-col gap-1 rounded-lg border py-2 shadow-lg normal-case">
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
            <MandalaLogo className="h-[75px] w-[75px]" />
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
