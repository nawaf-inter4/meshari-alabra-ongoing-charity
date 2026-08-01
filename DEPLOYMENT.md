# Deployment Guide

This is a server-rendered Next.js application, not a static export. Deploy it to a platform that supports Next.js route handlers, Proxy, image optimization, dynamic Open Graph output, and the standalone Node.js server.

## Requirements

- Node.js 22
- `npm ci --legacy-peer-deps`
- All `NEXT_PUBLIC_*` values available **before** `npm run build`
- HTTPS in production for PWA installation
- `/health` exposed without authentication or locale redirects

Copy [`.env.example`](./.env.example) for the complete configuration reference. Never commit `.env.local` or provider credentials.

## Vercel

[`vercel.json`](./vercel.json) configures installation, build behavior, PWA cache headers, and **which Git branches deploy**.

1. Import the GitHub repository in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin (**Production** scope → `https://meshari.charity`). Optionally set Preview scope to `https://sandbox.meshari.charity` so sandbox builds embed the sandbox origin.
3. Add other white-label values in Project Settings → Environment Variables.
4. **Production** Git branch: `main` only (Project Settings → Git → Production Branch). Serves [meshari.charity](https://meshari.charity). Ship via promote + Release Please (see below).
5. **Preview / Sandbox**: only the `sandbox` Git branch is enabled for automated deployments. `git.deploymentEnabled` in `vercel.json` sets `main` + `sandbox` to `true` and `"**": false` so feature branches do **not** create Preview deployments.

### Custom domains (stable aliases)

Every deployment still gets a unique `*.vercel.app` URL. That is normal. Custom domains are **aliases** that always point at the latest matching deployment. Configure them as **project domains** (not one-off “Assign Domain” on a single deployment):

| Domain | Environment / assignment | Git branch |
| --- | --- | --- |
| [meshari.charity](https://meshari.charity) | Production | `main` (production branch) |
| [www.meshari.charity](https://www.meshari.charity) | Production redirect → `meshari.charity` (307) | — |
| [sandbox.meshari.charity](https://sandbox.meshari.charity) | Preview → **Git Branch** | `sandbox` |

#### Exact UI steps (Vercel Dashboard)

1. Open the project → **Settings** → **Domains**  
   (`https://vercel.com/nawafinter4s-projects/meshari-alabra-ongoing-charity/settings/domains`).
2. **Production apex**
   - Add / keep `meshari.charity`.
   - Connect to **Production** (no Git Branch field — Production tracks the production Git branch, which must be `main`).
   - Do **not** point this domain at a single past deployment alias only.
3. **www**
   - Keep `www.meshari.charity` as a **redirect** to `meshari.charity` (308/307), or assign it to Production if you prefer serving www directly. Current project setup redirects www → apex.
4. **Sandbox branch domain**
   - Add `sandbox.meshari.charity` if missing.
   - Edit the domain → **Connect to an environment** → **Preview**.
   - In **Git Branch**, enter exactly `sandbox` (case-sensitive).
   - Save. After the next successful `sandbox` deploy (or the current one if already Ready), the domain aliases that deployment automatically.
5. Confirm DNS at your registrar still uses Vercel’s records (or Vercel nameservers). Do not change production DNS while only adjusting the Git Branch assignment in the Domains UI.

#### Verify via API / CLI (optional)

```bash
# Project domains should show gitBranch: "sandbox" for sandbox.meshari.charity
# and gitBranch: null for meshari.charity (Production)
npx vercel project ls --scope nawafinter4s-projects
```

Or `GET /v9/projects/{id}/domains` with a Vercel token: `sandbox.meshari.charity` must have `"gitBranch": "sandbox"`; production domains must have `"gitBranch": null`.

### What GitHub shows vs stable URLs

- **GitHub Checks / Vercel “Visit” links** often open the unique deployment URL (`*.vercel.app` or `*-git-*-*.vercel.app`). That does **not** mean the custom domain is missing.
- The **stable** URLs to bookmark and share are:
  - Production: `https://meshari.charity`
  - Sandbox: `https://sandbox.meshari.charity`
- Deployment detail pages may show **Assign Domain** / alias messaging for that single deployment. Prefer project **Settings → Domains** with a Git Branch (above) so every new `sandbox` or `main` deploy updates the stable hostname automatically.
- **GitHub Environments** (`Preview` / `Production`): Vercel creates these and attaches each deployment’s unique URL. GitHub does not replace those with your custom domain. There is no reliable repo setting that forces Checks to show `meshari.charity` / `sandbox.meshari.charity` instead of `*.vercel.app`. Use the Environments list for deploy history; use the custom domains as the public aliases.
- If Preview **Deployment Protection** / Vercel Authentication is enabled, `*.vercel.app` Preview URLs (and sometimes Preview access) may require team login. Production custom domains stay public; adjust Project Settings → Deployment Protection if sandbox collaborators need unauthenticated access to `sandbox.meshari.charity`.

### Recommended flow

1. Always branch from `sandbox`.
2. Feature/fix PR → `sandbox` (full CI once: quality + security). After merge, Vercel Preview updates from `sandbox` and the `sandbox.meshari.charity` branch domain follows that deploy.
3. Promote `sandbox` → `main` with a conventional title (`fix:` / `feat:`) using [`scripts/promote-sandbox-to-main.sh`](./scripts/promote-sandbox-to-main.sh) (full CI once, then production deploy to `meshari.charity`).
4. Release Please on `main` opens/publishes the versioned release and changelog. Do not treat a promote as “shipped” without that release path.
5. After Release Please merges, the **Sync release files to sandbox** workflow opens a PR that copies only version/changelog files onto `sandbox`. Do **not** manually rebase `main` into `sandbox`.

`sandbox` is protected and must not be deleted. Delete feature branches after they are fully merged.

CLI deployments are also supported:

```bash
npx vercel
npx vercel --prod
```

## Netlify

[`netlify.toml`](./netlify.toml) enables the official Next.js runtime adapter.

1. Import the repository in Netlify.
2. Add build-time environment variables in Site configuration.
3. Deploy using the checked-in build command.

```bash
npx netlify deploy --build
npx netlify deploy --build --prod
```

Do not configure this application as a generic static `.next` directory upload.

## Docker and Docker Compose

The multi-stage [`Dockerfile`](./Dockerfile) produces a non-root standalone Next.js image with a `/health` health check.

```bash
cp .env.example .env.local
docker compose --env-file .env.local up --build
```

`--env-file .env.local` is required because public configuration is embedded during `next build`; a runtime-only environment file cannot change the compiled browser bundle.

Direct image builds must pass public values as build arguments:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://charity.example \
  -t ongoing-charity .
docker run --rm -p 3000:3000 ongoing-charity
```

## Render

[`render.yaml`](./render.yaml) deploys the Docker image and checks `/health`. Automatic deployment is intentionally disabled in the template; enable it in Render only after connecting the correct production branch and environment values.

## Railway

[`railway.json`](./railway.json) selects the Dockerfile builder and configures health and restart policies. Add `NEXT_PUBLIC_SITE_URL` and the remaining white-label values before triggering the build.

## Cloudflare Workers

This app deploys to Cloudflare **Workers** with the official OpenNext adapter (`@opennextjs/cloudflare`). Plain Cloudflare Pages static export is unsupported because the app needs route handlers, Proxy routing, and dynamic Open Graph / feed / `llms.txt` output.

Checked-in Cloudflare files:

- [`wrangler.jsonc`](./wrangler.jsonc) — Worker name, `nodejs_compat`, and OpenNext assets binding
- [`open-next.config.ts`](./open-next.config.ts) — OpenNext Cloudflare adapter config
- [`public/_headers`](./public/_headers) — long-lived cache for `/_next/static/*`
- `package.json` scripts: `preview`, `deploy`, and `cf-typegen`
- [`.npmrc`](./.npmrc) — `legacy-peer-deps=true` so Workers Builds install matches other providers

### One-click deploy

Use the official Deploy to Cloudflare button (same URL as the README badge):

[Deploy to Cloudflare](https://deploy.workers.cloudflare.com/?url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)

During setup:

1. Confirm the detected build/deploy commands (`npm run build` / `npm run deploy`), or accept Cloudflare's OpenNext defaults.
2. Set build-time variables for white-label values, especially `NEXT_PUBLIC_SITE_URL` (final HTTPS origin). Other `NEXT_PUBLIC_*` keys from [`.env.example`](./.env.example) may be set the same way.
3. After the first deploy, smoke-test `/health`, `/manifest.webmanifest`, `/llms.txt`, an LTR locale, and an RTL locale.

### CLI deploy

```bash
npm ci
npm run deploy
```

Preview the Workers runtime locally (more accurate than `next dev` for production parity):

```bash
npm run preview
```

Optional image optimization on Workers uses Cloudflare Images; see the [OpenNext Cloudflare image guide](https://opennext.js.org/cloudflare/howtos/image). Incremental cache via R2 is optional and documented in OpenNext caching docs.

## AWS Amplify

Use a supported Next.js server/runtime adapter. A generic static publish directory is not compatible with this application because it contains dynamic API, health, manifest, Open Graph, feed, and `llms.txt` routes plus Proxy routing.

## Pre-deployment verification

```bash
npm ci --legacy-peer-deps
npm run lint
npm run type-check
npm run test:e2e
npm run build
npm audit --audit-level=high
docker compose --env-file .env.example config --quiet
```

Security headers / CSP notes: [docs/SECURITY-HEADERS.md](./docs/SECURITY-HEADERS.md).

## Post-deployment verification

Verify these against the final public origin:

- `/health` → `200 application/json` and `{"status":"ok"}`
- `/sw.js` → `200 application/javascript`
- `/manifest.webmanifest` → `200 application/manifest+json`
- `/robots.txt`, `/sitemap.xml`, `/feed.xml`, and `/llms.txt`
- Unsupported paths return a real `404` with `noindex`
- Sitemap contains exactly 120 localized canonical HTML URLs
- Each indexed page has one self-canonical and reciprocal locale alternates
- Locale/section navigation never shows the offline shell while online
- PWA installation and offline fallback work over HTTPS
- Quran audio, PDF thumbnails, background audio, and native YouTube players work

## Troubleshooting

### Clean local build

```bash
rm -rf .next node_modules
npm ci --legacy-peer-deps
npm run build
```

Keep `package-lock.json`; deleting it makes deployments non-reproducible.

### Incorrect branding

`NEXT_PUBLIC_*` values are build-time values. Rebuild and redeploy after changing them. For Compose, include `--env-file .env.local`.

### PWA or offline issues

Confirm `/sw.js` has the JavaScript MIME type and is not rewritten to an HTML page. Clear old origin service workers and Cache Storage before retesting a repaired deployment.