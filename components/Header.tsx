"use client";

import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";
import { useState, useRef, useCallback } from "react";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

export default function Header({ cartCount, onCartClick, onSearch }: HeaderProps) {
  const [query, setQuery] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onSearch(value);
      }, 300);
    },
    [onSearch]
  );

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">

        {/* Logo — <img> nativo, sin dependencia de next/image */}
        <Link href="/" className="flex-shrink-0 flex items-center" aria-label="Ir al inicio">
          <img
            src="/images/logo-vergel.jpg"
            alt="Vergel — Almacén de Barrio"
            className="w-[110px] sm:w-[130px] h-auto object-contain"
          />
        </Link>

        {/* Buscador */}
        <div className="flex-1 relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder="Buscar productos..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200
                       rounded-lg text-gray-900 placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent
                       transition-colors duration-200"
          />
        </div>

        {/* Carrito */}
        <button
          onClick={onCartClick}
          className="relative flex-shrink-0 p-2.5 bg-emerald-700 hover:bg-emerald-800
                     text-white rounded-lg transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
          aria-label={`Abrir carrito${cartCount > 0 ? `, ${cartCount} productos` : ""}`}
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span
              key={cartCount}
              className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px]
                         font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none
                         animate-[scale-in_0.2s_ease-out]"
            >
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </button>

      </div>
    </header>
  );
}