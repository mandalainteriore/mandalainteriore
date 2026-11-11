// Sanity chiama questo indirizzo (webhook) ogni volta che Roxana pubblica una modifica:
// il sito butta via la copia in cache dei contenuti e le pagine si rigenerano subito.
import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { ETICHETTA_CACHE } from "@/sanity/client";

export async function POST(request: NextRequest) {
  const segreto = process.env.SANITY_REVALIDATE_SECRET;
  if (!segreto) {
    console.error("Aggiornamento: manca SANITY_REVALIDATE_SECRET");
    return Response.json({ errore: "Non configurato." }, { status: 500 });
  }

  // Controlla la firma (solo Sanity conosce il segreto) e aspetta che il contenuto
  // pubblicato sia disponibile ovunque prima di rigenerare.
  const { isValidSignature, body } = await parseBody<{ _type?: string; _id?: string }>(
    request,
    segreto,
    true,
  );
  if (!isValidSignature) {
    return Response.json({ errore: "Firma non valida." }, { status: 401 });
  }

  // Il sito è piccolo: si rinnova tutto, così cambiano insieme anche menu, card e footer.
  revalidateTag(ETICHETTA_CACHE, { expire: 0 });
  return Response.json({ aggiornato: true, documento: body?._id ?? null });
}
