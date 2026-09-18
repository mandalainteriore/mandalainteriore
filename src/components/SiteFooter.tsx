import Image from "next/image";
import MandalaLogo from "./MandalaLogo";
import Divider from "./Divider";

export default function SiteFooter() {
  return (
    <footer className="relative flex flex-col items-center gap-6 overflow-hidden px-6 py-12 text-center">
      <Image
        src="/footer_background.jpg"
        alt=""
        fill
        className="object-cover -z-10"
      />

      <MandalaLogo className="text-heading h-9 w-9" />

      <nav className="font-heading text-heading flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.03em]">
        <a href="/la-mia-storia" className="hover:opacity-70 transition-opacity">
          La mia storia
        </a>
        <a href="/#percorso" className="hover:opacity-70 transition-opacity">
          Chiavi
        </a>
        <a href="/percorsi" className="hover:opacity-70 transition-opacity">
          Percorsi
        </a>
        <a href="/mandala" className="hover:opacity-70 transition-opacity">
          Mandala
        </a>
      </nav>

      <div className="text-heading flex justify-center gap-4">
        <a
          href="#"
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
          href="#"
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

      <Divider className="text-heading h-4 w-32" />

      <p className="font-body text-sm">
        © {new Date().getFullYear()} Mandala Interiore ·{" "}
        <a href="/privacy" className="hover:opacity-70 transition-opacity">
          Privacy Policy
        </a>
      </p>
    </footer>
  );
}
