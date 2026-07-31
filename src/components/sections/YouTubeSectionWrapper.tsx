"use client";

import dynamic from "next/dynamic";
import SectionSkeleton from "@/components/SectionSkeleton";

const YouTubePlaylist = dynamic(() => import("@/components/sections/YouTubePlaylist"), {
  loading: () => <SectionSkeleton label="Loading videos" />,
  ssr: false,
});

export default function YouTubeSectionWrapper() {
  return <YouTubePlaylist />;
}
