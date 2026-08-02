"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group p-3 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold dark:hover:bg-islamic-gold transition-colors duration-300 glow"
      aria-label="Toggle theme"
    >
      {/* Avoid sun/moon hydration mismatch before localStorage theme applies. */}
      {!mounted ? (
        <span className="block w-5 h-5" aria-hidden="true" />
      ) : isDark ? (
        <Sun className="w-5 h-5 text-islamic-gold group-hover:text-white transition-colors duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-islamic-blue group-hover:text-white transition-colors duration-300" />
      )}
    </button>
  );
}
