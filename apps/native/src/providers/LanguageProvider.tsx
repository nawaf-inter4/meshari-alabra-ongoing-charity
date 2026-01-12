import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";

// Import all translations statically from shared package
import ar from "@repo/translations/src/locales/ar.json";
import en from "@repo/translations/src/locales/en.json";
import fr from "@repo/translations/src/locales/fr.json";
import ur from "@repo/translations/src/locales/ur.json";
import tr from "@repo/translations/src/locales/tr.json";
import ko from "@repo/translations/src/locales/ko.json";
import ja from "@repo/translations/src/locales/ja.json";
import it from "@repo/translations/src/locales/it.json";
import zh from "@repo/translations/src/locales/zh.json";
import bn from "@repo/translations/src/locales/bn.json";
import ms from "@repo/translations/src/locales/ms.json";
import id from "@repo/translations/src/locales/id.json";

const translationsMap = {
  ar,
  en,
  fr,
  ur,
  tr,
  ko,
  ja,
  it,
  zh,
  bn,
  ms,
  id,
};

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
  direction: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  initialLocale 
}: { 
  children: React.ReactNode;
  initialLocale?: string;
}) {
  const router = useRouter();
  const segments = useSegments();
  const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
  
  // Get initial locale from prop, URL, or AsyncStorage
  const getInitialLocale = async () => {
    // First priority: prop
    if (initialLocale && supportedLanguages.includes(initialLocale)) {
      return initialLocale;
    }
    
    // Second priority: URL segments
    if (segments && segments.length > 0) {
      const urlLang = segments[0];
      if (urlLang && supportedLanguages.includes(urlLang)) {
        return urlLang;
      }
    }
    
    // Third priority: AsyncStorage
    try {
      const stored = await AsyncStorage.getItem("preferred-locale");
      if (stored && supportedLanguages.includes(stored)) {
        return stored;
      }
    } catch (error) {
      console.error("Error reading locale from storage:", error);
    }
    
    // Default: Arabic
    return "ar";
  };
  
  const [locale, setLocaleState] = useState(initialLocale || "ar");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getInitialLocale().then((loc) => {
      setLocaleState(loc);
      setIsReady(true);
    });
  }, []);

  const direction = ["ar", "he", "fa", "ur", "yi", "ps"].includes(locale) ? "rtl" : "ltr";
  
  const translations = useMemo(() => {
    return translationsMap[locale as keyof typeof translationsMap] || translationsMap.ar;
  }, [locale]);

  const setLocale = async (newLocale: string) => {
    if (!supportedLanguages.includes(newLocale)) return;
    
    try {
      await AsyncStorage.setItem("preferred-locale", newLocale);
      setLocaleState(newLocale);
      // Navigate to new locale route
      router.replace(`/${newLocale}`);
    } catch (error) {
      console.error("Error saving locale:", error);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key} for locale: ${locale}`);
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  if (!isReady) {
    return null; // or a loading component
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, direction }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
