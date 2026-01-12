/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#0F172A",
          secondary: "#1E293B",
          accent: "#334155",
        },
        light: {
          DEFAULT: "#FAF8F3",
          secondary: "#F5F3EE",
          accent: "#E8E5DD",
        },
        islamic: {
          gold: "#D4AF37",
          green: "#006B3F",
          blue: "#0066B2",
        },
      },
    },
  },
  plugins: [],
};
