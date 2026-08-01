# White-labeling Guide

This repository is designed to be forked and rebranded for a loved one without editing UI components one by one. Deploy steps in plain language: [DEPLOYMENT.md](./DEPLOYMENT.md).

## 0. Quick start for a family memorial

You only need a handful of values for a respectful first launch. Copy [`.env.example`](./.env.example) or paste these into your host’s Environment Variables panel:

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-site.example
NEXT_PUBLIC_SITE_NAME="Ongoing Charity for [Name]"
NEXT_PUBLIC_SITE_SHORT_NAME="[Name]'s Charity"
NEXT_PUBLIC_ORGANIZATION_NAME="[Name]'s Ongoing Charity"
NEXT_PUBLIC_MEMORIAL_NAME="[Full name]"
NEXT_PUBLIC_MEMORIAL_ALTERNATE_NAME="[Name in another script, optional]"
NEXT_PUBLIC_MEMORIAL_DEATH_DATE=2023-03-29
NEXT_PUBLIC_DONATION_URL=https://example.org/donate
NEXT_PUBLIC_COLOR_BRAND="#D4AF37"
NEXT_PUBLIC_COLOR_ACCENT="#006B3F"
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_DEFAULT_DIRECTION=ltr
```

Then:

1. Deploy with any badge in the README / [DEPLOYMENT.md](./DEPLOYMENT.md).
2. Open `https://your-site.example/health` — you should see `{"status":"ok"}`.
3. Confirm the memorial name, donate button, and colors on the home page.
4. Use HTTPS so visitors can install the site as a PWA (Add to Home Screen).

If you change any `NEXT_PUBLIC_*` value later, rebuild/redeploy. Docker users must rebuild with `docker compose --env-file .env.local up --build`.

## 1. Choose a configuration method

### File-based configuration

Edit [`src/config/site.ts`](./src/config/site.ts). This is the typed source of truth and contains safe defaults for every supported option.

### Environment-based configuration

Copy the reusable template:

```bash
cp .env.example .env.local
```

Use `.env.local` only on your machine. On Vercel, Netlify, Render, Railway, CranL, Coolify, Dokploy, or another host, enter values in that provider's environment-variable dashboard.

> `NEXT_PUBLIC_*` values are visible in browser JavaScript. Never use that prefix for passwords, access tokens, API secrets, private keys, or confidential information.

## 2. Identity and URL

Set:

```dotenv
NEXT_PUBLIC_SITE_URL=https://charity.example
NEXT_PUBLIC_SITE_NAME="Example Ongoing Charity"
NEXT_PUBLIC_SITE_SHORT_NAME="Example Charity"
NEXT_PUBLIC_ORGANIZATION_NAME="Example Foundation"
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_DEFAULT_DIRECTION=ltr
```

`NEXT_PUBLIC_SITE_URL` must be the final public origin, without a trailing slash. It is used for canonical URLs, Open Graph metadata, Twitter metadata, structured data, and generated asset URLs.

## 3. Logo, favicon, social image, and PWA icons

Place replacement files under `public/` and configure their root-relative paths:

```dotenv
NEXT_PUBLIC_LOGO_PATH=/brand/logo.png
NEXT_PUBLIC_FAVICON_PATH=/brand/favicon.svg
NEXT_PUBLIC_APPLE_TOUCH_ICON_PATH=/brand/apple-touch-icon.png
NEXT_PUBLIC_PWA_ICON_192_PATH=/brand/pwa-192.png
NEXT_PUBLIC_PWA_ICON_512_PATH=/brand/pwa-512.png
NEXT_PUBLIC_PWA_MASKABLE_ICON_PATH=/brand/pwa-maskable-512.png
NEXT_PUBLIC_OG_IMAGE_PATH=/brand/social-card.png
NEXT_PUBLIC_SUPPLICATIONS_PDF_PATH=/brand/supplications.pdf
```

Recommended dimensions:

| Asset | Recommendation |
|---|---|
| Logo | Square, at least 512×512 |
| Favicon | SVG or multi-size ICO |
| Apple touch icon | 180×180 PNG |
| PWA icons | 192×192 and 512×512 PNG |
| iOS splash screens | Full-bleed PNGs in `public/splash/` (see below) |
| Open Graph image | 1200×630 PNG or JPEG |

### iOS PWA splash screens

iOS ignores the web app manifest splash and needs `apple-touch-startup-image` links sized to each device. This project ships branded dark-slate splash PNGs under `public/splash/` and injects the matching media queries via `AppleSplashLinks` in the language layout (`viewportFit: "cover"` is already set so safe-area insets apply in standalone mode).

After changing the PWA icon or brand colors, regenerate:

```bash
npm run generate:splash
```

That script (`scripts/generate-apple-splash.mjs`) composites `/public/icons/icon-512x512.png` onto the memorial dark background for common iPhone and iPad portrait sizes. Keep `src/lib/apple-splash.ts` in sync if you add or rename splash files.

Absolute HTTPS asset URLs are also supported. Local assets are the safest option across hosting providers.

## 4. SEO and structured data

```dotenv
NEXT_PUBLIC_SEO_TITLE="Example Ongoing Charity"
NEXT_PUBLIC_SEO_DESCRIPTION="A respectful description of this charitable project."
NEXT_PUBLIC_SEO_KEYWORDS="ongoing charity,quran,supplications"
NEXT_PUBLIC_SOCIAL_HANDLE=@example
NEXT_PUBLIC_SOCIAL_LINKS=https://youtube.com/@example,https://x.com/example
```

If SEO title and description are empty, the original localized metadata remains active. The generated website, organization, page, and memorial-person schema all consume the central configuration.

