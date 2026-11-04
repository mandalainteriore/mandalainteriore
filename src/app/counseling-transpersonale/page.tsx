import type { Metadata } from "next";
import MandalaLogo from "@/components/MandalaLogo";
import SiteFooter from "@/components/SiteFooter";
import SfondoResponsive from "@/components/SfondoResponsive";
import Divider from "@/components/Divider";

export const metadata: Metadata = {
  title: "Counseling Transpersonale e Biotransenergetica",
  description:
    "Counseling Transpersonale e Biotransenergetica (BTE): incontri individuali, in presenza o online, e seminari di gruppo per ritrovare libertà interiore.",
};

export default function CounselingTranspersonale() {
  return (
    <>
      <main className="relative flex h-[90svh] flex-col items-center justify-center overflow-hidden">
        <SfondoResponsive src="/sfondo_chiave.jpg" srcMobile="/sfondo_chiave_mobile.jpg" priority />

        <div className="flex flex-col items-center gap-2 px-6 text-center">
          <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight">
            Counseling transpersonale
          </h1>
          <p className="font-body text-heading text-2xl italic">Biotransenergetica</p>
        </div>
      </main>

      <section className="flex flex-col items-center gap-4 px-6 pt-16 md:pt-24 pb-12 text-center">
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
          Cos&rsquo;è
        </h2>
        <p className="font-body text-lg max-w-xl">
          Il Counseling Transpersonale è un percorso di crescita che aiuta a riconoscere e sviluppare le
          qualità più autentiche, favorendo un rinnovamento della coscienza e una maggiore sintonia con la
          propria natura profonda.
        </p>

        <p className="font-body text-lg max-w-xl">
          Si radica nella Biotransenergetica (BTE), una via esperienziale che
          integra psicologia transpersonale, pratiche corporee e spirituali, meditazione e antiche tradizioni
          sciamaniche.
        </p>

        <p className="font-body text-lg max-w-xl">
          Considera la persona nella sua totalità — corpo, emozioni, mente,
          energia e dimensione spirituale — e si fonda sull’idea che ognuno possieda risorse interiori che
          possono essere risvegliate attraverso esperienze consapevoli e trasformative.
        </p>
      </section>

      <section className="flex flex-col items-center gap-4 px-6 pt-12 pb-16 text-center">
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
          Come si svolge
        </h2>
        <p className="font-body text-lg max-w-xl">
          Attraverso incontri individuali di Counseling, in presenza oppure online, ti accompagno
          nell’esplorazione del mondo interiore e nel ritrovare le tue potenzialità autentiche.
          Meditazioni, respirazione, lavoro con le emozioni e pratiche psico-corporee e archetipiche
          diventano strumenti per ritrovare libertà interiore e un contatto più vivo con il proprio Sé.
        </p>
        <p className="font-body text-lg max-w-xl">
          I <strong className="font-semibold">Seminari di Biotransenergetica (BTE)</strong> di gruppo sono
          esperienze immersive che permettono di entrare in relazione diretta con le Forze
          Archetipiche: qualità universali che abitano la psiche e il campo. Attraverso meditazioni
          guidate, pratiche psicocorporee e rituali di gruppo, si attiva un processo di trasformazione
          che fa emergere saggezze profonde, portando chiarezza, centratura e insight.
        </p>

        <Divider className="text-heading h-4 w-40" />
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
