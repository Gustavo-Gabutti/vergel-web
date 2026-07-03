"use client";

import { useState } from "react";
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

type DeliveryType = "envio" | "retiro";
type RetiroTurno = "manana" | "tarde";

interface FormState {
  nombre: string;
  apellido: string;
  delivery: DeliveryType;
  // envío a domicilio
  calle: string;
  numero: string;
  piso: string;
  depto: string;
  // retiro
  turno: RetiroTurno;
}

const INITIAL_FORM: FormState = {
  nombre: "",
  apellido: "",
  delivery: "envio",
  calle: "",
  numero: "",
  piso: "",
  depto: "",
  turno: "manana",
};

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQuantity,
}: CartDrawerProps) {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingProgress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - total;
  const hasFreeShipping = total >= FREE_SHIPPING_THRESHOLD;

  const set = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.apellido.trim()) e.apellido = "Requerido";
    if (form.delivery === "envio") {
      if (!form.calle.trim()) e.calle = "Requerido";
      if (!form.numero.trim()) e.numero = "Requerido";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSendToWhatsApp = () => {
    if (!validate()) return;

    let message = `¡Hola! Soy *${form.nombre} ${form.apellido}* y quiero hacer el siguiente pedido a Vergel:\n\n`;

    items.forEach((item) => {
      const subtotal = item.product.price * item.quantity;
      message += `• ${item.product.name} (${item.product.weight}) x${item.quantity} — $${subtotal.toLocaleString("es-AR")}\n`;
    });

    message += `\n*Total: $${total.toLocaleString("es-AR")}*\n`;
    if (hasFreeShipping) message += `✅ ¡Con envío GRATIS!\n`;
    message += "\n";

    if (form.delivery === "envio") {
      let direccion = `${form.calle} ${form.numero}`;
      if (form.piso.trim()) direccion += `, Piso ${form.piso}`;
      if (form.depto.trim()) direccion += `, Depto ${form.depto}`;
      message += `🚚 *Entrega a domicilio*\n📍 Dirección: ${direccion}\n`;
    } else {
      const horario = form.turno === "manana"
        ? "por la mañana (entre 9:00 y 12:00 hs)"
        : "por la tarde (entre 15:00 y 19:00 hs)";
      message += `🏪 *Retiro por el local* ${horario}\n`;
    }

    message += "\n¡Quedo a la espera de confirmación. Gracias!";

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleClose = () => {
    setStep("cart");
    setForm(INITIAL_FORM);
    setErrors({});
    onClose();
  };

  const inputBase = "w-full text-sm border rounded-lg px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-colors";

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 transition-opacity" onClick={handleClose} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-sans font-semibold text-lg flex items-center gap-2 text-gray-900">
              <ShoppingBag size={20} className="text-emerald-700" />
              {step === "cart" ? "Tu carrito" : "Datos de entrega"}
            </h3>
            <div className="flex items-center gap-2">
              {step === "checkout" && (
                <button
                  onClick={() => setStep("cart")}
                  className="text-xs text-emerald-700 font-medium hover:underline"
                >
                  ← Volver
                </button>
              )}
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                aria-label="Cerrar carrito"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* ── PASO 1: CARRITO ── */}
          {step === "cart" && (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-4xl mb-3">🛒</p>
                    <p className="text-gray-500">Tu carrito está vacío</p>
                    <p className="text-gray-400 text-sm mt-1">¡Agregá productos y empezá a disfrutar!</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item.product.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                        {/* Imagen del producto en el carrito */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 truncate">{item.product.name}</p>
                          <p className="text-xs text-gray-400">{item.product.weight}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <select
                              value={item.quantity}
                              onChange={(e) => onUpdateQuantity(item.product.id, parseInt(e.target.value))}
                              className="text-xs bg-white border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                              aria-label={`Cantidad de ${item.product.name}`}
                            >
                              {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                                <option key={n} value={n}>{n}</option>
                              ))}
                            </select>
                            <button
                              onClick={() => onRemove(item.product.id)}
                              className="text-red-400 hover:text-red-600 transition-colors"
                              aria-label={`Eliminar ${item.product.name}`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="font-semibold text-sm text-gray-900 whitespace-nowrap">
                          ${(item.product.price * item.quantity).toLocaleString("es-AR")}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-4 border-t border-gray-100 space-y-4">
                  {/* Indicador de envío gratis */}
                  <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      {hasFreeShipping
                        ? <PackageCheck size={16} className="text-emerald-700 flex-shrink-0" />
                        : <PackageOpen size={16} className="text-gray-400 flex-shrink-0" />
                      }
                      <p className="text-xs font-medium text-gray-700">
                        {hasFreeShipping
                          ? "¡Felicitaciones! Tenés envío gratis de Vergel 🎉"
                          : `¡Estás a solo $${remaining.toLocaleString("es-AR")} de conseguir Envío GRATIS!`}
                      </p>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${shippingProgress}%`,
                          backgroundColor: hasFreeShipping ? "#15803d" : "#6ee7b7",
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Total</span>
                    <span className="font-sans font-bold text-xl text-gray-900">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </div>

                  <button
                    onClick={() => setStep("checkout")}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold
                               rounded-xl transition-colors duration-200 text-base"
                  >
                    Continuar con el pedido →
                  </button>
                  <p className="text-[11px] text-gray-400 text-center">
                    Envíos a todo Corrientes · Múltiples medios de pago
                  </p>
                </div>
              )}
            </>
          )}

          {/* ── PASO 2: CHECKOUT ── */}
          {step === "checkout" && (
            <div className="flex-1 overflow-y-auto p-4 space-y-5">

              {/* Nombre y apellido */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Tus datos
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nombre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.nombre}
                      onChange={(e) => set("nombre", e.target.value)}
                      placeholder="Juan"
                      className={`${inputBase} ${errors.nombre ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                    />
                    {errors.nombre && <p className="text-red-500 text-[11px] mt-1">{errors.nombre}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Apellido <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.apellido}
                      onChange={(e) => set("apellido", e.target.value)}
                      placeholder="Pérez"
                      className={`${inputBase} ${errors.apellido ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                    />
                    {errors.apellido && <p className="text-red-500 text-[11px] mt-1">{errors.apellido}</p>}
                  </div>
                </div>
              </div>

              {/* Tipo de entrega */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Tipo de entrega
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {(["envio", "retiro"] as DeliveryType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => set("delivery", type)}
                      className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-colors
                        ${form.delivery === type
                          ? "border-emerald-700 bg-emerald-50 text-emerald-800"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                        }`}
                    >
                      {type === "envio" ? "🚚 Envío a domicilio" : "🏪 Retiro en local"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Campos condicionales: ENVÍO */}
              {form.delivery === "envio" && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Dirección de entrega
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Calle <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.calle}
                        onChange={(e) => set("calle", e.target.value)}
                        placeholder="Av. Libertad"
                        className={`${inputBase} ${errors.calle ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                      />
                      {errors.calle && <p className="text-red-500 text-[11px] mt-1">{errors.calle}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Número <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.numero}
                        onChange={(e) => set("numero", e.target.value)}
                        placeholder="1234"
                        className={`${inputBase} ${errors.numero ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}
                      />
                      {errors.numero && <p className="text-red-500 text-[11px] mt-1">{errors.numero}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Piso <span className="text-gray-400 font-normal">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        value={form.piso}
                        onChange={(e) => set("piso", e.target.value)}
                        placeholder="2"
                        className={`${inputBase} border-gray-200 bg-gray-50`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Depto <span className="text-gray-400 font-normal">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        value={form.depto}
                        onChange={(e) => set("depto", e.target.value)}
                        placeholder="A"
                        className={`${inputBase} border-gray-200 bg-gray-50`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Campos condicionales: RETIRO */}
              {form.delivery === "retiro" && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    ¿En qué turno venís?
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {(["manana", "tarde"] as RetiroTurno[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => set("turno", t)}
                        className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-colors
                          ${form.turno === t
                            ? "border-emerald-700 bg-emerald-50 text-emerald-800"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                          }`}
                      >
                        {t === "manana" ? "🌤 Mañana\n9:00–12:00 hs" : "🌅 Tarde\n15:00–19:00 hs"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Resumen del pedido */}
              <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Resumen</p>
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm text-gray-700 py-0.5">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toLocaleString("es-AR")}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-gray-900 mt-2 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toLocaleString("es-AR")}</span>
                </div>
              </div>

              {/* Botón enviar */}
              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold
                           rounded-xl transition-colors duration-200 text-base flex items-center justify-center gap-2"
              >
                Enviar pedido por WhatsApp
              </button>
              <p className="text-[11px] text-gray-400 text-center pb-2">
                Envíos a todo Corrientes · Múltiples medios de pago
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}