"use client";

import { useEffect, lazy, Suspense } from "react";
import { useLanguage } from "./LanguageProvider";
import ClientHeader from "./ClientHeader";
import HeroSection from "./sections/HeroSection";
import SectionNavigation from "./sections/SectionNavigation";
import Footer from "./Footer";

// Lazy load heavy sections for better performance - reduces initial bundle size
const YouTubePlaylist = lazy(() => import("./sections/YouTubePlaylist"));
const DonationSection = lazy(() => import("./sections/DonationSection"));
const PrayerTimesSection = lazy(() => import("./sections/PrayerTimesSection"));
const SupplicationsSection = lazy(() => import("./sections/SupplicationsSection"));
const EnhancedQuranSection = lazy(() => import("./sections/EnhancedQuranSection"));
const TafseerSection = lazy(() => import("./sections/TafseerSection"));
const HadithSection = lazy(() => import("./sections/HadithSection"));
const DhikrCounter = lazy(() => import("./sections/DhikrCounter"));
const QiblaFinder = lazy(() => import("./sections/QiblaFinder"));
const QuranStoriesSection = lazy(() => import("./sections/QuranStoriesSection"));
const MeshariFavoriteReciter = lazy(() => import("./sections/MeshariFavoriteReciter"));
const IslamicChantSection = lazy(() => import("./sections/IslamicChantSection"));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-islamic-gold border-r-transparent"></div>
    </div>
  </div>
);

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
      
      {/* Lazy-loaded sections with Suspense for better performance */}
      <Suspense fallback={<SectionLoader />}>
        <YouTubePlaylist playlistId="PLozaqJ9egxJegXbK52PNLLlvWf4K5g-Cb" />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <DonationSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <PrayerTimesSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <SupplicationsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <EnhancedQuranSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <TafseerSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <HadithSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <DhikrCounter />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <QiblaFinder />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <QuranStoriesSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <MeshariFavoriteReciter />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <IslamicChantSection />
      </Suspense>
      
      <SectionNavigation />
      <Footer />
    </main>
  );
}
