"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "¡Hola! 👋 Soy el asistente de Vergel. Puedo ayudarte con información sobre productos, envíos, horarios y más. ¿En qué te puedo ayudar?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus en input al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Respuesta simulada (aquí se conectará la IA real en el futuro)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Gracias por tu mensaje. Por ahora estoy en modo demo 🛠️. Muy pronto voy a poder ayudarte con toda la información de Vergel. Mientras tanto, podés escribirnos por WhatsApp.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1200);
  };

  return (
    <>
      {/* Ventana de chat */}
      <div
        className={`
          fixed bottom-24 sm:bottom-28 left-4 sm:left-6
          z-[60]
          w-[calc(100vw-2rem)] sm:w-[380px]
          max-h-[70vh] sm:max-h-[500px]
          bg-white rounded-2xl shadow-2xl
          border border-vergel-sand
          flex flex-col overflow-hidden
          transition-all duration-300 ease-out origin-bottom-left
          ${isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
          }
        `}
        role="dialog"
        aria-label="Chat de asistente virtual Vergel"
      >
        {/* Header del chat */}
        <div className="bg-vergel-olive px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Asistente Vergel</p>
              <p className="text-white/70 text-[11px]">En línea · Responde al instante</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white p-1 rounded-lg
                       hover:bg-white/10 transition-colors"
            aria-label="Cerrar chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-vergel-off-white/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
                  ${msg.role === "user"
                    ? "bg-vergel-olive text-white rounded-br-md"
                    : "bg-white text-vergel-charcoal border border-vergel-sand/60 rounded-bl-md shadow-sm"
                  }
                `}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="p-3 border-t border-vergel-sand/60 bg-white flex gap-2 flex-shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribí tu consulta..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-vergel-sand
                       bg-vergel-off-white text-sm text-vergel-charcoal
                       placeholder:text-vergel-gray-light
                       focus:outline-none focus:ring-2 focus:ring-vergel-olive/50
                       focus:border-transparent transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-vergel-olive text-white p-2.5 rounded-xl
                       hover:bg-vergel-olive-dark transition-colors
                       disabled:opacity-40 disabled:cursor-not-allowed
                       flex-shrink-0"
            aria-label="Enviar mensaje"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* Botón de abrir/cerrar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar asistente virtual" : "Abrir asistente virtual"}
        className={`
          fixed bottom-6 left-4 sm:left-6
          z-[60]
          w-14 h-14 sm:w-16 sm:h-16
          rounded-full shadow-lg
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-110 hover:shadow-xl
          active:scale-95
          ${isOpen
            ? "bg-vergel-charcoal text-white rotate-0"
            : "bg-vergel-olive text-white"
          }
        `}
      >
        {isOpen ? (
          <X size={22} className="sm:w-6 sm:h-6" />
        ) : (
          <>
            <span className="absolute inset-0 rounded-full bg-vergel-olive/30 animate-ping opacity-20" />
            <Bot size={22} className="sm:w-6 sm:h-6 relative z-10" />
          </>
        )}
      </button>
    </>
  );
}