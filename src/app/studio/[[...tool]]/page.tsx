// Pannello di gestione dei contenuti (Sanity Studio).
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import CaricamentoStudio from "@/sanity/studio/CaricamentoStudio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function PaginaStudio() {
  return (
    <>
      <CaricamentoStudio />
      {/* Sempre in modalità chiara: i colori del sito sono pensati su fondo chiaro. */}
      <NextStudio config={config} scheme="light" />
    </>
  );
}
