"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group p-3 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold dark:hover:bg-islamic-gold transition-colors duration-300 glow"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-islamic-gold group-hover:text-white transition-colors duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-islamic-blue group-hover:text-white transition-colors duration-300" />
      )}
    </button>
  );
}
