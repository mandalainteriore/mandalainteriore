import { defineArrayMember, defineField, defineType } from "sanity";

// Foto con punto focale e testo alternativo per chi non vede.
export const foto = defineType({
  name: "foto",
  title: "Foto",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Descrizione della foto",
      description: "Breve frase su cosa mostra la foto: la leggono i non vedenti e Google.",
      type: "string",
    }),
  ],
});

// Sfondo decorativo: niente descrizione.
export const sfondo = defineType({
  name: "sfondo",
  title: "Sfondo",
  type: "image",
  options: { hotspot: true },
});

// Paragrafi con grassetto, corsivo, link ed elenchi puntati.
export const testoRicco = defineType({
  name: "testoRicco",
  title: "Testo",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Paragrafo", value: "normal" }],
      lists: [{ title: "Elenco puntato", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Grassetto", value: "strong" },
          { title: "Corsivo", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "Indirizzo",
                description: "Es. https://… oppure mailto:nome@esempio.it",
                type: "url",
                validation: (r) =>
                  r.required().uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
              }),
            ],
          }),
        ],
      },
    }),
  ],
});

export const invito = defineType({
  name: "invito",
  title: "Invito finale",
  description: "Il riquadro con il logo e il pulsante verso i contatti, in fondo alla pagina.",
  type: "object",
  options: { collapsible: false },
  fields: [
    defineField({ name: "titolo", title: "Titolo", type: "string", validation: (r) => r.required() }),
    defineField({ name: "frase", title: "Frase", type: "text", rows: 2 }),
    defineField({ name: "pulsante", title: "Testo del pulsante", type: "string", validation: (r) => r.required() }),
  ],
});

export const seo = defineType({
  name: "seo",
  title: "Google e anteprime social",
  type: "object",
  options: { collapsible: false },
  fields: [
    defineField({
      name: "titolo",
      title: "Titolo nella scheda del browser",
      description: "Facoltativo: se vuoto si usa il titolo della pagina.",
      type: "string",
    }),
    defineField({
      name: "descrizione",
      title: "Descrizione per Google",
      description: "Una o due frasi (circa 150 caratteri) che compaiono sotto il titolo nei risultati di ricerca.",
      type: "text",
      rows: 3,
      validation: (r) => r.max(200).warning("Google mostra circa 155 caratteri."),
    }),
  ],
});

// Campi ricorrenti
export const campoTitolo = (name = "titolo", title = "Titolo") =>
  defineField({ name, title, type: "string", validation: (r) => r.required() });
export const campoFrase = (title = "Frase in corsivo") =>
  defineField({ name: "frase", title, type: "text", rows: 2 });
export const campoTesto = (title = "Testo") => defineField({ name: "testo", title, type: "testoRicco" });
export const campoFoto = (name = "foto", title = "Foto") =>
  defineField({ name, title, type: "foto", validation: (r) => r.required() });

export const campiHero = [
  defineField({
    name: "sfondo",
    title: "Immagine di apertura",
    description: "Formato orizzontale, almeno 2000 pixel di larghezza.",
    type: "sfondo",
    validation: (r) => r.required(),
  }),
  defineField({
    name: "sfondoMobile",
    title: "Immagine di apertura per telefono",
    description: "Facoltativa, verticale. Se manca, sul telefono si ritaglia quella orizzontale.",
    type: "sfondo",
  }),
];

export const hero = defineField({
  name: "hero",
  title: "Apertura della pagina",
  type: "object",
  options: { collapsible: false },
  fields: [campoTitolo(), ...campiHero],
});
