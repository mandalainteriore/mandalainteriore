import type { Metadata } from "next";
import Image from "next/image";
import MandalaLogo from "@/components/MandalaLogo";
import PillarIcon from "@/components/PillarIcon";
import SfondoResponsive from "@/components/SfondoResponsive";
import SiteFooter from "@/components/SiteFooter";

const valori = [
  {
    variant: "accoglienza" as const,
    titolo: "Consapevolezza",
    descrizione:
      "Camminiamo insieme in uno spazio autentico di accettazione, presenza e non giudizio. Un luogo di osservazione consapevole in cui puoi lasciarti vedere nella tua autenticità e ritrovare la connessione con la tua vera essenza.",
  },
  {
    variant: "ascolto" as const,
    titolo: "Sensibilità",
    descrizione:
      "Un ascolto attivo e intuitivo, dove la sensibilità diventa sensitività per percepire ciò che emerge oltre le parole, lasciando spazio a ciò che il momento rivela.",
  },
  {
    variant: "trasformazione" as const,
    titolo: "Trasformazione",
    descrizione:
      "Accompagno con consapevolezza ciò che si muove e chiede di essere visto, affinché possa trovare spazio e nuova vita. Un processo di trasformazione che nasce dal riconoscere intuizioni, sensazioni e movimenti interiori come porte verso nuove possibilità.",
  },
];

// Dal più recente al più vecchio.
const studi = [
  {
    anni: "2024 – in corso",
    titolo:
      "Formazione Quadriennale in Counseling Transpersonale Integrale – Metodo Biotransenergetica (BTE)",
    dove: "Scuola OmVerbania",
  },
  {
    anni: "2019 – 2023",
    titolo: "Formazione Triennale Insegnante Yoga, specializzazione Anukalana Yoga",
    dove: "Scuola Samadhi Yoga – Firenze",
  },
  {
    anni: "2021",
    titolo: "Corso di Aromaterapia e Oli Essenziali",
    dove: "con il Dott. Leonardo Paoluzzi",
  },
];

export const metadata: Metadata = {
  title: "La mia storia",
  description:
    "Chi è Roxana Zlate: dalla consulenza internazionale al Counseling Transpersonale, allo Yoga e ai Mandala. La storia e la formazione dietro Mandala Interiore.",
};

