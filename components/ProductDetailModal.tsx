"use client";

import { useState, useEffect } from "react";
import { X, Minus, Plus, ShoppingCart, Tag } from "lucide-react";
import { Product } from "./ProductCard";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) setQuantity(1);
  }, [isOpen, product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity((prev) => Math.min(99, prev + 1));

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  // Mapeo de tags a etiquetas visuales amigables
  const TAG_LABELS: Record<string, { label: string; color: string }> = {
    "organico":      { label: "Orgánico",   color: "bg-green-100 text-green-800 border-green-200" },
    "celiaco":       { label: "Sin TACC",   color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    "sin-azucar":    { label: "Sin Azúcar", color: "bg-blue-100 text-blue-800 border-blue-200" },
    "vegano":        { label: "Vegano",     color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
    "superalimento": { label: "Superalimento", color: "bg-purple-100 text-purple-800 border-purple-200" },
    "artesanal":     { label: "Artesanal",  color: "bg-orange-100 text-orange-800 border-orange-200" },
    "gourmet":       { label: "Gourmet",    color: "bg-rose-100 text-rose-800 border-rose-200" },
    "proteina":      { label: "Alto Proteína", color: "bg-cyan-100 text-cyan-800 border-cyan-200" },
    "natural":       { label: "Natural",    color: "bg-lime-100 text-lime-800 border-lime-200" },
  };

  const visibleTags = (product.tags ?? [])
    .map((t) => TAG_LABELS[t])
    .filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-vergel shadow-xl
                   border border-vergel-sand/50 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white hover:bg-vergel-off-white text-vergel-charcoal
                     p-2 rounded-full shadow-md border border-vergel-sand/50 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-vergel-olive"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        {/* Imagen */}
        <div className="relative aspect-square sm:aspect-[4/3] bg-vergel-off-white border-b border-vergel-sand/40 flex items-center justify-center">
          <span className="text-8xl">🌿</span>
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-vergel-olive text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                NUEVO
              </span>
            )}
            {product.isOffer && discount > 0 && (
              <span className="bg-vergel-alert text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Contenido */}
        <div className="p-5 sm:p-6">
          <span className="text-xs uppercase tracking-wider text-vergel-gray-light font-medium">
            {product.category}
          </span>

          <h2 className="font-display font-bold text-2xl text-vergel-charcoal mt-1">
            {product.name}
          </h2>

          {/* Badges de tags — solo si hay tags mapeables */}
          {visibleTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {visibleTags.map(({ label, color }) => (
                <span
                  key={label}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${color}`}
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          <p className="text-sm text-vergel-gray mt-3 leading-relaxed">
            {product.description}
          </p>

          <p className="text-xs text-vergel-gray-light mt-1">{product.weight}</p>

          {/* Precio */}
          <div className="flex items-end gap-2 mt-4">
            {product.originalPrice && (
              <span className="text-sm text-vergel-gray-light line-through">
                ${product.originalPrice.toLocaleString("es-AR")}
              </span>
            )}
            <span className={`font-display font-bold text-3xl ${product.isOffer ? "text-vergel-alert" : "text-vergel-charcoal"}`}>
              ${product.price.toLocaleString("es-AR")}
            </span>
          </div>

          {/* Banner promocional */}
          <div className="mt-4 flex items-center gap-2 bg-vergel-olive/10 border border-vergel-olive/30
                         text-vergel-olive-dark rounded-vergel px-4 py-3">
            <Tag size={18} className="flex-shrink-0" />
            <p className="text-sm font-semibold leading-snug">
              ¡LLEVÁ MÁS, PAGÁ MENOS! 15% OFF comprando 4 o más
            </p>
          </div>

          {/* Selector de cantidad */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-sm font-medium text-vergel-charcoal">Cantidad</span>
            <div className="flex items-center gap-3 bg-white border border-vergel-sand rounded-vergel px-2 py-1.5">
              <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="p-1.5 rounded-full hover:bg-vergel-off-white transition-colors
                           disabled:opacity-30 disabled:cursor-not-allowed
                           focus:outline-none focus:ring-2 focus:ring-vergel-olive"
                aria-label="Disminuir cantidad"
              >
                <Minus size={16} />
              </button>
              <span className="font-display font-semibold text-lg w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="p-1.5 rounded-full hover:bg-vergel-off-white transition-colors
                           focus:outline-none focus:ring-2 focus:ring-vergel-olive"
                aria-label="Aumentar cantidad"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Botón agregar al carrito */}
          <button
            onClick={handleAdd}
            disabled={!product.stock}
            className="w-full mt-6 flex items-center justify-center gap-2 text-base py-3 bg-[#606c38] hover:bg-[#283618] text-white font-semibold rounded-[var(--radius-vergel)] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={18} />
            {product.stock
              ? `Agregar al carrito — $${(product.price * quantity).toLocaleString("es-AR")}`
              : "Sin stock"}
          </button>
        </div>
      </div>
    </div>
  );
}