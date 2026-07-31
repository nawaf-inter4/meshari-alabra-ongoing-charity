"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  isSupportedLocale,
  localeDirection,
  siteConfig,
  type SupportedLocale,
} from "@/config/site";
import { translations as translationsMap } from "@/lib/translations";

interface LanguageContextType {
  locale: SupportedLocale;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
  direction: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function localeFromPath(pathname: string | null) {
  const candidate = pathname?.split("/").filter(Boolean)[0];
  return candidate && isSupportedLocale(candidate) ? candidate : undefined;
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    if (initialLocale && isSupportedLocale(initialLocale)) return initialLocale;
    const pathLocale = localeFromPath(pathname);
    if (pathLocale) return pathLocale;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("preferred-locale");
      if (stored && isSupportedLocale(stored)) return stored;
    }
    return siteConfig.identity.defaultLocale;
  });

  const direction = localeDirection(locale);
  const translations = useMemo(() => translationsMap[locale], [locale]);

  useEffect(() => {
    const pathLocale = localeFromPath(pathname);
    if (!pathLocale || pathLocale === locale) return;

    setLocaleState(pathLocale);
    localStorage.setItem("preferred-locale", pathLocale);
    document.cookie = `preferred-locale=${pathLocale}; path=/; max-age=31536000; SameSite=Lax`;
  }, [pathname, locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
  }, [locale, direction]);

  const setLocale = useCallback(
    (newLocale: string) => {
      if (!isSupportedLocale(newLocale) || newLocale === locale) return;

      localStorage.setItem("preferred-locale", newLocale);
      document.cookie = `preferred-locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

      const currentPath = pathname || "/";
      const segments = currentPath.split("/").filter(Boolean);
      if (segments[0] && isSupportedLocale(segments[0])) {
        segments[0] = newLocale;
        router.push(`/${segments.join("/")}`);
        return;
      }

      router.push(
        currentPath === "/"
          ? `/${newLocale}`
          : `/${newLocale}${currentPath.startsWith("/") ? currentPath : `/${currentPath}`}`,
      );
    },
    [locale, pathname, router],
  );

  const t = useCallback(
    (key: string): string => {
      const configuredTranslation =
        siteConfig.content.translations[locale]?.[key] ||
        siteConfig.content.translations["*"]?.[key];
      if (configuredTranslation?.trim()) return configuredTranslation;

      const translation = translations[key];
      return typeof translation === "string" && translation.trim() ? translation : key;
    },
    [locale, translations],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, direction }),
    [locale, setLocale, t, direction],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
