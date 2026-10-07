Vergel — E-Commerce & Headless CMS
Plataforma e-commerce moderna y autogestionable diseñada para Vergel (Almacén Natural & Dietética). Cuenta con catálogo dinámico sincronizado en tiempo real, carrito de compras persistente, checkout directo por WhatsApp y un panel de administración en la nube completamente integrado.

Características Principales
Catálogo Dinámico & Autogestionable: Integración completa con Sanity.io (Headless CMS). Gestión centralizada de productos, precios, stock, categorías y banners.

Sanity Studio Embebido: Panel de administración accesible directamente desde la ruta /studio de la aplicación, sin depender de servidores o paneles externos.

Carrito de Compras Persistente: Preservación del estado del carrito en localStorage para garantizar que los productos seleccionados no se pierdan al navegar o recargar la página.

Checkout directo por WhatsApp: Generación e integración automática del pedido formateado y listo para enviar al canal de atención de WhatsApp del almacén.

Buscador y Filtros Dinámicos: Sistema de filtrado en tiempo real por categorías (Mixes, Frutos Secos, Sin Gluten, Ofertas, etc.) y búsqueda por palabras clave.

Diseño Responsive & Mobile-First: Experiencia de usuario optimizada para dispositivos móviles, tablets y escritorio mediante Tailwind CSS.

Performance & SEO Impecable: Carga ultrarrápida impulsada por Next.js App Router y renderizado estático/dinámico optimizado.

Arquitectura y Tecnologías
Frontend
Framework: Next.js (App Router)

Lenguaje: TypeScript

Estilos: Tailwind CSS

Iconografía: Lucide React / React Icons

Backend & Headless CMS
Gestor de Contenidos: Sanity.io

Librerías de integración: next-sanity, @sanity/image-url, sanity

Consultas de datos: GROQ (Graph-Relational Object Queries)

Infraestructura
Despliegue Frontend: Vercel

Asset Storage & CDN: Sanity Global CDN

Estructura del Proyecto
vergel-web/

├── app/                      # Rutas y páginas principales (App Router)

│   └── studio/               # Ruta dedicada para embeber Sanity Studio

├── components/               # Componentes reutilizables de la interfaz

│   ├── CartDrawer.tsx        # Carrito lateral interactivo

│   ├── Header.tsx            # Cabecera principal con buscador

│   ├── Hero.tsx              # Banners promocionales dinámicos

│   ├── InfoSections.tsx      # Secciones informativas y propuestas de valor

│   ├── Navbar.tsx            # Navegación por categorías del almacén

│   ├── ProductCard.tsx       # Tarjeta individual de producto

│   ├── ProductDetailModal.tsx# Ventana modal de detalle

│   ├── ProductGrid.tsx       # Grilla del catálogo en tiempo real

│   ├── PromoBannerCarousel.tsx # Carrusel de novedades y ofertas

│   └── TopBar.tsx            # Barra superior de avisos

├── data/

│   └── products.json         # Mock data / Respaldo estático inicial

├── lib/

│   └── sanity/               # Configuración del cliente y consultas

│       ├── client.ts         # Cliente de Sanity

│       ├── image.ts          # Helper para la generación de URLs de imágenes

│       └── queries.ts        # Consultas optimizadas en GROQ

├── sanity/

│   └── schemas/              # Esquemas de la base de datos de Sanity

│       ├── index.ts          # Registro de esquemas

│       └── product.ts        # Estructura del modelo de Producto

├── sanity.config.ts          # Configuración principal de Sanity Studio

└── .env.local                # Variables de entorno (Ignorado en VCS)

Configuración e Instalación Local
1. Clonar el repositorio
git clone https://github.com/tu-usuario/vergel-web.git

cd vergel-web

2. Instalar dependencias
npm install

3. Configurar variables de entorno
Crea un archivo .env.local en la raíz del proyecto agregando las credenciales correspondientes:

NEXT_PUBLIC_SANITY_PROJECT_ID="tu_project_id_aqui"

NEXT_PUBLIC_SANITY_DATASET="production"

NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"

4. Ejecutar el servidor de desarrollo
npm run dev

Accedé a las siguientes URLs en tu navegador:

Tienda Principal: http://localhost:3000

Sanity Studio (CMS): http://localhost:3000/studio

Despliegue en Producción (Vercel + Sanity)
Variables de Entorno en Vercel:

Ingresá al panel de Vercel (Settings > Environment Variables) y configurá las claves:

NEXT_PUBLIC_SANITY_PROJECT_ID

NEXT_PUBLIC_SANITY_DATASET

NEXT_PUBLIC_SANITY_API_VERSION

Permisos CORS en Sanity:

Para permitir que tu web consulte los datos del CMS desde producción:

Entrá a sanity.io/manage y seleccioná el proyecto Vergel.

Navegá a API > CORS Origins.

Agregá el dominio de tu despliegue (ej. [https://vergel.vercel.app](https://vergel.vercel.app)).

Habilitá la casilla Allow credentials.

Licencia y Autoría
Desarrollado a medida para Vergel — Almacén Natural.

Todos los derechos reservados.
