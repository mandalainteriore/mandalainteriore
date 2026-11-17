import Navbar from "./Navbar";
import { leggiChiavi } from "@/sanity/pagine";

/** Barra di navigazione con i nomi delle tre chiavi presi dal pannello. */
export default async function NavbarSito() {
  const chiavi = await leggiChiavi();
  return (
    <Navbar
      chiavi={chiavi.map((chiave) => ({ titolo: chiave.titoloMenu || chiave.titolo, href: chiave.href }))}
    />
  );
}
