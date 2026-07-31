"use client";

import dynamic from "next/dynamic";
import SectionSkeleton from "@/components/SectionSkeleton";

const HadithSection = dynamic(() => import("@/components/sections/HadithSection"), {
  loading: () => <SectionSkeleton label="Loading hadith" />,
  ssr: false,
});

export default function HadithSectionWrapper() {
  return <HadithSection />;
}
