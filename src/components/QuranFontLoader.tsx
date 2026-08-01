"use client";

import { useEffect } from "react";

const AMIRI_WOFF2 = "/fonts/amiri-arabic-400.woff2";

/**
 * Warm Amiri after first paint so the memorial H1 (Tajawal/Lexend) stays LCP
 * on mobile without competing for bandwidth with a ~110KB Quran face.
 */
export default function QuranFontLoader() {
  useEffect(() => {
    if (document.querySelector(`link[data-quran-preload="${AMIRI_WOFF2}"]`)) return;

    const warm = () => {
      if (document.querySelector(`link[data-quran-preload="${AMIRI_WOFF2}"]`)) return;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "font";
      link.type = "font/woff2";
      link.href = AMIRI_WOFF2;
      link.crossOrigin = "anonymous";
      link.dataset.quranPreload = AMIRI_WOFF2;
      document.head.appendChild(link);
      void document.fonts.load('400 24px "Amiri"').catch(() => undefined);
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(warm, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(warm, 400);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
