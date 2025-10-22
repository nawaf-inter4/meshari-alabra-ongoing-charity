import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import SEOScripts from "@/components/SEOScripts";
import ErrorBoundary from "@/components/ErrorBoundary";
import AudioPlayer from "@/components/AudioPlayer";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: "Meshari's Ongoing Charity - صدقة جارية لمشاري",
  description: "A tribute to Meshari Ahmed Sulaiman Alabra (مشاري بن أحمد بن سليمان العبره) - Ongoing charity through Quran, supplications, and good deeds. May Allah have mercy on him.",
  keywords: "Meshari Alabra, ongoing charity, sadaqah jariyah, Islamic charity, Quran, supplications, prayer times, orphan sponsorship",
  authors: [{ name: "In memory of Meshari Ahmed Sulaiman Alabra" }],
  creator: "Family of Meshari Alabra",
  publisher: "Meshari's Ongoing Charity",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://meshari.charity'),
  alternates: {
    canonical: "/",
    languages: {
      'ar': '/ar',
      'en': '/en',
      'tr': '/tr',
      'ur': '/ur',
      'id': '/id',
      'ms': '/ms',
      'bn': '/bn',
      'fr': '/fr',
      'zh': '/zh',
      'it': '/it',
      'ja': '/ja',
      'ko': '/ko'
    },
  },
  openGraph: {
    title: "Meshari's Ongoing Charity - صدقة جارية لمشاري",
    description: "A tribute to Meshari Ahmed Sulaiman Alabra - Ongoing charity through Quran, supplications, and good deeds",
    url: "/",
    siteName: "Meshari's Ongoing Charity",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Meshari's Ongoing Charity",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meshari's Ongoing Charity - صدقة جارية لمشاري",
    description: "A tribute to Meshari Ahmed Sulaiman Alabra - Ongoing charity through Quran, supplications, and good deeds",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/icons/icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Meshari's Charity",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <head>
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://api.aladhan.com" />
        <link rel="dns-prefetch" href="https://api.alquran.cloud" />
        <link rel="dns-prefetch" href="https://api.quran.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />

        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Load critical fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* Theme Meta Tags for Cross-Browser Compatibility */}
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#D4AF37" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0F172A" media="(prefers-color-scheme: dark)" />
        <meta name="msapplication-navbutton-color" content="#D4AF37" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Theme Script for Instant Theme Application */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const finalTheme = theme === 'system' ? systemTheme : theme;
                  
                  if (finalTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                  
                } catch (e) {
                  // Fallback to dark theme
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                }
              })();
              
            `,
          }}
        />
        
        <SEOScripts />
        
      </head>
      <body className="font-tajwal antialiased">
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
                <LanguageProvider>
                  {children}
                  <AudioPlayer />
                  <Analytics />
                </LanguageProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
