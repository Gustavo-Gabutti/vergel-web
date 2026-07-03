import { Leaf, Heart, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-sans font-bold text-3xl sm:text-5xl text-gray-900 leading-tight">
          Tu almacén de barrio,
          <br />
          <span className="text-emerald-700">con todo lo que te hace bien</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Productos saludables, frescos y locales en el corazón de Corrientes.
          Porque comer bien no tiene que ser complicado ni caro.
        </p>

        {/* Botones Reparados con Tailwind Puro */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a 
            href="#productos" 
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold 
                       bg-emerald-700 hover:bg-emerald-800 text-white rounded-md 
                       shadow-sm transition-colors duration-200 cursor-pointer"
          >
            Ver productos
          </a>
          <a 
            href="#nosotros" 
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold 
                       bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-md 
                       shadow-sm transition-colors duration-200 cursor-pointer"
          >
            Conocenos
          </a>
        </div>

        {/* Badges de confianza */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10 text-gray-500">
          <div className="flex items-center gap-2 text-sm">
            <Leaf size={18} className="text-emerald-700" />
            <span>Productos naturales</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Truck size={18} className="text-emerald-700" />
            <span>Envíos solo a Corrientes Capital</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Heart size={18} className="text-emerald-700" />
            <span>De barrio, con cariño</span>
          </div>
        </div>
      </div>
    </section>
  );
}