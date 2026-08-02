/**
 * Content-Security-Policy builders shared by Proxy and docs/verification.
 *
 * Scripts: per-request nonce + strict-dynamic (no script unsafe-inline).
 * Styles: 'unsafe-inline' without a style nonce — React CSSOM / style attrs
 * require it, and a style-src nonce makes browsers ignore unsafe-inline for
 * that directive (breaking Safari + hydration).
 *
 * Never emit upgrade-insecure-requests on plain HTTP (local `next start`),
 * or CSS/fonts/workers get forced to https://127.0.0.1 and fail.
 */

export function createCspNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

/**
 * CSP for static `/offline.html` — classic inline scripts, no Next nonce stamping.
 * Nonce CSP would block the offline shell and leave `html.is-loading` forever.
 */
export function buildOfflineContentSecurityPolicy(options?: {
  upgradeInsecureRequests?: boolean;
}): string {
  const isDev = process.env.NODE_ENV !== "production";
  const upgradeInsecure =
    options?.upgradeInsecureRequests ?? (!isDev && process.env.VERCEL === "1");

  return [
    "default-src 'none'",
    "script-src 'self' 'unsafe-inline'",
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "style-src-attr 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data:",
    "connect-src 'self'",
    "worker-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(upgradeInsecure ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}

export function buildContentSecurityPolicy(
  nonce: string,
  options?: { upgradeInsecureRequests?: boolean },
): string {
  const isDev = process.env.NODE_ENV !== "production";
  const upgradeInsecure =
    options?.upgradeInsecureRequests ?? (!isDev && process.env.VERCEL === "1");

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
    "https://www.youtube.com",
    "https://www.youtube-nocookie.com",
    "https://i.ytimg.com",
    "https://vercel.live",
  ].join(" ");

  return [
    "default-src 'none'",
    `script-src ${scriptSrc}`,
    "script-src-attr 'none'",
    // Stable for React + Safari. Do not put a nonce here — it disables
    // 'unsafe-inline' for style-src and breaks CSSOM / missing link nonces.
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
    ...(upgradeInsecure ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}
