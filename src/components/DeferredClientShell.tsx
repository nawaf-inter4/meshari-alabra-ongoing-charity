"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DeferredAudioPlayer = dynamic(() => import("@/components/AudioPlayer"), {
  ssr: false,
});
const DeferredAnalytics = dynamic(() => import("@/components/AnalyticsWrapper"), {
  ssr: false,
});
const DeferredPWA = dynamic(() => import("@/components/PWAInstallWrapper"), {
  ssr: false,
});
const DeferredStyles = dynamic(() => import("@/components/DeferredStyles"), {
  ssr: false,
});
const DeferredAppleSplash = dynamic(() => import("@/components/AppleSplashLinks"), {
  ssr: false,
});

/**
 * Below-the-fold chrome (audio/PWA/analytics). Fonts are preloaded in layout —
 * do not delay brand/Quran faces behind timers.
 */
export default function DeferredClientShell() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    const timer = window.setTimeout(enable, 1500);
    window.addEventListener("scroll", enable, { once: true, passive: true, capture: true });
    window.addEventListener("pointerdown", enable, { once: true, passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", enable, true);
      window.removeEventListener("pointerdown", enable);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <DeferredStyles />
      <DeferredAppleSplash />
      <DeferredAnalytics />
      <DeferredPWA />
      <DeferredAudioPlayer />
    </>
  );
}
