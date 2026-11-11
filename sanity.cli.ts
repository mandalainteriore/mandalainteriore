// Configurazione per i comandi da terminale di Sanity (es. npx sanity schema validate).
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId: "7zhx02ln", dataset: "production" },
});
