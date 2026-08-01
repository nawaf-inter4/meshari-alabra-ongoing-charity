import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import SEOScripts from "@/components/SEOScripts";
import AppleSplashLinks from "@/components/AppleSplashLinks";
import ErrorBoundary from "@/components/ErrorBoundary";
import DeferredClientShell from "@/components/DeferredClientShell";
import {
  SUPPORTED_LOCALES,
  isSupportedLocale,
  localeDirection,
  siteAssetUrl,
  siteConfig,
  siteCssVariablesBlock,
  type SupportedLocale,
} from "@/config/site";
import { translate, translations } from "@/lib/translations";
import { getCspNonce } from "@/lib/csp-nonce";

// The document language and direction depend on this root segment's URL.
// Deeper pages still validate instant navigation within the active locale.
export const instant = false;

const openGraphLocales: Record<SupportedLocale, string> = {
  ar: "ar_SA",
  en: "en_US",
  ur: "ur_PK",
  tr: "tr_TR",
  id: "id_ID",
  ms: "ms_MY",
  bn: "bn_BD",
  fr: "fr_FR",
  zh: "zh_CN",
  it: "it_IT",
  ja: "ja_JP",
  ko: "ko_KR",
  es: "es_ES",
  pt: "pt_PT",
  hi: "hi_IN",
};

const skipToContentLabels: Record<SupportedLocale, string> = {
  ar: "انتقل إلى المحتوى الرئيسي",
  en: "Skip to main content",
  ur: "مرکزی مواد پر جائیں",
  tr: "Ana içeriğe geç",
  id: "Lewati ke konten utama",
  ms: "Langkau ke kandungan utama",
  bn: "মূল বিষয়বস্তুতে যান",
  fr: "Aller au contenu principal",
  zh: "跳到主要内容",
  it: "Vai al contenuto principale",
  ja: "メインコンテンツへ移動",
  ko: "주요 콘텐츠로 건너뛰기",
  es: "Ir al contenido principal",
  pt: "Ir para o conteúdo principal",
  hi: "मुख्य सामग्री पर जाएँ",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.colors.brand },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.colors.backgroundDark },
  ],
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

function localeAlternates(suffix = "") {
  return Object.fromEntries([
    ...SUPPORTED_LOCALES.map((locale) => [
      locale,
      `${siteConfig.identity.siteUrl}/${locale}${suffix}`,
    ]),
    ["x-default", `${siteConfig.identity.siteUrl}/${siteConfig.identity.defaultLocale}${suffix}`],
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();

  const title =
    siteConfig.seo.title ||
    translate(lang, "seo.title", translate(lang, "site.title", siteConfig.identity.name));
  const description =
    siteConfig.seo.description ||
    translate(
      lang,
      "seo.description",
      translate(lang, "hero.description", translate(lang, "site.subtitle")),
    );
  const currentUrl = `${siteConfig.identity.siteUrl}/${lang}`;
  const keywords = siteConfig.seo.keywords || [
    title,
    translate(lang, "hero.title"),
    translate(lang, "quran.title"),
    translate(lang, "supplications.title"),
    siteConfig.content.memorialLegalName,
  ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: siteConfig.identity.organizationName }],
    creator: siteConfig.identity.organizationName,
    publisher: siteConfig.identity.organizationName,
    metadataBase: new URL(siteConfig.identity.siteUrl),
    applicationName: siteConfig.identity.shortName,
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [{ url: siteConfig.assets.favicon }],
      apple: [{ url: siteConfig.assets.appleTouchIcon, sizes: "180x180" }],
    },
    appleWebApp: {
      capable: true,
      title: siteConfig.identity.shortName,
      statusBarStyle: "black-translucent",
    },
    alternates: {
      canonical: currentUrl,
      languages: localeAlternates(),
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: siteConfig.identity.name,
      images: [
        {
          url: siteAssetUrl(siteConfig.assets.openGraphImage),
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
      locale: openGraphLocales[lang],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteAssetUrl(siteConfig.assets.openGraphImage)],
      site: siteConfig.seo.socialHandle,
      creator: siteConfig.seo.socialHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": siteConfig.colors.brand,
    },
  };
}

function LanguageContent({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: SupportedLocale;
}) {
  return (
    // `key` forces a clean remount when the locale segment changes so the
    // active dictionary from the server replaces client state.
    <LanguageProvider
      key={locale}
      initialLocale={locale}
      initialMessages={translations[locale]}
    >
      {children}
      <DeferredClientShell />
    </LanguageProvider>
  );
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // Request-time render so Proxy nonces can be stamped on Next framework
  // scripts (required for Observatory-grade script-src without unsafe-inline).
  // Cached route shells / Partial Prefetch for this segment are traded away;
  // below-fold sections remain client-lazy. See docs/SECURITY-HEADERS.md.
  await connection();
  const nonce = await getCspNonce();

  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();
  const direction = localeDirection(lang);
  const skipLabel = skipToContentLabels[lang];

  return (
    <html
      lang={lang}
      dir={direction}
      className="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <style
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: siteCssVariablesBlock }}
        />
        <SEOScripts nonce={nonce} />
        <AppleSplashLinks />
        {/* Preload only the above-the-fold UI font for this direction. */}
        <link
          rel="preload"
          href={direction === "rtl" ? "/fonts/tajawal-arabic-400.woff2" : "/fonts/lexend-deca-latin.woff2"}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {direction === "rtl" ? (
          <link
            rel="preload"
            href="/fonts/tajawal-arabic-700.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 bg-blue-600 text-white px-4 py-2 rounded skip-to-content"
          aria-label={skipLabel}
        >
          {skipLabel}
        </a>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={<div className="min-h-screen bg-light-primary dark:bg-dark-primary" />}>
              <LanguageContent locale={lang}>{children}</LanguageContent>
            </Suspense>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
