import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permitir imágenes locales de /public/images/
    // y dominios externos si en el futuro usás un CMS
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Formatos modernos para mejor rendimiento
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;