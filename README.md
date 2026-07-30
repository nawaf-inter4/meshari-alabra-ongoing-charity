# Meshari's Continuous Charity - صدقة جارية لمشاري

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-7-blue?style=for-the-badge&logo=typescript)
![PWA](https://img.shields.io/badge/PWA-Enabled-green?style=for-the-badge)
![Performance](https://img.shields.io/badge/Performance-Optimized-gold?style=for-the-badge)

[![CI](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/ci.yml/badge.svg)](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/ci.yml)
[![Release](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/release.yml/badge.svg)](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/release.yml)
[![GitHub release](https://img.shields.io/github/v/release/nawaf-inter4/meshari-alabra-ongoing-charity)](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**A blazing-fast, multilingual Islamic landing page dedicated to the memory of Meshari Ahmed Sulaiman Alabra (مشاري بن أحمد بن سليمان العبره)**

*March 29, 2023 - May Allah have mercy on him*

[🚀 Live Demo](https://meshari.charity) | [📖 Documentation](./DEPLOYMENT.md) | [🤲 Donate](https://ehsan.sa/campaign/6FC11E15DA)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity&env=NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_SITE_NAME,NEXT_PUBLIC_SITE_SHORT_NAME)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)

</div>

---

## 🌙 About

This landing page serves as a **Sadaqah Jariyah** (ongoing charity) dedicated to Meshari, who passed away from brain cancer. It now uses Next.js 16.3 Instant Navigations, Cache Components, Partial Prefetching, thumbnail-first privacy-conscious YouTube embeds, centralized white-label configuration, and multi-provider deployment templates. The site retains comprehensive multilingual support, dedicated section pages, SEO metadata, PWA support, and AI/LLM indexing guidance.

### Recently added

- Next.js `16.3.0-preview.10` with Cache Components and Partial Prefetching
- TypeScript 7 project compilation with an isolated TypeScript 6 lint compatibility bridge
- Playwright coverage for Instant Navigations, YouTube previews, white-label metadata/PWA values, and direction-aware CTA typography
- Click-to-load Quran and favorite-reciter playlist thumbnails
- Central configuration for identity, memorial content, assets, SEO, PWA, colors, media, and public URLs
- Dynamic `/manifest.webmanifest`
- Vercel, Netlify, Render, Railway, Docker, and Docker Compose deployment support
- Explicit privacy rules excluding real environment files, agent metadata, and every `SKILL.md`
- Direction-aware typography: Lexend Deca for LTR interfaces and Tajawal for RTL interface controls
- Clickable landing-page section titles and section-directory cards that preserve the active locale in URLs such as `/en/sections/quran`

### ✨ Core Features

- 📿 **YouTube Playlist**: Quran recitations as ongoing charity
- 💝 **Orphan Sponsorship**: Continue the legacy through charitable giving
- 🤲 **Islamic Supplications**: Daily athkar and prayers for the deceased
- ⏰ **Prayer Times**: Location-based prayer times with Hijri calendar
- 📖 **Quran Reading**: Full Quran with translations (114 Surahs) - Dedicated section page
- 📚 **Tafseer**: Quranic interpretations - Dedicated section page
- 💭 **Hadith**: Prophetic traditions with authentic sources - Dedicated section page
- 📿 **Dhikr Counter**: Digital tasbih with milestone tracking - Dedicated section page
- 🧭 **Qibla Finder**: Direction to Kaaba with compass - Dedicated section page
- 📚 **Quran Stories**: Educational PDF stories - Dedicated section
- 🎵 **Islamic Chant**: Favorite nasheed/chant content
- 🎤 **Favorite Reciter**: Meshari's preferred Quran reciter
- 🌍 **12 Languages**: Full multilingual support with dedicated pages

---

## ⚡ Performance Highlights

**Lightning Fast Loading:**
- ✅ First Load JS: **107 KB** (optimized bundle)
- ✅ Page Size: **1.83 KB** (main page)
- ✅ **Instant** loading with aggressive caching
- ✅ **7x faster** development with Turbopack
- ✅ Hybrid static, partially prerendered, and request-time routes where appropriate

**Optimization Features:**
- 🚀 Dynamic imports with code splitting
- 📦 Smart caching (30 day Quran cache, 6 hour prayer times)
- 🖼️ AVIF/WebP image optimization
- ⚡ DNS prefetch for all external APIs
- 🗜️ Production console log removal
- 📊 Bundle analyzer included

**Caching Strategy:**
```
Quran API:        30 days  (content doesn't change)
Prayer Times:     6 hours  (updates throughout day)
Google Fonts:     1 year   (permanent cache)
Static Assets:    1 year   (immutable with fingerprinting)
Images:           24 hours (with stale-while-revalidate)
```

---

## 🎨 Design & UX

### 🌍 Multilingual Support
- **12 Fully Supported Languages** with complete translations:
  - Arabic (ar) - Primary, RTL
  - English (en) - LTR
  - Urdu (ur) - RTL
  - Turkish (tr) - LTR
  - Indonesian (id) - LTR
  - Malay (ms) - LTR
  - Bengali (bn) - LTR
  - French (fr) - LTR
  - Chinese (zh) - LTR
  - Italian (it) - LTR
  - Japanese (ja) - LTR
  - Korean (ko) - LTR
- **URL Structure**: `/{lang}` for main pages, `/{lang}/sections/{section}` for sections
- **Automatic RTL/LTR detection** based on language
- Beautiful language switcher with smooth transitions
- Complete translations for all UI elements, sections, and content
- **Multilingual SEO**: Each page has language-specific metadata, keywords, and canonical URLs

### 🎨 Modern Design
- **Dark/Light Mode** with Islamic color scheme
- Custom colors:
  - Dark: `#0F172A` (deep blue-slate)
  - Light: `#FAF8F3` (warm cream)
  - Gold: `#D4AF37` (Islamic gold)
- Smooth Framer Motion animations
- Shimmer loading states
- Fully responsive design

### 📱 Progressive Web App (PWA)
- ✅ Installable on supported mobile and desktop browsers
- ✅ Dedicated regular and maskable icons plus a generated manifest
- ✅ Previously visited same-origin pages can remain available from cache
- ✅ Localized last-resort offline screen when an uncached navigation fails
- ✅ User-controlled service-worker update prompt
- ℹ️ Live prayer times, location search, streaming/audio, and remote APIs require connectivity

---

## 🛠️ Tech Stack

**Framework & Language:**
- **Next.js 16.3.0-preview.10** (App Router) - Cache Components, Partial Prefetching, and Instant Navigations
- **React 19** - With concurrent features
- **TypeScript 7** - Project compiler, with TypeScript 6 isolated to ESLint compatibility
- **Turbopack** - 7x faster development builds

**Styling & UI:**
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Aceternity UI** - Modern components
- **Lucide React** - Beautiful icons

**Fonts:**
- **Lexend Deca** - For LTR languages (Latin, etc.)
- **Tajawal** - For RTL languages (Arabic, Urdu, etc.)

**Build Tools:**
- **Turbopack** - 7x faster than Webpack (dev mode)
- **SWC Compiler** - Rust-based, lightning fast
- **Dependency-free service worker** - Cross-provider offline and update lifecycle
- **Bundle Analyzer** - Visualize bundle size

**APIs Integrated:**
- **Aladhan API** - Prayer times with geolocation
- **Al Quran Cloud API** - Complete Quran text
- **Quran.com API** - Tafseer and translations

---

## 🚀 Quick Start

### Prerequisites
- Node.js 22 recommended (Node.js 20.9+ supported) and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity.git
cd meshari-alabra-ongoing-charity

# Install the locked dependency graph
npm ci --legacy-peer-deps

# Run development server with Turbopack (7x faster!)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Available Scripts

```bash
npm run dev              # Start Turbopack dev server (⚡ super fast!)
npm run build            # Production build with optimizations
npm run build:analyze    # Build with bundle analyzer visualization
npm start                # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run type-check       # TypeScript type checking
npm run test:e2e         # Playwright browser regression suite
npm run test:e2e:install # Install Playwright Chromium
npm run clean            # Clean build cache and .next folder
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Analyze bundle size (optional)
npm run build:analyze

# Start production server locally
npm start
```

The production output contains static routes, partially prerendered language routes, and request-time API routes. Run `npm run build` against the current lockfile for authoritative route and bundle output rather than relying on stale committed metrics.

---

## 🔍 SEO & AI/LLM Optimization

### Comprehensive SEO Features
- ✅ **Multilingual Metadata**: Language-specific titles, descriptions, and keywords for all pages
- ✅ **Section-Specific SEO**: Each of the 9 sections has dedicated metadata and keywords
- ✅ **Canonical URLs**: Proper canonical tags for all pages and language variants
- ✅ **Schema.org Structured Data**: Full JSON-LD markup for all pages
- ✅ **Open Graph Tags**: Complete OG tags for social media sharing
- ✅ **Twitter Cards**: Optimized Twitter card metadata
- ✅ **Sitemap**: Auto-generated sitemap with all language variants
- ✅ **Robots.txt**: Comprehensive configuration for all search engines and AI crawlers

### Keywords Strategy
- **Main Page**: 20+ keywords in Arabic, 30+ in English
- **Section Pages**: 8-12 section-specific keywords per language
- **Coverage**: Quran, Islamic charity, prayer times, supplications, hadith, tafseer, dhikr, qibla, donation, orphan sponsorship

### AI/LLM Crawler Support
Public HTML is available to ordinary search and AI user agents. `robots.txt`
allows public pages and excludes service/API paths; `llms.txt` provides
supplementary project context but does not replace HTML crawlability,
canonicals, or the sitemap.

### Structured Data
- WebPage schema for all pages
- BreadcrumbList navigation
- WebSite and memorial Person entities
- Locale-specific page URLs and language declarations

## 📦 Deployment

This application needs a real Next.js runtime because it contains API routes and
Cache Components. Do not deploy it as a static export.

### One-click platforms

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity&env=NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_SITE_NAME,NEXT_PUBLIC_SITE_SHORT_NAME)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)

- **Vercel:** native Next.js deployment using `vercel.json`.
- **Netlify:** Next.js runtime deployment using `netlify.toml` and Netlify's
  official Next.js adapter.
- **Render:** Docker deployment defined by `render.yaml` and `Dockerfile`.

### Railway and any Docker host

`railway.json` is included. In Railway, create a project, connect your fork, and
Railway will build the included Dockerfile. A provider-specific one-click Railway
button can be added after publishing this repository as a Railway Template.

For any Docker-compatible host:

```bash
cp .env.example .env.local
docker compose --env-file .env.local up --build
```

The container listens on port `3000`, runs as a non-root user, and uses Next.js's
standalone production output.

### White-label before deploying

All core branding is centralized in [`src/config/site.ts`](./src/config/site.ts).
Fork owners can edit that file directly or set the documented `NEXT_PUBLIC_*`
variables from [`.env.example`](./.env.example) to update:

- Site, organization, and short names
- Visible logo, favicon, Apple icon, PWA icons, and Open Graph image
- SEO title, description, keywords, URL, and social identity
- PWA name, identity, start URL, theme, and background colors
- Memorial headline/date/description overrides and donation URL
- Quran and favorite-reciter playlist/thumbnail IDs
- Brand, accent, link, light-mode, and dark-mode colors

See [WHITE_LABELING.md](./WHITE_LABELING.md) for the complete workflow. Never put
passwords, tokens, private keys, or secrets in `NEXT_PUBLIC_*` variables.

### Copy-ready AI agent prompt

Copy this prompt into Hermes, Claude Code, Codex, OpenCode, or another coding
agent after cloning or forking the repository. Replace the bracketed values first.

```text
Configure and validate my fork of nawaf-inter4/meshari-alabra-ongoing-charity.

Branding and deployment inputs:
- Site name: [SITE NAME]
- Short/PWA name: [SHORT NAME]
- Organization: [ORGANIZATION]
- Canonical production URL: [HTTPS URL]
- Default locale: [LOCALE]
- Default direction: [ltr OR rtl]
- Memorial legal name: [NAME]
- Memorial display name: [NAME]
- Memorial alternate-script name: [NAME]
- Memorial date: [YYYY-MM-DD]
- Respectful hero description: [DESCRIPTION]
- Donation URL: [HTTPS URL]
- Logo path: [PUBLIC PATH]
- Favicon path: [PUBLIC PATH]
- Apple/PWA icon paths: [PUBLIC PATHS]
- Open Graph image path: [PUBLIC PATH]
- Brand, accent, link, light, and dark colors: [COLORS]
- Quran playlist and representative thumbnail video IDs: [IDS]
- Favorite-reciter playlist and representative thumbnail video IDs: [IDS]
- Deployment target: [Vercel, Netlify, Render, Railway, or Docker]

Requirements:
1. Read README.md, WHITE_LABELING.md, `/llms.txt`, .env.example,
   src/config/site.ts, and the selected provider manifest before editing.
2. Use src/config/site.ts and documented NEXT_PUBLIC_* values as the central
   white-label source. Do not scatter identity, domains, assets, or colors
   through components. Use translationOverrides for localized copy.
3. Preserve Quranic text exactly and keep all memorial/religious language
   respectful. Do not replace content that I did not explicitly provide.
4. Keep the application on its current Next.js 16.3 preview, Cache Components,
   Partial Prefetching, Instant Navigations, React 19, and TypeScript 7 setup.
5. Preserve native one-click YouTube players. A playlist ID controls playback;
   its representative video ID supplies the native poster, and the iframe is
   inserted near the viewport to defer third-party work.
6. Preserve direction-aware typography: LTR interface controls use Lexend Deca;
   RTL interface controls use Tajawal; Quranic Arabic may use its dedicated
   Arabic/Quran font. Never add a broad CSS selector that overrides both.
   Keep landing-page titles for dedicated sections clickable, and generate every
   section URL with the active locale (`/[lang]/sections/[section]`).
7. Never commit .env, .env.local, credentials, tokens, private keys, .agents/,
   .claude/, skills-lock.json, SKILL.md, Playwright output, or browser state.
   Only .env.example may be committed, and it must contain placeholders.
8. NEXT_PUBLIC_* values are public browser data. Never place a secret in one.
9. Do not configure static-only hosting: the app requires a Next.js runtime for
   API routes and dynamic behavior.
10. After implementation, run and report real output from:
    npm ci --legacy-peer-deps
    npm run lint
    npm run type-check
    npm run test:e2e
    npm run build
    git diff --check
11. In browser tests, verify the configured title, canonical URL, logo, favicon,
    /manifest.webmanifest, theme variables, both YouTube thumbnails, donation
    destination, an LTR route, an RTL route, and computed CTA font families.
12. Validate the selected provider manifest and, for Docker, build the image and
    smoke-test /, /manifest.webmanifest, and /api/ip-location without inventing
    successful output if a provider or Docker is unavailable.
13. Show me the final diff and validation results before committing or deploying.
```

### Performance on Deployment

All platforms provide:
- ✅ **Global CDN** for instant loading worldwide
- ✅ **Automatic SSL/HTTPS** certificates
- ✅ **Brotli/Gzip compression** automatically
- ✅ **HTTP/2 & HTTP/3** support
- ✅ **Edge caching** for static assets
- ✅ **Serverless functions** for APIs

### Post-Deployment Checklist

- [ ] Configure custom domain
- [ ] Verify HTTPS is enabled
- [ ] Test PWA installation
- [ ] Check service worker registration
- [ ] Test offline functionality
- [ ] Verify prayer times API
- [ ] Test on multiple devices
- [ ] Run Lighthouse audit

---

## 🤍 Orphan Sponsorship (كفالة اليتيم)

Help continue Meshari's legacy of kindness and giving by sponsoring an orphan in his name:

👉 [**Donate via Ehsan.sa – كفالة يتيم**](https://ehsan.sa/campaign/6FC11E15DA)

> *"When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him."*
> — Prophet Muhammad ﷺ (Sahih Muslim 1631)

**Benefits of Orphan Sponsorship:**
- 🌟 Companionship with the Prophet ﷺ in Paradise
- 💝 Fulfilling the needs of those who lost their guardian
- 🎯 Ongoing charity with continuous reward

---

## 🤲 Daily Supplications

**اللهم اغفر لمشاري وارحمه، وعافه واعفُ عنه، وأكرم نُزُله، ووسع مُدخله، واغسله بالماء والثلج والبرد، ونقِّه من الخطايا كما يُنقَّى الثوب الأبيض من الدنس.**

*"O Allah, forgive Meshari, have mercy on him, pardon him, give him strength, be generous to him, make his grave spacious and wash him with water, snow and hail. Cleanse him of his transgressions as white cloth is cleansed of stains."*

*(Sahih Muslim 963)*

---

## 🎯 Features Breakdown

### 📺 YouTube Playlist Section
- Embedded Quran recitation playlist
- Responsive 16:9 video player
- Lazy loading for performance
- Direct link to playlist

### 💝 Donation Section
- Direct integration with Ehsan.sa campaign
- Beautiful call-to-action design
- Benefits of orphan sponsorship listed
- Islamic-themed gradient effects

### ⏰ Prayer Times & Hijri Calendar
- Automatic geolocation detection
- Fallback to Riyadh, Saudi Arabia
- All 5 daily prayers + sunrise
- Hijri date in Arabic
- Gregorian date display
- Location display
- Beautiful card layout

### 📖 Quran Section
- All 114 Surahs available
- Clean Arabic text rendering
- Verse numbering
- Smooth scrolling
- Dropdown surah selector
- 30-day API caching

### 📚 Tafseer Section
- Search by Surah and Ayah
- Multiple interpretation sources
- Clean, readable format
- HTML content rendering

### 💬 Hadith Section
- Random hadith generator
- 5 authentic hadiths included
- Arabic with English translation
- Source references (Bukhari, Muslim)
- Refresh for new hadith

### 📿 Dhikr Counter
- Digital tasbih/tasbeeh
- Three dhikr options:
  - SubhanAllah (سُبْحَانَ اللَّهِ)
  - Alhamdulillah (الْحَمْدُ لِلَّهِ)
  - Allahu Akbar (اللَّهُ أَكْبَرُ)
- Milestone tracking (33, 99, 100)
- Haptic feedback on mobile
- Reset functionality
- Beautiful UI with Islamic colors

### 🧭 Qibla Finder
- Real-time compass direction
- Distance to Makkah calculation
- Device orientation support
- Geolocation-based
- Beautiful compass UI
- Cardinal direction indicators

---

## 🌐 Supported Languages (12 Fully Supported)

**Complete Multilingual Support:**
- 🇸🇦 **Arabic (ar)** - Primary language, RTL - Canonical at `/ar`
- 🇬🇧 **English (en)** - LTR - Available at `/en`
- 🇵🇰 **Urdu (ur)** - RTL - Available at `/ur`
- 🇹🇷 **Turkish (tr)** - LTR - Available at `/tr`
- 🇮🇩 **Indonesian (id)** - LTR - Available at `/id`
- 🇲🇾 **Malay (ms)** - LTR - Available at `/ms`
- 🇧🇩 **Bengali (bn)** - LTR - Available at `/bn`
- 🇫🇷 **French (fr)** - LTR - Available at `/fr`
- 🇨🇳 **Chinese (zh)** - LTR - Available at `/zh`
- 🇮🇹 **Italian (it)** - LTR - Available at `/it`
- 🇯🇵 **Japanese (ja)** - LTR - Available at `/ja`
- 🇰🇷 **Korean (ko)** - LTR - Available at `/ko`

**URL Structure:**
- Main pages: `https://meshari.charity/{lang}`
- Section pages: `https://meshari.charity/{lang}/sections/{section}`
- `/` permanently redirects to the configured default locale (`/ar` by default)
- Legacy `/sections/{section}` URLs permanently redirect to `/ar/sections/{section}` by default

All languages include:
- ✅ Complete UI translations
- ✅ Section-specific content translations
- ✅ Multilingual metadata and SEO
- ✅ Proper RTL/LTR text direction
- ✅ Language-specific canonical URLs
- ✅ hreflang tags for search engines

---

## 🔒 Security & Privacy

**Security Headers:**
- ✅ HSTS with preload
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection enabled
- ✅ Referrer-Policy configured
- ✅ Permissions-Policy restrictive

**Privacy:**
- Vercel Analytics and Speed Insights are configurable; analytics can be disabled with the documented public setting
- Prayer times and Qibla may use visitor IP/browser location with permission or API lookup
- Browser storage is used for preferences, bookmarks, PWA dismissal state, and cached offline resources
- External Quran, prayer, geolocation, donation, audio, and YouTube services have their own privacy policies

---

## 📊 Performance and crawl measurements

- Canonical localized HTML pages: **120** (12 landing pages + 108 section pages)
- Sitemap entries: **120**, each with reciprocal locale alternates and one `x-default`
- Root and legacy section aliases are redirects and are excluded from the sitemap
- Production build output is authoritative; route sizes and timings vary by toolchain and machine
- Lighthouse scores are measurements, not guarantees. Run several production-mode mobile and desktop audits and report the actual median alongside the commit and conditions.

## 📄 Section Pages

Each section has its own dedicated page with:
- ✅ **Multilingual Metadata**: Language-specific titles, descriptions, keywords
- ✅ **Canonical URLs**: Proper canonical tags with language alternates
- ✅ **Schema.org Markup**: WebPage, BreadcrumbList, WebSite, and memorial Person entities
- ✅ **SEO Optimization**: Comprehensive keywords and meta tags
- ✅ **Social Sharing**: Open Graph and Twitter Card tags
- ✅ **Sitemap Integration**: All sections included in sitemap with hreflang

**Available Sections:**
1. `/{lang}/sections/quran` - Complete Quran with translations
2. `/{lang}/sections/tafseer` - Quranic interpretations
3. `/{lang}/sections/dhikr` - Digital tasbih counter
4. `/{lang}/sections/prayer-times` - Prayer times with Hijri calendar
5. `/{lang}/sections/qibla` - Qibla direction finder
6. `/{lang}/sections/donation` - Orphan sponsorship
7. `/{lang}/sections/supplications` - Daily duas and supplications
8. `/{lang}/sections/hadith` - Prophetic traditions
9. `/{lang}/sections/youtube` - Quran recitation playlists

---

## 🕊️ In Memory Of

**Meshari Ahmed Sulaiman Alabra**
**مشاري بن أحمد بن سليمان العبره**

*Passed away on March 29, 2023 in Riyadh, Saudi Arabia*

> إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
> *"Indeed we belong to Allah, and indeed to Him we will return."*

May Allah have mercy on him, forgive his sins, expand his grave, and make it a garden from the gardens of Paradise. May every Quran recitation, every prayer, and every charitable act done through this platform be recorded in his favor on the Day of Judgment.

**اللَّهُمَّ اجْعَلْ قَبْرَهُ رَوْضَةً مِنْ رِيَاضِ الْجَنَّةِ**

---

## 📝 Development Notes

### Code Structure
```
meshari-alabra-ongoing-charity/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Root redirect
│   │   ├── [lang]/               # Language-specific routes
│   │   │   ├── layout.tsx        # Language layout with metadata
│   │   │   ├── page.tsx           # Localized landing page
│   │   │   └── sections/[section]/page.tsx # 9 localized section routes
│   │   ├── sitemap.ts             # 120 canonical localized URLs
│   │   ├── robots.ts              # Crawler policy
│   │   ├── manifest.ts            # Generated PWA manifest
│   │   ├── llms.txt/route.ts       # Configured agent/project context
│   │   ├── api/                  # API routes
│   │   │   ├── quran/            # Quran API proxy
│   │   │   └── location-search/  # Location search API
│   │   ├── globals.css           # Global styles
│   │   └── og-image/             # Dynamic OG image generation
│   ├── components/               # React components
│   │   ├── sections/             # Page sections
│   │   │   ├── EnhancedQuranSection.tsx
│   │   │   ├── TafseerSection.tsx
│   │   │   ├── DhikrCounter.tsx
│   │   │   ├── PrayerTimesSection.tsx
│   │   │   ├── QiblaFinder.tsx
│   │   │   ├── DonationSection.tsx
│   │   │   ├── SupplicationsSection.tsx
│   │   │   ├── HadithSection.tsx
│   │   │   ├── YouTubePlaylist.tsx
│   │   │   ├── QuranStoriesSection.tsx
│   │   │   ├── MeshariFavoriteReciter.tsx
│   │   │   ├── IslamicChantSection.tsx
│   │   │   ├── SectionNavigation.tsx
│   │   │   └── *SectionWrapper.tsx  # Client wrappers for SSR
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ClientHeader.tsx
│   │   ├── Footer.tsx
│   │   ├── ShareModal.tsx
│   │   ├── SectionSchema.tsx     # Schema.org component
│   │   └── AudioPlayer.tsx
│   ├── lib/                      # Utility functions
│   │   ├── metadata.ts           # Main page metadata generator
│   │   ├── section-metadata.ts   # Section metadata generator
│   │   └── translations.ts
│   ├── locales/                  # i18n translations (12 languages)
│   │   ├── ar.json               # Arabic
│   │   ├── en.json               # English
│   │   ├── ur.json               # Urdu
│   │   ├── tr.json               # Turkish
│   │   ├── id.json               # Indonesian
│   │   ├── ms.json               # Malay
│   │   ├── bn.json               # Bengali
│   │   ├── fr.json               # French
│   │   ├── zh.json               # Chinese
│   │   ├── it.json               # Italian
│   │   ├── ja.json               # Japanese
│   │   └── ko.json               # Korean
│   └── types/                    # TypeScript types
├── public/
│   ├── icons/                    # PWA icons
│   ├── fonts/                    # Self-hosted interface/Quran fonts
│   ├── stories/                  # PDF stories
│   ├── sw.js                     # Service worker
│   └── offline.html              # Localized last-resort offline fallback
├── src/
│   └── proxy.ts                  # Next.js proxy for routing
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── package.json                  # Dependencies and scripts
```

### Key Technologies
- **Dynamic Imports**: Code splitting for optimal loading
- **Service Worker**: Dependency-free bounded runtime caching
- **Image Optimization**: AVIF/WebP with lazy loading
- **Font Optimization**: Self-hosted locale-aware font subsets
- **API Caching**: Strategic caching for all external APIs

---

## 🤝 Contributing

This is a memorial project. If you'd like to contribute improvements, please read the full [contribution guide](./CONTRIBUTING.md).

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Please ensure:**
- Code is TypeScript compliant
- ESLint passes (`npm run lint`)
- Build succeeds (`npm run build`)
- Respects the memorial nature of the project

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) format. Release Please maintains a release pull request automatically; merging it updates `CHANGELOG.md` and `package.json`, creates a semantic `vX.Y.Z` tag, and publishes a GitHub release.

---

## 💖 Support

If this project helps you or inspires you to create something similar:

- ⭐ **Star this repository**
- 🤲 **Make dua for Meshari**
- 💝 **[Donate to orphan sponsorship](https://ehsan.sa/campaign/6FC11E15DA)**
- 📢 **Share with others** who might benefit
- 🔄 **Fork and adapt** for your own memorial projects

---

## 📄 License

This project is dedicated to the memory of **Meshari Ahmed Sulaiman Alabra** and is meant to be a source of ongoing charity (Sadaqah Jariyah).

The source code is available under the [MIT License](./LICENSE). You may use, modify, and distribute it to create similar memorial pages or Islamic landing pages. The code is provided as-is, with the hope that it benefits others.

---

## 📞 Links

- **Live Site**: [https://meshari.charity]
- **GitHub**: [nawaf-inter4/meshari-alabra-ongoing-charity](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)
- **Donation**: [Ehsan.sa Campaign](https://ehsan.sa/campaign/6FC11E15DA)
- **Issues**: [GitHub Issues](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/issues)

---

<div align="center">

**اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ**

*May Allah forgive him and have mercy upon him*

🕊️ **Sadaqah Jariyah - صدقة جارية** 🕊️

Built with ❤️ for Meshari
**Performance optimized for instant loading**

*رَبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ*

---

⚡ **Powered by Next.js 16** | 🚀 **Turbopack** | 📱 **PWA Ready** | 🌍 **12 Languages** | 🔍 **100% SEO Optimized** | 🤖 **AI/LLM Ready**

</div>
