/**
 * Content-Security-Policy builders shared by Proxy and docs/verification.
 *
 * Observatory grades `script-src 'unsafe-inline'` as -20. `style-src
 * 'unsafe-inline'` alone is scored as style-src-only (0) and still allows
 * `default-src 'none'` pages to reach A+/100 with other header bonuses.
 *
 * Script trust uses per-request nonces + `strict-dynamic` (Next.js 16 Proxy
 * guide). That requires request-time HTML so Next can stamp `nonce` on
 * framework scripts — see `[lang]/layout.tsx` (`connection()`).
 */

export function createCspNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

export function buildContentSecurityPolicy(nonce: string): string {
  const isDev = process.env.NODE_ENV !== "production";

  // Host allowlists are ignored by CSP3 browsers when `strict-dynamic` is
  // present; keep them as a fallback for older engines.
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    "https://vercel.live",
    "https://vitals.vercel-insights.com",
    "https://va.vercel-scripts.com",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
  ].join(" ");

  const connectSrc = [
    "'self'",
    "https://api.aladhan.com",
    "https://api.alquran.cloud",
    "https://api.quran.com",
    "https://ipapi.co",
    "https://cdn.jsdelivr.net",
    "https://vitals.vercel-insights.com",
    "https://va.vercel-scripts.com",
    "https://www.google-analytics.com",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://vercel.live",
  ].join(" ");

  return [
    "default-src 'none'",
    `script-src ${scriptSrc}`,
    "script-src-attr 'none'",
    // Inline React style attrs + experimental.inlineCss <style> tags.
    // Observatory: style-src unsafe alone → 0 modifier (not -20).
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "style-src-attr 'unsafe-inline'",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https: blob:",
    `connect-src ${connectSrc}`,
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://vercel.live",
    "worker-src 'self' blob:",
    "child-src 'self' blob:",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");
}
