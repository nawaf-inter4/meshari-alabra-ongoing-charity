"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "./LanguageProvider";
import ErrorBoundary from "./ErrorBoundary";

const languages = [
  { code: "ar", name: "العربية", flag: "sa" },
  { code: "en", name: "English", flag: "us" },
  { code: "ur", name: "اردو", flag: "pk" },
  { code: "tr", name: "Türkçe", flag: "tr" },
  { code: "id", name: "Indonesia", flag: "id" },
  { code: "ms", name: "Melayu", flag: "my" },
  { code: "bn", name: "বাংলা", flag: "bd" },
  { code: "fr", name: "Français", flag: "fr" },
  { code: "zh", name: "中文", flag: "cn" },
  { code: "it", name: "Italiano", flag: "it" },
  { code: "ja", name: "日本語", flag: "jp" },
  { code: "ko", name: "한국어", flag: "kr" }
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Reset changing state when locale changes
  useEffect(() => {
    setIsChanging(false);
  }, [locale]);

  const handleLanguageChange = useCallback((langCode: string) => {
    if (langCode === locale || isChanging) return;
    
    setIsOpen(false);
    setIsChanging(true);
    
    // Call setLocale directly
    setLocale(langCode);
  }, [locale, isChanging, setLocale]);

  return (
    <ErrorBoundary>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center p-3 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold dark:hover:bg-islamic-gold transition-all duration-300 glow"
          aria-label="Select language"
          disabled={isChanging}
        >
          <img
            src={`https://hatscripts.github.io/circle-flags/flags/${currentLanguage.flag}.svg`}
            alt={currentLanguage.name}
            className="w-5 h-5 rounded-full"
          />
          {isChanging && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-light-secondary dark:bg-dark-secondary rounded-2xl shadow-xl border border-islamic-gold/20 max-h-96 overflow-y-auto language-switcher z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-islamic-gold/20 transition-colors ${
                  locale === lang.code ? "bg-islamic-gold/30" : ""
                } ${isChanging ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isChanging}
              >
                <img
                  src={`https://hatscripts.github.io/circle-flags/flags/${lang.flag}.svg`}
                  alt={lang.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm font-medium">{lang.name}</span>
                {locale === lang.code && (
                  <span className="ml-auto text-islamic-gold">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
