"use client";

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

  // Dynamically import to avoid build errors
  try {
    const { Analytics } = require('@vercel/analytics/react');
    const { SpeedInsights } = require('@vercel/speed-insights/next');
    
    return (
      <>
        <Analytics />
        <SpeedInsights />
      </>
    );
  } catch (error) {
    // Silently fail if analytics can't be loaded
    return null;
  }
}

