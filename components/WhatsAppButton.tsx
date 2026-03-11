"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  // Aparece después de 2 segundos para no competir con el primer render
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl =
    "https://wa.me/543794010765?text=Hola%20Vergel!%20Tengo%20una%20consulta.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactanos por WhatsApp"
      className={`
        fixed bottom-6 right-6
        z-[60]
        w-14 h-14 sm:w-16 sm:h-16
        rounded-full shadow-lg
        flex items-center justify-center
        bg-[#5B8C6A] hover:bg-[#4A7A59]
        text-white
        transition-all duration-500 ease-out
        hover:scale-110 hover:shadow-xl
        active:scale-95
        ${visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
        }
      `}
    >
      {/* Pulso decorativo */}
      <span className="absolute inset-0 rounded-full bg-[#5B8C6A]/40 animate-ping opacity-30" />
      <MessageCircle size={24} className="sm:w-7 sm:h-7 relative z-10" fill="white" strokeWidth={0} />
    </a>
  );
}