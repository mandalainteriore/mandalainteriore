import {
  defineArrayMember,
  defineField,
  defineType,
  type FieldDefinition,
} from "sanity";
import {
  campiHero,
  campoFoto,
  campoFrase,
  campoTesto,
  campoTitolo,
  hero,
} from "./comuni";

const invito = defineField({
  name: "invito",
  title: "Invito finale",
  type: "invito",
});
const seo = defineField({
  name: "seo",
  title: "Google e anteprime social",
  type: "seo",
});

// Ogni pagina è divisa in schede (in alto nel modulo), una per parte della pagina:
// si salta direttamente alla parte da modificare, senza aprire e chiudere riquadri.
type Scheda = [nome: string, titolo: string, campi: string[]];

function schede<T extends { fields: FieldDefinition[] }>(
  tipo: T,
  elenco: Scheda[],
): T {
  const gruppoDi = new Map(
    elenco.flatMap(([nome, , campi]) => campi.map((c) => [c, nome])),
  );
  return {
    ...tipo,
    groups: elenco.map(([name, title], i) => ({
      name,
      title,
      ...(i === 0 ? { default: true } : {}),
    })),
    fields: tipo.fields.map((campo) =>
      gruppoDi.has(campo.name)
        ? { ...campo, group: gruppoDi.get(campo.name) }
        : campo,
    ),
  };
}

const INVITO: Scheda = ["invito", "Invito finale", ["invito"]];
const GOOGLE: Scheda = ["google", "Google", ["seo"]];

const sezione = (name: string, title: string, fields: FieldDefinition[]) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: false },
    fields,
  });

export const homepage = schede(
  defineType({
    name: "homepage",
    title: "Homepage",
    type: "document",
    fields: [
      sezione("hero", "Apertura", [
        campoTitolo(),
        defineField({
          name: "sottotitolo",
          title: "Sottotitolo (in corsivo calligrafico)",
          type: "string",
        }),
        campoTesto("Testo (la frase in corsivo sopra è il motto, in “Impostazioni del sito”)"),
      ]),
      sezione("eventi", "Sezione Eventi", [campoTitolo(), campoFrase()]),
      sezione("chiavi", "Sezione Chiavi", [
        campoTitolo(),
        campoFrase(),
        campoTesto("Testo (le tre card si modificano in “Le tre chiavi”)"),
      ]),
      sezione("storia", "Sezione “La mia storia”", [
        campoTitolo(),
        campoFrase(),
        campoTesto(),
        campoFoto(),
      ]),
      sezione("mandala", "Sezione Mandala", [
        campoTitolo(),
        campoFrase(),
        campoTesto(),
        campoFoto("foto", "Foto (si vede in un cerchio)"),
      ]),
      invito,
      seo,
    ],
    preview: { prepare: () => ({ title: "Homepage" }) },
  }),
  [
    ["apertura", "Apertura", ["hero"]],
    ["eventi", "Eventi", ["eventi"]],
    ["chiavi", "Chiavi", ["chiavi"]],
    ["storia", "La mia storia", ["storia"]],
    ["mandala", "Mandala", ["mandala"]],
    INVITO,
    GOOGLE,
  ],
);

export const laMiaStoria = schede(
  defineType({
    name: "laMiaStoria",
    title: "La mia storia",
    type: "document",
    fields: [
      hero,
      sezione("primoBlocco", "Primo blocco (foto a sinistra)", [
        campoTesto(),
        campoFoto(),
      ]),
      sezione("secondoBlocco", "Secondo blocco (foto a destra)", [
        campoTesto(),
        campoFoto(),
      ]),
      sezione("approccio", "Il mio approccio", [
        campoTitolo(),
        campoFrase(),
        defineField({
          name: "valori",
          title: "Principi",
          description: "Al massimo tre: ognuno ha la sua icona, nell'ordine.",
          type: "array",
          validation: (r) => r.max(3),
          of: [
            defineArrayMember({
              type: "object",
              name: "valore",
              fields: [
                campoTitolo(),
                defineField({
                  name: "descrizione",
                  title: "Descrizione",
                  type: "text",
                  rows: 4,
                }),
              ],
            }),
          ],
        }),
      ]),
      sezione("studi", "I miei studi", [
        campoTitolo(),
        campoFrase(),
        defineField({
          name: "elenco",
          title: "Formazione",
          description: "Dal più recente al più vecchio.",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "studio",
              fields: [
                defineField({
                  name: "anni",
                  title: "Anni",
                  type: "string",
                  validation: (r) => r.required(),
                }),
                campoTitolo(),
                defineField({
                  name: "dove",
                  title: "Scuola o insegnante",
                  type: "string",
                }),
              ],
              preview: { select: { title: "titolo", subtitle: "anni" } },
            }),
          ],
        }),
        campoTesto("Testo sotto l'elenco"),
        campoFoto(),
      ]),
      invito,
      seo,
    ],
    preview: { prepare: () => ({ title: "La mia storia" }) },
  }),
  [
    ["apertura", "Apertura", ["hero"]],
    ["racconto", "Racconto", ["primoBlocco", "secondoBlocco"]],
    ["approccio", "Il mio approccio", ["approccio"]],
    ["studi", "I miei studi", ["studi"]],
    INVITO,
    GOOGLE,
  ],
);

