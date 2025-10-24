"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getTranslations } from "../lib/translations";

// Import all translations statically
import ar from "../locales/ar.json";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import ur from "../locales/ur.json";
import tr from "../locales/tr.json";
import ko from "../locales/ko.json";
import ja from "../locales/ja.json";
import it from "../locales/it.json";
import zh from "../locales/zh.json";
import bn from "../locales/bn.json";
import ms from "../locales/ms.json";
import id from "../locales/id.json";

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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState("ar");
  const router = useRouter();
  const pathname = usePathname();

  const direction = ["ar", "he", "fa", "ur", "yi", "ps"].includes(locale) ? "rtl" : "ltr";
  
  // Get translations synchronously
  const translations = translationsMap[locale as keyof typeof translationsMap] || translationsMap.ar;

  useEffect(() => {
    console.log('🔍 Translations loaded:', Object.keys(translations).length, 'keys for locale:', locale);
    console.log('🔍 hero.subtitle:', translations['hero.subtitle']);
    console.log('🔍 memorial.name:', translations['memorial.name']);

    // Update HTML attributes
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
  }, [locale, direction, translations]);

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale);
    localStorage.setItem("preferred-locale", newLocale);
  };

  const t = (key: string): string => {
    return (translations as any)[key] || key;
  };

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
