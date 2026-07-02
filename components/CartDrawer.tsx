"use client";

import { X, Trash2, ShoppingBag, PackageCheck, PackageOpen } from "lucide-react";
import { Product } from "./ProductCard";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

const WHATSAPP_NUMBER = "5493794010765";
const FREE_SHIPPING_THRESHOLD = 15000;

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity,
}: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const shippingProgress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - total;
  const hasFreeShipping = total >= FREE_SHIPPING_THRESHOLD;

  const handleSendToWhatsApp = () => {
    if (items.length === 0) return;

    let message = "¡Hola! Quiero hacer el siguiente pedido a Vergel:\n\n";

    items.forEach((item) => {
      const subtotal = item.product.price * item.quantity;
      message += `• ${item.product.name} (${item.product.weight}) x${item.quantity} — $${subtotal.toLocaleString("es-AR")}\n`;
    });

    message += `\n*Total: $${total.toLocaleString("es-AR")}*\n\n`;

    if (hasFreeShipping) {
      message += "✅ ¡Pedido con envío GRATIS!\n\n";
    }

    message += "Quedo a la espera de confirmación. ¡Gracias!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-vergel-sand">
            <h3 className="font-display font-semibold text-lg flex items-center gap-2">
              <ShoppingBag size={20} className="text-vergel-olive" />
              Tu carrito
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-vergel hover:bg-vergel-off-white transition-colors"
              aria-label="Cerrar carrito"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-4xl mb-3">🛒</p>
                <p className="text-vergel-gray">Tu carrito está vacío</p>
                <p className="text-vergel-gray-light text-sm mt-1">
                  ¡Agregá productos y empezá a disfrutar!
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex gap-3 p-3 bg-vergel-off-white rounded-vergel"
                  >
                    <div className="w-16 h-16 bg-vergel-sand rounded-lg flex items-center
                                    justify-center text-2xl flex-shrink-0">
                      🌿
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-vergel-charcoal truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-vergel-gray-light">{item.product.weight}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            onUpdateQuantity(item.product.id, parseInt(e.target.value))
                          }
                          className="text-xs bg-white border border-vergel-sand rounded px-2 py-1"
                          aria-label={`Cantidad de ${item.product.name}`}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => onRemove(item.product.id)}
                          className="text-vergel-alert hover:text-red-600 transition-colors"
                          aria-label={`Eliminar ${item.product.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="font-semibold text-sm text-vergel-charcoal whitespace-nowrap">
                      ${(item.product.price * item.quantity).toLocaleString("es-AR")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer del carrito */}
          {items.length > 0 && (
            <div className="p-4 border-t border-vergel-sand space-y-4">

              {/* Indicador de envío gratis */}
              <div className="rounded-vergel bg-vergel-off-white border border-vergel-sand/60 p-3">
                <div className="flex items-center gap-2 mb-2">
                  {hasFreeShipping ? (
                    <PackageCheck size={16} className="text-vergel-olive flex-shrink-0" />
                  ) : (
                    <PackageOpen size={16} className="text-vergel-gray flex-shrink-0" />
                  )}
                  <p className="text-xs font-medium text-vergel-charcoal">
                    {hasFreeShipping
                      ? "¡Felicitaciones! Tenés envío gratis de Vergel 🎉"
                      : `¡Estás a solo $${remaining.toLocaleString("es-AR")} de conseguir Envío GRATIS!`}
                  </p>
                </div>
                {/* Barra de progreso */}
                <div className="w-full h-1.5 bg-vergel-sand rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${shippingProgress}%`,
                      backgroundColor: hasFreeShipping ? "#606c38" : "#a3b18a",
                    }}
                  />
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="font-medium text-vergel-gray">Total</span>
                <span className="font-display font-bold text-xl text-vergel-charcoal">
                  ${total.toLocaleString("es-AR")}
                </span>
              </div>

              <button
                onClick={handleSendToWhatsApp}
                className="w-full flex items-center justify-center gap-2 text-base py-3 bg-[#606c38] hover:bg-[#283618] text-white font-semibold rounded-[var(--radius-vergel)] transition-colors duration-200"
              >
                Enviar pedido por WhatsApp
              </button>

              <p className="text-[11px] text-vergel-gray-light text-center">
                Envíos a todo Corrientes · Múltiples medios de pago
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}