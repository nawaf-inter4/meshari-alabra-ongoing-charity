"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Platform } from "../utils";

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

interface LanguageSwitcherProps {
  locale: string;
  setLocale: (locale: string) => void;
  className?: string;
}

export function LanguageSwitcher({ locale, setLocale, className = "" }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  // Close dropdown when clicking outside (web only)
  useEffect(() => {
    if (!Platform.isWeb || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = useCallback((langCode: string) => {
    if (langCode === locale) return;
    setIsOpen(false);
    setLocale(langCode);
  }, [locale, setLocale]);

  // Web implementation
  if (Platform.isWeb) {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center p-3 rounded-full bg-light-secondary dark:bg-dark-secondary hover:bg-islamic-gold dark:hover:bg-islamic-gold transition-all duration-300"
          aria-label="Select language"
        >
          <img
            src={`https://hatscripts.github.io/circle-flags/flags/${currentLanguage.flag}.svg`}
            alt={currentLanguage.name}
            className="w-5 h-5 rounded-full"
          />
        </button>
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-dark rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-islamic-gold dark:hover:bg-islamic-gold transition-colors"
              >
                <img
                  src={`https://hatscripts.github.io/circle-flags/flags/${lang.flag}.svg`}
                  alt={lang.name}
                  className="w-5 h-5 rounded-full"
                />
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Native implementation
  const { View, Text, TouchableOpacity, Image, Modal } = require("react-native");
  return (
    <View ref={dropdownRef} style={{ position: 'relative' }}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={{ padding: 12, borderRadius: 20 }}
      >
        <Image
          source={{ uri: `https://hatscripts.github.io/circle-flags/flags/${currentLanguage.flag}.svg` }}
          style={{ width: 20, height: 20, borderRadius: 10 }}
        />
      </TouchableOpacity>
      <Modal visible={isOpen} transparent animationType="fade">
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onPress={() => setIsOpen(false)}
        >
          <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 16, maxHeight: 400 }}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => handleLanguageChange(lang.code)}
                style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}
              >
                <Image
                  source={{ uri: `https://hatscripts.github.io/circle-flags/flags/${lang.flag}.svg` }}
                  style={{ width: 20, height: 20, borderRadius: 10, marginRight: 8 }}
                />
                <Text>{lang.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
