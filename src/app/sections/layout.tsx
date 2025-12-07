import React from 'react';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { LanguageProvider } from '@/components/LanguageProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import AudioPlayer from '@/components/AudioPlayer';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Meshari Alabra Ongoing Charity',
  description: 'Islamic charity and educational content',
};

export default async function SectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'ar';
  const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
  const currentLang = supportedLanguages.includes(locale) ? locale : 'ar';
  const isRTL = ['ar', 'he', 'fa', 'ur', 'yi', 'ps'].includes(currentLang);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meshari.charity';
  const sections = ['quran', 'tafseer', 'dhikr', 'prayer-times', 'qibla', 'donation', 'supplications', 'hadith', 'youtube'];
  
  return (
    <html lang={currentLang} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icons/icon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180.png" />
        
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://api.aladhan.com" />
        <link rel="dns-prefetch" href="https://api.alquran.cloud" />
        <link rel="dns-prefetch" href="https://api.quran.com" />
        <link rel="dns-prefetch" href="https://ipapi.co" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        
        {/* Prefetch critical section routes for blazing fast navigation */}
        {currentLang === 'ar' ? (
          <>
            <link rel="prefetch" href="/sections/quran" as="document" />
            <link rel="prefetch" href="/sections/tafseer" as="document" />
            <link rel="prefetch" href="/sections/dhikr" as="document" />
            <link rel="prefetch" href="/sections/prayer-times" as="document" />
            <link rel="prefetch" href="/sections/qibla" as="document" />
          </>
        ) : (
          <>
            <link rel="prefetch" href={`/${currentLang}/sections/quran`} as="document" />
            <link rel="prefetch" href={`/${currentLang}/sections/tafseer`} as="document" />
            <link rel="prefetch" href={`/${currentLang}/sections/dhikr`} as="document" />
            <link rel="prefetch" href={`/${currentLang}/sections/prayer-times`} as="document" />
            <link rel="prefetch" href={`/${currentLang}/sections/qibla`} as="document" />
          </>
        )}

        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Load critical fonts with display=swap for performance */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
          media="print"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
          media="screen"
        />
        
        {/* Load Arabic fonts for Quran text with display=swap - defer non-critical */}
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Scheherazade+New:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          media="print"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Scheherazade+New:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          media="screen"
        />

        {/* Theme Meta Tags for Cross-Browser Compatibility */}
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#D4AF37" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0F172A" media="(prefers-color-scheme: dark)" />
        <meta name="msapplication-navbutton-color" content="#D4AF37" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Hreflang tags are handled by generateSectionMetadata in each section page */}
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Set theme immediately to prevent flash
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
                  
                  // Set language from URL
                  const pathSegments = window.location.pathname.split('/').filter(Boolean);
                  const urlLang = pathSegments[0];
                  const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
                  
                  if (urlLang && supportedLanguages.includes(urlLang)) {
                    document.documentElement.lang = urlLang;
                    document.documentElement.dir = ['ar', 'he', 'fa', 'ur', 'yi', 'ps'].includes(urlLang) ? 'rtl' : 'ltr';
                  } else {
                    document.documentElement.lang = 'ar';
                    document.documentElement.dir = 'rtl';
                  }
                  
                } catch (e) {
                  // Fallback to dark theme and Arabic
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                  document.documentElement.lang = 'ar';
                  document.documentElement.dir = 'rtl';
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-light dark:bg-dark islamic-pattern" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider initialLocale={currentLang}>
            {children}
            <AudioPlayer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
