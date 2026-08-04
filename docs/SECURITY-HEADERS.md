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
- **Production `style-src` uses `'unsafe-inline'` without a style nonce** — React CSSOM / Safari require it; a style-src nonce makes browsers ignore `'unsafe-inline'` and breaks the app. Scripts still use nonce + `strict-dynamic` (no script `'unsafe-inline'`).
- **`upgrade-insecure-requests` only on HTTPS** — must not ship on local `http://127.0.0.1` or CSS/fonts/PDF workers fail after forced https upgrades.
- `experimental.inlineCss` is **off** — external cached stylesheets keep HTML smaller (better mobile LCP than inlining ~60KB of CSS). There is no post-build CSP style-hash patch step: with `inlineCss` off and `style-src` already including `'unsafe-inline'`, hashing inlined CSS chunks is unnecessary.

### Nonce + Cache Components tradeoff

Next.js 16’s nonce CSP guide requires **request-time HTML** so framework scripts (and inlined CSS) receive matching `nonce` attributes. This app calls `connection()` in [`src/app/[lang]/layout.tsx`](../src/app/[lang]/layout.tsx) and forwards `Content-Security-Policy` + `x-nonce` on the **request** from Proxy.

Tradeoffs (accepted for Observatory script-src / style-src pass):

| Keep | Give up |
| --- | --- |
| Strict `script-src` (no `'unsafe-inline'`); styles use `'unsafe-inline'` | Fully static HTML shells for locale layouts |
| Cache Components for data / client lazy sections | Partial Prefetch / instant shells on `[lang]` |
| Private `no-cache` HTML (no `no-store`, bfcache-friendly) | Long CDN HTML cache (HTML is nonce-bound) |

### Mozilla Observatory expectation

Local grader path: `node scripts/verify-security-headers.mjs http://127.0.0.1:3456/ar`.

| Check | Expected |
| --- | --- |
| `default-src 'none'` + no unsafe in `script-src` / `style-src` | `csp-implemented-with-no-unsafe-default-src-none` (**+10**) |
| `script-src` with `'unsafe-inline'` | would be **−20** (must stay clean) |
| `'unsafe-inline'` only in legacy `style-src` | **0** (style-src-only) — **avoided** via style nonces |
| SRI on same-origin scripts | bonus when `experimental.sri` applies |
| Other headers (HSTS, XFO, nosniff, Referrer-Policy, COOP) | pass |

**Residual (accepted):** `style-src-attr 'unsafe-inline'` for React `style={…}` attributes. Observatory’s CSP analyzer scores `style-src` / `script-src` / `object-src` only — it does **not** treat `style-src-attr` as the −20 unsafe-inline case. Removing this residual would require migrating every React style attribute to classes / CSS variables.

Overall Observatory target with the above: **A+ / 100** (CSP +10 path), modulo third-party / hosting header differences on a given deploy URL.

### Subresource Integrity

`experimental.sri.algorithm = 'sha256'` adds integrity attributes to script tags (Observatory SRI bonus when scripts are same-origin / secure).

### Allowlisted hosts

- Scripts / connect: Vercel Live, Vercel Analytics / vitals, optional Google Analytics hosts (fallback allowlists; ignored under CSP3 `strict-dynamic`)
- Frames: YouTube (and nocookie), Vercel Live
- Connect also: Aladhan, AlQuran Cloud, Quran.com, ipapi, jsDelivr (PDF worker), Google Fonts endpoints
- `style-src` also allows `https://fonts.googleapis.com` (host allowlist; inlined CSS uses nonce)

### Trusted Types (phased)

`require-trusted-types-for 'script'` is **not** enabled. It breaks Next.js bootstrapping and third-party analytics without a full Trusted Types migration.

## Local verification

```bash
npm run build && npm start -- -p 3456
node scripts/verify-security-headers.mjs http://127.0.0.1:3456/ar
```

## CI

The **Security** job in [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) runs `npm audit --audit-level=high` and gitleaks on every PR to `sandbox` / `main`.
