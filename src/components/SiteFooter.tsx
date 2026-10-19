import Link from "next/link";
import SfondoResponsive from "./SfondoResponsive";
import MandalaLogo from "./MandalaLogo";
import Divider from "./Divider";

// Il loto dello sfondo sta in basso al centro: su desktop i contenuti vanno ai lati,
// su mobile restano in alto lasciando spazio sotto.
export default function SiteFooter() {
  return (
    <footer className="relative flex flex-col overflow-hidden px-6 pt-20 pb-36 md:aspect-[4/1] md:justify-center md:px-16 md:py-10">
      <SfondoResponsive
        src="/footer_background.jpg"
        srcMobile="/footer_background_mobile.jpg"
        className="object-bottom"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-5 md:items-start">
          <Link href="/" aria-label="Mandala Interiore" className="hover:opacity-70 transition-opacity">
            <MandalaLogo className="text-logo h-14 w-auto" />
          </Link>

          <nav className="font-heading text-heading flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.03em] sm:gap-x-6 md:grid md:grid-cols-2 xl:flex xl:justify-start">
            <Link href="/la-mia-storia" className="hover:opacity-70 transition-opacity">
              La mia storia
            </Link>
            <Link href="/#percorso" className="hover:opacity-70 transition-opacity">
              Chiavi
            </Link>
            <Link href="/percorsi" className="hover:opacity-70 transition-opacity">
              Percorsi
            </Link>
            <Link href="/mandala" className="hover:opacity-70 transition-opacity">
              Mandala
            </Link>
          </nav>
        </div>

        <div className="flex flex-col items-center gap-5 md:items-end">
          <div className="text-heading flex justify-center gap-4">
            <a
              href="https://www.instagram.com/mandala.univers/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:opacity-70 transition-opacity"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
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
              href="https://www.facebook.com/zlate.roxana"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:opacity-70 transition-opacity"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              >
                <circle cx="12" cy="12" r="9.5" />
                <path d="M14,8.5 h-1.5 a2,2 0 0 0 -2,2 V12 H8 v2.5 h2.5 V21 h2.5 v-6.5 H15 L15.3,12 H13 v-1.2 c0,-0.5 0.3,-0.8 0.8,-0.8 H14 Z" />
              </svg>
            </a>
          </div>

          <Divider className="text-heading h-4 w-32 md:hidden" />

          <p className="font-body text-sm">
            © {new Date().getFullYear()} Mandala Interiore ·{" "}
            <Link href="/privacy" className="hover:opacity-70 transition-opacity">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
