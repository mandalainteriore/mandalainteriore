"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const oggetti = [
  "Informazioni Generali",
  "Counseling Transpersonale",
  "Yoga Anukalana e Meditazione",
  "Mandala – Creatività Consapevole",
];

const etichetta =
  "font-heading text-heading text-xs font-semibold uppercase tracking-[0.03em]";
const campo =
  "border-heading/30 font-body focus:border-heading rounded-md border bg-transparent px-4 py-2 outline-none transition-colors";

type Stato = "pronto" | "invio" | "inviato" | "errore";

export default function ModuloContatti() {
  const [oggetto, setOggetto] = useState(oggetti[0]);
  const [stato, setStato] = useState<Stato>("pronto");
  const [erroreTesto, setErroreTesto] = useState("");
  const conferma = useRef<HTMLDivElement>(null);

  // Dopo l'invio il modulo lascia il posto a una conferma più corta: la pagina si accorcia,
  // quindi la portiamo in vista (e le diamo il focus per i lettori di schermo).
  useEffect(() => {
    if (stato !== "inviato" || !conferma.current) return;
    conferma.current.focus({ preventScroll: true });
    conferma.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [stato]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const dati = Object.fromEntries(new FormData(form));
    setStato("invio");
    try {
      const risposta = await fetch("/api/contatti", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...dati, oggetto }),
      });
      const esito = await risposta.json().catch(() => ({}));
      if (!risposta.ok) throw new Error(esito.errore || "Invio non riuscito.");
      form.reset();
      setOggetto(oggetti[0]);
      setStato("inviato");
    } catch (e) {
      setErroreTesto(e instanceof Error ? e.message : "Invio non riuscito.");
      setStato("errore");
    }
  }

  if (stato === "inviato") {
    return (
      <div ref={conferma} tabIndex={-1} role="status" className="flex flex-col gap-4 outline-none">
        <p className="font-heading text-heading text-lg font-semibold">Grazie, messaggio ricevuto.</p>
        <p className="font-body text-lg">
          Ti risponderò il prima possibile all&rsquo;indirizzo email che hai indicato,
          dove trovi anche una mail di conferma.
        </p>
        <button
          onClick={() => setStato("pronto")}
          className="font-heading text-heading border-heading hover:bg-heading hover:text-background mt-2 self-start rounded-full border px-6 py-2 text-sm font-semibold uppercase tracking-[0.03em] transition-colors cursor-pointer"
        >
          Scrivi un altro messaggio
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <fieldset className="flex flex-col gap-2">
        <legend className={`${etichetta} mb-2`}>Oggetto</legend>
        <div className="flex flex-wrap gap-2">
          {oggetti.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOggetto(o)}
              aria-pressed={oggetto === o}
              className={`font-body rounded-full border px-4 py-1.5 text-sm transition-colors cursor-pointer ${
                oggetto === o
                  ? "bg-heading text-background border-heading"
                  : "border-heading/30 hover:border-heading"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="nome" className={etichetta}>Nome</label>
        <input id="nome" name="nome" type="text" required maxLength={100} autoComplete="name" className={campo} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={etichetta}>Email</label>
        <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className={campo} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="messaggio" className={etichetta}>Messaggio</label>
        <textarea id="messaggio" name="messaggio" rows={5} required maxLength={5000} className={`${campo} resize-none`} />
      </div>

      {/* Campo trappola anti-spam: nascosto alle persone, i bot lo compilano */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="sito">Lascia vuoto questo campo</label>
        <input id="sito" name="sito" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="font-body text-sm">
        Inviando il messaggio accetti che i tuoi dati vengano usati per risponderti, come
        descritto nella{" "}
        <Link href="/privacy" className="text-heading underline underline-offset-2 hover:opacity-70">
          Privacy Policy
        </Link>
        .
      </p>

      {stato === "errore" && (
        <p role="alert" className="font-body text-base text-red-800">
          {erroreTesto} Riprova tra poco, oppure scrivimi direttamente via email.
        </p>
      )}

      <button
        type="submit"
        disabled={stato === "invio"}
        className="font-heading bg-heading text-background hover:bg-transparent hover:text-heading border-heading mt-1 self-start rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-[0.03em] transition-colors cursor-pointer disabled:cursor-wait disabled:opacity-60"
      >
        {stato === "invio" ? "Invio in corso…" : "Invia messaggio"}
      </button>
    </form>
  );
}
