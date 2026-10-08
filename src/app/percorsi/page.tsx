import Image from "next/image";
import MandalaLogo from "@/components/MandalaLogo";
import SiteFooter from "@/components/SiteFooter";
import SfondoResponsive from "@/components/SfondoResponsive";
import Divider from "@/components/Divider";
import Link from "next/link";
import KeyIcon from "@/components/KeyIcon";
import { chiavi } from "@/data/chiavi";

export default function Percorsi() {
  return (
    <>
      <main className="relative flex h-[90svh] flex-col items-center justify-center overflow-hidden">
        <SfondoResponsive src="/sfondo_percorsi.jpg" srcMobile="/sfondo_percorsi_mobile.jpg" classeSenzaMobile="object-[15%_center] md:object-center" priority />

        <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight text-center px-6">
          Percorsi
        </h1>
      </main>

      <section className="flex flex-col items-center gap-4 px-6 pt-16 md:pt-24 pb-12 text-center">
        <p className="font-body italic text-xl max-w-xl">
          Ogni cammino ha una forma diversa: solitario, condiviso, o intrecciato
          alla vita di un&rsquo;organizzazione.
        </p>
        <p className="font-body text-lg max-w-xl">
          Il percorso nasce dalla chiave che senti più vicina e può essere
          vissuto in tre forme: individuale, di gruppo o all&rsquo;interno di
          un&rsquo;organizzazione.
        </p>

        <ul className="mt-4 mb-2 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          {chiavi.map((chiave) => (
            <li key={chiave.href}>
              <Link
                href={chiave.href}
                className="group border-heading/30 hover:border-heading/60 flex h-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-colors"
              >
                <KeyIcon
                  simbolo={chiave.simbolo}
                  className="text-heading h-14 w-auto shrink-0 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="flex flex-col gap-1">
                  <span className="font-heading text-heading text-xs font-semibold uppercase tracking-[0.03em]">
                    {chiave.titolo}
                  </span>
                  <span className="font-body text-base leading-snug">{chiave.sintesi}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Divider className="text-heading h-4 w-40" />
      </section>

      <section className="grid grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2 md:py-16 md:gap-16 md:px-16">
        <div className="border-heading/20 bg-heading/5 relative aspect-[4/5] w-full max-w-xs justify-self-center overflow-hidden rounded-lg border">
          <Image
            src="/placeholder_verticale.jpg"
            alt="Descrizione della foto"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex max-w-md flex-col items-start gap-4 text-left">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
            Individuali
          </h2>
          <p className="font-body italic text-xl">
            Un tempo e uno spazio interamente dedicati a te.
          </p>
          <p className="font-body text-lg">
            Un percorso costruito sui tuoi tempi e i tuoi bisogni, in un
            rapporto di ascolto diretto e continuativo. Le sedute individuali
            permettono di esplorare in profondità ciò che emerge, con la
            libertà di seguire il ritmo che ti è più naturale.
          </p>
          <a
            href="/contatti"
            className="font-heading text-heading border-heading hover:bg-heading hover:text-background mt-2 rounded-full border px-6 py-2 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
          >
            Richiedi informazioni
          </a>
        </div>
      </section>

      <section className="grid grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2 md:py-16 md:gap-16 md:px-16">
        <div className="order-2 flex max-w-md flex-col items-start gap-4 text-left md:order-1 md:justify-self-end">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
            Di gruppo
          </h2>
          <p className="font-body italic text-xl">
            Nel gruppo, ogni storia diventa specchio per le altre.
          </p>
          <p className="font-body text-lg">
            Ogni persona è una parte viva del campo: lo informa, lo sostiene e ne amplifica la forza.
            Ogni incontro diventa così un campo vivo, un luogo in cui l’energia collettiva sostiene il
            processo individuale e dove le pratiche si aprono come porte d’accesso a stati di presenza,
            intuizione e consapevolezza profonda.
          </p>
          <a
            href="/contatti"
            className="font-heading text-heading border-heading hover:bg-heading hover:text-background mt-2 rounded-full border px-6 py-2 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
          >
            Richiedi informazioni
          </a>
        </div>

        <div className="order-1 md:order-2 border-heading/20 bg-heading/5 relative aspect-[4/5] w-full max-w-xs justify-self-center overflow-hidden rounded-lg border">
          <Image
            src="/foto_gruppo.jpg"
            alt="Un percorso di gruppo con Roxana Zlate"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2 md:py-16 md:gap-16 md:px-16">
        <div className="border-heading/20 bg-heading/5 relative aspect-[4/5] w-full max-w-xs justify-self-center overflow-hidden rounded-lg border">
          <Image
            src="/placeholder_verticale.jpg"
            alt="Descrizione della foto"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex max-w-md flex-col items-start gap-4 text-left">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
            Aziendali
          </h2>
          <p className="font-body italic text-xl">
            Anche i team hanno bisogno di ritrovare il proprio centro.
          </p>
          <p className="font-body text-lg">
            In sedici anni di lavoro in azienda ho visto da vicino come l’energia di un gruppo può fluire…
            oppure disperdersi. Coordinando persone e progetti, ho imparato che le vere difficoltà non
            nascono dai processi tecnici, ma dalle relazioni: da ciò che accade negli spazi invisibili tra le
            persone.
          </p>
          <a
            href="/contatti"
            className="font-heading text-heading border-heading hover:bg-heading hover:text-background mt-2 rounded-full border px-6 py-2 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
          >
            Richiedi informazioni
          </a>
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 px-6 pt-8 pb-16 md:pb-24 text-center">
        <MandalaLogo className="text-heading h-20 w-auto" />
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-tight">
          Il tuo viaggio può iniziare ora
        </h2>
        <p className="font-body italic text-xl max-w-md">
          Ci sono porte che si aprono solo da dentro.
        </p>
        <a
          href="/contatti"
          className="font-heading bg-heading text-background hover:bg-transparent hover:text-heading border-heading mt-2 rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
        >
          Inizia il tuo viaggio
        </a>
      </section>

      <SiteFooter />
    </>
  );
}
