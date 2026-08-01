"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  attribute?: "class";
  disableTransitionOnChange?: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "theme",
  enableSystem = true,
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    defaultTheme === "light" ? "light" : "dark",
  );

  const applyTheme = useCallback((nextTheme: Theme) => {
    const resolved = nextTheme === "system" && enableSystem ? systemTheme() : nextTheme === "light" ? "light" : "dark";
    const root = document.documentElement;
    if (disableTransitionOnChange) {
      root.classList.add("theme-changing");
    }
    root.classList.toggle("dark", resolved === "dark");
    root.style.colorScheme = resolved;
    setResolvedTheme(resolved);
    if (disableTransitionOnChange) {
      // Double-rAF flushes styles without a forced layout read (offsetHeight).
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          root.classList.remove("theme-changing");
        });
      });
    }
  }, [disableTransitionOnChange, enableSystem]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKey);
    const initialTheme: Theme = storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
      ? storedTheme
      : defaultTheme;
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, [applyTheme, defaultTheme, storageKey]);

  useEffect(() => {
    if (theme !== "system" || !enableSystem) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme("system");
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [applyTheme, enableSystem, theme]);

  const setTheme = useCallback((nextTheme: Theme) => {
    window.localStorage.setItem(storageKey, nextTheme);
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  }, [applyTheme, storageKey]);

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [resolvedTheme, setTheme, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used inside ThemeProvider");
  return value;
}
