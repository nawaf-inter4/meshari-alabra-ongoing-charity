"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-3 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold dark:hover:bg-islamic-gold transition-all duration-300 glow"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-islamic-gold" />
      ) : (
        <Moon className="w-5 h-5 text-islamic-blue" />
      )}
    </button>
  );
}
