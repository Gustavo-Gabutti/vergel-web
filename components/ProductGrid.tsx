"use client";

import { useState, useMemo } from "react";
import ProductCard, { Product } from "./ProductCard";
import FilterBar from "./FilterBar";

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
  searchQuery: string;
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({
  products,
  activeCategory,
  searchQuery,
  onAddToCart,
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    let result = [...products];

    // Filtro por categoría
    if (activeCategory === "OFERTAS") {
      result = result.filter((p) => p.isOffer);
    } else if (activeCategory !== "Todos") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filtro por búsqueda
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Ordenamiento
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section id="productos" className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="font-display font-bold text-2xl text-vergel-charcoal">
        {activeCategory === "Todos" ? "Todos los productos" : activeCategory}
      </h2>

      <FilterBar
        totalProducts={filtered.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-vergel-gray text-lg">
            No encontramos productos para esa búsqueda.
          </p>
          <p className="text-vergel-gray-light text-sm mt-1">
            Probá con otra categoría o término.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}