"use client";

import dynamic from "next/dynamic";
import SectionSkeleton from "@/components/SectionSkeleton";

const EnhancedQuranSection = dynamic(() => import("@/components/sections/EnhancedQuranSection"), {
  loading: () => <SectionSkeleton label="Loading Quran" />,
  ssr: false,
});

export default function QuranSectionWrapper() {
  return <EnhancedQuranSection />;
}
