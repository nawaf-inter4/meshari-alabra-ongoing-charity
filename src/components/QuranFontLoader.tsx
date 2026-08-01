"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const QURAN_FONTS_HREF = "/fonts/quran-fonts.css";
const AMIRI_WOFF2 = "/fonts/amiri-arabic-400.woff2";
const SCHEHERAZADE_WOFF2 = "/fonts/scheherazade-new-arabic-400.woff2";

const QURAN_ROUTE_RE = /\/(quran|quran-stories|tafseer)(\/|$)/;

function ensurePreload(href: string, as: "font" | "style") {
  if (document.querySelector(`link[data-quran-preload="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as;
  link.href = href;
  if (as === "font") {
    link.type = "font/woff2";
    link.crossOrigin = "anonymous";
  }
  link.dataset.quranPreload = href;
  document.head.appendChild(link);
}

function injectQuranFonts() {
  if (typeof document === "undefined") return;
  if (document.querySelector(`link[data-quran-fonts="true"]`)) return;

  ensurePreload(AMIRI_WOFF2, "font");
  ensurePreload(SCHEHERAZADE_WOFF2, "font");
  ensurePreload(QURAN_FONTS_HREF, "style");

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = QURAN_FONTS_HREF;
  link.dataset.quranFonts = "true";
  document.head.appendChild(link);
}

/**
 * Loads Amiri / Scheherazade for Quran surfaces.
 * Section routes get fonts immediately; homepage waits for scroll/pointer
 * so LCP is not contested, then preloads so surah text swaps to Amiri ASAP.
 */
export default function QuranFontLoader() {
  const pathname = usePathname() || "";

  useEffect(() => {
    if (typeof document === "undefined") return;

    const needsImmediately = QURAN_ROUTE_RE.test(pathname);
    if (needsImmediately) {
      injectQuranFonts();
      return;
    }

    if (document.querySelector(`link[data-quran-fonts="true"]`)) return;

    let cancelled = false;
    const inject = () => {
      if (cancelled) return;
      injectQuranFonts();
    };

    // Near the Quran section (homepage) — load before the user finishes scrolling into it.
    const quranSection = document.getElementById("quran");
    let observer: IntersectionObserver | undefined;
    if (quranSection && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            inject();
            observer?.disconnect();
          }
        },
        { rootMargin: "800px 0px" },
      );
      observer.observe(quranSection);
    }

    window.addEventListener("scroll", inject, { once: true, passive: true, capture: true });
    window.addEventListener("pointerdown", inject, { once: true, passive: true });

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.removeEventListener("scroll", inject, true);
      window.removeEventListener("pointerdown", inject);
    };
  }, [pathname]);

  return null;
}
