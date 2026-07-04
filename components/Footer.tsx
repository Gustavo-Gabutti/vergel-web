import { MapPin, Clock, Phone, Mail, Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E221E] text-gray-300 mt-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Columna 1: Info e Identidad */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-sans font-bold text-2xl text-white tracking-wide mb-4">
                VERGEL
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Tu almacén de barrio en Corrientes Capital. Productos saludables,
                frescos y locales para una vida mejor. Estamos para cuidarte, con nosotros tenés lo que querés.
              </p>
            </div>
          </div>

          {/* Columna 2: Ubicación y Contacto Directo */}
          <div>
            <h4 className="font-semibold text-white mb-4 border-b border-white/10 pb-2 text-sm uppercase tracking-wider">
              Visitanos
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Córdoba 1350, entre Belgrano y Mariano Moreno<br />
                  <span className="text-xs text-gray-500">Corrientes Capital, Argentina</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Lunes a Viernes: 8:00 - 13:00 / 17:00 - 21:00<br />
                  Sábados: 8:00 - 13:00
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+543794010765" className="text-gray-400 hover:text-white transition-colors">
                  +54 379 401-0765
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:hola@vergel.com.ar" className="text-gray-400 hover:text-white transition-colors">
                  hola@vergel.com.ar
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legal Argentina + Redes */}
          <div>
            <h4 className="font-semibold text-white mb-4 border-b border-white/10 pb-2 text-sm uppercase tracking-wider">
              Normativa Legal
            </h4>
            <ul className="space-y-2.5 text-sm mb-6">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>↩</span> Botón de arrepentimiento
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>📋</span> Libro de quejas digital (Ley 2247)
                </a>
              </li>
              <li>
                <a
                  href="https://www.argentina.gob.ar/produccion/defensadelconsumidor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Defensa al consumidor
                </a>
              </li>
            </ul>

            {/* Redes Sociales en escala de grises */}
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">
              Seguinos en redes
            </h4>
            <div className="flex gap-2.5">
              <a
                href="https://instagram.com/vergel.almacen"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all border border-white/5"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all border border-white/5"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://wa.me/543794010765"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all border border-white/5"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Barra de cierre inferior */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Vergel · Almacén de Barrio. Todos los derechos reservados.</p>
          <p className="font-medium tracking-wide">Corrientes Capital, Argentina</p>
        </div>
      </div>
    </footer>
  );
}