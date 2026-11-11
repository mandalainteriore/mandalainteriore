"use client";

// Configurazione del pannello di Sanity, raggiungibile su /studio.
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { itITLocale } from "@sanity/locale-it-it";
import { HomeIcon } from "@sanity/icons/Home";
import { dataset, projectId } from "./src/sanity/env";
import { tipi, tipiUnici } from "./src/sanity/schemi";
import { struttura } from "./src/sanity/struttura";
import { Logo, tema } from "./src/sanity/studio/aspetto";
import { Guida } from "./src/sanity/studio/Guida";
import { LayoutStudio } from "./src/sanity/studio/LayoutStudio";

// Sulle pagine uniche restano solo pubblica, annulla modifiche e ripristina versione.
const AZIONI_PAGINE = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "mandala-interiore",
  title: "Mandala Interiore",
  icon: Logo,
  theme: tema,
  studio: { components: { layout: LayoutStudio } },
  // Funzioni avanzate di Sanity che qui non servono e confonderebbero.
  releases: { enabled: false },
  scheduledDrafts: { enabled: false },
  scheduledPublishing: { enabled: false },
  tasks: { enabled: false },
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: tipi,
    // Le pagine uniche non compaiono tra i "nuovi documenti".
    templates: (modelli) => modelli.filter(({ schemaType }) => !tipiUnici.has(schemaType)),
  },
  plugins: [structureTool({ title: "Contenuti", structure: struttura }), itITLocale()],
  // La guida è il primo strumento: il pannello si apre lì.
  tools: (strumenti) => [
    { name: "guida", title: "Benvenuta", icon: HomeIcon, component: Guida },
    ...strumenti,
  ],
  document: {
    newDocumentOptions: (prev) => prev.filter((o) => ["mandala", "evento"].includes(o.templateId)),
    actions: (prev, { schemaType }) =>
      tipiUnici.has(schemaType) ? prev.filter(({ action }) => action && AZIONI_PAGINE.has(action)) : prev,
  },
});
