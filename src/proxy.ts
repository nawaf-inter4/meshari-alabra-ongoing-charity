import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isSupportedLocale, localeDirection, siteConfig, type SupportedLocale } from '@/config/site';
import { isSectionId } from '@/lib/routes';
import { isStorySlug } from '@/content/stories';
import { translate } from '@/lib/translations';
import { buildContentSecurityPolicy, createCspNonce } from '@/lib/csp';

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

/**
 * Apply security headers. For document navigations, also forward CSP + nonce
 * on the *request* so Next can stamp framework scripts (see Next.js CSP guide).
 */
function applySecurityHeaders(
  response: NextResponse,
  request: NextRequest,
  options?: { nonce?: string; csp?: string },
) {
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // Must match next.config.js — Observatory fails on weaker referrer policies.
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Geolocation is used by Qibla; keep camera/mic denied.
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');

  // Allow payment / OAuth popups without full cross-origin isolation (COEP would
  // break YouTube embeds). Do not set Cross-Origin-Resource-Policy on HTML —
  // CORP on documents can interfere with third-party media embedding.
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');

  const acceptEncoding = request.headers.get('accept-encoding') || '';
  if (acceptEncoding.includes('br') || acceptEncoding.includes('gzip')) {
    response.headers.set('Vary', 'Accept-Encoding');
  }

  const isHttps =
    request.nextUrl.protocol === "https:" ||
    request.headers.get("x-forwarded-proto") === "https";
  const csp =
    options?.csp ??
    buildContentSecurityPolicy(options?.nonce ?? createCspNonce(), {
      upgradeInsecureRequests: isHttps,
    });
  response.headers.set('Content-Security-Policy', csp);

  if (request.nextUrl.pathname.startsWith('/icons/') ||
      request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    // Safe CORP for first-party static assets (not HTML).
    response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

    if (request.nextUrl.pathname.endsWith('.css')) {
      response.headers.set('Content-Type', 'text/css; charset=utf-8');
    }
  }

  if (request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  }

  if (request.nextUrl.pathname.match(/\.(woff|woff2|ttf|eot)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  }

  if (request.nextUrl.pathname.match(/\.(mp3|ogg|wav|m4a)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Accept-Ranges', 'bytes');
    response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  }

  if (request.nextUrl.pathname === '/' ||
      request.nextUrl.pathname.match(/^\/[a-z]{2}$/)) {
    // Short CDN TTL: HTML is request-rendered for CSP nonces.
    response.headers.set('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
  }

  // HSTS: keep preload + includeSubDomains (aligned with next.config.js).
  if (request.nextUrl.protocol === 'https:' || process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
}

function continueWithSecurityHeaders(request: NextRequest) {
  const nonce = createCspNonce();
  // Only upgrade http→https on real HTTPS deploys. Local `next start` over
  // http://127.0.0.1 must not get upgrade-insecure-requests or CSS/workers die.
  const isHttps =
    request.nextUrl.protocol === "https:" ||
    request.headers.get("x-forwarded-proto") === "https";
  const csp = buildContentSecurityPolicy(nonce, {
    upgradeInsecureRequests: isHttps,
  });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  // Next extracts the nonce from the request CSP during SSR.
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  applySecurityHeaders(response, request, { nonce, csp });
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
    const parts = pathname.split('/').filter(Boolean);
    const section = parts[1];
    const storySlug = parts[2];
    const isBareSection = parts.length === 2 && !!section && isSectionId(section);
    const isStoryUnderSection =
      parts.length === 3 &&
      section === 'quran-stories' &&
      !!storySlug &&
      isStorySlug(storySlug);

    if (pathname !== '/sections' && !isBareSection && !isStoryUnderSection) {
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
    // Legacy /stories hub + detail → sections/quran-stories (308).
    if (segments[1] === 'stories') {
      if (segments.length === 2) {
        const url = request.nextUrl.clone();
        url.pathname = `/${locale}/sections/quran-stories`;
        const response = NextResponse.redirect(url, 308);
        applySecurityHeaders(response, request);
        return response;
      }
      if (segments.length === 3 && isStorySlug(segments[2])) {
        const url = request.nextUrl.clone();
        url.pathname = `/${locale}/sections/quran-stories/${segments[2]}`;
        const response = NextResponse.redirect(url, 308);
        applySecurityHeaders(response, request);
        return response;
      }
      return notFoundResponse(request, locale);
    }

    const validSectionPath = segments.length === 3 &&
      segments[1] === 'sections' &&
      isSectionId(segments[2]);
    const validStoryUnderSection = segments.length === 4 &&
      segments[1] === 'sections' &&
      segments[2] === 'quran-stories' &&
      isStorySlug(segments[3]);
    if (!validSectionPath && !validStoryUnderSection) {
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
