# Security headers and CSP

Primary enforcement is in [`src/proxy.ts`](../src/proxy.ts). Platform headers in [`next.config.js`](../next.config.js) stay aligned for responses that do not go through Proxy.

## Current posture

| Header | Value / notes |
| --- | --- |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` (must not be weakened in Proxy) |
| `X-Frame-Options` / `frame-ancestors` | `DENY` / `'none'` |
| `Cross-Origin-Opener-Policy` | `same-origin-allow-popups` |
| `Cross-Origin-Resource-Policy` | `same-origin` on first-party static assets (`/_next/static/`, fonts, images, audio). **Not** set on HTML documents (avoids breaking YouTube / media embeds). |
| `Content-Security-Policy` | See below |

## CSP (practical strictness)

Baseline directives:

- `default-src 'none'` with explicit allowlists for `script`, `style`, `img`, `font`, `connect`, `frame`, `media`, `worker`, `manifest`
- `script-src-attr 'none'`
- `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`
- **Production removes `'unsafe-eval'`**

### Why `'unsafe-inline'` remains (script-src + style-src)

This app enables **Cache Components** and statically generated locale shells for Core Web Vitals. Next.js 16’s nonce CSP guide (`x-nonce` + `'nonce-…' 'strict-dynamic'`) requires **per-request dynamic HTML** (`connection()` / reading `headers()` for nonces). That disables static shells / Partial Prefetch and is a large LCP regression for the memorial homepage.

Until the project is willing to opt HTML into dynamic rendering (or an equivalent Cache Components pattern that still stamps nonces without breaking the static shell):

- `script-src` keeps `'unsafe-inline'` for Next/React bootstrapping and JSON-LD `<Script>` tags
- `style-src` / `style-src-attr` keep `'unsafe-inline'` for Next/React inline styles

Mozilla Observatory will typically still deduct for `'unsafe-inline'` on script/style. That residual is intentional: Observatory 100 via nonce would trade away Lighthouse performance on `/ar`.

### Allowlisted hosts

- Scripts / connect: Vercel Live, Vercel Analytics / vitals, optional Google Analytics hosts
- Frames: YouTube (and nocookie), Vercel Live
- Connect also: Aladhan, AlQuran Cloud, Quran.com, ipapi, jsDelivr (PDF worker), Google Fonts endpoints

### Residual XSS risk

`'unsafe-inline'` for scripts means a successful HTML injection could still execute inline script. Mitigations: no user-generated HTML, careful `dangerouslySetInnerHTML` (JSON-LD only with escaping), dependency and secret scanning in CI.

### Trusted Types (phased)

`require-trusted-types-for 'script'` is **not** enabled. It breaks Next.js bootstrapping and third-party analytics without a full Trusted Types migration. Revisit after a nonce/dynamic-rendering CSP path or vendor TT support.

### Future: nonce + `strict-dynamic`

Adopt when willing to force dynamic HTML shells (or when Next supports stamping nonces onto Cache Component shells without dynamism). Reference: Next.js App Router CSP guide (Proxy `x-nonce` + Server Component `headers().get('x-nonce')` on `<Script>`).

## CI

The **Security** job in [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) runs `npm audit --audit-level=high` and gitleaks on every PR to `sandbox` / `main`.
