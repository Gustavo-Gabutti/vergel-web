import { Leaf, Heart, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-vergel-sage-light/30 via-vergel-cream to-vergel-sand/40 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-vergel-charcoal leading-tight">
          Tu almacén de barrio,
          <br />
          <span className="text-vergel-olive">con todo lo que te hace bien</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-vergel-gray max-w-2xl mx-auto leading-relaxed">
          Productos saludables, frescos y locales en el corazón de Corrientes.
          Porque comer bien no tiene que ser complicado ni caro.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="#productos" className="btn-primary">
            Ver productos
          </a>
          <a href="#nosotros" className="btn-secondary">
            Conocenos
          </a>
        </div>

        {/* Badges de confianza */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10 text-vergel-gray">
          <div className="flex items-center gap-2 text-sm">
            <Leaf size={18} className="text-vergel-olive" />
            <span>Productos naturales</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Truck size={18} className="text-vergel-olive" />
            <span>Envíos a todo el país</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Heart size={18} className="text-vergel-olive" />
            <span>De barrio, con cariño</span>
          </div>
        </div>
      </div>
    </section>
  );
}