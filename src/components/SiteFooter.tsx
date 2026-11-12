import Link from "next/link";
import SfondoResponsive from "./SfondoResponsive";
import MandalaLogo from "./MandalaLogo";
import Divider from "./Divider";
import IconeSocial from "./IconeSocial";
import { leggiImpostazioni } from "@/sanity/pagine";

// Il loto dello sfondo sta in basso al centro: su desktop i contenuti vanno ai lati,
// su mobile restano in alto lasciando spazio sotto.
export default async function SiteFooter() {
  const impostazioni = await leggiImpostazioni();

  return (
    <footer className="relative flex flex-col overflow-hidden px-6 pt-20 pb-36 md:aspect-[4/1] md:justify-center md:px-16 md:py-10">
      <SfondoResponsive
        src="/footer_background.jpg"
        srcMobile="/footer_background_mobile.jpg"
        className="object-bottom"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-5 md:items-start">
          <Link href="/" aria-label="Mandala Interiore" className="hover:opacity-70 transition-opacity">
            <MandalaLogo className="text-logo h-14 w-auto" />
          </Link>

          {impostazioni.motto && (
            <p className="font-script text-heading -mt-2 text-2xl">{impostazioni.motto}</p>
          )}

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
          <IconeSocial social={impostazioni} classeIcona="h-5 w-5" />

          <Divider className="text-heading h-4 w-32 md:hidden" />

          <p className="font-body text-base">
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
