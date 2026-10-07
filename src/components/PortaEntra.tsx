"use client";

import { useState } from "react";
import DoorIcon from "./DoorIcon";

// Sui dispositivi touch non c'è l'hover: al tocco la porta si apre,
// e solo dopo questa pausa la pagina scorre alla sezione.
const PAUSA_TOUCH = 500;

export default function PortaEntra({ href }: { href: `#${string}` }) {
  const [aperta, setAperta] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const touch = window.matchMedia("(hover: none)").matches;
    const motoRidotto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!touch || motoRidotto) return;

    event.preventDefault();
    setAperta(true);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", href);
      // Richiude la porta quando la hero non è più in vista.
      setTimeout(() => setAperta(false), 1000);
    }, PAUSA_TOUCH);
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group absolute bottom-4 flex flex-col items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.03em]"
    >
      entra
      <DoorIcon aperta={aperta} className="h-10 w-auto" />
    </a>
  );
}
