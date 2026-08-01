/**
 * WebKit / iOS-friendly motion helpers.
 * Prefer transform-only enters; avoid opacity:0 → 1 (hydration blink + paint thrash).
 */

import type { Transition } from "framer-motion";

/** once + modest margin — less IO churn than large negative margins on iOS */
export const viewOnce = {
  once: true,
  margin: "-40px" as const,
  amount: 0.15 as const,
};

/** Transform-only section enter (no opacity keyframes). */
export const revealUp = {
  initial: { y: 14 } as const,
  whileInView: { y: 0 } as const,
  viewport: viewOnce,
  transition: {
    duration: 0.4,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  } satisfies Transition,
};

/** Slightly softer scale enter — still compositor-friendly. */
export const revealScale = {
  initial: { scale: 0.98, y: 8 } as const,
  whileInView: { scale: 1, y: 0 } as const,
  viewport: viewOnce,
  transition: {
    duration: 0.4,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  } satisfies Transition,
};

/** Backdrop: opacity only, short — WebKit struggles with long fades + blur. */
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.12 },
};

/** Panel: transform-only on enter (no opacity) to avoid WebKit paint blink. */
export const modalPanel = {
  initial: { y: 10 },
  animate: { y: 0 },
  exit: { y: 10 },
  transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export const modalPanelReduced = {
  initial: { y: 0 },
  animate: { y: 0 },
  exit: { y: 0 },
  transition: { duration: 0.01 },
};

/** Cap list stagger — long delays stack jank on iOS Safari. */
export function staggerDelay(index: number, step = 0.04, max = 0.2): number {
  return Math.min(index * step, max);
}

/** True on iOS / iPadOS / iPhone Safari (incl. Chrome iOS = WebKit). */
export function isAppleWebKitClient(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iP(hone|ad|od)/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

/** Touch / WebKit: skip framer enters — CSS/instant instead. */
export function preferCssMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (window.matchMedia("(pointer: coarse)").matches) return true;
  return isAppleWebKitClient();
}
