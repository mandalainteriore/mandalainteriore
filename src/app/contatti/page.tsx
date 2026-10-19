import SiteFooter from "@/components/SiteFooter";
import SubjectPicker from "@/components/SubjectPicker";
import Divider from "@/components/Divider";
import SfondoResponsive from "@/components/SfondoResponsive";
import MandalaLogo from "@/components/MandalaLogo";

export default function Contatti() {
  return (
    <>
      <main className="relative flex h-[90svh] flex-col items-center justify-center overflow-hidden">
        <SfondoResponsive src="/sfondo_contatti.jpg" srcMobile="/sfondo_contatti_mobile.jpg" classeSenzaMobile="object-[15%_center] md:object-center" priority />

        <h1 className="font-heading text-heading text-4xl font-semibold tracking-tight text-center px-6">
          Inizia il tuo viaggio
        </h1>
      </main>

      <section className="flex flex-col items-center gap-16 px-6 pt-16 md:pt-24 pb-16 md:flex-row md:items-start md:justify-center md:gap-24 md:px-16">
        <div className="flex w-full max-w-sm flex-col gap-5 text-left">
          <SubjectPicker />

          <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nome"
              className="font-heading text-heading text-xs font-semibold uppercase tracking-[0.03em]"
            >
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              className="border-heading/30 font-body focus:border-heading rounded-md border bg-transparent px-4 py-2 outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-heading text-heading text-xs font-semibold uppercase tracking-[0.03em]"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="border-heading/30 font-body focus:border-heading rounded-md border bg-transparent px-4 py-2 outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="messaggio"
              className="font-heading text-heading text-xs font-semibold uppercase tracking-[0.03em]"
            >
              Messaggio
            </label>
            <textarea
              id="messaggio"
              name="messaggio"
              rows={5}
              className="border-heading/30 font-body focus:border-heading resize-none rounded-md border bg-transparent px-4 py-2 outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="font-heading bg-heading text-background hover:bg-transparent hover:text-heading border-heading mt-2 self-start rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-[0.03em] transition-colors cursor-pointer"
          >
            Invia messaggio
          </button>
          </form>
        </div>

        <div className="flex w-full max-w-xs flex-col items-start gap-8 text-left">
          <MandalaLogo className="text-logo h-20 w-auto self-center" />

          <p className="font-body italic text-xl">
            Scrivimi per raccontarmi cosa cerchi, o per qualsiasi domanda sui
            percorsi.
          </p>

          <Divider className="text-heading h-4 w-32" />

          <div className="flex flex-col gap-2 mt-4">
            <h2 className="font-heading text-heading text-xs font-semibold uppercase tracking-[0.03em]">
              Email
            </h2>
            <a
              href="mailto:roxana.zlate11@gmail.com"
              className="font-body text-lg hover:opacity-70 transition-opacity"
            >
              roxana.zlate11@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-heading text-xs font-semibold uppercase tracking-[0.03em]">
              Telefono
            </h2>
            <a
              href="tel:+393287019457"
              className="font-body text-lg hover:opacity-70 transition-opacity"
            >
              +39 328 701 9457
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-heading text-xs font-semibold uppercase tracking-[0.03em]">
              Social
            </h2>
            <div className="text-heading flex gap-4">
              <a
                href="https://www.instagram.com/mandala.univers/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-70 transition-opacity"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:opacity-70 transition-opacity"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  <circle cx="12" cy="12" r="9.5" />
                  <path d="M14,8.5 h-1.5 a2,2 0 0 0 -2,2 V12 H8 v2.5 h2.5 V21 h2.5 v-6.5 H15 L15.3,12 H13 v-1.2 c0,-0.5 0.3,-0.8 0.8,-0.8 H14 Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
