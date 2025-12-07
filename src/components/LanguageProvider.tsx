"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
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

export function LanguageProvider({ 
  children, 
  initialLocale 
}: { 
  children: React.ReactNode;
  initialLocale?: string;
}) {
  // Initialize locale from prop, URL, localStorage, or default to 'ar'
  const pathname = usePathname();
  const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
  
  // Get initial locale from prop, URL, or localStorage
  const getInitialLocale = () => {
    // First priority: prop from server
    if (initialLocale && supportedLanguages.includes(initialLocale)) {
      return initialLocale;
    }
    
    // Second priority: URL pathname
    if (pathname) {
      const pathSegments = pathname.split('/').filter(Boolean);
      const urlLang = pathSegments[0];
      if (urlLang && supportedLanguages.includes(urlLang)) {
        return urlLang;
      }
    }
    
    // Third priority: localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("preferred-locale");
      if (stored && supportedLanguages.includes(stored)) {
        return stored;
      }
    }
    
    // Default: Arabic
    return "ar";
  };
  
  const [locale, setLocaleState] = useState(getInitialLocale);

  const direction = ["ar", "he", "fa", "ur", "yi", "ps"].includes(locale) ? "rtl" : "ltr";
  
  // Get translations synchronously with useMemo to ensure proper updates
  const translations = useMemo(() => {
    const trans = translationsMap[locale as keyof typeof translationsMap] || translationsMap.ar;
    // Debug: Verify navigation.back_to_home exists
    if (!trans['navigation.back_to_home']) {
      console.error('❌ navigation.back_to_home missing in translations for locale:', locale);
      console.log('Available keys:', Object.keys(trans).filter(k => k.startsWith('navigation.')));
    }
    return trans;
  }, [locale]);

  // Detect language from URL on mount and pathname changes
  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split('/').filter(Boolean);
      const urlLang = pathSegments[0];
      
      if (urlLang && supportedLanguages.includes(urlLang)) {
        // Language is in URL
        if (urlLang !== locale) {
          setLocaleState(urlLang);
          localStorage.setItem("preferred-locale", urlLang);
          // Set cookie for server-side proxy to read
          document.cookie = `preferred-locale=${urlLang}; path=/; max-age=31536000; SameSite=Lax`;
        }
      } else {
        // No language in URL (e.g., /sections/quran or /)
        // If we have an initialLocale prop, use it
        if (initialLocale && supportedLanguages.includes(initialLocale) && initialLocale !== locale) {
          setLocaleState(initialLocale);
          localStorage.setItem("preferred-locale", initialLocale);
          document.cookie = `preferred-locale=${initialLocale}; path=/; max-age=31536000; SameSite=Lax`;
        } else {
          // Check localStorage for preferred language
          const storedLang = localStorage.getItem("preferred-locale");
          if (storedLang && supportedLanguages.includes(storedLang)) {
            // Update locale from localStorage
            if (storedLang !== locale) {
              setLocaleState(storedLang);
              // Set cookie for server-side proxy to read
              document.cookie = `preferred-locale=${storedLang}; path=/; max-age=31536000; SameSite=Lax`;
            }
          } else {
            // Default to Arabic
            if (locale !== "ar") {
              setLocaleState("ar");
              // Set cookie for server-side proxy to read
              document.cookie = `preferred-locale=ar; path=/; max-age=31536000; SameSite=Lax`;
            }
          }
        }
      }
    }
  }, [pathname, initialLocale, locale, supportedLanguages]);

  useEffect(() => {
    // Debug: Check if navigation.back_to_home exists
    const backToHomeKey = 'navigation.back_to_home';
    const backToHomeTranslation = (translations as any)[backToHomeKey];
    if (backToHomeTranslation) {
      console.log('✅ navigation.back_to_home found:', backToHomeTranslation, 'for locale:', locale);
    } else {
      console.warn('⚠️ navigation.back_to_home NOT found in translations for locale:', locale);
      console.log('Available navigation keys:', Object.keys(translations).filter(k => k.startsWith('navigation.')));
    }

    // Update HTML attributes
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
  }, [locale, direction, translations]);

  const setLocale = (newLocale: string) => {
    if (!supportedLanguages.includes(newLocale)) {
      return; // Don't do anything if invalid language
    }
    
    // Don't update if already the same language
    if (newLocale === locale) {
      return;
    }
    
    // DON'T update React state - this causes unmounting issues
    // Just update storage and navigate immediately
    localStorage.setItem("preferred-locale", newLocale);
    // Set cookie for server-side proxy to read
    document.cookie = `preferred-locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Update URL to include language prefix
    const currentPath = pathname || '/';
    const pathSegments = currentPath.split('/').filter(Boolean);
    const currentLang = pathSegments[0];
    
    let newPath = '';
    
    // Check if current path starts with a language code
    if (supportedLanguages.includes(currentLang)) {
      // Replace the language code
      pathSegments[0] = newLocale;
      newPath = '/' + pathSegments.join('/');
    } else if (currentPath.startsWith('/sections/')) {
      // For sections, add language prefix
      if (newLocale === 'ar') {
        // Arabic: /sections/quran (no prefix)
        newPath = currentPath;
      } else {
        // Other languages: /en/sections/quran
        newPath = `/${newLocale}${currentPath}`;
      }
    } else if (currentPath === '/' || currentPath === '') {
      // Root path
      if (newLocale === 'ar') {
        newPath = '/';
      } else {
        newPath = `/${newLocale}`;
      }
    } else {
      // Other paths without language
      if (newLocale === 'ar') {
        newPath = currentPath;
      } else {
        newPath = `/${newLocale}${currentPath}`;
      }
    }
    
    // Navigate immediately - no DOM manipulation to avoid React errors
    // Next.js router handles navigation smoothly without interfering with React
    console.log('🔄 Language change:', { from: locale, to: newLocale, currentPath, newPath });
    
    // Use router.push directly - Next.js handles the transition
    router.push(newPath);
  };

  const t = (key: string): string => {
    const translation = (translations as any)[key];
    // If translation exists and is not empty, return it
    if (translation && translation !== key && translation.trim() !== '') {
      return translation;
    }
    // Fallback to key if translation not found
    return key;
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