export const percorsi = schede(
  defineType({
    name: "percorsi",
    title: "Percorsi",
    type: "document",
    fields: [
      hero,
      defineField({
        name: "frase",
        title: "Frase introduttiva",
        description: "Sotto compaiono in automatico le tre chiavi.",
        type: "text",
        rows: 3,
      }),
      defineField({
        name: "percorsi",
        title: "Percorsi",
        description: "Si alternano foto a sinistra e foto a destra.",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "percorso",
            fields: [
              campoTitolo(),
              campoFrase(),
              campoTesto(),
              defineField({
                name: "titoloElenco",
                title: "Titolo sopra l'elenco (facoltativo)",
                type: "string",
              }),
              defineField({
                name: "elenco",
                title: "Elenco",
                type: "array",
                of: [defineArrayMember({ type: "string" })],
              }),
              campoFoto("foto", "Foto (formato orizzontale 3:2)"),
            ],
            preview: {
              select: { title: "titolo", subtitle: "frase", media: "foto" },
            },
          }),
        ],
      }),
      invito,
      seo,
    ],
    preview: { prepare: () => ({ title: "Percorsi" }) },
  }),
  [
    ["apertura", "Apertura", ["hero", "frase"]],
    ["percorsi", "Percorsi", ["percorsi"]],
    INVITO,
    GOOGLE,
  ],
);

// Foto e riquadri extra esistono solo nella pagina "Mandala – Creatività consapevole".
const soloMandala = ({ document }: { document?: { _id?: string } }) =>
  !document?._id?.endsWith("chiave-mandala");

