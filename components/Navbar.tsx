"use client";

import { Tag } from "lucide-react";

const categories = [
  "Todos",
  "Mixes",
  "Frutos Secos",
  "Fruta Deshidratada",
  "Té e Infusiones",
  "Sin Gluten",
  "Especias",
  "Repostería",
  "Desayuno",
  "Gourmet",
  "Semillas",
  "Cereales y Legumbres",
  "OFERTAS",
];

interface NavbarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Navbar({ activeCategory, onCategoryChange }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40" aria-label="Categorías de productos">
      <div className="max-w-7xl mx-auto px-4">
        {/* Agregamos scroll sutil y eliminamos barras por defecto */}
        <div className="flex gap-2 overflow-x-auto py-3.5 scrollbar-hide items-center">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const isOfertas = cat === "OFERTAS";

            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`
                  relative flex-shrink-0 px-3 py-1.5 text-sm font-medium
                  transition-all duration-200 whitespace-nowrap rounded-md
                  ${isActive
                    ? "text-neutral-900 font-semibold" // Categoría seleccionada: Texto oscuro y nítido, sin caja blanca
                    : isOfertas
                      ? "text-red-600 hover:bg-red-50 font-semibold" // Ofertas destacadas sutilmente
                      : "text-gray-400 hover:text-neutral-600" // No activas: Gris más tenue que se oscurece al pasar el mouse
                  }
                `}
              >
                {isOfertas && <Tag size={13} className="inline mr-1 -mt-0.5" />}
                
                <span>{cat}</span>

                {/* Línea inferior minimalista solo para el activo (reemplaza al cuadrado molesto) */}
                {isActive && !isOfertas && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-neutral-800 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}