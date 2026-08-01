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
 * CSS transform-only enter via IntersectionObserver.
 * Works on Safari / iOS / mobile Chrome — no opacity keyframes (those blinked).
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

    const reveal = () => setVisible(true);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      // Next frame so the initial translate paints before we clear it.
      requestAnimationFrame(() => requestAnimationFrame(reveal));
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        reveal();
        io.disconnect();
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
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
