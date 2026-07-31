"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type WhenVisibleProps = {
  children: ReactNode;
  /** Placeholder height before the section mounts (avoids layout jump). */
  minHeight?: number;
  /** Start loading slightly before the section enters the viewport. */
  rootMargin?: string;
};

/**
 * Defers mounting (and therefore dynamic import start) until near viewport.
 * React.lazy + Suspense alone still fetch as soon as the parent renders.
 */
export default function WhenVisible({
  children,
  minHeight = 280,
  rootMargin = "280px 0px",
}: WhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
