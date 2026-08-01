"use client";

import { lazy, Suspense, type ReactNode } from "react";
import ClientHeader from "./ClientHeader";
import SectionSkeleton from "./SectionSkeleton";
import DeferredSection from "./DeferredSection";

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

const SectionLoader = () => <SectionSkeleton compact label="Loading section" />;

function Gated({ children }: { children: ReactNode }) {
  return (
    <DeferredSection>
      <Suspense fallback={<SectionLoader />}>{children}</Suspense>
    </DeferredSection>
  );
}

interface HomePageProps {
  language?: string;
  hero: ReactNode;
}

export default function HomePage({ hero }: HomePageProps) {
  return (
    <main id="main-content" role="main" aria-label="Main content" className="min-h-screen bg-light dark:bg-dark islamic-pattern">
      <ClientHeader />
      {hero}

      <Gated><EnhancedQuranSection /></Gated>
      <Gated><DonationSection /></Gated>
      <Gated><YouTubePlaylist /></Gated>
      <Gated><SupplicationsSection /></Gated>
      <Gated><PrayerTimesSection /></Gated>
      <Gated><TafseerSection /></Gated>
      <Gated><HadithSection /></Gated>
      <Gated><DhikrCounter /></Gated>
      <Gated><QiblaFinder /></Gated>
      <Gated><QuranStoriesSection /></Gated>
      <Gated><MeshariFavoriteReciter /></Gated>
      <Gated><IslamicChantSection /></Gated>
      <Gated><SectionNavigation /></Gated>
      <Gated><Footer /></Gated>
    </main>
  );
}
