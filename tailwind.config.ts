import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vergel: {
          cream: "#FAF7F2",
          sand: "#F0E6D3",
          olive: "#8B9A6B",
          "olive-dark": "#6B7A4B",
          sage: "#A8B89A",
          "sage-light": "#C5D4B8",
          warm: "#D4A574",
          "warm-light": "#E8C9A0",
          charcoal: "#3A3A3A",
          gray: "#6B6B6B",
          "gray-light": "#9A9A9A",
          "gray-softer": "#D1D1D1",
          white: "#FFFFFF",
          "off-white": "#F5F5F0",
          alert: "#C47A5A",
          success: "#7A9E6B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      borderRadius: {
        vergel: "0.625rem",
      },
    },
  },
  plugins: [],
};

export default config;