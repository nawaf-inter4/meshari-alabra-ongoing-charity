"use client";

import { lazy, Suspense, type ReactNode } from "react";
import ClientHeader from "./ClientHeader";
import MotionReveal from "./MotionReveal";

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
const SectionNavigation = lazy(() => import("./sections/SectionNavigation"));
const Footer = lazy(() => import("./Footer"));

/** Quiet reserve while the chunk loads — not a skeleton that replaces the enter animation. */
const SectionChunkFallback = () => (
  <div className="min-h-[140px]" aria-hidden="true" />
);

function AnimatedSection({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<SectionChunkFallback />}>
      <MotionReveal>{children}</MotionReveal>
    </Suspense>
  );
}

interface HomePageProps {
  language?: string;
  hero: ReactNode;
}

export default function HomePage({ hero }: HomePageProps) {
  return (
    <main
      id="main-content"
      role="main"
      aria-label="Main content"
      className="min-h-screen bg-light dark:bg-dark islamic-pattern"
    >
      <ClientHeader />
      {hero}

      <AnimatedSection>
        <EnhancedQuranSection />
      </AnimatedSection>
      <AnimatedSection>
        <DonationSection />
      </AnimatedSection>
      <AnimatedSection>
        <YouTubePlaylist />
      </AnimatedSection>
      <AnimatedSection>
        <SupplicationsSection />
      </AnimatedSection>
      <AnimatedSection>
        <PrayerTimesSection />
      </AnimatedSection>
      <AnimatedSection>
        <TafseerSection />
      </AnimatedSection>
      <AnimatedSection>
        <HadithSection />
      </AnimatedSection>
      <AnimatedSection>
        <DhikrCounter />
      </AnimatedSection>
      <AnimatedSection>
        <QiblaFinder />
      </AnimatedSection>
      <AnimatedSection>
        <QuranStoriesSection />
      </AnimatedSection>
      <AnimatedSection>
        <MeshariFavoriteReciter />
      </AnimatedSection>
      <AnimatedSection>
        <IslamicChantSection />
      </AnimatedSection>
      <AnimatedSection>
        <SectionNavigation />
      </AnimatedSection>
      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </main>
  );
}
