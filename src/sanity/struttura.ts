import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const pagina = (S: StructureBuilder, tipo: string, titolo: string, id = tipo) =>
  S.listItem()
    .id(id)
    .title(titolo)
    .schemaType(tipo)
    .child(S.document().schemaType(tipo).documentId(id).title(titolo));

// Menu del pannello: prima le pagine, poi galleria ed eventi, infine impostazioni e privacy.
export const struttura: StructureResolver = (S, context) =>
  S.list()
    .title("Contenuti del sito")
    .items([
      pagina(S, "homepage", "Homepage"),
      pagina(S, "laMiaStoria", "La mia storia"),
      pagina(S, "percorsi", "Percorsi"),
      S.listItem()
        .id("chiavi")
        .title("Le tre chiavi")
        .child(
          S.list()
            .title("Le tre chiavi")
            .items([
              pagina(S, "chiave", "Counseling transpersonale", "chiave-counseling"),
              pagina(S, "chiave", "Yoga Anukalana e meditazione", "chiave-yoga"),
              pagina(S, "chiave", "Mandala – Creatività consapevole", "chiave-mandala"),
            ]),
        ),
      pagina(S, "paginaMandala", "Pagina Mandala"),
      orderableDocumentListDeskItem({ type: "mandala", title: "Mandala – galleria", S, context }),
      S.documentTypeListItem("evento").title("Eventi"),
      pagina(S, "contatti", "Contatti"),
      S.divider(),
      pagina(S, "impostazioni", "Impostazioni del sito"),
      pagina(S, "privacy", "Privacy Policy"),
    ]);
