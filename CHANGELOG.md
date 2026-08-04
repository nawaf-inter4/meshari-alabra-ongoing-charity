# Changelog

All notable changes to this project will be documented in this file.

This project uses [Semantic Versioning](https://semver.org/) and automated releases powered by [Release Please](https://github.com/googleapis/release-please).

Patch and minor changes are batched: Release Please opens one release pull request on `main` that accumulates `fix:` (patch) and `feat:` (minor) commits since the last tag. Merging that pull request publishes the GitHub release and tag.

## [1.4.0](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/compare/v1.3.0...v1.4.0) (2026-08-04)


### Features

* single release deploy, OG/share fixes, and Next 16.3 ([#50](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/issues/50)) ([8ba0df5](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/commit/8ba0df5e6ddc7562976928b7be9653fda9e1193e))

## [1.3.0](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/compare/v1.2.0...v1.3.0) (2026-08-02)


### Features

* LCP, CSP, and Quran/tafseer UX polish ([#46](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/issues/46)) ([4a9e30c](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/commit/4a9e30c3e3797506b8693821c71043e4a8f4135d))

## [1.2.0](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/compare/v1.1.3...v1.2.0) (2026-08-01)


### Features

* one-click deploys and localized Quran stories ([#40](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/issues/40)) ([e02f9d3](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/commit/e02f9d301d7ec9db960d40b399e8075374e2aa3d))

## [1.1.3](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/compare/v1.1.2...v1.1.3) (2026-08-01)


### Bug Fixes

* ship Spanish, Portuguese, Hindi locales and UI polish ([#34](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/issues/34)) ([dd5cb78](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/commit/dd5cb783dd7f5efdabc074042b2bae9a72242e52))

## [1.1.2](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/compare/v1.1.1...v1.1.2) (2026-07-31)


### Bug Fixes

* ship PWA splash/safe-area and PageSpeed CSS/polyfill wins ([#28](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/issues/28)) ([0be1a71](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/commit/0be1a71e022fd5abf0efc185ab3f79b513d6458b))

## [1.1.1](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/compare/v1.1.0...v1.1.1) (2026-07-31)


### Bug Fixes

* PageSpeed agentic browsing and performance ([#16](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/issues/16)) ([#17](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/issues/17)) ([6e23828](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/commit/6e23828f522dcaa9630e5b484de85a01fcac1539))


### Documentation

* note sandbox branch protection ([#20](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/issues/20)) ([84fd623](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/commit/84fd6232ca1a897a025445fd6b83fc77c18a4eed))

## [1.1.0](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/compare/v1.0.0...v1.1.0) - 2026-07-31

### Features

- Modernize the multilingual memorial platform on Next.js 16.3 Instant Navigations, Cache Components, and Partial Prefetching.
- Add centralized white-label configuration, dynamic PWA manifest, and multi-provider deploy templates (Vercel, Netlify, Render, Railway, Docker).
- Ship Playwright coverage for Instant Navigations, YouTube players, white-label metadata/PWA values, and direction-aware CTA typography.
- Use Lexend Deca for LTR interfaces and Tajawal for RTL interface controls, with dedicated Arabic Quran fonts.
- Add locale-preserving section title links and section-directory cards (`/{lang}/sections/{section}`).

### Bug Fixes

- Stabilize CI browser coverage and Vercel production packaging for the Next.js 16.3 preview toolchain.
- Ignore unsafe Dependabot major bumps that require dedicated migrations (Tailwind 4, lucide-react 1, ESLint 10, and related packages).

### Documentation

- Refresh README with live screenshots, rounded tech badges, sandbox → main release flow, and no emoji icons.

## [1.0.0](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/releases/tag/v1.0.0) - 2026-07-30

### Features

- Multilingual Islamic memorial experience in 12 languages.
- Quran reading, tafseer, hadith, supplications, prayer times, dhikr, and Qibla tools.
- Quran-recitation playlists, Meshari's favorite reciter, and Islamic chant sections.
- Orphan-sponsorship donation integration.
- Progressive Web App support, responsive design, SEO metadata, and optimized caching.

### Maintenance

- Next.js 16, React 19, TypeScript, and Tailwind CSS.
- Automated linting, type-checking, production builds, changelog updates, tags, and GitHub releases.
