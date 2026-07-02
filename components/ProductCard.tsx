"use client";

import { Sparkles, Eye } from "lucide-react";

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
      className="card-product flex flex-col overflow-hidden group cursor-pointer
                 focus-within:ring-2 focus-within:ring-vergel-olive"
    >
      {/* Imagen */}
      <div className="relative aspect-square bg-vergel-off-white overflow-hidden">
        {/* Placeholder visual — reemplazar con <Image /> de next/image */}
        <div className="w-full h-full flex items-center justify-center text-vergel-gray-light">
          <span className="text-6xl">🌿</span>
        </div>

        {/* Overlay "Ver producto" al hacer hover */}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors
                     duration-200 flex items-center justify-center"
        >
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                       bg-white/90 text-vergel-charcoal text-xs font-semibold
                       px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm"
          >
            <Eye size={13} /> Ver producto
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-vergel-olive text-white text-[10px] font-bold
                             px-2 py-1 rounded-full flex items-center gap-1">
              <Sparkles size={10} /> NUEVO
            </span>
          )}
          {product.isOffer && discount > 0 && (
            <span className="bg-vergel-alert text-white text-[10px] font-bold
                             px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <span className="text-[11px] uppercase tracking-wider text-vergel-gray-light font-medium">
          {product.category}
        </span>

        <h3 className="font-display font-semibold text-vergel-charcoal mt-1 leading-snug">
          {product.name}
        </h3>

        <p className="text-xs text-vergel-gray mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <span className="text-[11px] text-vergel-gray-light mt-1">
          {product.weight}
        </span>

        {/* Precio */}
        <div className="mt-auto pt-3">
          {product.originalPrice && (
            <span className="text-xs text-vergel-gray-light line-through block">
              ${product.originalPrice.toLocaleString("es-AR")}
            </span>
          )}
          <span className={`font-display font-bold text-lg
            ${product.isOffer ? "text-vergel-alert" : "text-vergel-charcoal"}`}>
            ${product.price.toLocaleString("es-AR")}
          </span>
        </div>
      </div>
    </article>
  );
}