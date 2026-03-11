"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Sparkles } from "lucide-react";

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
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <article className="card-product flex flex-col overflow-hidden group">
      {/* Imagen */}
      <div className="relative aspect-square bg-vergel-sand/40 overflow-hidden">
        {/* Skeleton / placeholder mientras carga */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center
                          bg-vergel-sand/30 animate-pulse">
            <span className="text-4xl opacity-40">🌿</span>
          </div>
        )}

        {/* Fallback si la imagen falla */}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center
                          bg-vergel-sand/30 text-vergel-gray-light">
            <span className="text-5xl mb-1">🌿</span>
            <span className="text-[10px]">Imagen no disponible</span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={`${product.name} - ${product.category} - ${product.weight}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`
              object-cover
              transition-all duration-500
              group-hover:scale-105
              ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span
              className="bg-vergel-olive text-white text-[10px] font-bold
                         px-2 py-1 rounded-full flex items-center gap-1"
            >
              <Sparkles size={10} /> NUEVO
            </span>
          )}
          {product.isOffer && discount > 0 && (
            <span
              className="bg-vergel-alert text-white text-[10px] font-bold
                         px-2 py-1 rounded-full"
            >
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

        {/* Precio + CTA */}
        <div className="mt-auto pt-3 flex items-end justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-xs text-vergel-gray-light line-through block">
                ${product.originalPrice.toLocaleString("es-AR")}
              </span>
            )}
            <span
              className={`font-display font-bold text-lg
                ${product.isOffer ? "text-vergel-alert" : "text-vergel-charcoal"}`}
            >
              ${product.price.toLocaleString("es-AR")}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.stock}
            className="bg-vergel-olive text-white p-2.5 rounded-vergel
                       hover:bg-vergel-olive-dark transition-colors duration-200
                       disabled:opacity-40 disabled:cursor-not-allowed
                       focus:outline-none focus:ring-2 focus:ring-vergel-olive focus:ring-offset-2"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}