export default function LaMiaStoria() {
  return (
    <>
      <main className="relative flex h-[90svh] flex-col items-center justify-center overflow-hidden">
        <SfondoResponsive src="/sfondo_la_mia_storia.jpg" srcMobile="/sfondo_la_mia_storia_mobile.jpg" priority />

        <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight text-center px-6">
          La mia storia
        </h1>
      </main>

      <section className="flex flex-col items-center gap-10 px-6 pt-16 md:pt-24 pb-12 md:flex-row md:justify-center md:gap-20 md:px-16">
        <div className="border-heading/20 bg-heading/5 relative aspect-[4/5] w-full max-w-xs shrink-0 overflow-hidden rounded-lg border">
          <Image
            src="/roxana_primo_piano.jpg"
            alt="Ritratto di Roxana Zlate"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex max-w-md flex-col items-start gap-4 text-left">
          <p className="font-body text-lg">
            Per molti anni ho lavorato nella consulenza internazionale come ingegnere gestionale,
            coordinando progetti e gruppi di lavoro.
          </p>
          <p className="font-body text-lg">
            Parallelamente cresceva in me una domanda: come
            possiamo vivere con più autenticità, presenza e armonia?
          </p>
          <p className="font-body text-lg">
            Nella vita ho attraversato, come te, diverse soglie: momenti di crisi, transizione e
            cambiamento che mi hanno spinta a cercare strumenti capaci di sostenere questi passaggi.
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center gap-10 px-6 pt-16 md:pt-24 pb-12 md:flex-row md:justify-center md:gap-20 md:px-16">
        

        <div className="order-2 flex max-w-md flex-col items-start gap-4 text-left md:order-1">
          <p className="font-body text-lg">
            Da più di dieci anni percorro la via dello Yoga e della meditazione; il Counseling
            Transpersonale mi ha aperto al mondo archetipico, offrendo mappe e una metodologia per i
            processi di risveglio. Il disegno dei Mandala mi ha mostrato la potenza del simbolo come via
            di trasformazione e centratura.
          </p>
          <p className="font-body text-lg">
            Un incontro fondamentale è stato quello con gli insegnamenti di Paramahansa Yogananda, più di
            otto anni fa: da allora accompagnano e orientano il mio cammino.
          </p>
          <p className="font-body text-lg">
            Passo dopo passo, da questo percorso è nato un progetto: <strong className="font-semibold">Il Mandala Interiore</strong>, uno spazio di
            ascolto, presenza e scoperta, in cui tornare al proprio centro e riconnettersi con la propria
            essenza.
          </p>
          <p className="font-body text-lg">
            Oggi unisco ciò che ho maturato nella mia esperienza — metodo, intuito e sensibilità — per
            accompagnare chi sente il bisogno di fermarsi, ascoltarsi più profondamente, trovare chiarezza e
            vivere il cambiamento come un’opportunità di crescita.
          </p>
        </div>
        
        <div className="order-1 md:order-2 border-heading/20 bg-heading/5 relative aspect-[4/5] w-full max-w-xs shrink-0 overflow-hidden rounded-lg border">
          <Image
            src="/foto_roxana_gruppo.jpg"
            alt="Roxana Zlate durante un incontro di gruppo"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="flex flex-col items-center gap-14 px-6 pt-12 pb-16 md:pb-24 text-center">
        <div className="flex flex-col items-center gap-3">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
            Il mio approccio
          </h2>
          <p className="font-body italic text-xl max-w-xl">
            Tre principi che guidano ogni percorso che accompagno.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 max-w-4xl">
          {valori.map((valore) => (
            <div
              key={valore.titolo}
              className="flex flex-col items-center gap-3"
            >
              <PillarIcon variant={valore.variant} className="text-heading h-14 w-14" />
              <h3 className="font-heading text-heading text-sm font-semibold uppercase tracking-[0.03em]">
                {valore.titolo}
              </h3>
              <p className="font-body text-base max-w-64">
                {valore.descrizione}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-10 px-6 pt-12 pb-16 md:pb-24 md:flex-row md:justify-center md:gap-20 md:px-16">
        <div className="order-2 flex max-w-md flex-col items-start gap-4 text-left md:order-1">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
            I miei studi
          </h2>
          <p className="font-body italic text-xl">
            Siamo in una continua evoluzione, lo studio e la pratica personale sono fondamentali quanto gli
            incontri in cui scelgo di accompagnarti.
          </p>
          <ul className="font-body flex flex-col gap-4 text-lg">
            {studi.map((studio) => (
              <li key={studio.anni} className="flex flex-col">
                <span className="font-heading text-heading text-sm font-semibold tracking-[0.03em]">
                  {studio.anni}
                </span>
                <span>{studio.titolo}</span>
                <span className="italic">{studio.dove}</span>
              </li>
            ))}
          </ul>
          <p className="font-body text-lg">
            Dal 2020 coltivo il disegno dei mandala e delle geometrie sacre attraverso un percorso
            personale nato spontaneamente dall’esperienza diretta e approfondito nel tempo attraverso
            la pratica e la ricerca continua.
          </p>
        </div>

        <div className="order-1 md:order-2 border-heading/20 bg-heading/5 relative aspect-[4/5] w-full max-w-xs shrink-0 overflow-hidden rounded-lg border">
          <Image
            src="/roxana_profilo_bianco_nero.jpg"
            alt="Ritratto in bianco e nero di Roxana Zlate"
            fill
            className="object-cover object-[60%_center]"
          />
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 px-6 pt-8 pb-16 md:pb-24 text-center">
        <MandalaLogo className="text-logo h-20 w-auto" />
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-tight">
          Il tuo viaggio può iniziare ora
        </h2>
        <p className="font-body italic text-xl max-w-md">
          Ogni viaggio inizia quando troviamo il coraggio di aprire la porta.
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