export const chiave = schede(
  defineType({
    name: "chiave",
    title: "Chiave",
    type: "document",
    fields: [
      campoTitolo(),
      defineField({
        name: "titoloPagina",
        title: "Titolo in apertura della pagina (facoltativo)",
        description: "Solo se diverso dal titolo usato nelle card e nel menu.",
        type: "string",
      }),
      defineField({
        name: "sottotitolo",
        title: "Sottotitolo (facoltativo)",
        type: "string",
      }),
      defineField({
        name: "descrizione",
        title: "Testo della card in homepage",
        type: "text",
        rows: 3,
        validation: (r) => r.required(),
      }),
      defineField({
        name: "sintesi",
        title: "Riassunto nella pagina Percorsi",
        description: "Una frase breve.",
        type: "text",
        rows: 2,
        validation: (r) => r.required(),
      }),
      ...campiHero,
      sezione("cosE", "Prima sezione (Cos’è)", [
        campoTitolo(),
        campoFrase("Frase in corsivo (facoltativa)"),
        campoTesto(),
      ]),
      defineField({
        name: "primaFoto",
        title: "Foto dopo la prima sezione",
        type: "foto",
        hidden: soloMandala,
      }),
      sezione("come", "Seconda sezione (Come si svolge)", [
        campoTitolo(),
        campoFrase("Frase in corsivo (facoltativa)"),
        campoTesto(),
      ]),
      defineField({
        name: "secondaFoto",
        title: "Foto dopo la seconda sezione",
        type: "foto",
        hidden: soloMandala,
      }),
      defineField({
        name: "destinatari",
        title: "A chi si rivolge",
        type: "object",
        hidden: soloMandala,
        fields: [
          campoTitolo(),
          defineField({
            name: "voci",
            title: "Riquadri",
            description: "Al massimo tre: ognuno ha la sua icona, nell'ordine.",
            type: "array",
            validation: (r) => r.max(3),
            of: [
              defineArrayMember({
                type: "object",
                name: "voce",
                fields: [
                  campoTitolo(),
                  defineField({
                    name: "descrizione",
                    title: "Descrizione",
                    type: "text",
                    rows: 3,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      invito,
      seo,
    ],
    preview: { select: { title: "titolo", subtitle: "sottotitolo" } },
  }),
  [
    [
      "card",
      "Titolo e card",
      ["titolo", "titoloPagina", "sottotitolo", "descrizione", "sintesi"],
    ],
    ["apertura", "Immagine di apertura", ["sfondo", "sfondoMobile"]],
    [
      "contenuti",
      "Contenuti",
      ["cosE", "primaFoto", "come", "secondaFoto", "destinatari"],
    ],
    INVITO,
    GOOGLE,
  ],
);

export const paginaMandala = schede(
  defineType({
    name: "paginaMandala",
    title: "Pagina Mandala",
    type: "document",
    fields: [
      hero,
      campoFrase("Frase introduttiva in corsivo"),
      campoTesto(),
      defineField({
        name: "testoGalleria",
        title: "Testo sopra la galleria",
        type: "testoRicco",
      }),
      invito,
      seo,
    ],
    preview: { prepare: () => ({ title: "Pagina Mandala" }) },
  }),
  [
    ["apertura", "Apertura", ["hero"]],
    ["testi", "Testi", ["frase", "testo", "testoGalleria"]],
    INVITO,
    GOOGLE,
  ],
);

export const contatti = schede(
  defineType({
    name: "contatti",
    title: "Contatti",
    type: "document",
    fields: [
      hero,
      campoFrase("Frase accanto al modulo"),
      defineField({
        name: "email",
        title: "Email",
        description:
          "Quella mostrata in pagina. I messaggi del modulo arrivano all'indirizzo impostato sul server.",
        type: "string",
        validation: (r) => r.required().email(),
      }),
      defineField({
        name: "telefono",
        title: "Telefono",
        type: "string",
        validation: (r) => r.required(),
      }),
      seo,
    ],
    preview: { prepare: () => ({ title: "Contatti" }) },
  }),
  [
    ["apertura", "Apertura", ["hero"]],
    ["recapiti", "Recapiti", ["frase", "email", "telefono"]],
    GOOGLE,
  ],
);

export const impostazioni = defineType({
  name: "impostazioni",
  title: "Impostazioni del sito",
  type: "document",
  fields: [
    defineField({
      name: "motto",
      title: "Motto",
      description:
        "Compare in apertura della homepage e sotto il logo in fondo a ogni pagina.",
      type: "string",
      validation: (r) => r.max(60).warning("Meglio breve: una riga."),
    }),
    defineField({
      name: "instagram",
      title: "Profilo Instagram",
      description: "Indirizzo completo. Se vuoto, l'icona non compare.",
      type: "url",
    }),
    defineField({
      name: "facebook",
      title: "Profilo Facebook",
      description: "Indirizzo completo. Se vuoto, l'icona non compare.",
      type: "url",
    }),
  ],
  preview: { prepare: () => ({ title: "Impostazioni del sito" }) },
});

export const privacy = schede(
  defineType({
    name: "privacy",
    title: "Privacy Policy",
    type: "document",
    fields: [
      campoTitolo(),
      defineField({
        name: "aggiornamento",
        title: "Data dell'ultimo aggiornamento",
        type: "date",
        options: { dateFormat: "DD/MM/YYYY" },
        validation: (r) => r.required(),
      }),
      defineField({
        name: "introduzione",
        title: "Introduzione",
        type: "testoRicco",
      }),
      defineField({
        name: "sezioni",
        title: "Sezioni",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "sezione",
            fields: [campoTitolo(), campoTesto()],
            preview: { select: { title: "titolo" } },
          }),
        ],
      }),
      seo,
    ],
    preview: { prepare: () => ({ title: "Privacy Policy" }) },
  }),
  [
    ["testo", "Testo", ["titolo", "aggiornamento", "introduzione", "sezioni"]],
    GOOGLE,
  ],
);
