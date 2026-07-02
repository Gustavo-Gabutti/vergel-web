"use client";

import { useState, useEffect } from "react";
import { CreditCard, MapPin, Truck, ChevronLeft, ChevronRight } from "lucide-react";

export default function PromoBannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const promos = [
    {
      id: "banco-corrientes",
      icon: <CreditCard className="text-vergel-olive" size={24} />,
      title: "Descuentos Banco Corrientes",
      description: "Aprovechá promociones exclusivas pagando con QR en nuestro local.",
    },
    {
      id: "envios-local",
      icon: <MapPin className="text-vergel-alert" size={24} />,
      title: "Envíos Locales",
      description: "Realizamos entregas exclusivamente dentro de la zona de Corrientes Capital.",
    },
    {
      id: "envio-gratis",
      icon: <Truck className="text-vergel-success" size={24} />,
      title: "Envío GRATIS",
      description: "Si tu compra supera los $15.000, el costo de envío corre por nuestra cuenta.",
    },
  ];

  // Auto-play cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [promos.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % promos.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? promos.length - 1 : prev - 1));

  return (
    <div className="w-full bg-vergel-cream border-y border-vergel-sand/60 my-2">
      <div className="max-w-7xl mx-auto px-4 py-4 relative overflow-hidden">
        
        {/* Vista Escritorio (Se ven las 3 juntas en fila) */}
        <div className="hidden md:grid grid-cols-3 gap-6 divide-x divide-vergel-sand">
          {promos.map((promo) => (
            <div key={promo.id} className="flex items-start gap-4 px-4 first:pl-0">
              <div className="p-3 bg-white rounded-vergel shadow-sm flex-shrink-0">
                {promo.icon}
              </div>
              <div>
                <h3 className="font-display font-semibold text-sm text-vergel-charcoal">
                  {promo.title}
                </h3>
                <p className="text-xs text-vergel-gray mt-1 leading-relaxed">
                  {promo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Vista Mobile / Tablet (Pasarela / Carrusel individual) */}
        <div className="md:hidden relative h-20 flex items-center justify-center">
          {promos.map((promo, idx) => (
            <div
              key={promo.id}
              className={`absolute inset-0 flex items-center gap-4 transition-all duration-500 ease-in-out ${
                idx === currentSlide
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 translate-x-8 pointer-events-none"
              }`}
            >
              <div className="p-2.5 bg-white rounded-vergel shadow-sm flex-shrink-0">
                {promo.icon}
              </div>
              <div className="pr-8">
                <h3 className="font-display font-semibold text-sm text-vergel-charcoal">
                  {promo.title}
                </h3>
                <p className="text-xs text-vergel-gray mt-0.5 leading-snug">
                  {promo.description}
                </p>
              </div>
            </div>
          ))}

          {/* Flechas de Control Mobile */}
          <div className="absolute right-0 flex flex-col gap-1.5 z-10">
            <button
              onClick={nextSlide}
              className="p-1 bg-white border border-vergel-sand rounded-full text-vergel-gray hover:text-vergel-charcoal active:scale-90 transition-transform"
              aria-label="Siguiente promo"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}