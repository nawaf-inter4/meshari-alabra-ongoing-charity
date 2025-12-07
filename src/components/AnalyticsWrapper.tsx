"use client";

import { useEffect, useState } from "react";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function AnalyticsWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only render analytics after component mounts to avoid MutationObserver errors
    setMounted(true);
  }, []);

  // Don't render in development or if not mounted
  if (process.env.NODE_ENV !== 'production' || !mounted) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

