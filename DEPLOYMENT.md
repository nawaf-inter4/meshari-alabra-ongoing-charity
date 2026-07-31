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

[`vercel.json`](./vercel.json) configures installation, build behavior, and PWA cache headers.

1. Import the GitHub repository in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin.
3. Add other white-label values in Project Settings → Environment Variables.
4. Production branch: `main` (serves [meshari.charity](https://meshari.charity)).
5. **Sandbox** environment: use the `sandbox` Git branch as the default non-production lane. Every push and PR targeting `sandbox` should deploy to the Sandbox environment (Vercel’s custom environment named `sandbox`, or the project’s Preview deployments scoped to `sandbox`). Optionally assign a stable alias such as `sandbox.meshari.charity` to the `sandbox` branch in Project Settings → Domains / Environments.

Recommended flow: feature branch → PR into `sandbox` (Sandbox) → PR from `sandbox` into `main` (Production). Delete feature branches after they are fully merged.

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

## AWS Amplify and Cloudflare

Use a supported Next.js server/runtime adapter. A generic static publish directory is not compatible with this application because it contains dynamic API, health, manifest, Open Graph, feed, and `llms.txt` routes plus Proxy routing.

Plain Cloudflare Pages static export is unsupported. Use Cloudflare's current Next.js/OpenNext adapter if deploying there and validate every dynamic endpoint afterward.

## Pre-deployment verification

```bash
npm ci --legacy-peer-deps
npm run lint
npm run type-check
npm run test:e2e
npm run build
docker compose --env-file .env.example config --quiet
```

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