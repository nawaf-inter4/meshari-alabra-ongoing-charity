"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/config/site";

// Disable analytics in development to prevent 404 errors
// Analytics will only work in production on Vercel
export default function AnalyticsWrapper() {
  if (process.env.NODE_ENV !== 'production' || !siteConfig.analytics.vercelEnabled) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

