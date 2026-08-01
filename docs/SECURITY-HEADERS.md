# Security headers and CSP

Primary enforcement is in [`src/proxy.ts`](../src/proxy.ts). Platform headers in [`next.config.js`](../next.config.js) stay aligned for responses that do not go through Proxy.

## Current posture

| Header | Value / notes |
| --- | --- |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` (must not be weakened in Proxy) |
| `X-Frame-Options` / `frame-ancestors` | `DENY` / `'none'` |
| `Cross-Origin-Opener-Policy` | `same-origin-allow-popups` |
| `Cross-Origin-Resource-Policy` | Not set globally (avoids breaking YouTube / media embeds) |
| `Content-Security-Policy` | See below |

## CSP (practical strictness)

**Production removes `'unsafe-eval'`.** `'unsafe-inline'` remains on `script-src` and `style-src` because this app uses Next.js Cache Components and statically generated locale shells. Per-request nonces require dynamic rendering for every HTML response; forcing that would regress Core Web Vitals on the memorial site.

Allowlisted hosts that remain necessary:

- Scripts / connect: Vercel Live, Vercel Analytics / vitals, optional Google Analytics hosts
- Frames: YouTube (and nocookie), Vercel Live

### Residual risk

`'unsafe-inline'` for scripts means a successful HTML injection could still execute inline script. Mitigations: no user-generated HTML, careful `dangerouslySetInnerHTML` (JSON-LD only with escaping), dependency and secret scanning in CI.

### Trusted Types (phased)

`require-trusted-types-for 'script'` is **not** enabled yet. It breaks Next.js bootstrapping and third-party analytics without a full Trusted Types migration. Revisit after a nonce/dynamic-rendering CSP path or vendor TT support.

### Future: nonce + `strict-dynamic`

Next.js 16 documents nonce CSP via Proxy (`x-nonce` + `'nonce-…' 'strict-dynamic'`). Adopt when the project is willing to opt HTML shells into dynamic rendering (or an equivalent Cache Components pattern that still stamps nonces).

## CI

The **Security** job in [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) runs `npm audit --audit-level=high` and gitleaks on every PR to `sandbox` / `main`.
