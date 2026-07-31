import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isSupportedLocale, localeDirection, siteConfig, type SupportedLocale } from '@/config/site';
import { isSectionId } from '@/lib/routes';
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

function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isUtilityPath(pathname)) {
    return NextResponse.next();
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
    if (!validSectionPath) {
      return notFoundResponse(request, locale);
    }
  }

  const response = NextResponse.next();

  // Apply security headers
  applySecurityHeaders(response, request);
  
  return response;
}

// Export as both default and named for Next.js 16+ compatibility
export default proxy;
export { proxy };

function applySecurityHeaders(response: NextResponse, request: NextRequest) {
  // Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=*');
  
  // Cross-Origin-Opener-Policy (COOP) for origin isolation
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  
  // Performance: Compression headers (Next.js handles compression, but we ensure it's enabled)
  // Accept-Encoding is handled by the server, but we can hint at preferred compression
  const acceptEncoding = request.headers.get('accept-encoding') || '';
  if (acceptEncoding.includes('br')) {
    response.headers.set('Vary', 'Accept-Encoding');
  } else if (acceptEncoding.includes('gzip')) {
    response.headers.set('Vary', 'Accept-Encoding');
  }
  
  // Content Security Policy
  // Note: unsafe-inline and unsafe-eval are needed for Next.js inline scripts and webpack
  // We don't use strict-dynamic because it conflicts with unsafe-inline for Next.js
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://vitals.vercel-insights.com https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https:",
    "connect-src 'self' https://api.aladhan.com https://api.alquran.cloud https://api.quran.com https://ipapi.co https://cdn.jsdelivr.net https://vitals.vercel-insights.com https://www.google-analytics.com https://fonts.googleapis.com https://fonts.gstatic.com",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://vercel.live",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(process.env.NODE_ENV === 'production' ? ["upgrade-insecure-requests"] : [])
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);

  // Cache Control for static assets
  if (request.nextUrl.pathname.startsWith('/icons/') || 
      request.nextUrl.pathname.startsWith('/_next/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    
    // Ensure CSS files have correct Content-Type
    if (request.nextUrl.pathname.endsWith('.css')) {
      response.headers.set('Content-Type', 'text/css; charset=utf-8');
    }
  }

  // Cache Control for images
  if (request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Cache Control for fonts
  if (request.nextUrl.pathname.match(/\.(woff|woff2|ttf|eot)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Cache Control for audio files
  if (request.nextUrl.pathname.match(/\.(mp3|ogg|wav|m4a)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('Accept-Ranges', 'bytes');
    // Keep Content-Length for proper range request handling
    // The 416 error is likely due to incorrect Range header from client
  }

  // Cache Control for HTML
  if (request.nextUrl.pathname === '/' || 
      request.nextUrl.pathname.match(/^\/[a-z]{2}$/)) {
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  }

  // HSTS (HTTP Strict Transport Security)
  if (request.nextUrl.protocol === 'https:') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sw.js (service worker - handled by route handler)
     * - manifest.webmanifest (generated PWA manifest)
     */
    '/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.webmanifest).*)',
  ],
};
