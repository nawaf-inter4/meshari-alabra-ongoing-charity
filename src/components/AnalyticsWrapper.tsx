"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Disable analytics in development to prevent 404 errors
// Analytics will only work in production on Vercel
export default function AnalyticsWrapper() {
  // Only render in production on Vercel
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  // Check if we're on Vercel
  if (typeof window !== 'undefined') {
    const isVercel = window.location.hostname.includes('vercel.app') || 
                     window.location.hostname.includes('meshari.charity');
    
    if (!isVercel) {
      return null;
    }
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

