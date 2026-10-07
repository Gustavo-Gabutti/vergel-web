"use client";

import { useState, useCallback, useEffect } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromoBannerCarousel from "@/components/PromoBannerCarousel";
import ProductGrid from "@/components/ProductGrid";
import ProductDetailModal from "@/components/ProductDetailModal";
import CartDrawer from "@/components/CartDrawer";
import InfoSections from "@/components/InfoSections";
import Footer from "@/components/Footer";
import productsData from "@/data/products.json";
import { Product } from "@/components/ProductCard";
import { getProductsFromSanity } from "@/lib/sanity/queries";

const CART_STORAGE_KEY = "vergel_cart";

export interface CartItem {
  product: Product;
  quantity: number;
}

// Lee el carrito desde localStorage
function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);

  // Estado dinámico para los productos de Sanity (con respaldo en products.json)
  const [products, setProducts] = useState<Product[]>(productsData as Product[]);

  // Traer productos desde Sanity en tiempo real
  useEffect(() => {
    async function loadSanityProducts() {
      try {
        const sanityProducts = await getProductsFromSanity();
        if (sanityProducts && sanityProducts.length > 0) {
          setProducts(sanityProducts);
        }
      } catch (error) {
        console.error("Error cargando productos de Sanity:", error);
      }
    }
    loadSanityProducts();
  }, []);

  // Cargar carrito desde localStorage
  useEffect(() => {
    setCartItems(loadCartFromStorage());
    setCartLoaded(true);
  }, []);

  // Persistir carrito en localStorage
  useEffect(() => {
    if (!cartLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems, cartLoaded]);

  const handleViewDetail = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleAddToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, 99) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, 99) }];
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const handleUpdateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <TopBar />
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onSearch={setSearchQuery}
      />
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main className="flex-1">
        <Hero />
        <PromoBannerCarousel />
        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onViewDetail={handleViewDetail}
        />
        <InfoSections />
      </main>
      <Footer />
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </>
  );
}