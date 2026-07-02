"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "envios",
    question: "¿Cuáles son las zonas de envío en Corrientes?",
    answer:
      "Realizamos entregas exclusivamente dentro de Corrientes Capital y zonas aledañas. El pedido se coordina por WhatsApp una vez recibido, y acordamos día y horario con vos. Para envíos al interior del país, despachamos por correo o encomienda — consultanos por el costo según tu localidad.",
  },
  {
    id: "banco-corrientes",
    question: "¿Qué tarjetas del Banco Corrientes tienen descuento?",
    answer:
      "Trabajamos con las promociones vigentes del Banco de Corrientes para pagos con QR en el local. Estas promos se actualizan periódicamente; te recomendamos consultarnos por WhatsApp antes de hacer tu pedido para conocer el beneficio del mes. Aceptamos débito y crédito del banco.",
  },
  {
    id: "retiro",
    question: "¿Puedo retirar mi pedido en el local?",
    answer:
      "¡Por supuesto! Podés pasar a retirar tu pedido directamente en nuestra tienda. Una vez que nos enviás el pedido por WhatsApp, te confirmamos disponibilidad y acordamos el horario de retiro. De esta forma el pedido queda reservado y listo para cuando llegués.",
  },
  {
    id: "como-comprar",
    question: "¿Cómo comprar en Vergel?",
    answer:
      "Es muy simple: navegá el catálogo, agregá los productos que quieras a tu carrito y cuando estés listo, hacé clic en 'Enviar pedido por WhatsApp'. Recibiremos tu pedido detallado y nos pondremos en contacto para coordinar el pago y la entrega o retiro.",
  },
  {
    id: "formas-pago",
    question: "Formas de pago",
    answer:
      "Aceptamos efectivo, transferencia bancaria, Mercado Pago y tarjetas de débito/crédito en el local. Para compras con envío a domicilio, coordinamos el pago previo por transferencia o Mercado Pago. Próximamente sumaremos más opciones de pago digital.",
  },
  {
    id: "cambios",
    question: "Políticas de cambio y devolución",
    answer:
      "Si un producto llega en mal estado o hay un error en tu pedido, comunicáte con nosotros dentro de las 24 hs de recibido. Hacemos el cambio sin cargo. Para productos no perecederos sin defecto, los cambios se evalúan caso a caso. Nuestra prioridad es que quedes conforme con tu compra.",
  },
  {
    id: "privacidad",
    question: "Política de privacidad",
    answer:
      "Los datos que compartís al hacer un pedido (nombre y número de WhatsApp) son utilizados exclusivamente para gestionar y coordinar tu compra. No compartimos tu información con terceros ni la usamos con fines de marketing sin tu consentimiento. Podés pedirte dar de baja de nuestros contactos en cualquier momento.",
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-vergel-sand/60 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 px-1 text-left
                   hover:text-vergel-olive transition-colors duration-200
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-vergel-olive rounded"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-sm text-vergel-charcoal">
          {item.question}
        </span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-vergel-gray transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Panel colapsable con transición CSS */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "400px" : "0px" }}
      >
        <p className="pb-4 px-1 text-sm text-vergel-gray leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function InfoSections() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="font-display font-bold text-2xl text-vergel-charcoal">
          Preguntas frecuentes
        </h2>
        <p className="text-sm text-vergel-gray mt-2">
          Todo lo que necesitás saber para comprar con confianza en Vergel.
        </p>
      </div>

      <div className="bg-white rounded-vergel border border-vergel-sand/60 shadow-sm px-5 py-2">
        {FAQ_ITEMS.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
}