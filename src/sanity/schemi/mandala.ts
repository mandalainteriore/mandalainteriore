import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const mandala = defineType({
  name: "mandala",
  title: "Mandala",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "mandala" }),
    defineField({
      name: "titolo",
      title: "Titolo",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "immagine",
      title: "Immagine",
      description: "Nella galleria si vede quadrata; aprendola si vede intera.",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descrizione",
      title: "Descrizione",
      description: "Facoltativa. Lascia una riga vuota per andare a capo con un nuovo paragrafo.",
      type: "text",
      rows: 8,
    }),
  ],
  preview: { select: { title: "titolo", media: "immagine" } },
});
