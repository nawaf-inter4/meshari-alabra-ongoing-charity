"use client";

import { lazy, Suspense } from "react";
import ClientHeader from "./ClientHeader";
import HeroSection from "./sections/HeroSection";
import SectionNavigation from "./sections/SectionNavigation";
import Footer from "./Footer";
import WhenVisible from "./WhenVisible";

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
      
      {/* Gate dynamic imports on near-viewport; sentinel ids keep anchors scrollable */}
      <WhenVisible id="quran" minHeight={320}>
        <Suspense fallback={<SectionLoader />}>
          <EnhancedQuranSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible id="donation">
        <Suspense fallback={<SectionLoader />}>
          <DonationSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible id="youtube">
        <Suspense fallback={<SectionLoader />}>
          <YouTubePlaylist />
        </Suspense>
      </WhenVisible>
      <WhenVisible id="supplications">
        <Suspense fallback={<SectionLoader />}>
          <SupplicationsSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible id="prayer-times">
        <Suspense fallback={<SectionLoader />}>
          <PrayerTimesSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible id="tafseer">
        <Suspense fallback={<SectionLoader />}>
          <TafseerSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible id="hadith">
        <Suspense fallback={<SectionLoader />}>
          <HadithSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible id="dhikr">
        <Suspense fallback={<SectionLoader />}>
          <DhikrCounter />
        </Suspense>
      </WhenVisible>
      <WhenVisible id="qibla">
        <Suspense fallback={<SectionLoader />}>
          <QiblaFinder />
        </Suspense>
      </WhenVisible>
      <WhenVisible id="quran-stories">
        <Suspense fallback={<SectionLoader />}>
          <QuranStoriesSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible id="meshari-favorite-reciter">
        <Suspense fallback={<SectionLoader />}>
          <MeshariFavoriteReciter />
        </Suspense>
      </WhenVisible>
      <WhenVisible id="islamic-chant">
        <Suspense fallback={<SectionLoader />}>
          <IslamicChantSection />
        </Suspense>
      </WhenVisible>
      
      <SectionNavigation />
      <Footer />
    </main>
  );
}
