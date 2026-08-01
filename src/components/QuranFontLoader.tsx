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

    let cancelled = false;
    let idleId: number | undefined;
    let timerId: number | undefined;

    const inject = () => {
      if (cancelled) return;
      if (document.querySelector(`link[data-quran-fonts="true"]`)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = QURAN_FONTS_HREF;
      link.dataset.quranFonts = "true";
      document.head.appendChild(link);
      teardown();
    };

    const onScroll = () => inject();

    const teardown = () => {
      window.removeEventListener("scroll", onScroll, true);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
        idleId = undefined;
      }
      if (timerId !== undefined) {
        window.clearTimeout(timerId);
        timerId = undefined;
      }
    };

    // Prefer first user scroll so Amiri/Scheherazade never contend with LCP.
    window.addEventListener("scroll", onScroll, { once: true, passive: true, capture: true });

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(inject, { timeout: 12000 });
    } else {
      timerId = window.setTimeout(inject, 8000);
    }

    return () => {
      cancelled = true;
      teardown();
    };
  }, []);

  return null;
}
