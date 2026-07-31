"use client";

import dynamic from "next/dynamic";
import SectionSkeleton from "@/components/SectionSkeleton";

const PrayerTimesSection = dynamic(() => import("@/components/sections/PrayerTimesSection"), {
  loading: () => <SectionSkeleton label="Loading prayer times" />,
  ssr: false,
});

export default function PrayerTimesSectionWrapper() {
  return <PrayerTimesSection />;
}
