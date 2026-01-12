import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: "light" | "dark";
  themeMode: Theme;
  setTheme: (theme: Theme) => void;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    gold: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightColors = {
  background: "#FAF8F3",
  foreground: "#0F172A",
  primary: "#0F172A",
  secondary: "#F1F5F9",
  gold: "#D4AF37",
};

const darkColors = {
  background: "#0F172A",
  foreground: "#FAF8F3",
  primary: "#FAF8F3",
  secondary: "#1E293B",
  gold: "#D4AF37",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<Theme>("system");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("theme").then((stored) => {
      if (stored === "light" || stored === "dark" || stored === "system") {
        setThemeMode(stored);
      }
      setIsReady(true);
    });
  }, []);

  const theme = useMemo(() => {
    if (themeMode === "system") {
      return systemColorScheme === "dark" ? "dark" : "light";
    }
    return themeMode;
  }, [themeMode, systemColorScheme]);

  const colors = theme === "dark" ? darkColors : lightColors;

  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem("theme", newTheme);
      setThemeMode(newTheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  if (!isReady) {
    return null; // or a loading component
  }

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
