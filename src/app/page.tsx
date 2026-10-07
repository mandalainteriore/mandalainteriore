import Image from "next/image";
import Link from "next/link";
import PortaEntra from "@/components/PortaEntra";
import KeyIcon, { type Simbolo } from "@/components/KeyIcon";
import Divider from "@/components/Divider";
import MandalaLogo from "@/components/MandalaLogo";
import SiteFooter from "@/components/SiteFooter";
import EventiGrid from "@/components/EventiGrid";
import { eventi } from "@/data/eventi";

const chiavi: { titolo: string; descrizione: string; href: string; simbolo: Simbolo }[] = [
  {
    titolo: "Counseling transpersonale",
    descrizione:
      "Uno spazio di ascolto autentico per comprenderti, sciogliere i blocchi interiori e ritrovare il tuo centro.",
    href: "/counseling-transpersonale",
    simbolo: "fiore-della-vita",
  },
  {
    titolo: "Yoga Anukalana e meditazione",
    descrizione:
      "Movimento, respiro e presenza si uniscono per riportare equilibrio, vitalità e armonia nella tua vita.",
    href: "/yoga-anukalana-meditazione",
    simbolo: "pentagramma",
  },
  {
    titolo: "Mandala – arteterapia",
    descrizione:
      "Colori, simboli e geometrie sacre diventano strumenti per dare forma al tuo mondo interiore e favorire la trasformazione.",
    href: "/mandala-arteterapia",
    simbolo: "esagramma",
  },
];

export default function Home() {
  return (
    <>
      <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
        <Image
          src="/sfondo_pergamena.jpg"
          alt=""
          fill
          priority
          className="object-cover -z-10"
        />

        <section className="flex flex-col items-center gap-4 text-center px-6 translate-y-6">
          <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight">
            Mandala Interiore
          </h1>
          <p className="text-heading flex items-center gap-4">
            <span aria-hidden="true" className="bg-heading/40 h-px w-10 sm:w-16" />
            <span className="font-script text-3xl sm:text-4xl">con Roxana Zlate</span>
            <span aria-hidden="true" className="bg-heading/40 h-px w-10 sm:w-16" />
          </p>
          <p className="font-body mt-3 italic text-xl max-w-md">
            Ogni persona custodisce dentro di sé le risorse per stare bene.
            <br />
            A volte serve soltanto la chiave giusta per ritrovarle.
          </p>
        </section>

        <PortaEntra href="#eventi" />
      </main>

      <section
        id="eventi"
        className="flex flex-col items-center gap-10 px-6 pt-16 md:pt-24 pb-12 text-center"
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
        className="flex flex-col items-center gap-8 px-6 pt-12 pb-16 md:pb-24 text-center"
      >
        <div className="font-body text-lg max-w-xl">
          <p>Accompagno le persone a ritrovare l’equilibrio, chiarezza e presenza.</p>
          <p className="italic">Scegli la chiave che senti più vicina.</p>
          <p className="italic">
            Insieme daremo forma a un percorso integrato che posssa accompagnari nel tuo cammino.
          </p>
        </div>

        <Divider className="text-heading h-4 w-40" />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl">
          {chiavi.map((chiave) => (
            <Link
              key={chiave.titolo}
              href={chiave.href}
              className="group border-heading/20 flex cursor-pointer flex-col items-center gap-3 rounded-lg border bg-[url(/sfondo_card.jpg)] bg-cover bg-center px-5 py-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-heading/50 hover:shadow-lg"
            >
              <KeyIcon simbolo={chiave.simbolo} className="text-heading h-20 w-auto transition-transform duration-300 group-hover:scale-110" />
              <h3 className="font-heading text-heading text-sm font-semibold uppercase tracking-[0.03em]">
                {chiave.titolo}
              </h3>
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
        <div className="border-heading/20 relative aspect-[4/5] h-56 shrink-0 overflow-hidden rounded-lg border md:h-80">
          <Image
            src="/placeholder_verticale.jpg"
            alt="Descrizione della foto"
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
            Da anni percorro un cammino di consapevolezza e trasformazione, intrecciando counseling,
            arteterapia, yoga, meditazione e aromaterapia.
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
            src="/placeholder_quadrato.jpg"
            alt="Descrizione della foto"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 px-6 pt-8 pb-16 md:pb-24 text-center">
        <MandalaLogo className="text-heading h-16 w-16" />
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
