"use client";

import dynamic from "next/dynamic";
import SectionSkeleton from "@/components/SectionSkeleton";

const SupplicationsSection = dynamic(() => import("@/components/sections/SupplicationsSection"), {
  loading: () => <SectionSkeleton label="Loading supplications" />,
  ssr: false,
});

export default function SupplicationsSectionWrapper() {
  return <SupplicationsSection />;
}
