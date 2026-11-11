import PaginaChiave, { metadatiChiave } from "@/components/PaginaChiave";

export const generateMetadata = () => metadatiChiave("chiave-counseling");

export default function CounselingTranspersonale() {
  return <PaginaChiave id="chiave-counseling" />;
}
