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
const DeferredQuranFonts = dynamic(() => import("@/components/QuranFontLoader"), {
  ssr: false,
});
const DeferredStyles = dynamic(() => import("@/components/DeferredStyles"), {
  ssr: false,
});

/**
 * Idle-defer chrome that is not needed for LCP (fonts/audio/PWA/analytics).
 */
export default function DeferredClientShell() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (!cancelled) setReady(true);
    };

    // Stay off the Lighthouse quiet window / LCP budget; chrome is not critical.
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: 6000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(enable, 4000);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  if (!ready) return null;

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
