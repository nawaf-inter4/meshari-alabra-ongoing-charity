"use client";

import { useEffect, useState } from "react";
import { requestNotificationPermission } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function ClientHeader() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Register service worker for PWA
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {})
        .catch(() => {});
    }

    // Request notification permission
    requestNotificationPermission();
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-0 right-0 z-50 p-4 flex gap-4">
        <a
          href="#donation"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-islamic-gold to-islamic-green text-white font-bold rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
        >
          <Heart className="w-4 h-4" fill="currentColor" />
          <span className="hidden sm:inline">تبرع</span>
        </a>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 right-0 z-50 p-4 flex gap-4">
      <a
        href="#donation"
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-islamic-gold to-islamic-green text-white font-bold rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
      >
        <Heart className="w-4 h-4" fill="currentColor" />
        <span className="hidden sm:inline">{t("donation.header_button")}</span>
      </a>
      <ThemeToggle />
      <LanguageSwitcher />
    </div>
  );
}
