import Image from "next/image";
import MandalaLogo from "@/components/MandalaLogo";
import PillarIcon from "@/components/PillarIcon";
import SiteFooter from "@/components/SiteFooter";
import Divider from "@/components/Divider";

const destinatari = [
  {
    variant: "ascolto" as const,
    titolo: "Chi cerca un altro linguaggio",
    descrizione:
      "Chi trova difficile mettere in parole ciò che sente, e cerca un canale diverso per esprimersi.",
  },
  {
    variant: "presenza" as const,
    titolo: "Chi vuole rallentare",
    descrizione:
      "Chi ha bisogno di un tempo sospeso, in cui il fare diventa presenza e ascolto di sé.",
  },
  {
    variant: "trasformazione" as const,
    titolo: "Chi è in un momento di crescita",
    descrizione:
      "Chi sta attraversando un cambiamento e cerca una forma capace di accompagnarlo.",
  },
];

export default function MandalaArteterapia() {
  return (
    <>
      <main className="relative flex h-[90vh] flex-col items-center justify-center overflow-hidden">
        <Image
          src="/sfondo_la_mia_storia.jpg"
          alt=""
          fill
          priority
          className="object-cover -z-10"
        />

        <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight text-center px-6">
          Mandala – Arteterapia
        </h1>
      </main>

      <section className="flex flex-col items-center gap-4 px-6 pt-24 pb-12 text-center">
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
          Cos&rsquo;è
        </h2>
        <p className="font-body italic text-xl max-w-xl">
          Non serve saper disegnare: il mandala non chiede talento, chiede
          presenza.
        </p>
        <p className="font-body text-lg max-w-xl">
          L&rsquo;arteterapia con il mandala utilizza il disegno circolare
          come strumento espressivo: colori, forme e simboli diventano un
          linguaggio per dare voce a ciò che è difficile dire a parole. Non
          conta il risultato estetico, ma il processo che si attraversa
          mentre il mandala prende forma.
        </p>
      </section>

      <section className="flex flex-col items-center px-6 py-4">
        <div className="border-heading/20 bg-heading/5 aspect-square w-full max-w-xs rounded-lg border" />
      </section>

      <section className="flex flex-col items-center gap-4 px-6 pt-12 pb-16 text-center">
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
          Come si svolge
        </h2>
        <p className="font-body text-lg max-w-xl">
          Ogni incontro parte da uno spazio libero, in cui colori e materiali
          sono a disposizione senza schemi predefiniti. A seconda del
          momento, il percorso può essere più guidato o più intuitivo: ciò
          che conta è lasciare che la forma emerga, e poi accogliere insieme
          quello che racconta.
        </p>
      </section>

      <section className="flex flex-col items-center px-6 py-4">
        <div className="border-heading/20 bg-heading/5 aspect-square w-full max-w-xs rounded-lg border" />
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

      <section className="flex flex-col items-center gap-6 px-6 pt-8 pb-24 text-center">
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
