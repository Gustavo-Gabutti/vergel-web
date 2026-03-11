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
    <nav className="bg-white border-b border-vergel-sand/60" aria-label="Categorías de productos">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const isOfertas = cat === "OFERTAS";

            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-vergel text-sm font-medium
                  transition-all duration-200 whitespace-nowrap
                  ${isActive
                    ? "bg-vergel-olive text-white shadow-sm"
                    : isOfertas
                      ? "bg-vergel-alert/10 text-vergel-alert hover:bg-vergel-alert/20 font-semibold"
                      : "text-vergel-gray hover:bg-vergel-off-white hover:text-vergel-charcoal"
                  }
                `}
              >
                {isOfertas && <Tag size={14} className="inline mr-1 -mt-0.5" />}
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}