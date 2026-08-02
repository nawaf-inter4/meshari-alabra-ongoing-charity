"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import SectionSkeleton from "./SectionSkeleton";

type DeferredSectionProps = {
  children: ReactNode;
  /** Root margin to start loading before the section enters the viewport. */
  rootMargin?: string;
  minHeightClassName?: string;
};

/**
 * Viewport-gated mount for below-fold homepage sections.
 * `React.lazy` alone still fetches as soon as Suspense renders — this waits
 * until near the viewport so pdf.js / heavy section chunks stay off LCP.
 */
export default function DeferredSection({
  children,
  // No positive bottom margin: a full-viewport hero puts the next section at
  // the fold, and `240px` rootMargin would prefetch it during LCP.
  rootMargin = "0px 0px -12% 0px",
  minHeightClassName = "min-h-[50vh]",
}: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active, rootMargin]);

  return (
    <div ref={ref} className={active ? undefined : minHeightClassName}>
      {active ? children : <SectionSkeleton compact label="Loading section" />}
    </div>
  );
}
