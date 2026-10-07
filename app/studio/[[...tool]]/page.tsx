"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export default function StudioPage() {
  // Carga e incrusta la interfaz interactiva de Sanity Studio
  return <NextStudio config={config} />;
}