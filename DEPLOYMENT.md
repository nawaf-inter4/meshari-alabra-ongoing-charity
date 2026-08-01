# Deployment Guide

This guide helps families and non-developers publish a respectful memorial site for a loved one. You do not need to be a programmer — pick one button below, follow the short steps, and personalize the name and colors later.

This app is a full website (not a simple static page). It needs a host that can run Next.js, including the `/health` check, the installable PWA, and multilingual pages.

## Before you start (2 minutes)

1. Create a free [GitHub](https://github.com/) account if you do not have one.
2. Open this project on GitHub and click **Fork** (makes your own copy).
3. Decide the public site address you want later (for example `https://my-family-charity.example`). You can start with the free address your host gives you, then switch.
4. Keep [`.env.example`](./.env.example) open in another tab. It lists every setting you can change. For a first memorial launch, these matter most:

| Setting | What it means |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Final public site address (HTTPS, no trailing slash) |
| `NEXT_PUBLIC_SITE_NAME` | Full site title |
| `NEXT_PUBLIC_SITE_SHORT_NAME` | Short name for the home screen / PWA |
| `NEXT_PUBLIC_MEMORIAL_NAME` | Visible memorial heading |
| `NEXT_PUBLIC_DONATION_URL` | Where the donate button should go |
| `NEXT_PUBLIC_COLOR_BRAND` / `NEXT_PUBLIC_COLOR_ACCENT` | Brand and accent colors |

Full white-label steps: [WHITE_LABELING.md](./WHITE_LABELING.md).

> Important: values that start with `NEXT_PUBLIC_` are visible in the browser. Never put passwords or private keys there. Change them in the host’s environment settings, then **rebuild / redeploy** so the new values appear.

## One-click deploy badges

Same badges as the README. Choose the platform you prefer:

[![Deploy with Vercel](https://img.shields.io/badge/Deploy%20with-Vercel-black?style=flat&logo=vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity&env=NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_SITE_NAME,NEXT_PUBLIC_SITE_SHORT_NAME,NEXT_PUBLIC_MEMORIAL_NAME,NEXT_PUBLIC_DONATION_URL,NEXT_PUBLIC_COLOR_BRAND,NEXT_PUBLIC_COLOR_ACCENT&envDescription=Public%20HTTPS%20site%20URL%20and%20memorial%20white-label%20values.%20See%20.env.example.&envLink=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/blob/sandbox/.env.example)
[![Deploy to Netlify](https://img.shields.io/badge/Deploy%20to-Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)](https://app.netlify.com/start/deploy?repository=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy to Render](https://img.shields.io/badge/Deploy%20to-Render-46E3B7?style=flat&logo=render&logoColor=white)](https://render.com/deploy?repo=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy to Cloudflare](https://img.shields.io/badge/Deploy%20to-Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white)](https://deploy.workers.cloudflare.com/?url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy on Railway](https://img.shields.io/badge/Deploy%20on-Railway-0B0D0E?style=flat&logo=railway&logoColor=white)](https://railway.com/new/template?template=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy with Docker](https://img.shields.io/badge/Deploy%20with-Docker-2496ED?style=flat&logo=docker&logoColor=white)](#docker)
[![Deploy on CranL](https://img.shields.io/badge/Deploy%20on-CranL-0F766E?style=flat)](https://app.cranl.com)
[![Deploy with Coolify](https://img.shields.io/badge/Deploy%20with-Coolify-111827?style=flat)](https://app.coolify.io)
[![Deploy with Dokploy](https://img.shields.io/badge/Deploy%20with-Dokploy-0284C7?style=flat)](https://app.dokploy.com)

---

## Vercel

Best when you want the simplest Next.js hosting.

1. Click **Deploy with Vercel** above (or in the README).
2. Sign in with GitHub and import this repository (or your fork).
3. Fill the prompted values — at least `NEXT_PUBLIC_SITE_URL` (use the Vercel URL first if you do not have a custom domain yet, then update and redeploy).
4. Click **Deploy** and wait for the build to finish.
5. Open `/health` on your new site. You should see `{"status":"ok"}`.

Checked-in helper: [`vercel.json`](./vercel.json) configures installation, build behavior, PWA cache headers, and **which Git branches deploy**.

For the original Meshari project:

1. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin (**Production** scope → `https://meshari.charity`). Optionally set Preview scope to `https://sandbox.meshari.charity` so sandbox builds embed the sandbox origin.
2. Add other white-label values in Project Settings → Environment Variables.
3. **Production** Git branch: `main` only (Project Settings → Git → Production Branch). Serves [meshari.charity](https://meshari.charity). Ship via promote + Release Please (see below).
4. **Preview / Sandbox**: only the `sandbox` Git branch is enabled for automated deployments. `git.deploymentEnabled` in `vercel.json` sets `main` + `sandbox` to `true` and `"**": false` so feature branches do **not** create Preview deployments.

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

CLI (optional, for developers):

```bash
npx vercel
npx vercel --prod
```

## Netlify

1. Click **Deploy to Netlify**.
2. Connect GitHub and choose this repository (or your fork).
3. In Site configuration → Environment variables, set at least `NEXT_PUBLIC_SITE_URL` and the memorial name fields from [`.env.example`](./.env.example).
4. Deploy, then check `/health`.

Checked-in helper: [`netlify.toml`](./netlify.toml) (Node 22, Next.js runtime). Do not upload this app as a static folder.

## Render

1. Click **Deploy to Render**.
2. Render reads [`render.yaml`](./render.yaml) and builds the [`Dockerfile`](./Dockerfile).
3. When prompted, set `NEXT_PUBLIC_SITE_URL` and any other white-label values (they are build-time).
4. After the first deploy succeeds, open `/health`.
5. Turn on automatic deploys only after your environment values look correct.

## Cloudflare Workers

This app uses Cloudflare **Workers** with OpenNext — not plain Cloudflare Pages static export.

1. Click **Deploy to Cloudflare**.
2. Accept the detected build/deploy commands (`npm run build` / `npm run deploy`) or Cloudflare’s OpenNext defaults.
3. Set build-time variables, especially `NEXT_PUBLIC_SITE_URL`.
4. Smoke-test `/health`, `/manifest.webmanifest`, and one LTR + one RTL language page.

Checked-in helpers: [`wrangler.jsonc`](./wrangler.jsonc), [`open-next.config.ts`](./open-next.config.ts).

## Railway

Railway builds this repo with the included Dockerfile and health check.

1. Click **Deploy on Railway** (uses Railway’s template-from-GitHub flow).
2. Sign in with GitHub and confirm the project.
3. Before or right after the first deploy, open **Variables** and add at least:

   ```dotenv
   NEXT_PUBLIC_SITE_URL=https://your-railway-domain.up.railway.app
   NEXT_PUBLIC_SITE_NAME="Our Family Ongoing Charity"
   NEXT_PUBLIC_SITE_SHORT_NAME="Family Charity"
   NEXT_PUBLIC_MEMORIAL_NAME="Name of your loved one"
   NEXT_PUBLIC_DONATION_URL=https://example.org/donate
   ```

4. Trigger a redeploy so build-time values are baked into the site.
5. In **Settings → Networking**, generate a public domain if Railway did not create one.
6. Visit `/health` — expect `{"status":"ok"}`.

Checked-in helper: [`railway.json`](./railway.json) (Dockerfile builder, `/health`, restart on failure).

## Docker

Use Docker when you have a VPS, home server, or any host that runs containers. One command builds and starts the memorial site.

### One-command Compose (recommended)

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose).
2. Copy the example settings:

   ```bash
   cp .env.example .env.local
   ```

3. Edit `.env.local` — set at least `NEXT_PUBLIC_SITE_URL`, site name, memorial name, donation URL, and colors.
4. From the project folder, run:

   ```bash
   docker compose --env-file .env.local up --build -d
   ```

5. Open [http://localhost:3000/health](http://localhost:3000/health) (or your server’s address on port 3000).

`--env-file .env.local` is required so white-label values are available **during the image build**. Changing only runtime env without rebuilding will not update the browser bundle.

Checked-in helpers: [`Dockerfile`](./Dockerfile), [`compose.yaml`](./compose.yaml).

### Direct `docker build`

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://charity.example \
  --build-arg NEXT_PUBLIC_SITE_NAME="Example Ongoing Charity" \
  --build-arg NEXT_PUBLIC_MEMORIAL_NAME="Beloved name" \
  --build-arg NEXT_PUBLIC_DONATION_URL=https://example.org/donate \
  -t ongoing-charity .
docker run --rm -p 3000:3000 ongoing-charity
```

The image runs as a non-root user, listens on port `3000`, and includes a `/health` check.

## CranL

[CranL](https://cranl.com/) is a hosted PaaS (not the same product as Coolify). It deploys from GitHub and can build this repo with the root `Dockerfile`. There is no public “paste repo URL” button yet, so the badge opens the CranL app; then follow these steps:

1. Open [app.cranl.com](https://app.cranl.com) and create an account ([quickstart](https://docs.cranl.com/getting-started/quickstart.html)).
2. Connect GitHub and allow access to your fork of this repository.
3. Create a project, then **New Application** → select the repo.
4. Set **Build Type** to `Dockerfile`, branch to `main` (or your fork’s default), port to `3000`.
5. In **Environment**, add the white-label variables (especially `NEXT_PUBLIC_SITE_URL`). Redeploy after changing them.
6. Open the free `*.cranl.net` URL and check `/health`.

Official docs: [Applications](https://docs.cranl.com/platform/applications.html), [Environment variables](https://docs.cranl.com/platform/environment-variables.html).

## Coolify

[Coolify](https://coolify.io/) is a self-hosted (or Coolify Cloud) control panel that deploys Docker apps from GitHub. Distinct from CranL.

1. Open [Coolify Cloud](https://app.coolify.io) or your own Coolify instance.
2. Create a new resource → **Public Repository** (or connect GitHub for private forks).
3. Paste:

   `https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity`

   (or your fork URL / branch).
4. Choose the Dockerfile buildpack, port `3000`, and health check path `/health` if asked.
5. Add build-time environment variables from [`.env.example`](./.env.example).
6. Deploy, attach a domain with HTTPS, then verify `/health` and PWA install.

Coolify public-repo guide: [Deploy Public Repository](https://coolify.io/docs/applications/ci-cd/github/public-repository).

## Dokploy

[Dokploy](https://dokploy.com/) is an open-source deployment panel (self-hosted or [Dokploy Cloud](https://app.dokploy.com)). It has one-click *marketplace* templates for popular apps, but custom memorial forks deploy as a normal GitHub + Dockerfile (or Compose) application — there is no public GitHub deep-link button for arbitrary repos yet.

### GitHub + Dockerfile (recommended)

1. Open [app.dokploy.com](https://app.dokploy.com) or your Dokploy panel.
2. Create a project → **Create Service** → **Application**.
3. Connect GitHub ([Dokploy GitHub docs](https://docs.dokploy.com/docs/core/github)), then select this repository (or your fork) and branch.
4. Set **Build Type** to **Dockerfile**, Dockerfile path `Dockerfile`, context `.`, port `3000`.
5. In **Environment**, paste the keys you need from [`.env.example`](./.env.example). Save, then **Deploy**.
6. Add a domain (or a generated domain), wait for HTTPS, and open `/health`.

### Docker Compose on Dokploy

1. Create Service → **Docker Compose**.
2. Point the service at this GitHub repository.
3. Use the checked-in [`compose.yaml`](./compose.yaml).
4. Provide the same environment file values as build arguments / env, then deploy.

---

## Requirements (technical summary)

- Node.js 22 when building outside Docker
- `npm ci --legacy-peer-deps`
- All `NEXT_PUBLIC_*` values available **before** `npm run build`
- HTTPS in production for PWA installation
- `/health` exposed without login or language redirects

Never commit `.env.local` or provider credentials.

## Pre-deployment verification (developers)

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

## Post-deployment checks (everyone)

On your live site, confirm:

- `/health` → `{"status":"ok"}`
- `/manifest.webmanifest` loads (PWA name looks right)
- `/sw.js` is JavaScript (not an HTML error page)
- Home page shows the memorial name you set
- Donate button goes to your URL
- One English (LTR) and one Arabic (RTL) page both work
- Site is served over HTTPS if you want “Add to Home Screen”

## Troubleshooting

### Clean local build

```bash
rm -rf .next node_modules
npm ci --legacy-peer-deps
npm run build
```

Keep `package-lock.json`.

### Branding did not change

`NEXT_PUBLIC_*` values are baked in at build time. Update the host’s environment variables, then **redeploy**. For Docker Compose, rebuild with `--env-file .env.local`.

### PWA or offline issues

Confirm `/sw.js` has a JavaScript content type. Clear old service workers for that domain in the browser, then reload over HTTPS.

### AWS Amplify

Use a supported Next.js server adapter. A static publish directory is not compatible with this application.
