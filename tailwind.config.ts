import type { Config } from "tailwindcss";
import twAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        space: {
          primary: "#1a1a1a", // Base metal color
          accent: "#00ffff", // Hologram/neon color
          dark: "#0a192f", // Dark blue accent
          metal: {
            light: "#2a2a2a",
            DEFAULT: "#1a1a1a",
            dark: "#0a0a0a",
          },
          neon: {
            cyan: "#00ffff",
            purple: "#ff00ff",
            blue: "#0066ff",
          },
          hologram: {
            base: "#00ffff",
            glow: "#00ffff80",
          },
        },
      },
      backgroundImage: {
        "gradient-space":
          "linear-gradient(180deg, rgba(10, 25, 47, 0) 0%, rgba(10, 25, 47, 0.5) 100%)",
      },
      keyframes: {
        "panel-close": {
          "0%": {
            transform: "scale(1) translateY(0)",
            opacity: "1",
            filter: "brightness(1)",
          },
          "50%": {
            transform: "scale(0.5) translateY(50%)",
            opacity: "0.5",
            filter: "brightness(1.5)",
          },
          "100%": {
            transform: "scale(0) translateY(100%)",
            opacity: "0",
            filter: "brightness(0)",
          },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "panel-close": "panel-close 0.5s ease-in-out forwards",
        scanline: "scanline 0.5s linear",
      },
    },
  },
  plugins: [twAnimate],
};

export default config;
