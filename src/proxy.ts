import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];

function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // Check if path starts with a language code
  const firstSegment = pathSegments[0];
  const isLanguagePrefix = supportedLanguages.includes(firstSegment);
  
  // Handle /[lang]/sections/... routes - rewrite to /sections/... internally
  // This allows sections to work with language prefixes in the URL
  if (isLanguagePrefix && pathSegments[1] === 'sections') {
    const sectionPath = '/' + pathSegments.slice(1).join('/');
    const url = request.nextUrl.clone();
    url.pathname = sectionPath;
    
    // Set language header so components can detect it
    const response = NextResponse.rewrite(url);
    response.headers.set('x-locale', firstSegment);
    
    // Apply security headers
    applySecurityHeaders(response, request);
    return response;
  }
  
  // Redirect /sections/... to /[lang]/sections/... if no language prefix
  // BUT: Use rewrite instead of redirect for client-side navigation to avoid double-click
  // Check if this is a navigation request (not a direct URL access)
  if (pathSegments[0] === 'sections' && !isLanguagePrefix) {
    // Check if this is a client-side navigation via Next.js Link
    const isClientNavigation = request.headers.get('x-middleware-rewrite') !== null ||
                               request.headers.get('referer')?.includes(request.nextUrl.origin);
    
    if (isClientNavigation) {
      // For client-side navigation, rewrite instead of redirect to avoid double-click
      const preferredLang = request.cookies.get('preferred-locale')?.value || 'ar';
      const lang = supportedLanguages.includes(preferredLang) ? preferredLang : 'ar';
      const newPath = `/${lang}${pathname}`;
      const url = request.nextUrl.clone();
      url.pathname = newPath;
      
      const response = NextResponse.rewrite(url);
      response.headers.set('x-locale', lang);
      applySecurityHeaders(response, request);
      return response;
    } else {
      // For direct URL access or refresh, use redirect
      const preferredLang = request.cookies.get('preferred-locale')?.value || 'ar';
      const lang = supportedLanguages.includes(preferredLang) ? preferredLang : 'ar';
      const newPath = `/${lang}${pathname}`;
      const url = request.nextUrl.clone();
      url.pathname = newPath;
      
      const response = NextResponse.redirect(url);
      applySecurityHeaders(response, request);
      return response;
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
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://vitals.vercel-insights.com https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob: https://hatscripts.github.io",
    "media-src 'self' https:",
    "connect-src 'self' https://api.aladhan.com https://api.alquran.cloud https://api.quran.com https://ipapi.co https://cdn.jsdelivr.net https://vitals.vercel-insights.com https://www.google-analytics.com https://fonts.googleapis.com https://fonts.gstatic.com https://hatscripts.github.io",
    "frame-src 'self' https://www.youtube.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
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

  // CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  // PWA headers - Service Worker
  if (request.nextUrl.pathname === '/sw.js') {
    response.headers.set('Content-Type', 'application/javascript');
    response.headers.set('Service-Worker-Allowed', '/');
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  }

  // PWA headers - Manifest
  if (request.nextUrl.pathname === '/manifest.json') {
    response.headers.set('Content-Type', 'application/manifest+json');
    response.headers.set('Cache-Control', 'public, max-age=3600');
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
