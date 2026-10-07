import Image from "next/image";
import MandalaLogo from "@/components/MandalaLogo";
import PillarIcon from "@/components/PillarIcon";
import SfondoResponsive from "@/components/SfondoResponsive";
import SiteFooter from "@/components/SiteFooter";

const valori = [
  {
    variant: "accoglienza" as const,
    titolo: "Accoglienza",
    descrizione:
      "Camminiamo insieme in uno spazio autentico di accettazione, presenza e non giudizio dove puoi lasciarti vedere per cio che sei, ritrovando la tua autenticità e la connessione con la tua vera essenza.",
  },
  {
    variant: "ascolto" as const,
    titolo: "Ascolto",
    descrizione:
      "Ascolto attivo e intuitivo per percepire ciò che emerge oltre le parole, dando spazio al corpo, alle emozioni e a ciò che il momento rivela.",
  },
  {
    variant: "trasformazione" as const,
    titolo: "Trasformazione",
    descrizione:
      "Accompagno con consapevolezza per accogliere ciò che si muove e chiede di essere visto, affinché possa trovare spazio e nuova vita.",
  },
];

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
            src="/placeholder_verticale.jpg"
            alt="Descrizione della foto"
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
            Nella vita ho attraversato, come te, diversi periodi di crisi, transizione e cambiamento, che mi
            hanno portata a cercare e sperimentare strumenti capaci di sostenere questi momenti.
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center gap-10 px-6 pt-16 md:pt-24 pb-12 md:flex-row md:justify-center md:gap-20 md:px-16">
        

        <div className="order-2 flex max-w-md flex-col items-start gap-4 text-left md:order-1">
          <p className="font-body text-lg">
            Un incontro fondamentale è stato quello con gli insegnamenti di Paramahansa Yogananda, che da
            allora accompagnano e orientano il mio cammino.
          </p>
          <p className="font-body text-lg">
            Passo dopo passo, da questo percorso è nato un progetto: Il Mandala Interiore, uno spazio di
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
            src="/placeholder_verticale.jpg"
            alt="Descrizione della foto"
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
          <p className="font-body text-lg">
            2019–2023 — Formazione triennale Insegnante Yoga, Samadhi Ssdrl <br></br>
            2021 — Corso Oli Essenziali con il Dott. Leonardo Paoluzzi <br></br>
            2024 –in corso — Formazione in Counseling Transpersonale -Metodo BioTransEnergetica (BTE),
            Scuola OmVerbania
          </p>
          <p className="font-body text-lg">
            Dal 2020 coltivo il disegno dei mandala e delle geometrie sacre attraverso un percorso
            personale nato spontaneamente dall’esperienza diretta e approfondito nel tempo attraverso
            la pratica e la ricerca continua.
          </p>
        </div>

        <div className="order-1 md:order-2 border-heading/20 bg-heading/5 relative aspect-[4/5] w-full max-w-xs shrink-0 overflow-hidden rounded-lg border">
          <Image
            src="/placeholder_verticale.jpg"
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
