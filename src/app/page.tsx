"use client";

import { useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
import YouTubePlaylist from "@/components/sections/YouTubePlaylist";
import DonationSection from "@/components/sections/DonationSection";
import SupplicationsSection from "@/components/sections/SupplicationsSection";
import PrayerTimesSection from "@/components/sections/PrayerTimesSection";
import QuranSection from "@/components/sections/QuranSection";
import TafseerSection from "@/components/sections/TafseerSection";
import HadithSection from "@/components/sections/HadithSection";
import DhikrCounter from "@/components/sections/DhikrCounter";
import QiblaFinder from "@/components/sections/QiblaFinder";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Footer from "@/components/Footer";
import { requestNotificationPermission } from "@/lib/utils";

export default function Home() {
  useEffect(() => {
    // Register service worker for PWA
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log("Service Worker registered"))
        .catch((err) => console.error("Service Worker registration failed:", err));
    }

    // Request notification permission
    requestNotificationPermission();
  }, []);

  return (
    <main className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      {/* Fixed Header with Theme and Language */}
      <div className="fixed top-0 right-0 z-50 p-4 flex gap-2">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* YouTube Playlist Section */}
      <YouTubePlaylist playlistId="PLozaqJ9egxJegXbK52PNLLlvWf4K5g-Cb" />

      {/* Donation Section */}
      <DonationSection />

      {/* Prayer Times and Hijri Date */}
      <PrayerTimesSection />

      {/* Supplications Section */}
      <SupplicationsSection />

      {/* Quran Reading Section */}
      <QuranSection />

      {/* Tafseer Section */}
      <TafseerSection />

      {/* Hadith Section */}
      <HadithSection />

      {/* Dhikr Counter */}
      <DhikrCounter />

      {/* Qibla Finder */}
      <QiblaFinder />

      {/* Footer */}
      <Footer />
    </main>
  );
}
