"use client";

import { useEffect, useState } from "react";
import { Platform } from "../utils";

// Platform-specific theme hooks
function useThemeWeb() {
  // Dynamic import for next-themes (web only)
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      // Use next-themes if available
      import("next-themes").then(() => {
        // This will be handled by the web implementation
      });
    }
  }, []);

  return { theme, setTheme, mounted };
}

function useThemeNative() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted] = useState(true);

  // Native theme implementation would use AsyncStorage or similar
  useEffect(() => {
    // Load theme from storage
    // setTheme(savedTheme);
  }, []);

  return { theme, setTheme, mounted };
}

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme, mounted } = Platform.isWeb ? useThemeWeb() : useThemeNative();

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Web implementation uses HTML button
  if (Platform.isWeb) {
    return (
      <button
        onClick={toggleTheme}
        className={className}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    );
  }

  // Native implementation uses TouchableOpacity
  const { TouchableOpacity, Text } = require("react-native");
  return (
    <TouchableOpacity onPress={toggleTheme} style={{ padding: 12 }}>
      <Text>{theme === "dark" ? "☀️" : "🌙"}</Text>
    </TouchableOpacity>
  );
}
