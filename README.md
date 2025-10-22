# Meshari's Ongoing Charity - صدقة جارية لمشاري

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![PWA](https://img.shields.io/badge/PWA-Enabled-green?style=for-the-badge)
![Performance](https://img.shields.io/badge/Performance-Optimized-gold?style=for-the-badge)

**A blazing-fast, multilingual Islamic landing page dedicated to the memory of Meshari Ahmed Sulaiman Alabra (مشاري بن أحمد بن سليمان العبره)**

*March 29, 2023 - May Allah have mercy on him*

[🚀 Live Demo](#) | [📖 Documentation](./DEPLOYMENT.md) | [🤲 Donate](https://ehsan.sa/campaign/6FC11E15DA)

</div>

---

## 🌙 About

This landing page serves as a **Sadaqah Jariyah** (ongoing charity) dedicated to Meshari, who passed away from brain cancer. Built with cutting-edge technology for **instant loading** and **optimal performance**.

### ✨ Core Features

- 📿 **YouTube Playlist**: Quran recitations as ongoing charity
- 💝 **Orphan Sponsorship**: Continue the legacy through charitable giving
- 🤲 **Islamic Supplications**: Daily athkar and prayers for the deceased
- ⏰ **Prayer Times**: Location-based prayer times with Hijri calendar
- 📖 **Quran Reading**: Full Quran with translations (114 Surahs)
- 📚 **Tafseer**: Quranic interpretations
- 💭 **Hadith**: Prophetic traditions with authentic sources
- 📿 **Dhikr Counter**: Digital tasbih with milestone tracking
- 🧭 **Qibla Finder**: Direction to Kaaba with compass

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
- **60+ Languages** with automatic RTL/LTR detection
- Arabic, English, Urdu, Turkish, Indonesian, Malay, Bengali, French, German, Spanish, and 50+ more!
- Beautiful language switcher with circle country flags
- Translations for all UI elements

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
- **Next.js 15.1.6** (App Router) - Latest stable version
- **React 19** - With concurrent features
- **TypeScript 5** - Type safety

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

## 🌐 Supported Languages (60+)

<details>
<summary>Click to view all languages</summary>

**Major Languages:**
- 🇸🇦 Arabic (العربية) - Default
- 🇬🇧 English
- 🇵🇰 Urdu (اردو)
- 🇹🇷 Turkish (Türkçe)
- 🇮🇩 Indonesian (Indonesia)
- 🇲🇾 Malay (Melayu)
- 🇧🇩 Bengali (বাংলা)
- 🇫🇷 French (Français)
- 🇩🇪 German (Deutsch)
- 🇪🇸 Spanish (Español)
- 🇵🇹 Portuguese (Português)
- 🇷🇺 Russian (Русский)
- 🇨🇳 Chinese (中文)
- 🇯🇵 Japanese (日本語)
- 🇰🇷 Korean (한국어)
- 🇮🇳 Hindi (हिन्दी)
- 🇮🇷 Persian (فارسی)

**And 40+ more languages!**

All with automatic RTL/LTR text direction and beautiful flag icons.

</details>

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
Static Routes:           4
Build Time:              ~30 seconds
Compiler:                SWC (Rust)
Dev Server:              Turbopack (7x faster)
```

**Lighthouse Scores (Expected):**
```
Performance:      95-100
Accessibility:    95-100
Best Practices:   95-100
SEO:              100
PWA:              ✓ Installable
```

**Core Web Vitals:**
```
LCP (Largest Contentful Paint):  < 1.5s
FID (First Input Delay):          < 100ms
CLS (Cumulative Layout Shift):    < 0.1
```

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
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout with metadata
│   │   ├── page.tsx      # Main page with dynamic imports
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── sections/     # Page sections (Hero, Prayer, Quran, etc.)
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── Footer.tsx
│   ├── lib/              # Utility functions
│   ├── locales/          # i18n translations (ar.json, en.json)
│   └── types/            # TypeScript types
├── public/
│   ├── icons/            # PWA icons
│   ├── manifest.json     # PWA manifest
│   ├── sw.js             # Service worker
│   ├── sitemap.xml       # Auto-generated sitemap
│   └── robots.txt        # SEO robots file
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

### Key Technologies
- **Dynamic Imports**: Code splitting for optimal loading
- **Service Worker**: Intelligent caching with workbox
- **Image Optimization**: AVIF/WebP with lazy loading
- **Font Optimization**: Google Fonts with preconnect
- **API Caching**: Strategic caching for all external APIs

---

## 🤝 Contributing

This is a memorial project. If you'd like to contribute improvements:

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

Feel free to use, modify, and distribute this code to create similar memorial pages or Islamic landing pages. The code is provided as-is, with the hope that it benefits others.

---

## 📞 Links

- **Live Site**: [Coming Soon]
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

⚡ **Powered by Next.js 15** | 🚀 **Turbopack** | 📱 **PWA Ready** | 🌍 **60+ Languages**

</div>
