"use client";

import dynamic from "next/dynamic";

const DeferredAudioPlayer = dynamic(() => import("@/components/AudioPlayer"), {
  ssr: false,
});
const DeferredAnalytics = dynamic(() => import("@/components/AnalyticsWrapper"), {
  ssr: false,
});
const DeferredPWA = dynamic(() => import("@/components/PWAInstallWrapper"), {
  ssr: false,
});
const DeferredQuranFonts = dynamic(() => import("@/components/QuranFontLoader"), {
  ssr: false,
});
const DeferredStyles = dynamic(() => import("@/components/DeferredStyles"), {
  ssr: false,
});

export default function DeferredClientShell() {
  return (
    <>
      <DeferredStyles />
      <DeferredQuranFonts />
      <DeferredAudioPlayer />
      <DeferredAnalytics />
      <DeferredPWA />
    </>
  );
}
