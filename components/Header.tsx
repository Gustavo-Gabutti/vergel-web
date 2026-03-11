"use client";

import { useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
}

export default function Header({ cartCount, onCartClick, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-white border-b border-vergel-sand sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-vergel-charcoal">
              <span className="text-vergel-olive">V</span>ERGEL
            </h1>
            <p className="text-[10px] sm:text-xs text-vergel-gray-light tracking-widest uppercase -mt-1">
              Almacén de barrio
            </p>
          </div>

          {/* Buscador — desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-lg mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 rounded-vergel border border-vergel-sand
                           bg-vergel-off-white text-sm text-vergel-charcoal
                           placeholder:text-vergel-gray-light
                           focus:outline-none focus:ring-2 focus:ring-vergel-olive focus:border-transparent
                           transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-vergel-olive text-white
                           p-2 rounded-lg hover:bg-vergel-olive-dark transition-colors"
                aria-label="Buscar"
              >
                <Search size={16} />
              </button>
            </div>
          </form>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            {/* Carrito */}
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-vergel hover:bg-vergel-off-white transition-colors"
              aria-label={`Carrito con ${cartCount} productos`}
            >
              <ShoppingCart size={22} className="text-vergel-charcoal" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-vergel-alert text-white
                                 text-[10px] font-bold w-5 h-5 rounded-full
                                 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburguesa mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-vergel hover:bg-vergel-off-white transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Buscador — mobile */}
        <form onSubmit={handleSearch} className="md:hidden mt-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2.5 rounded-vergel border border-vergel-sand
                         bg-vergel-off-white text-sm text-vergel-charcoal
                         placeholder:text-vergel-gray-light
                         focus:outline-none focus:ring-2 focus:ring-vergel-olive"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-vergel-olive text-white
                         p-2 rounded-lg"
              aria-label="Buscar"
            >
              <Search size={16} />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}