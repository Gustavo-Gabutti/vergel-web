"use client";

import { Sparkles, Eye } from "lucide-react";
import Image from "next/image";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number | null;
  description: string;
  image: string;
  weight: string;
  tags: string[];
  stock: boolean;
  isNew: boolean;
  isOffer: boolean;
}

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetail }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article
      onClick={() => onViewDetail(product)}
      className="bg-white rounded-lg border border-gray-100 flex flex-col overflow-hidden group cursor-pointer
                 shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-emerald-700"
    >
      {/* Contenedor de Imagen Reparado */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        
        {/* Renderizado de la Imagen Real de los productos */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-w-7xl) 25vw, (max-w-md) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay "Ver producto" al hacer hover */}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors
                     duration-200 flex items-center justify-center"
        >
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                       bg-white/95 text-gray-900 text-xs font-semibold
                       px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm"
          >
            <Eye size={13} /> Ver producto
          </span>
        </div>

        {/* Badges con Colores de Respaldo Seguros en Tailwind */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="bg-emerald-700 text-white text-[10px] font-bold
                             px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Sparkles size={10} /> NUEVO
            </span>
          )}
          {product.isOffer && discount > 0 && (
            <span className="bg-red-600 text-white text-[10px] font-bold
                             px-2 py-1 rounded-full shadow-sm">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <span className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">
          {product.category}
        </span>

        <h3 className="font-sans font-semibold text-gray-900 mt-1 leading-snug">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <span className="text-[11px] text-gray-400 mt-1">
          {product.weight}
        </span>

        {/* Precios con colores dinámicos estables */}
        <div className="mt-auto pt-3">
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through block">
              ${product.originalPrice.toLocaleString("es-AR")}
            </span>
          )}
          <span className={`font-sans font-bold text-lg
            ${product.isOffer ? "text-red-600" : "text-gray-900"}`}>
            ${product.price.toLocaleString("es-AR")}
          </span>
        </div>
      </div>
    </article>
  );
}