"use client";

import { useEffect } from "react";

const QURAN_FONTS_HREF = "/fonts/quran-fonts.css";

/**
 * Loads Amiri / Scheherazade after first paint so they stay off the RTL
 * critical path. UI text keeps Tajawal; Quranic glyphs swap in when ready.
 */
export default function QuranFontLoader() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.querySelector(`link[data-quran-fonts="true"]`)) return;

    const inject = () => {
      if (document.querySelector(`link[data-quran-fonts="true"]`)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = QURAN_FONTS_HREF;
      link.dataset.quranFonts = "true";
      document.head.appendChild(link);
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(inject, { timeout: 3500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(inject, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
