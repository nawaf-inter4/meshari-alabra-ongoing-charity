"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms (capped internally for WebKit). */
  delayMs?: number;
  as?: "div" | "section" | "article" | "header";
};

/**
 * CSS transform-only enter animation via IntersectionObserver.
 * More stable on Safari / iOS than framer-motion whileInView + opacity.
 */
export default function MotionReveal({
  children,
  className = "",
  delayMs = 0,
  as: Tag = "div",
}: MotionRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    // Already in view on mount (e.g. short viewports) — show without waiting.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties | undefined =
    delayMs > 0 ? { transitionDelay: `${Math.min(delayMs, 200)}ms` } : undefined;

  return (
    <Tag
      ref={ref as never}
      className={`motion-reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
