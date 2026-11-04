import type { Metadata } from "next";
import Image from "next/image";
import MandalaLogo from "@/components/MandalaLogo";
import PillarIcon from "@/components/PillarIcon";
import SiteFooter from "@/components/SiteFooter";
import SfondoResponsive from "@/components/SfondoResponsive";
import Divider from "@/components/Divider";

const destinatari = [
  {
    variant: "ascolto" as const,
    titolo: "A chi cerca un altro linguaggio",
    descrizione:
      "Per chi desidera esprimersi in modo diverso, lasciando che forme e colori diventino voce del proprio mondo interiore.",
  },
  {
    variant: "presenza" as const,
    titolo: "A chi desidera esplorare sé stesso",
    descrizione:
      "Per chi vuole concedersi un tempo tutto per sé, in cui il gesto creativo diventa un’occasione di ascolto e consapevolezza.",
  },
  {
    variant: "trasformazione" as const,
    titolo: "A chi attraversa un cambiamento",
    descrizione:
      "Quando la mente cerca ordine, spesso disegna cerchi. Il Mandala può offrire uno spazio di quiete e centratura nei momenti di caos o transizione.",
  },
];

export const metadata: Metadata = {
  title: "Mandala – Creatività consapevole",
  description:
    "Mandala e geometrie sacre come linguaggio simbolico per ascoltarsi e trasformarsi: incontri di creatività consapevole. Non serve saper disegnare.",
};

export default function MandalaCreativitaConsapevole() {
  return (
    <>
      <main className="relative flex h-[90svh] flex-col items-center justify-center overflow-hidden">
        <SfondoResponsive src="/sfondo_chiave.jpg" srcMobile="/sfondo_chiave_mobile.jpg" priority />

        <div className="flex flex-col items-center gap-2 px-6 text-center">
          <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight">
            Mandala – Creatività consapevole
          </h1>
          <p className="font-body text-heading text-2xl italic">Geometrie sacre</p>
        </div>
      </main>

      <section className="flex flex-col items-center gap-4 px-6 pt-16 md:pt-24 pb-12 text-center">
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
          Cos&rsquo;è
        </h2>
        <p className="font-body text-lg max-w-xl">
          Nel linguaggio della psicologia archetipica, il Mandala è una forma
          che richiama il Sé e porta ordine dove c&rsquo;è caos. Il disegno
          circolare diventa un linguaggio simbolico e antico: attraverso
          colori, forme e geometrie sacre permette di esprimere ciò che spesso
          non trova parole.
        </p>
        <p className="font-body text-lg max-w-xl">
          La bellezza non è nel risultato, ma nel viaggio: un processo che apre
          spazio alla trasformazione mentre il Mandala si rivela.
        </p>
      </section>

      <section className="flex flex-col items-center px-6 py-4">
        <div className="border-heading/20 bg-heading/5 relative aspect-square w-full max-w-xs overflow-hidden rounded-lg border">
          <Image
            src="/mandala_oxossi.jpg"
            alt="Mandala di Oxossi"
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 px-6 pt-12 pb-16 text-center">
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
          Come si svolge
        </h2>
        <p className="font-body italic text-xl max-w-xl">
          Non serve saper disegnare: il Mandala non chiede talento, chiede
          presenza.
        </p>
        <p className="font-body text-lg max-w-xl">
          Ogni incontro si apre con uno spazio in cui forme, colori e simboli
          sacri diventano voce di parti profonde di te. Si dà voce a ciò che
          emerge dall&rsquo;inconscio, dal campo e dalla propria dimensione
          intuitiva.
        </p>
        <p className="font-body text-lg max-w-xl">
          Il processo creativo può essere accompagnato da pratiche meditative e
          di Biotransenergetica, favorendo ascolto, presenza, centratura e
          trasformazione.
        </p>
      </section>

      <section className="flex flex-col items-center px-6 py-4">
        <div className="border-heading/20 bg-heading/5 relative aspect-square w-full max-w-xs overflow-hidden rounded-lg border">
          <Image
            src="/mandala_4.jpg"
            alt="Mandala con stella su fondo scuro"
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
      </section>

      <section className="flex flex-col items-center px-6 pt-4 pb-16 text-center">
        <Divider className="text-heading h-4 w-40" />
      </section>

      <section className="flex flex-col items-center gap-14 px-6 py-16 text-center">
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
          A chi si rivolge
        </h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 max-w-4xl">
          {destinatari.map((destinatario) => (
            <div
              key={destinatario.titolo}
              className="flex flex-col items-center gap-3"
            >
              <PillarIcon
                variant={destinatario.variant}
                className="text-heading h-14 w-14"
              />
              <h3 className="font-heading text-heading text-sm font-semibold uppercase tracking-[0.03em]">
                {destinatario.titolo}
              </h3>
              <p className="font-body text-base max-w-64">
                {destinatario.descrizione}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 px-6 pt-8 pb-16 md:pb-24 text-center">
        <MandalaLogo className="text-logo h-20 w-auto" />
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-tight">
          Il tuo viaggio può iniziare ora
        </h2>
        <p className="font-body italic text-xl max-w-md">
          Ogni chiave apre una possibilità.
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