## 5. Memorial and site content

Global overrides are useful for a fork that wants one identity across every language:

```dotenv
NEXT_PUBLIC_MEMORIAL_LEGAL_NAME="Full legal name"
NEXT_PUBLIC_MEMORIAL_ALTERNATE_NAME="Name in another script"
NEXT_PUBLIC_MEMORIAL_DEATH_DATE=2025-01-01
NEXT_PUBLIC_MEMORIAL_NAME="Visible memorial heading"
NEXT_PUBLIC_MEMORIAL_DATE_TEXT="Passed away on January 1, 2025"
NEXT_PUBLIC_HERO_DESCRIPTION="A respectful memorial message"
NEXT_PUBLIC_FOOTER_CHARITY_TEXT="A respectful footer memorial message"
NEXT_PUBLIC_DONATION_URL=https://example.org/donate
```

Live location and prayer APIs fall back to centrally configured values:

```env
NEXT_PUBLIC_FALLBACK_LATITUDE=24.7136
NEXT_PUBLIC_FALLBACK_LONGITUDE=46.6753
NEXT_PUBLIC_FALLBACK_CITY=Riyadh
NEXT_PUBLIC_FALLBACK_COUNTRY="Saudi Arabia"
NEXT_PUBLIC_FALLBACK_COUNTRY_CODE=SA
NEXT_PUBLIC_FALLBACK_FAJR="5:15 AM"
NEXT_PUBLIC_FALLBACK_SUNRISE="6:30 AM"
NEXT_PUBLIC_FALLBACK_DHUHR="12:00 PM"
NEXT_PUBLIC_FALLBACK_ASR="3:30 PM"
NEXT_PUBLIC_FALLBACK_MAGHRIB="6:00 PM"
NEXT_PUBLIC_FALLBACK_ISHA="7:30 PM"
```

For precise localized content, edit `translationOverrides` near the top of `src/config/site.ts`:

```ts
const translationOverrides: TranslationOverrides = {
  en: {
    "hero.description": "English custom description",
    "youtube.title": "Our Quran Recitations",
  },
  ar: {
    "hero.description": "الوصف العربي المخصص",
  },
  "*": {
    "donation.button": "Donate",
  },
};
```

Locale-specific values win over `"*"`, and configured overrides win over the bundled JSON translations. Any key from `src/locales/*.json` can be overridden here.

## 6. Video playlists and previews

A YouTube playlist does not provide a dependable playlist-thumbnail URL. Configure both the playlist ID and one representative public video ID:

```dotenv
NEXT_PUBLIC_QURAN_PLAYLIST_ID=your_playlist_id
NEXT_PUBLIC_QURAN_PLAYLIST_START_VIDEO_ID=first_embeddable_video_id
NEXT_PUBLIC_FAVORITE_RECITER_PLAYLIST_ID=your_playlist_id
NEXT_PUBLIC_FAVORITE_RECITER_START_VIDEO_ID=first_embeddable_video_id
NEXT_PUBLIC_ISLAMIC_CHANT_VIDEO_ID=video_id
```

Each playlist uses the native `embed/{videoId}?list={playlistId}` player. The explicit starting video supplies YouTube's native poster while retaining the red play button, playlist controls, and one-click playback—there is no custom intermediary player.

## 7. Theme colors

```dotenv
NEXT_PUBLIC_COLOR_BRAND="#D4AF37"
NEXT_PUBLIC_COLOR_ACCENT="#006B3F"
NEXT_PUBLIC_COLOR_LINK="#0066B2"
NEXT_PUBLIC_COLOR_BACKGROUND_DARK="#0F172A"
NEXT_PUBLIC_COLOR_BACKGROUND_DARK_SECONDARY="#1E293B"
NEXT_PUBLIC_COLOR_BACKGROUND_DARK_ACCENT="#334155"
NEXT_PUBLIC_COLOR_BACKGROUND_LIGHT="#FAF8F3"
NEXT_PUBLIC_COLOR_BACKGROUND_LIGHT_SECONDARY="#F5F3EE"
NEXT_PUBLIC_COLOR_BACKGROUND_LIGHT_ACCENT="#E8E5DD"
```

These values populate CSS variables used by the existing Tailwind theme, so current components update automatically.

## 8. PWA settings

```dotenv
NEXT_PUBLIC_PWA_ID=example-charity-pwa
NEXT_PUBLIC_PWA_START_URL=/
NEXT_PUBLIC_VAPID_PUBLIC_KEY=
NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS=false
```

The manifest is generated at `/manifest.webmanifest` from the same identity, icon, locale, direction, and color configuration.

## 9. Validate a customized fork

```bash
npm ci --legacy-peer-deps
npm run lint
npm run type-check
npm run test:e2e
npm run build
```

Then verify:

- Page title, canonical URL, Open Graph image, and structured data
- Header logo, favicon, and Apple icon
- `/manifest.webmanifest`
- PWA installation on HTTPS
- Both YouTube preview images and playlist playback
- Donation destination
- RTL and LTR language routes
- Light and dark themes

## 10. Repository privacy rules

The repository intentionally ignores:

- `.env` and every `.env.*` file except `.env.example`
- `.agents/` and `.claude/`
- `skills-lock.json`
- Every `SKILL.md`
- Playwright output and local logs

Before committing, verify:

```bash
git status --short
git ls-files | grep -E '(^|/)(SKILL\.md|\.env($|\.)|skills-lock\.json|\.agents/|\.claude/)' || true
```

Only `.env.example` should appear as an environment template. It must contain placeholders, never real credentials.
