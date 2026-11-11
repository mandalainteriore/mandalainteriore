import { defineArrayMember, defineField, defineType } from "sanity";

export const evento = defineType({
  name: "evento",
  title: "Evento",
  type: "document",
  fields: [
    defineField({
      name: "titolo",
      title: "Titolo",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Indirizzo della pagina",
      description: "Premi “Genera” dopo aver scritto il titolo. Diventa /eventi/…",
      type: "slug",
      options: { source: "titolo", maxLength: 80 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "data",
      title: "Data",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "luogo",
      title: "Luogo",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "immagine",
      title: "Locandina",
      description: "Formato verticale 2:3 (ad esempio 1000 × 1500 pixel).",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descrizione",
      title: "Breve descrizione",
      description: "Una o due frasi, mostrate nella card dell'evento.",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "contenuto",
      title: "Testo della pagina",
      description: "Un riquadro per paragrafo.",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
  ],
  orderings: [
    { title: "Data, più recente", name: "dataDesc", by: [{ field: "data", direction: "desc" }] },
  ],
  preview: {
    select: { title: "titolo", data: "data", luogo: "luogo", media: "immagine" },
    prepare: ({ title, data, luogo, media }) => ({
      title,
      subtitle: [data && new Date(data).toLocaleDateString("it-IT"), luogo].filter(Boolean).join(" · "),
      media,
    }),
  },
});
