# Meshari's Continuous Charity - صدقة جارية لمشاري

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![PWA](https://img.shields.io/badge/PWA-Enabled-green?style=for-the-badge)
![Performance](https://img.shields.io/badge/Performance-Optimized-gold?style=for-the-badge)

[![CI](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/ci.yml/badge.svg)](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/ci.yml)
[![Release](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/release.yml/badge.svg)](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/actions/workflows/release.yml)
[![GitHub release](https://img.shields.io/github/v/release/nawaf-inter4/meshari-alabra-ongoing-charity)](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**A blazing-fast, multilingual Islamic landing page dedicated to the memory of Meshari Ahmed Sulaiman Alabra (مشاري بن أحمد بن سليمان العبره)**

*March 29, 2023 - May Allah have mercy on him*

[🚀 Live Demo](https://meshari.charity) | [📖 Documentation](./DEPLOYMENT.md) | [🤲 Donate](https://ehsan.sa/campaign/6FC11E15DA)

</div>

---

## 🌙 About

This landing page serves as a **Sadaqah Jariyah** (ongoing charity) dedicated to Meshari, who passed away from brain cancer. Built with cutting-edge technology for **instant loading** and **optimal performance**. The site features comprehensive multilingual support, dedicated section pages with full SEO optimization, and is fully optimized for AI/LLM indexing.

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
- ✅ Static generation for all routes

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
- ✅ Works offline with intelligent caching
- ✅ Install on home screen (mobile & desktop)
- ✅ Push notifications ready (prayer times & daily supplications)
- ✅ Background sync support
- ✅ App-like experience
- ✅ 5MB cache limit with smart eviction

---

## 🛠️ Tech Stack

**Framework & Language:**
- **Next.js 16.1.1** (App Router) - Latest stable version with Server Components
- **React 19** - With concurrent features
- **TypeScript 5** - Type safety
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
- **next-pwa** - Full PWA support
- **Bundle Analyzer** - Visualize bundle size

**APIs Integrated:**
- **Aladhan API** - Prayer times with geolocation
- **Al Quran Cloud API** - Complete Quran text
- **Quran.com API** - Tafseer and translations

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity.git
cd meshari-alabra-ongoing-charity

# Install dependencies
npm install

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

**Build Output:**
```
Route (app)                Size     First Load JS
┌ ○ /                      1.83 kB  107 kB
└ ○ /_not-found            979 B    107 kB

✓ Static generation: 4 routes
✓ Sitemap generated
✓ All optimizations applied
```

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
The site is optimized for indexing by:
- **Search Engines**: Google, Bing, Yahoo, Yandex, Baidu, DuckDuckGo
- **AI/LLM Systems**: OpenAI GPTBot, Anthropic Claude, Google AI, Perplexity AI, You.com, Character.AI, CCBot, ChatGPT-User
- **Social Media**: Facebook, Twitter/X, LinkedIn, WhatsApp, Telegram
- **SEO Tools**: Ahrefs, Semrush, Majestic SEO, Moz
- **Archive Services**: Archive.org, Wayback Machine

### Structured Data
- WebPage schema for all pages
- BreadcrumbList navigation
- Article schema for content pages
- Organization schema
- Multilingual alternate pages with proper hreflang

## 📦 Deployment

This project is **100% serverless** and optimized for instant deployment.

### Recommended Platforms:

#### 1. **Vercel** (Recommended - Easiest)
```bash
npm i -g vercel
vercel
```
Or use the button: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity)

**Why Vercel:**
- ✅ Zero configuration needed
- ✅ Automatic HTTPS
- ✅ Global CDN (Edge Network)
- ✅ Perfect for Next.js
- ✅ Free tier: 100GB bandwidth

#### 2. **Netlify**
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod
```

#### 3. **Cloudflare Pages**
- Connect Git repository
- Build command: `npm run build`
- Publish directory: `.next`
- **Unlimited bandwidth on free tier!**

#### 4. **AWS Amplify**
- Auto-detect Next.js configuration
- Global CloudFront CDN
- Auto-scaling infrastructure

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
- 🇸🇦 **Arabic (ar)** - Primary language, RTL - Default at `/`
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
- Arabic (default): No language prefix needed (`/` or `/sections/{section}`)

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
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection enabled
- ✅ Referrer-Policy configured
- ✅ Permissions-Policy restrictive

**Privacy:**
- ✅ No tracking or analytics by default
- ✅ No personal data collection
- ✅ Geolocation: Only for prayer times (optional)
- ✅ Local storage: Only for preferences
- ✅ APIs: All public, read-only Islamic resources

---

## 📊 Performance Metrics

**Build Performance:**
```
First Load JS:           107 KB
Main Page Size:          1.83 KB
Static Routes:           4 main + 9 sections × 12 languages = 112 routes
Build Time:              ~30 seconds
Compiler:                SWC (Rust)
Dev Server:              Turbopack (7x faster)
```

**Lighthouse Scores (Expected):**
```
Performance:      95-100
Accessibility:    95-100
Best Practices:   95-100
SEO:              100 (with multilingual optimization)
PWA:              ✓ Installable
```

**Core Web Vitals:**
```
LCP (Largest Contentful Paint):  < 1.5s
FID (First Input Delay):          < 100ms
CLS (Cumulative Layout Shift):    < 0.1
```

**SEO Metrics:**
```
Total Pages:              112 (12 languages × 9 sections + 12 main pages)
Sitemap Entries:          112+ with hreflang alternates
Schema.org Markup:        100% coverage
Canonical URLs:           100% coverage
Multilingual Metadata:    100% coverage
Keywords per Page:        8-30 keywords depending on page type
```

## 📄 Section Pages

Each section has its own dedicated page with:
- ✅ **Multilingual Metadata**: Language-specific titles, descriptions, keywords
- ✅ **Canonical URLs**: Proper canonical tags with language alternates
- ✅ **Schema.org Markup**: Full structured data (WebPage, BreadcrumbList, Article)
- ✅ **SEO Optimization**: Comprehensive keywords and meta tags
- ✅ **Social Sharing**: Open Graph and Twitter Card tags
- ✅ **Sitemap Integration**: All sections included in sitemap with hreflang

**Available Sections:**
1. `/sections/quran` - Complete Quran with translations
2. `/sections/tafseer` - Quranic interpretations
3. `/sections/dhikr` - Digital tasbih counter
4. `/sections/prayer-times` - Prayer times with Hijri calendar
5. `/sections/qibla` - Qibla direction finder
6. `/sections/donation` - Orphan sponsorship
7. `/sections/supplications` - Daily duas and supplications
8. `/sections/hadith` - Prophetic traditions
9. `/sections/youtube` - Quran recitation playlists

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
│   │   │   └── page.tsx           # Main page
│   │   ├── sections/              # Dedicated section pages
│   │   │   ├── layout.tsx        # Sections layout
│   │   │   ├── quran/page.tsx    # Quran section
│   │   │   ├── tafseer/page.tsx  # Tafseer section
│   │   │   ├── dhikr/page.tsx    # Dhikr section
│   │   │   ├── prayer-times/     # Prayer times section
│   │   │   ├── qibla/page.tsx    # Qibla section
│   │   │   ├── donation/page.tsx  # Donation section
│   │   │   ├── supplications/     # Supplications section
│   │   │   ├── hadith/page.tsx    # Hadith section
│   │   │   └── youtube/page.tsx  # YouTube section
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
│   ├── stories/                  # PDF stories
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker
│   ├── sitemap.xml               # Auto-generated sitemap
│   ├── robots.txt                # Comprehensive robots file
│   └── llms.txt                  # LLM training data
├── src/
│   └── proxy.ts                  # Next.js proxy for routing
├── next.config.js                # Next.js configuration
├── next-sitemap.config.js       # Sitemap configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── package.json                  # Dependencies and scripts
```

### Key Technologies
- **Dynamic Imports**: Code splitting for optimal loading
- **Service Worker**: Intelligent caching with workbox
- **Image Optimization**: AVIF/WebP with lazy loading
- **Font Optimization**: Google Fonts with preconnect
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
