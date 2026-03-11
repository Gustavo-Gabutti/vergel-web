import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIChatWidget from "@/components/AIChatWidget";

export const metadata: Metadata = {
  title: "Vergel · Almacén de Barrio | Productos Saludables en Corrientes",
  description:
    "Vergel es tu almacén de barrio en Corrientes Capital. Productos saludables, frescos y locales: frutos secos, especias, té, sin gluten y más. Envíos a todo el país.",
  keywords: [
    "dietética Corrientes",
    "almacén saludable",
    "productos naturales Corrientes",
    "frutos secos",
    "sin gluten",
    "envíos Argentina",
  ],
  openGraph: {
    title: "Vergel · Almacén de Barrio",
    description:
      "Productos saludables, frescos y locales en Corrientes Capital.",
    url: "https://vergel.com.ar",
    siteName: "Vergel",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <body className="min-h-screen flex flex-col">
        {children}

        {/* Widgets flotantes — se renderizan en toda la app */}
        <WhatsAppButton />
        <AIChatWidget />
      </body>
    </html>
  );
}