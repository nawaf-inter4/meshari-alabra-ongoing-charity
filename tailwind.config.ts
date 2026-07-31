import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "rgb(var(--color-background-dark-rgb) / <alpha-value>)",
          secondary: "rgb(var(--color-background-dark-secondary-rgb) / <alpha-value>)",
          accent: "rgb(var(--color-background-dark-accent-rgb) / <alpha-value>)",
        },
        light: {
          DEFAULT: "rgb(var(--color-background-light-rgb) / <alpha-value>)",
          secondary: "rgb(var(--color-background-light-secondary-rgb) / <alpha-value>)",
          accent: "rgb(var(--color-background-light-accent-rgb) / <alpha-value>)",
        },
        islamic: {
          gold: "rgb(var(--color-brand-rgb) / <alpha-value>)",
          green: "rgb(var(--color-accent-rgb) / <alpha-value>)",
          blue: "rgb(var(--color-link-rgb) / <alpha-value>)",
        },
      },
      fontFamily: {
        lexend: ["'Lexend Deca'", "sans-serif"],
        tajwal: ["'Tajawal'", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
