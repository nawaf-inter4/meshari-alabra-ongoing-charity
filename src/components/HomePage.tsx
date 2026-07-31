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
      
      {/* Gate dynamic imports on near-viewport so unused JS stays off the critical path */}
      <WhenVisible minHeight={320}>
        <Suspense fallback={<SectionLoader />}>
          <EnhancedQuranSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible>
        <Suspense fallback={<SectionLoader />}>
          <DonationSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible>
        <Suspense fallback={<SectionLoader />}>
          <YouTubePlaylist />
        </Suspense>
      </WhenVisible>
      <WhenVisible>
        <Suspense fallback={<SectionLoader />}>
          <SupplicationsSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible>
        <Suspense fallback={<SectionLoader />}>
          <PrayerTimesSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible>
        <Suspense fallback={<SectionLoader />}>
          <TafseerSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible>
        <Suspense fallback={<SectionLoader />}>
          <HadithSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible>
        <Suspense fallback={<SectionLoader />}>
          <DhikrCounter />
        </Suspense>
      </WhenVisible>
      <WhenVisible>
        <Suspense fallback={<SectionLoader />}>
          <QiblaFinder />
        </Suspense>
      </WhenVisible>
      <WhenVisible>
        <Suspense fallback={<SectionLoader />}>
          <QuranStoriesSection />
        </Suspense>
      </WhenVisible>
      <WhenVisible>
        <Suspense fallback={<SectionLoader />}>
          <MeshariFavoriteReciter />
        </Suspense>
      </WhenVisible>
      <WhenVisible>
        <Suspense fallback={<SectionLoader />}>
          <IslamicChantSection />
        </Suspense>
      </WhenVisible>
      
      <SectionNavigation />
      <Footer />
    </main>
  );
}
