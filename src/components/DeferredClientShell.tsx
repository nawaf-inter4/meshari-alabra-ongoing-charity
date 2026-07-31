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

export default function DeferredClientShell() {
  return (
    <>
      <DeferredAudioPlayer />
      <DeferredAnalytics />
      <DeferredPWA />
    </>
  );
}
