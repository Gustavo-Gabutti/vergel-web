import { MapPin, Clock, Phone, Mail, Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-vergel-charcoal text-vergel-gray-softer mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Columna 1: Info */}
          <div>
            <h3 className="font-display font-bold text-xl text-white mb-4">
              <span className="text-vergel-sage">V</span>ERGEL
            </h3>
            <p className="text-sm leading-relaxed">
              Tu almacén de barrio en Corrientes Capital. Productos saludables,
              frescos y locales para una vida mejor.
            </p>
          </div>

          {/* Columna 2: Ubicación */}
          <div>
            <h4 className="font-semibold text-white mb-4">Visitanos</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-vergel-sage mt-0.5 flex-shrink-0" />
                <span>Córdoba 1350, entre Belgrano y Mariano Moreno<br />Corrientes Capital, Argentina</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="text-vergel-sage mt-0.5 flex-shrink-0" />
                <span>Lunes a Viernes: 8:00 - 13:00 / 17:00 - 21:00<br />Sábados: 8:00 - 13:00</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-vergel-sage mt-0.5 flex-shrink-0" />
                <span>+54 379 XXX-XXXX</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-vergel-sage mt-0.5 flex-shrink-0" />
                <span>hola@vergel.com.ar</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Links legales */}
          <div>
            <h4 className="font-semibold text-white mb-4">Información</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-vergel-sage transition-colors">Cómo comprar</a></li>
              <li><a href="#" className="hover:text-vergel-sage transition-colors">Costos y formas de envío</a></li>
              <li><a href="#" className="hover:text-vergel-sage transition-colors">Formas de pago</a></li>
              <li><a href="#" className="hover:text-vergel-sage transition-colors">Preguntas frecuentes</a></li>
              <li><a href="#" className="hover:text-vergel-sage transition-colors">Políticas de cambio</a></li>
              <li><a href="#" className="hover:text-vergel-sage transition-colors">Políticas de privacidad</a></li>
            </ul>
          </div>

          {/* Columna 4: Legal Argentina + Redes */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-vergel-sage transition-colors font-medium text-vergel-warm-light"
                >
                  ↩ Botón de arrepentimiento
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-vergel-sage transition-colors">
                  📋 Libro de quejas digital (Ley 2247)
                </a>
              </li>
              <li>
                <a
                  href="https://www.argentina.gob.ar/produccion/defensadelconsumidor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-vergel-sage transition-colors"
                >
                  Defensa al consumidor
                </a>
              </li>
            </ul>

            {/* Redes */}
            <h4 className="font-semibold text-white mt-6 mb-3">Seguinos</h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/vergel.almacen"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-vergel-gray/20 rounded-vergel hover:bg-vergel-sage/30 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-vergel-gray/20 rounded-vergel hover:bg-vergel-sage/30 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://wa.me/54379XXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-vergel-gray/20 rounded-vergel hover:bg-vergel-sage/30 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-vergel-gray/20 mt-10 pt-6 flex flex-col sm:flex-row
                        items-center justify-between gap-3 text-xs text-vergel-gray-light">
          <p>© {new Date().getFullYear()} Vergel · Almacén de Barrio. Todos los derechos reservados.</p>
          <p>Córdoba 1350, Corrientes Capital, Argentina</p>
        </div>
      </div>
    </footer>
  );
}