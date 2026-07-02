"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

export default function Header({ cartCount, onCartClick, onSearch }: HeaderProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 h-16">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center" aria-label="Ir al inicio">
          <Image
            src="/logo-vergel.png"
            alt="Vergel — Almacén de Barrio"
            width={140}
            height={48}
            className="w-[110px] sm:w-[130px] h-auto object-contain"
            priority
          />
        </Link>

        {/* Buscador */}
        <div className="flex-1 relative max-w-2xl">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder="Buscar productos..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-300
                       rounded-md text-gray-900 placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent
                       transition-colors"
          />
        </div>

        {/* Carrito con Colores Seguros Obligatorios */}
        <button
          onClick={onCartClick}
          type="button"
          className="relative flex-shrink-0 w-11 h-11 flex items-center justify-center 
                     bg-emerald-700 hover:bg-emerald-800 text-white rounded-md 
                     transition-colors duration-200 focus:outline-none focus:ring-2 
                     focus:ring-emerald-600 focus:ring-offset-2 cursor-pointer shadow-sm"
          aria-label={`Abrir carrito${cartCount > 0 ? `, ${cartCount} productos` : ""}`}
        >
          <ShoppingCart size={20} className="text-white" />
          
          {/* El globo del contador ahora se va a ver SÍ O SÍ en rojo brillante */}
          {cartCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[11px]
                         font-bold w-5 h-5 rounded-full flex items-center justify-center 
                         leading-none border border-white shadow-sm z-50 animate-scale-in"
            >
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </button>

      </div>
    </header>
  );
}