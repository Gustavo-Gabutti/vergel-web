"use client";

import { SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  totalProducts: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterBar({ totalProducts, sortBy, onSortChange }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between
                    gap-3 py-4 border-b border-vergel-sand/50">
      <p className="text-sm text-vergel-gray">
        <span className="font-semibold text-vergel-charcoal">{totalProducts}</span>{" "}
        {totalProducts === 1 ? "producto encontrado" : "productos encontrados"}
      </p>

      <div className="flex items-center gap-2">
        <SlidersHorizontal size={16} className="text-vergel-gray-light" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-sm bg-vergel-off-white border border-vergel-sand rounded-vergel
                     px-3 py-2 text-vergel-charcoal
                     focus:outline-none focus:ring-2 focus:ring-vergel-olive cursor-pointer"
          aria-label="Ordenar productos"
        >
          <option value="default">Ordenar por</option>
          <option value="price-asc">Menor precio</option>
          <option value="price-desc">Mayor precio</option>
          <option value="name-asc">A - Z</option>
          <option value="name-desc">Z - A</option>
          <option value="newest">Más nuevos</option>
        </select>
      </div>
    </div>
  );
}