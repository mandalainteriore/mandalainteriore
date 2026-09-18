import Image from "next/image";
import MandalaLogo from "@/components/MandalaLogo";
import SiteFooter from "@/components/SiteFooter";
import Divider from "@/components/Divider";

export default function YogaAnukalanaMeditazione() {
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
          Yoga Anukalana e Meditazione
        </h1>
      </main>

      <section className="flex flex-col items-center gap-4 px-6 pt-24 pb-12 text-center">
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
          Cos&rsquo;è
        </h2>
        <p className="font-body text-lg max-w-xl">
          Anukalana Yoga è un approccio che nasce dall’idea di integrazione: unire la tradizione tantrica con
          conoscenze moderne di biomeccanica, scienze motorie, osteopatia e arti del movimento.
        </p>
        <p className="font-body text-lg max-w-xl">
          Accoglie la persona nella sua totalità, adattandosi alle sue esigenze e favorendo trasformazioni profonde.
          È un metodo che aiuta a ritrovare naturalezza, presenza e radicamento, rendendo la pratica accessibile, piacevole e profondamente rigenerante.
        </p>
      </section>

      <section className="flex flex-col items-center gap-4 px-6 pt-12 pb-16 text-center">
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
          Come si svolge
        </h2>
        <p className="font-body text-lg max-w-xl">
          La pratica si basa sulla natura “liquida” del corpo umano e favorisce movimenti morbidi, continui e
          organici, che riducono la fatica e aumentano la percezione interna.
        </p>

        <p className="font-body text-lg max-w-xl">
          L’integrazione con elementi del Tai Chi e della danza sostiene la fluidità, mentre la respirazione organismica guida il ritmo e apre lo
          spazio alla meditazione.
        </p>

        <Divider className="text-heading h-4 w-40" />
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
