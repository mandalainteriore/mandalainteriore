import type { Metadata } from "next";
import SiteFooter from "./SiteFooter";
import Divider from "./Divider";
import PillarIcon from "./PillarIcon";
import Apertura from "./Apertura";
import Foto from "./Foto";
import TestoRicco from "./TestoRicco";
import InvitoFinale from "./InvitoFinale";
import { leggiChiave } from "@/sanity/pagine";
import { metadatiPagina } from "@/lib/metadati";
import type { Chiave, Foto as TipoFoto, IdChiave } from "@/data/pagine";

// Un'icona per riquadro di "A chi si rivolge", nell'ordine.
const ICONE = ["ascolto", "presenza", "trasformazione"] as const;

export async function metadatiChiave(id: IdChiave): Promise<Metadata> {
  const chiave = await leggiChiave(id);
  return metadatiPagina(chiave.titolo, chiave.seo);
}

function Sezione({
  sezione,
  className,
  children,
}: {
  sezione: Chiave["cosE"];
  className: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`flex flex-col items-center gap-4 px-6 text-center ${className}`}>
      <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">{sezione.titolo}</h2>
      {sezione.frase && <p className="font-body italic text-xl max-w-xl">{sezione.frase}</p>}
      <TestoRicco valore={sezione.testo} classe="font-body text-lg max-w-xl" />
      {children}
    </section>
  );
}

function FotoQuadrata({ foto }: { foto?: TipoFoto }) {
  if (!foto?.src) return null;
  return (
    <section className="flex flex-col items-center px-6 py-4">
      <div className="border-heading/20 bg-heading/5 relative aspect-square w-full max-w-xs overflow-hidden rounded-lg border">
        <Foto foto={foto} sizes="320px" />
      </div>
    </section>
  );
}

/** Pagina di una delle tre chiavi: le parti facoltative compaiono solo se compilate. */
export default async function PaginaChiave({ id }: { id: IdChiave }) {
  const chiave = await leggiChiave(id);
  const destinatari = chiave.destinatari?.voci?.length ? chiave.destinatari : undefined;
  const conFoto = Boolean(chiave.primaFoto?.src || chiave.secondaFoto?.src);

  return (
    <>
      <Apertura
        titolo={chiave.titoloPagina || chiave.titolo}
        sottotitolo={chiave.sottotitolo}
        sfondo={chiave.sfondo}
        sfondoMobile={chiave.sfondoMobile}
      />

      <Sezione sezione={chiave.cosE} className="pt-16 md:pt-24 pb-12" />

      <FotoQuadrata foto={chiave.primaFoto} />

      {/* Senza foto il divisore chiude la sezione; con le foto va sotto l'ultima immagine. */}
      <Sezione sezione={chiave.come} className="pt-12 pb-16">
        {!conFoto && <Divider className="text-heading h-4 w-40" />}
      </Sezione>

      <FotoQuadrata foto={chiave.secondaFoto} />

      {conFoto && (
        <section className="flex flex-col items-center px-6 pt-4 pb-16 text-center">
          <Divider className="text-heading h-4 w-40" />
        </section>
      )}

      {destinatari && (
        <section className="flex flex-col items-center gap-14 px-6 py-16 text-center">
          <h2 className="font-heading text-heading text-3xl font-semibold tracking-wide">
            {destinatari.titolo}
          </h2>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 max-w-4xl">
            {destinatari.voci.map((voce, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <PillarIcon variant={ICONE[i % ICONE.length]} className="text-heading h-14 w-14" />
                <h3 className="font-heading text-heading text-sm font-semibold uppercase tracking-[0.03em]">
                  {voce.titolo}
                </h3>
                <p className="font-body text-base max-w-64">{voce.descrizione}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <InvitoFinale invito={chiave.invito} />

      <SiteFooter />
    </>
  );
}
