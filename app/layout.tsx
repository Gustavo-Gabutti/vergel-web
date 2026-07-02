import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

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
    <html lang="es-AR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
        {/* Limpito: Ya no hay widgets flotantes acá abajo */}
      </body>
    </html>
  );
}