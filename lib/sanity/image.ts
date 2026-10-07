import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

// Inicializamos el generador de URLs con la configuración del cliente de Sanity
const builder = createImageUrlBuilder(client);

// Función auxiliar que convierte la referencia de imagen de Sanity en una URL web real
export function urlForImage(source: any) {
  if (!source) return "/images/logo-vergel.jpg"; // Foto por defecto si no hay imagen
  return builder.image(source).auto("format").fit("max").url();
}