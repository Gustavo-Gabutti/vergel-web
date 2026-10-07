Vergel — E-Commerce & CMS Headless
--Image of: --Next.js --Image of: --TypeScript --Image of: --Tailwind CSS --Image of: --Sanity --Image of: --Vercel

Plataforma web e-commerce autogestionable y moderna desarrollada para Vergel (Almacén Natural & Dietética). Ofrece un catálogo dinámico en tiempo real, carrito de compras con persistencia local, integración directa de pedidos mediante WhatsApp y un panel de administración en la nube.

 Características Principales
 Catálogo Dinámico & Autogestionable: Integrado con Sanity.io (CMS Headless). Los productos, imágenes, ofertas, precios y disponibilidad de stock se gestionan desde el panel integrado.
 Sanity Studio Embebido: Acceso directo al panel de administración en /studio sin necesidad de aplicaciones o servidores externos.
 Carrito de Compras Persistente: Estado del carrito guardado en localStorage para conservar los productos seleccionados por el cliente al navegar o recargar la página.
 Checkout por WhatsApp: Envío directo del resumen del pedido con formato limpio y formateado al número de WhatsApp del almacén.
 Búsqueda & Filtros en Tiempo Real: Filtrado de productos por categorías (Mixes, Frutos Secos, Sin Gluten, Ofertas, etc.) y buscador por texto.
 Experiencia Mobile-First & Responsiva: Interfaz adaptada a celulares, tablets y computadoras de escritorio construida con Tailwind CSS.
 Alto Rendimiento (SEO & SSR): Optimización con el App Router de Next.js para carga ultrarrápida.
 Architectura y Tecnologías
Frontend
Framework: Next.js (App Router)
Lenguaje: TypeScript
Estilos: Tailwind CSS
Iconos: Lucide React / React Icons
Backend & CMS Headless
CMS: Sanity.io
Librerías: next-sanity, @sanity/image-url, sanity
Consulta de datos: GROQ (Graph-Relational Object Queries)
Infraestructura
Despliegue: Vercel
Almacenamiento de Assets: Sanity CDN
 Estructura del Proyecto
vergel-web/
├── app/
├── components/             # Componentes reutilizables de UI
│   ├── CartDrawer.tsx      # Carrito lateral interactivo
│   ├── Header.tsx          # Cabecera con buscador e ícono de carrito
│   ├── Hero.tsx            # Banners promocionales principales
│   ├── InfoSections.tsx    # Secciones informativas y beneficios
│   ├── Navbar.tsx          # Barra de navegación por categorías
│   ├── ProductCard.tsx     # Tarjeta individual de producto
│   ├── ProductDetailModal.tsx # Modal con detalles del producto
│   ├── ProductGrid.tsx     # Grilla de catálogo dinámico
│   ├── PromoBannerCarousel.tsx # Carrusel de ofertas y novedades
│   └── TopBar.tsx          # Barra superior informativa
├── data/
│   └── products.json       # Datos estáticos de respaldo
├── lib/
│   └── sanity/             # Cliente y consultas de Sanity
│       ├── client.ts       # Configuración del cliente Sanity
│       ├── image.ts        # Helper para generación de URLs de imágenes
│       └── queries.ts      # Consultas en GROQ
├── sanity/
│   └── schemas/            # Esquemas de la base de datos de Sanity
│       ├── index.ts        # Registro centralizado de esquemas
│       └── product.ts      # Definición de la estructura del producto
├── sanity.config.ts        # Configuración central de Sanity Studio
└── .env.local              # Variables de entorno (ignorado en Git)
 Configuración e Instalación Local
1. Clonar el Repositorio
git clone https://github.com/tu-usuario/vergel-web.git
cd vergel-web
2. Instalar Dependencias
npm install
3. Configurar Variables de Entorno
Crea un archivo .env.local en la raíz del proyecto y agrega las credenciales de tu proyecto en Sanity:

NEXT_PUBLIC_SANITY_PROJECT_ID="tu_project_id_aqui"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
4. Iniciar Servidor de Desarrollo
npm run dev
Abre en tu navegador:

Tienda principal: http://localhost:3000
Panel de administración (Studio): http://localhost:3000/studio
 Configuración en Producción (Vercel + Sanity)
Variables de Entorno en Vercel: En el panel de Vercel (Settings > Environment Variables), agrega las 3 variables de entorno (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_API_VERSION).

Autorización de Dominio (CORS) en Sanity: En sanity.io/manage:

Ve a tu proyecto Vergel > API > CORS Origins.
Agrega la URL pública de Vercel (ej. https://vergel.vercel.app).
Marca la opción "Allow credentials".
📄 Licencia y Autoría
Desarrollado a medida para Vergel — Almacén Natural. Todos los derechos reservados.
