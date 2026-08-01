# Security headers and CSP

Primary enforcement is in [`src/proxy.ts`](../src/proxy.ts) using builders in [`src/lib/csp.ts`](../src/lib/csp.ts). Platform headers in [`next.config.js`](../next.config.js) stay aligned for responses that do not go through Proxy.

## Current posture

| Header | Value / notes |
| --- | --- |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` (must not be weakened in Proxy) |
| `X-Frame-Options` / `frame-ancestors` | `DENY` / `'none'` |
| `Cross-Origin-Opener-Policy` | `same-origin-allow-popups` |
| `Cross-Origin-Resource-Policy` | `same-origin` on first-party static assets (`/_next/static/`, fonts, images, audio). **Not** set on HTML documents (avoids breaking YouTube / media embeds). |
| `Content-Security-Policy` | See below |

## CSP (Observatory-oriented)

Baseline directives:

- `default-src 'none'` with explicit allowlists for `script`, `style`, `img`, `font`, `connect`, `frame`, `media`, `worker`, `manifest`
- `script-src-attr 'none'`
- `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`
- **Production removes `'unsafe-eval'`**
- **Production `script-src` has no `'unsafe-inline'`** — per-request `'nonce-…'` + `'strict-dynamic'`

### Nonce + Cache Components tradeoff

Next.js 16’s nonce CSP guide requires **request-time HTML** so framework scripts receive matching `nonce` attributes. This app calls `connection()` in [`src/app/[lang]/layout.tsx`](../src/app/[lang]/layout.tsx) and forwards `Content-Security-Policy` + `x-nonce` on the **request** from Proxy.

Tradeoffs (accepted for Observatory script-src pass):

| Keep | Give up |
| --- | --- |
| Strict `script-src` (no `'unsafe-inline'`) | Fully static HTML shells for locale layouts |
| Cache Components for data / client lazy sections | Partial Prefetch / instant shells on `[lang]` |
| Short private `Cache-Control` on locale HTML | Long CDN HTML cache (HTML is nonce-bound) |

Mozilla Observatory scores:

- `script-src` with `'unsafe-inline'` → **−20**
- `'unsafe-inline'` only in `style-src` → **0** (style-src-only)
- `default-src 'none'` and no unsafe in script → path to **A+/100** with other header bonuses

### Why `'unsafe-inline'` remains on style-src

- React `style={…}` attributes across the UI
- `experimental.inlineCss` inlines critical CSS as `<style>` tags

Removing style `'unsafe-inline'` would require a full CSS-attr migration or style nonces on every tag; Observatory does **not** require that for a 100 score when script-src is clean.

### Subresource Integrity

`experimental.sri.algorithm = 'sha256'` adds integrity attributes to script tags (Observatory SRI bonus when scripts are same-origin / secure).

### Allowlisted hosts

- Scripts / connect: Vercel Live, Vercel Analytics / vitals, optional Google Analytics hosts (fallback allowlists; ignored under CSP3 `strict-dynamic`)
- Frames: YouTube (and nocookie), Vercel Live
- Connect also: Aladhan, AlQuran Cloud, Quran.com, ipapi, jsDelivr (PDF worker), Google Fonts endpoints

### Trusted Types (phased)

`require-trusted-types-for 'script'` is **not** enabled. It breaks Next.js bootstrapping and third-party analytics without a full Trusted Types migration.

## Local verification

```bash
npm run build && npm start -- -p 3456
node scripts/verify-security-headers.mjs http://127.0.0.1:3456/ar
```

## CI

The **Security** job in [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) runs `npm audit --audit-level=high` and gitleaks on every PR to `sandbox` / `main`.
