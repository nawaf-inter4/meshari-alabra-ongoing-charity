"use client";

import { useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import ClientHeader from "./ClientHeader";
import HeroSection from "./sections/HeroSection";
import YouTubePlaylist from "./sections/YouTubePlaylist";
import DonationSection from "./sections/DonationSection";
import PrayerTimesSection from "./sections/PrayerTimesSection";
import SupplicationsSection from "./sections/SupplicationsSection";
import EnhancedQuranSection from "./sections/EnhancedQuranSection";
import TafseerSection from "./sections/TafseerSection";
import HadithSection from "./sections/HadithSection";
import DhikrCounter from "./sections/DhikrCounter";
import QiblaFinder from "./sections/QiblaFinder";
import QuranStoriesSection from "./sections/QuranStoriesSection";
import MeshariFavoriteReciter from "./sections/MeshariFavoriteReciter";
import IslamicChantSection from "./sections/IslamicChantSection";
import SectionNavigation from "./sections/SectionNavigation";
import Footer from "./Footer";

interface HomePageProps {
  language?: string;
}

export default function HomePage({ language }: HomePageProps) {
  // Language is now handled by URL-based detection in LanguageProvider
  // No need to call setLocale here as it can interfere with the language switcher

  return (
    <main id="main-content" role="main" aria-label="Main content" className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      {/* Fixed Header with Theme, Language, and Donation */}
      <ClientHeader />
      
      <HeroSection />
      <YouTubePlaylist playlistId="PLozaqJ9egxJegXbK52PNLLlvWf4K5g-Cb" />
      <DonationSection />
      <PrayerTimesSection />
      <SupplicationsSection />
      <EnhancedQuranSection />
      <TafseerSection />
      <HadithSection />
      <DhikrCounter />
      <QiblaFinder />
      <QuranStoriesSection />
      <MeshariFavoriteReciter />
      <IslamicChantSection />
      <SectionNavigation />
      <Footer />
    </main>
  );
}
