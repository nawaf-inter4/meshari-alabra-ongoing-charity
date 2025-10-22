"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Globe, ChevronDown } from "lucide-react";

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

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-3 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold dark:hover:bg-islamic-gold transition-all duration-300 glow"
        aria-label="Select language"
      >
        <img
          src={`https://hatscripts.github.io/circle-flags/flags/${currentLanguage.flag}.svg`}
          alt={currentLanguage.name}
          className="w-5 h-5 rounded-full"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-light-secondary dark:bg-dark-secondary rounded-lg shadow-xl border border-islamic-gold/20 max-h-96 overflow-y-auto language-switcher z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-islamic-gold/20 transition-colors ${
                locale === lang.code ? "bg-islamic-gold/30" : ""
              }`}
            >
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${lang.flag}.svg`}
                alt={lang.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
