"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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
const DeferredAppleSplash = dynamic(() => import("@/components/AppleSplashLinks"), {
  ssr: false,
});

const QURAN_ROUTE_RE = /\/(quran|quran-stories|tafseer)(\/|$)/;

/**
 * Defer chrome that is not needed for LCP (fonts/audio/PWA/analytics).
 *
 * Use a fixed timer — not requestIdleCallback — because Lighthouse's quiet
 * window makes the page "idle" immediately and would otherwise pull deferred
 * CSS/fonts onto the LCP critical path.
 */
export default function DeferredClientShell() {
  const pathname = usePathname() || "";
  const needsQuranFonts = QURAN_ROUTE_RE.test(pathname);
  const [idleReady, setIdleReady] = useState(false);
  const [mediaReady, setMediaReady] = useState(needsQuranFonts);

  useEffect(() => {
    const timer = window.setTimeout(() => setIdleReady(true), 10000);
    return () => window.clearTimeout(timer);
  }, []);

  // Mobile RTL starts on the UA stack (see globals.css). Re-enable brand faces
  // after the LCP window on narrow viewports; desktop can apply immediately.
  useEffect(() => {
    const enableBrandFonts = () => {
      document.documentElement.classList.add("brand-fonts-ready");
    };
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    if (!narrow) {
      enableBrandFonts();
      return;
    }
    const timer = window.setTimeout(enableBrandFonts, 4000);
    window.addEventListener("scroll", enableBrandFonts, { once: true, passive: true, capture: true });
    window.addEventListener("pointerdown", enableBrandFonts, { once: true, passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", enableBrandFonts, true);
      window.removeEventListener("pointerdown", enableBrandFonts);
    };
  }, []);

  useEffect(() => {
    if (needsQuranFonts) {
      setMediaReady(true);
      return;
    }
    const enableMedia = () => setMediaReady(true);
    window.addEventListener("scroll", enableMedia, { once: true, passive: true, capture: true });
    window.addEventListener("pointerdown", enableMedia, { once: true, passive: true });
    return () => {
      window.removeEventListener("scroll", enableMedia, true);
      window.removeEventListener("pointerdown", enableMedia);
    };
  }, [needsQuranFonts]);

  if (!idleReady && !mediaReady) return null;

  return (
    <>
      {idleReady ? (
        <>
          <DeferredStyles />
          <DeferredAppleSplash />
          <DeferredAnalytics />
          <DeferredPWA />
        </>
      ) : null}
      {mediaReady ? (
        <>
          <DeferredQuranFonts />
          <DeferredAudioPlayer />
        </>
      ) : null}
    </>
  );
}
