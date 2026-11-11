import PaginaChiave, { metadatiChiave } from "@/components/PaginaChiave";

export const generateMetadata = () => metadatiChiave("chiave-yoga");

export default function YogaAnukalanaMeditazione() {
  return <PaginaChiave id="chiave-yoga" />;
}
