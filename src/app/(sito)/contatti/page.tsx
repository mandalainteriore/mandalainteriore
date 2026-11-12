import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import ModuloContatti from "@/components/ModuloContatti";
import Divider from "@/components/Divider";
import MandalaLogo from "@/components/MandalaLogo";
import Apertura from "@/components/Apertura";
import IconeSocial from "@/components/IconeSocial";
import { leggiContatti, leggiImpostazioni } from "@/sanity/pagine";
import { metadatiPagina } from "@/lib/metadati";

export async function generateMetadata(): Promise<Metadata> {
  const pagina = await leggiContatti();
  return metadatiPagina(pagina.hero.titolo, pagina.seo, "/contatti");
}

const etichetta = "font-heading text-heading text-xs font-semibold uppercase tracking-[0.03em]";

export default async function Contatti() {
  const [pagina, social] = await Promise.all([leggiContatti(), leggiImpostazioni()]);
  const { hero } = pagina;
  // Per il link "chiama": solo cifre e il + iniziale.
  const telefonoLink = pagina.telefono.replace(/[^\d+]/g, "");

  return (
    <>
      <Apertura
        titolo={hero.titolo}
        sfondo={hero.sfondo}
        sfondoMobile={hero.sfondoMobile}
        classeSenzaMobile="object-[15%_center] md:object-center"
      />

      <section className="flex flex-col items-center gap-16 px-6 pt-16 md:pt-24 pb-16 md:flex-row md:items-start md:justify-center md:gap-24 md:px-16">
        <div className="flex w-full max-w-sm flex-col gap-5 text-left">
          <ModuloContatti />
        </div>

        <div className="flex w-full max-w-xs flex-col items-start gap-8 text-left">
          <MandalaLogo className="text-logo h-20 w-auto self-center" />

          {pagina.frase && <p className="font-body italic text-xl">{pagina.frase}</p>}

          <Divider className="text-heading h-4 w-32" />

          <div className="flex flex-col gap-2 mt-4">
            <h2 className={etichetta}>Email</h2>
            <a
              href={`mailto:${pagina.email}`}
              className="font-body text-lg hover:opacity-70 transition-opacity"
            >
              {pagina.email}
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className={etichetta}>Telefono</h2>
            <a
              href={`tel:${telefonoLink}`}
              className="font-body text-lg hover:opacity-70 transition-opacity"
            >
              {pagina.telefono}
            </a>
          </div>

          {(social.instagram || social.facebook) && (
            <div className="flex flex-col gap-2">
              <h2 className={etichetta}>Social</h2>
              <IconeSocial social={social} classeIcona="h-6 w-6" />
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
