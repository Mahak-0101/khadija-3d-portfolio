import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        couture: {
          950: "#060607",
          900: "#0b0b0d",
          850: "#121215",
          800: "#1a1a1f",
          700: "#2c2c34",
          gold: "#d4af37",
          "gold-light": "#f1df99",
          champagne: "#e7d7be",
          crimson: "#871f28",
          emerald: "#0c3b2e",
          cream: "#f7f5f0",
          muted: "#8c877e",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-cinzel)", "Cinzel", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        ultra: "0.28em",
        mega: "0.35em",
        super: "0.45em",
      },
      animation: {
        "spin-slow": "spin 28s linear infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
