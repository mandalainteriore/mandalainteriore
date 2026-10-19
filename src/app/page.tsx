import Image from "next/image";
import Link from "next/link";
import PortaEntra from "@/components/PortaEntra";
import KeyIcon from "@/components/KeyIcon";
import Divider from "@/components/Divider";
import MandalaLogo from "@/components/MandalaLogo";
import SiteFooter from "@/components/SiteFooter";
import EventiGrid from "@/components/EventiGrid";
import { eventi } from "@/data/eventi";
import { chiavi } from "@/data/chiavi";

export default function Home() {
  return (
    <>
      <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden pt-28 pb-32">
        <Image
          src="/sfondo_pergamena.jpg"
          alt=""
          fill
          priority
          className="object-cover -z-10"
        />

        <section className="flex flex-col items-center gap-4 text-center px-6">
          <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight">
            Mandala Interiore
          </h1>
          <p className="text-heading flex items-center gap-4">
            <span aria-hidden="true" className="bg-heading/40 h-px w-10 sm:w-16" />
            <span className="font-script text-3xl sm:text-4xl">con Roxana Zlate</span>
            <span aria-hidden="true" className="bg-heading/40 h-px w-10 sm:w-16" />
          </p>
          <div className="font-body mt-3 flex max-w-xl flex-col gap-3">
            <p className="italic text-lg sm:text-xl">
              Uno spazio di consapevolezza e trasformazione per ritrovare il tuo
              centro e la tua vera essenza.
            </p>
            <p className="text-base sm:text-lg">
              Ti accompagno attraverso percorsi di Counseling Transpersonale
              radicati nella Biotransenergetica, la creazione dei Mandala e le
              pratiche di Yoga e Meditazione, per risvegliare le tue qualità più
              autentiche.
            </p>
          </div>
        </section>

        <PortaEntra href="#eventi" />
      </main>

      <section
        id="eventi"
        className="flex flex-col items-center gap-8 px-6 pt-10 pb-12 text-center md:pt-12"
      >
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-tight">
            Eventi
          </h2>
          <p className="font-body italic text-xl max-w-md">
            Momenti di incontro, pratica e condivisione.
          </p>
        </div>

        <Divider className="text-heading h-4 w-40" />

        <EventiGrid eventi={eventi} />
      </section>

      <section
        id="percorso"
        className="flex flex-col items-center gap-8 px-6 pt-16 pb-16 md:pt-20 md:pb-24 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-heading text-heading max-w-xl text-3xl font-semibold tracking-tight">
            Scegli le chiavi che ti risuonano
          </h2>
          <div className="font-body text-lg max-w-xl">
            <p className="mb-3 italic">
              Custodisci dentro di te risorse infinite: a volte serve soltanto la
              chiave giusta per ritrovarle.
            </p>
            <p>
              Ti accompagno in un percorso di chiarezza, radicamento e
              consapevolezza verso la realizzazione del tuo Sé.
            </p>
            <p>
              Insieme daremo forma a un percorso integrato che possa accompagnarti nel tuo cammino.
            </p>
          </div>
        </div>

        <Divider className="text-heading h-4 w-40" />

        <div className="grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-14">
          {chiavi.map((chiave) => (
            <Link
              key={chiave.titolo}
              href={chiave.href}
              className="group border-heading/20 flex cursor-pointer flex-col items-center gap-3 rounded-lg border bg-[url(/sfondo_card.jpg)] bg-cover bg-center px-5 py-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-heading/50 hover:shadow-lg"
            >
              <KeyIcon simbolo={chiave.simbolo} className="text-heading h-20 w-auto transition-transform duration-300 group-hover:scale-110" />
              <div className="flex flex-col items-center gap-1">
                <h3 className="font-heading text-heading text-sm font-semibold uppercase tracking-[0.03em]">
                  {chiave.titolo}
                </h3>
                {chiave.sottotitolo && (
                  <p className="font-body text-heading text-base italic">{chiave.sottotitolo}</p>
                )}
              </div>
              <p className="font-body text-base max-w-52">
                {chiave.descrizione}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="storia"
        className="grid grid-cols-1 items-center justify-items-center gap-8 px-6 py-16 md:h-screen md:grid-cols-2 md:overflow-hidden md:py-8 md:gap-6 md:px-16"
      >
        <div className="border-heading/20 relative aspect-[4/5] h-72 shrink-0 overflow-hidden rounded-lg border md:h-96">
          <Image
            src="/roxana_albero.jpg"
            alt="Roxana Zlate"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex max-w-md flex-col items-start gap-4 text-left">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
            Un cammino nato dall&rsquo;ascolto
          </h2>
          <p className="font-body italic text-xl">
            Anche io, prima di accompagnare gli altri, ho attraversato la mia
            porta.
          </p>
          <p className="font-body text-lg">
            Da anni percorro un cammino di consapevolezza e trasformazione, intrecciando il Counseling
            Transpersonale, la creazione dei Mandala, le pratiche Yoga e la Meditazione.
          </p>
          <p className="font-body text-lg">
            Oggi desidero mettere ciò che ho incontrato e imparato lungo il mio percorso al servizio di chi
            sente il bisogno di fermarsi, guardarsi dentro e ritrovarsi.
          </p>

          <div className="mt-2 flex flex-wrap gap-4">
            <a
              href="/la-mia-storia"
              className="font-heading text-heading border-heading hover:bg-heading hover:text-background rounded-full border px-6 py-2 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
            >
              La mia storia
            </a>
            <a
              href="#percorso"
              className="font-heading bg-heading text-background border-heading hover:bg-transparent hover:text-heading rounded-full border px-6 py-2 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
            >
              Percorsi
            </a>
          </div>
        </div>
      </section>

      <section
        id="mandala"
        className="grid grid-cols-1 items-center justify-items-center gap-8 px-6 py-16 md:h-screen md:grid-cols-2 md:overflow-hidden md:py-8 md:gap-6 md:px-16"
      >
        <div className="order-2 flex max-w-md flex-col items-start gap-4 text-left md:order-1">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-tight">
            Il mandala come specchio
          </h2>
          <p className="font-body italic text-xl">
            Ogni mandala che prende forma è un’espressione dell’anima. 
          </p>
          <p className="font-body text-lg">
            Un linguaggio antico, attraverso cui
            l’inconscio parla là dove le parole non riescono ad arrivare.
          </p>
          <p className="font-body text-lg">
            Attraverso colori, simboli e geometrie
            sacre, il mandala diventa uno strumento di ascolto profondo e di espressione autentica: un modo
            per dare forma al proprio mondo interiore e accompagnare la trasformazione, ritornando al
            proprio centro.
          </p>

          <a
            href="/mandala"
            className="font-heading text-heading border-heading hover:bg-heading hover:text-background mt-2 rounded-full border px-6 py-2 text-sm font-semibold uppercase tracking-[0.03em] transition-colors"
          >
            Mandala
          </a>
        </div>

        <div className="border-heading/20 bg-heading/5 relative order-1 h-56 w-56 shrink-0 overflow-hidden rounded-full border md:order-2 md:h-80 md:w-80">
          <Image
            src="/disegno_mandala_home.jpeg"
            alt="Disegno di un mandala con il fiore della vita"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 px-6 pt-8 pb-16 md:pb-24 text-center">
        <MandalaLogo className="text-logo h-20 w-auto" />
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-tight">
          Il tuo viaggio può iniziare ora
        </h2>
        <p className="font-body italic text-xl max-w-md">
          Ogni porta si apre solo quando decidi di attraversarla.
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
