import { client } from "./client";
import { urlForImage } from "./image";
import { Product } from "@/components/ProductCard";

export async function getProductsFromSanity(): Promise<Product[]> {
  // Consulta en lenguaje GROQ (Sanity) para traer productos con stock disponible
  const query = `*[_type == "product" && stock == true] {
    "id": _id,
    name,
    "slug": slug.current,
    category,
    price,
    originalPrice,
    description,
    image,
    "images": images[],
    weight,
    tags,
    stock,
    isNew,
    isOffer
  }`;

  const rawProducts = await client.fetch(query);

  // Mapeamos los datos para convertir las imágenes de Sanity a URLs web legibles
  return rawProducts.map((p: any) => ({
    ...p,
    image: urlForImage(p.image),
    images: p.images ? p.images.map((img: any) => urlForImage(img)) : [urlForImage(p.image)],
  }));
}