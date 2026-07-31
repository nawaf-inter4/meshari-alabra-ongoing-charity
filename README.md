# Meshari's Continuous Charity — صدقة جارية لمشاري

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Performance](https://img.shields.io/badge/Performance-Optimized-0A7B3E?style=flat&logo=lighthouse&logoColor=white)](https://web.dev/performance/)

[![CI](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/ci.yml/badge.svg)](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/ci.yml)
[![Release](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/release.yml/badge.svg)](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/release.yml)
[![GitHub release](https://img.shields.io/github/v/release/nawaf-inter4/meshari-alabra-ongoing-charity?style=flat)](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat)](./LICENSE)

**A multilingual Islamic memorial site dedicated to Meshari Ahmed Sulaiman Alabra**  
**مشاري بن أحمد بن سليمان العبره**

*March 29, 2023 — may Allah have mercy on him*

[Live site](https://meshari.charity) · [Deployment guide](./DEPLOYMENT.md) · [White-label guide](./WHITE_LABELING.md) · [Donate](https://ehsan.sa/campaign/6FC11E15DA)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity&env=NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_SITE_NAME,NEXT_PUBLIC_SITE_SHORT_NAME)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)

</div>

---

## Screenshots

| Dark hero (English) | Light hero (English) |
| --- | --- |
| ![Dark English hero](./docs/screenshots/hero-en-dark.png) | ![Light English hero](./docs/screenshots/hero-en-light.png) |

| Arabic RTL hero | Orphan sponsorship |
| --- | --- |
| ![Arabic RTL hero](./docs/screenshots/hero-ar-rtl.png) | ![Donation section](./docs/screenshots/donation-en.png) |

| Quran section | Dhikr counter |
| --- | --- |
| ![Quran section](./docs/screenshots/section-quran-en.png) | ![Dhikr section](./docs/screenshots/section-dhikr-en.png) |

---

## About

This site is a **Sadaqah Jariyah** (ongoing charity) for Meshari. It provides Quran reading, tafseer, hadith, daily supplications, prayer times, dhikr, Qibla, orphan-sponsorship links, and Quran-recitation playlists — across **12 languages** with dedicated section pages, SEO metadata, and PWA support.

Built on Next.js 16.3 Instant Navigations, Cache Components, Partial Prefetching, native YouTube players, and centralized white-label configuration.

### Highlights

- Next.js `16.3` preview with Cache Components and Partial Prefetching
- TypeScript 7 project compilation (TypeScript 6 isolated for ESLint compatibility)
- Playwright coverage for navigation, white-label metadata, PWA, and direction-aware typography
- Native one-click YouTube playlist players with deferred third-party work
- Central config for identity, memorial content, assets, SEO, PWA, colors, and media
- Dynamic `/manifest.webmanifest` and dependency-free service worker
- Deploy templates for Vercel, Netlify, Render, Railway, and Docker
- LTR interface font: Lexend Deca · RTL interface font: Tajawal

### Sections

| Section | Path |
| --- | --- |
| Quran | `/{lang}/sections/quran` |
| Tafseer | `/{lang}/sections/tafseer` |
| Dhikr | `/{lang}/sections/dhikr` |
| Prayer times | `/{lang}/sections/prayer-times` |
| Qibla | `/{lang}/sections/qibla` |
| Donation | `/{lang}/sections/donation` |
| Supplications | `/{lang}/sections/supplications` |
| Hadith | `/{lang}/sections/hadith` |
| Quran recitations | `/{lang}/sections/youtube` |

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16.3 (App Router), React 19 |
| Language | TypeScript 7 |
| Styling | Tailwind CSS, Framer Motion, Lucide icons |
| Fonts | Lexend Deca (LTR), Tajawal (RTL), Amiri / Scheherazade New (Quranic Arabic) |
| APIs | Aladhan, Al Quran Cloud, Quran.com |
| Tooling | Turbopack, Playwright, Release Please |

---

## Quick start

**Prerequisites:** Node.js 22 (20.9+ supported) and npm.

```bash
git clone https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity.git
cd meshari-alabra-ongoing-charity
npm ci --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint            # ESLint
npm run type-check      # TypeScript
npm run test:e2e        # Playwright suite
npm run build           # Production build
npm run build:analyze   # Bundle analyzer
```

---

## Branch and deployment flow

| Branch | Role |
| --- | --- |
| `sandbox` | Integration / preview. Push and open PRs here first. Vercel Preview deployments use this lane by default for ongoing work. |
| `main` | Production. Merge only after sandbox looks good. Powers [meshari.charity](https://meshari.charity) and GitHub Releases. |

Recommended flow:

1. Create a feature branch from `sandbox`
2. Open a PR into `sandbox` and verify the Vercel Preview
3. When stable, open a PR from `sandbox` into `main`
4. Release Please batches conventional commits on `main` into a release PR (`fix:` → patch, `feat:` → minor)

See [CONTRIBUTING.md](./CONTRIBUTING.md) for commit and release details.

---

## White-label and deploy

All branding lives in [`src/config/site.ts`](./src/config/site.ts) and documented `NEXT_PUBLIC_*` variables in [`.env.example`](./.env.example). Full workflow: [WHITE_LABELING.md](./WHITE_LABELING.md).

This app needs a Next.js runtime (API routes + Cache Components). Do not deploy as a static export.

```bash
cp .env.example .env.local
docker compose --env-file .env.local up --build
```

---

## Languages

Arabic (RTL), English, Urdu (RTL), Turkish, Indonesian, Malay, Bengali, French, Chinese, Italian, Japanese, Korean.

- Landing: `/{lang}`
- Sections: `/{lang}/sections/{section}`
- `/` redirects to the configured default locale (`/ar` by default)

---

## Orphan sponsorship

Continue Meshari's legacy through orphan sponsorship:

[Donate via Ehsan.sa](https://ehsan.sa/campaign/6FC11E15DA)

> When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.  
> — Prophet Muhammad ﷺ (Sahih Muslim 1631)

---

## In memory of

**Meshari Ahmed Sulaiman Alabra**  
**مشاري بن أحمد بن سليمان العبره**

*Passed away on March 29, 2023 in Riyadh, Saudi Arabia*

> إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ  
> *Indeed we belong to Allah, and indeed to Him we will return.*

May Allah have mercy on him, forgive his sins, expand his grave, and accept every Quran recitation, prayer, and charitable act done through this platform in his favor.

---

## Contributing

This is a memorial project. Please read [CONTRIBUTING.md](./CONTRIBUTING.md).

1. Branch from `sandbox`
2. Keep changes focused and respectful
3. Run `npm run lint`, `npm run type-check`, `npm run test:e2e`, and `npm run build`
4. Use [Conventional Commits](https://www.conventionalcommits.org/) so Release Please can batch patch/minor releases
5. Open a PR into `sandbox`, then promote to `main`

---

## License

Source code is available under the [MIT License](./LICENSE). Dedicated to the memory of Meshari Ahmed Sulaiman Alabra as ongoing charity.

---

## Links

- Live site: [https://meshari.charity](https://meshari.charity)
- Releases: [GitHub Releases](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/releases)
- Issues: [GitHub Issues](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/issues)
- Donation: [Ehsan.sa campaign](https://ehsan.sa/campaign/6FC11E15DA)

<div align="center">

**اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ**

*May Allah forgive him and have mercy upon him*

Sadaqah Jariyah — صدقة جارية

</div>
