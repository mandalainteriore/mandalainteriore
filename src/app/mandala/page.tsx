import MandalaLogo from "@/components/MandalaLogo";
import SiteFooter from "@/components/SiteFooter";
import MandalaGallery from "@/components/MandalaGallery";
import SfondoResponsive from "@/components/SfondoResponsive";
import Divider from "@/components/Divider";

export default function Mandala() {
  return (
    <>
      <main className="relative flex h-[90svh] flex-col items-center justify-center overflow-hidden">
        <SfondoResponsive src="/sfondo_mandala.jpg" srcMobile="/sfondo_mandala_mobile.jpg" classeSenzaMobile="object-[15%_center] md:object-center" priority />

        <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight text-center px-6">
          Mandala
        </h1>
      </main>

      <section className="flex flex-col items-center gap-10 px-6 pt-16 md:pt-24 pb-16 text-center">
        <div className="font-body flex max-w-xl flex-col gap-3">
          <p className="italic text-xl">
            Ogni mandala è un frammento di un cammino, una storia che ha preso
            forma.
          </p>
          <p className="text-lg">
            Nel cerchio, il Sé si manifesta come un viaggio verso il centro, dove
            l&rsquo;anima si ricompone e ritrova l&rsquo;unità dell&rsquo;essere.
          </p>
        </div>

        <Divider className="text-heading h-4 w-40" />

        <MandalaGallery />
      </section>

      <section className="flex flex-col items-center gap-6 px-6 pt-8 pb-16 md:pb-24 text-center">
        <MandalaLogo className="text-heading h-20 w-auto" />
        <h2 className="font-heading text-heading text-3xl font-semibold tracking-tight">
          Il tuo viaggio può iniziare ora
        </h2>
        <p className="font-body italic text-xl max-w-md">
          La trasformazione inizia da una porta che scegli di aprire.
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
