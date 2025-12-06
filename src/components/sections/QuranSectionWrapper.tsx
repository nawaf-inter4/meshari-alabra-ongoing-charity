"use client";

import dynamic from "next/dynamic";

const EnhancedQuranSection = dynamic(() => import("@/components/sections/EnhancedQuranSection"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-islamic-gold"></div>
    </div>
  ),
  ssr: false,
});

export default function QuranSectionWrapper() {
  return <EnhancedQuranSection />;
}

