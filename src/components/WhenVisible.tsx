"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type WhenVisibleProps = {
  children: ReactNode;
  /** Stable anchor so scroll/hash targets exist before the section hydrates. */
  id?: string;
  /** Placeholder height before the section mounts (avoids layout jump). */
  minHeight?: number;
  /** Start loading slightly before the section enters the viewport. */
  rootMargin?: string;
};

/**
 * Defers mounting (and therefore dynamic import start) until near viewport.
 * React.lazy + Suspense alone still fetch as soon as the parent renders.
 * Keep `id` on the sentinel so in-page anchors and e2e can scroll it into view.
 */
export default function WhenVisible({
  children,
  id,
  minHeight = 280,
  rootMargin = "320px 0px",
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
    <div ref={ref} id={id} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
