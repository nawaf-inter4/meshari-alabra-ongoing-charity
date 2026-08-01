import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isSupportedLocale, localeDirection, siteConfig, type SupportedLocale } from '@/config/site';
import { isSectionId } from '@/lib/routes';
import { isStorySlug } from '@/content/stories';
import { translate } from '@/lib/translations';

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character] || character);
}

function notFoundResponse(request: NextRequest, lang: SupportedLocale) {
  const direction = localeDirection(lang);
  const home = translate(lang, 'navigation.back_to_home');
  const html = `<!doctype html><html lang="${lang}" dir="${direction}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>404</title></head><body><main><h1>404</h1><p>${escapeHtml(siteConfig.identity.shortName)}</p><a href="/${lang}">${escapeHtml(home)}</a></main></body></html>`;
  const response = new NextResponse(html, {
    status: 404,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
  applySecurityHeaders(response, request);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

function isUtilityPath(pathname: string) {
  return pathname === '/' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/feed.xml' ||
    pathname === '/manifest.webmanifest' ||
    pathname === '/sw.js' ||
    pathname === '/offline.html' ||
    pathname === '/llms.txt' ||
    pathname === '/health' ||
    pathname === '/og-image' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/fonts/') ||
    pathname.startsWith('/stories/') ||
    /\.[a-z0-9]+$/i.test(pathname);
}

function buildContentSecurityPolicy() {
  const isDev = process.env.NODE_ENV !== 'production';

  // Strongest practical CSP for Cache Components / statically generated locale
  // shells: Next.js cannot inject per-request nonces into build-time HTML, so
  // nonce + strict-dynamic would block framework scripts unless every page is
  // forced dynamic (a large Core Web Vitals regression for this memorial site).
  //
  // Production removes 'unsafe-eval'. 'unsafe-inline' remains for Next/React
  // inline bootstrapping and JSON-LD <Script> tags — residual XSS risk if an
  // injection path appears; prefer output encoding and avoid user HTML.
  // Trusted Types (`require-trusted-types-for 'script'`) is deferred: it breaks
  // Next.js + third-party analytics without a full TT migration.
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    'https://vercel.live',
    'https://vitals.vercel-insights.com',
    'https://va.vercel-scripts.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ].join(' ');

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https:",
    "connect-src 'self' https://api.aladhan.com https://api.alquran.cloud https://api.quran.com https://ipapi.co https://cdn.jsdelivr.net https://vitals.vercel-insights.com https://va.vercel-scripts.com https://www.google-analytics.com https://fonts.googleapis.com https://fonts.gstatic.com https://vercel.live",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://vercel.live",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ['upgrade-insecure-requests']),
  ].join('; ');
}

function applySecurityHeaders(response: NextResponse, request: NextRequest) {
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // Must match next.config.js — Observatory fails on weaker referrer policies.
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Geolocation is used by Qibla; keep camera/mic denied.
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');

  // Allow payment / OAuth popups without full cross-origin isolation (COEP would
  // break YouTube embeds). Do not set Cross-Origin-Resource-Policy globally —
  // CORP on HTML can interfere with third-party media embedding.
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');

  const acceptEncoding = request.headers.get('accept-encoding') || '';
  if (acceptEncoding.includes('br') || acceptEncoding.includes('gzip')) {
    response.headers.set('Vary', 'Accept-Encoding');
  }

  response.headers.set('Content-Security-Policy', buildContentSecurityPolicy());

  if (request.nextUrl.pathname.startsWith('/icons/') ||
      request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    if (request.nextUrl.pathname.endsWith('.css')) {
      response.headers.set('Content-Type', 'text/css; charset=utf-8');
    }
  }

  if (request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  if (request.nextUrl.pathname.match(/\.(woff|woff2|ttf|eot)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  if (request.nextUrl.pathname.match(/\.(mp3|ogg|wav|m4a)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Accept-Ranges', 'bytes');
  }

  if (request.nextUrl.pathname === '/' ||
      request.nextUrl.pathname.match(/^\/[a-z]{2}$/)) {
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  }

  // HSTS: keep preload + includeSubDomains (aligned with next.config.js).
  if (request.nextUrl.protocol === 'https:' || process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
}

function continueWithSecurityHeaders(request: NextRequest) {
  const response = NextResponse.next();
  applySecurityHeaders(response, request);
  return response;
}

function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isUtilityPath(pathname)) {
    // Still attach security headers (previously skipped, so `/` had no CSP).
    return continueWithSecurityHeaders(request);
  }

  // Preserve legacy links while consolidating every section under a real,
  // locale-prefixed server route.
  if (pathname === '/sections' || pathname.startsWith('/sections/')) {
    const section = pathname.split('/').filter(Boolean)[1];
    if (pathname !== '/sections' && (!section || !isSectionId(section) || pathname !== `/sections/${section}`)) {
      return notFoundResponse(request, siteConfig.identity.defaultLocale);
    }
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/sections'
      ? `/${siteConfig.identity.defaultLocale}`
      : `/${siteConfig.identity.defaultLocale}${pathname}`;
    const response = NextResponse.redirect(url, 308);
    applySecurityHeaders(response, request);
    return response;
  }

  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];
  if (!locale || !isSupportedLocale(locale)) {
    return notFoundResponse(request, siteConfig.identity.defaultLocale);
  }

  if (segments.length > 1) {
    const validSectionPath = segments.length === 3 &&
      segments[1] === 'sections' &&
      isSectionId(segments[2]);
    const validStoriesIndex = segments.length === 2 && segments[1] === 'stories';
    const validStoryPath = segments.length === 3 &&
      segments[1] === 'stories' &&
      isStorySlug(segments[2]);
    if (!validSectionPath && !validStoriesIndex && !validStoryPath) {
      return notFoundResponse(request, locale);
    }
  }

  return continueWithSecurityHeaders(request);
}

// Export as both default and named for Next.js 16+ compatibility
export default proxy;
export { proxy };

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets that never need CSP.
     * Skip RSC / next/link prefetches so they are not forced through header work.
     */
    {
      source: '/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.webmanifest).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
