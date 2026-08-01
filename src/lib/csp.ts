/**
 * Content-Security-Policy builders shared by Proxy and docs/verification.
 *
 * Observatory grades `script-src 'unsafe-inline'` as -20.
 * `style-src` uses per-request nonces (Next stamps them on
 * `experimental.inlineCss` <style> tags). React `style={…}` attributes are
 * covered by `style-src-attr 'unsafe-inline'` — Observatory’s CSP grader only
 * inspects `style-src` / `script-src` / `object-src`, so this residual does
 * not block `csp-implemented-with-no-unsafe-default-src-none` (+10).
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
    // Nonce covers <style> tags + stylesheet <link>s (not style= attributes).
    // Do NOT put 'unsafe-inline' here: with a nonce/hash present, CSP2/3
    // browsers ignore it for style-src, which does not help React anyway.
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
    // REQUIRED for React style={{…}} / cssText. Keep this directive even if
    // style-src grows sha256 hashes (%%CSP_STYLE_HASHES%% post-build inject).
    // Without it, attribute styles fall back to nonce-only style-src and break.
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
