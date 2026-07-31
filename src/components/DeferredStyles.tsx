"use client";

import "@/styles/deferred.css";

/**
 * Bundles below-the-fold CSS into this lazy client chunk (ssr: false via
 * DeferredClientShell) so it stays off the initial render-blocking stylesheet.
 */
export default function DeferredStyles() {
  return null;
}
