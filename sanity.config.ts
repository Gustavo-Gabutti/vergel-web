import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { projectId, dataset } from "./lib/sanity/client";

export default defineConfig({
  name: "vergel-studio",
  title: "Vergel — Panel de Administración",
  projectId,
  dataset,
  basePath: "/studio", // Define la URL tuweb.com/studio
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});