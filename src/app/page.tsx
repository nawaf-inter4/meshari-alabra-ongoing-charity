"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { requestNotificationPermission } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

// Dynamic imports for better code splitting and performance
const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="shimmer w-32 h-32 rounded-full" /></div>,
});

const YouTubePlaylist = dynamic(() => import("@/components/sections/YouTubePlaylist"), {
  loading: () => <div className="shimmer w-full h-96 rounded-2xl" />,
});

const DonationSection = dynamic(() => import("@/components/sections/DonationSection"), {
  loading: () => <div className="shimmer w-full h-64 rounded-2xl" />,
});

const PrayerTimesSection = dynamic(() => import("@/components/sections/PrayerTimesSection"), {
  loading: () => <div className="shimmer w-full h-96 rounded-2xl" />,
});

const SupplicationsSection = dynamic(() => import("@/components/sections/SupplicationsSection"), {
  loading: () => <div className="shimmer w-full h-64 rounded-2xl" />,
});

const QuranSection = dynamic(() => import("@/components/sections/QuranSection"), {
  loading: () => <div className="shimmer w-full h-96 rounded-2xl" />,
  ssr: false, // Disable SSR for heavy interactive component
});

const TafseerSection = dynamic(() => import("@/components/sections/TafseerSection"), {
  loading: () => <div className="shimmer w-full h-64 rounded-2xl" />,
  ssr: false,
});

const HadithSection = dynamic(() => import("@/components/sections/HadithSection"), {
  loading: () => <div className="shimmer w-full h-64 rounded-2xl" />,
  ssr: false,
});

const DhikrCounter = dynamic(() => import("@/components/sections/DhikrCounter"), {
  loading: () => <div className="shimmer w-full h-96 rounded-2xl" />,
  ssr: false,
});

const QiblaFinder = dynamic(() => import("@/components/sections/QiblaFinder"), {
  loading: () => <div className="shimmer w-full h-96 rounded-2xl" />,
  ssr: false, // Needs device orientation APIs
});

const ThemeToggle = dynamic(() => import("@/components/ThemeToggle"), {
  ssr: false,
});

const LanguageSwitcher = dynamic(() => import("@/components/LanguageSwitcher"), {
  ssr: false,
});

const Footer = dynamic(() => import("@/components/Footer"));



export default function Home() {
  const { t } = useLanguage();

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

  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      {/* Fixed Header with Theme, Language, and Donation */}
      <div className="fixed top-0 right-0 z-50 p-4 flex gap-4">
        <a
          href="#donation"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-islamic-gold to-islamic-green text-white font-bold rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Heart className="w-4 h-4" fill="currentColor" />
          <span className="hidden sm:inline">{t("donation.header_button")}</span>
        </a>
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      {/* Hero Section - Load immediately */}
      <HeroSection />

      {/* YouTube Playlist Section - High priority */}
      <YouTubePlaylist playlistId="PLozaqJ9egxJegXbK52PNLLlvWf4K5g-Cb" />

      {/* Donation Section - High priority */}
      <DonationSection />

      {/* Prayer Times and Hijri Date - Medium priority */}
      <PrayerTimesSection />

      {/* Supplications Section - Medium priority */}
      <SupplicationsSection />

      {/* Quran Reading Section - Lower priority, heavy component */}
      <QuranSection />

      {/* Tafseer Section - Lower priority */}
      <TafseerSection />

      {/* Hadith Section - Lower priority */}
      <HadithSection />

      {/* Dhikr Counter - Lower priority */}
      <DhikrCounter />

      {/* Qibla Finder - Lower priority */}
      <QiblaFinder />

      {/* Footer */}
      <Footer />
    </main>
  );
}
