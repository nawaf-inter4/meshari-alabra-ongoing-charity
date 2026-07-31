"use client";

import dynamic from "next/dynamic";
import SectionSkeleton from "@/components/SectionSkeleton";

const QiblaFinder = dynamic(() => import("@/components/sections/QiblaFinder"), {
  loading: () => <SectionSkeleton label="Loading Qibla finder" />,
  ssr: false,
});

export default function QiblaSectionWrapper() {
  return <QiblaFinder />;
}
