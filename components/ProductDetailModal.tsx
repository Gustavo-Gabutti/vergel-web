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

const TAG_LABELS: Record<string, { label: string; color: string }> = {
  "organico":      { label: "Orgánico",      color: "bg-green-100 text-green-800 border-green-200" },
  "celiaco":       { label: "Sin TACC",      color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  "sin-azucar":    { label: "Sin Azúcar",    color: "bg-blue-100 text-blue-800 border-blue-200" },
  "vegano":        { label: "Vegano",        color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  "superalimento": { label: "Superalimento", color: "bg-purple-100 text-purple-800 border-purple-200" },
  "artesanal":     { label: "Artesanal",     color: "bg-orange-100 text-orange-800 border-orange-200" },
  "gourmet":       { label: "Gourmet",       color: "bg-rose-100 text-rose-800 border-rose-200" },
  "proteina":      { label: "Alto Proteína", color: "bg-cyan-100 text-cyan-800 border-cyan-200" },
  "natural":       { label: "Natural",       color: "bg-lime-100 text-lime-800 border-lime-200" },
};

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
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const visibleTags = (product.tags ?? []).map((t) => TAG_LABELS[t]).filter(Boolean);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-xl shadow-xl
                   border border-gray-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white hover:bg-gray-50 text-gray-700
                     p-2 rounded-full shadow-md border border-gray-200 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-emerald-700"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        {/* ── Imagen real del producto ── */}
        <div className="relative aspect-square sm:aspect-[4/3] bg-gray-50 border-b border-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {/* Badges sobre la imagen */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {product.isNew && (
              <span className="bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                NUEVO
              </span>
            )}
            {product.isOffer && discount > 0 && (
              <span className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Contenido */}
        <div className="p-5 sm:p-6">
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            {product.category}
          </span>

          <h2 className="font-sans font-bold text-2xl text-gray-900 mt-1">
            {product.name}
          </h2>

          {/* Badges de tags */}
          {visibleTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {visibleTags.map(({ label, color }) => (
                <span key={label} className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${color}`}>
                  {label}
                </span>
              ))}
            </div>
          )}

          <p className="text-sm text-gray-500 mt-3 leading-relaxed">{product.description}</p>
          <p className="text-xs text-gray-400 mt-1">{product.weight}</p>

          {/* Precio */}
          <div className="flex items-end gap-2 mt-4">
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toLocaleString("es-AR")}
              </span>
            )}
            <span className={`font-sans font-bold text-3xl ${product.isOffer ? "text-red-600" : "text-gray-900"}`}>
              ${product.price.toLocaleString("es-AR")}
              <span className="text-sm font-normal text-gray-400 ml-1">c/u</span>
            </span>
          </div>

          {/* Banner promocional */}
          <div className="mt-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3">
            <Tag size={18} className="flex-shrink-0" />
            <p className="text-sm font-semibold leading-snug">
              ¡LLEVÁ MÁS, PAGÁ MENOS! 15% OFF comprando 4 o más
            </p>
          </div>

          {/* Selector de cantidad */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-sm font-medium text-gray-900">Cantidad</span>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-2 py-1.5">
              <button
                onClick={() => setQuantity((p) => Math.max(1, p - 1))}
                disabled={quantity <= 1}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors
                           disabled:opacity-30 disabled:cursor-not-allowed
                           focus:outline-none focus:ring-2 focus:ring-emerald-700"
                aria-label="Disminuir cantidad"
              >
                <Minus size={16} />
              </button>
              <span className="font-sans font-semibold text-lg w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((p) => Math.min(99, p + 1))}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-emerald-700"
                aria-label="Aumentar cantidad"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Botón agregar */}
          <button
            onClick={handleAdd}
            disabled={!product.stock}
            className="w-full mt-6 flex items-center justify-center gap-2 text-base py-3
                       bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl
                       transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
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