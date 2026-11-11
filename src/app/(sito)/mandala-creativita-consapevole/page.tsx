import PaginaChiave, { metadatiChiave } from "@/components/PaginaChiave";

export const generateMetadata = () => metadatiChiave("chiave-mandala");

export default function MandalaCreativitaConsapevole() {
  return <PaginaChiave id="chiave-mandala" />;
}
