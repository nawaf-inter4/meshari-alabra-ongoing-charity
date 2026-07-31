import { SUPPORTED_LOCALES, RTL_LOCALES, siteConfig } from "@/config/site";
import { SECTION_IDS } from "@/lib/routes";

export function GET() {
  const sectionRoutes = SECTION_IDS.map((section) => `- /[lang]/sections/${section}`).join("\n");
  const text = `# ${siteConfig.identity.name} — LLM and Agent Guide

## Canonical project

- Production site: ${siteConfig.identity.siteUrl}
- Organization: ${siteConfig.identity.organizationName}
- Purpose: a respectful Sadaqah Jariyah (ongoing charity) memorial for ${siteConfig.content.memorialLegalName}
- Default locale: ${siteConfig.identity.defaultLocale}
- Supported locales: ${SUPPORTED_LOCALES.join(", ")}
- RTL locales: ${Array.from(RTL_LOCALES).join(", ")}
- License: MIT

Treat Quranic Arabic as immutable source content. Do not paraphrase or silently alter it. Keep memorial and religious language respectful and accurate.

## Canonical application routes

- / permanently redirects to /${siteConfig.identity.defaultLocale}
- /[lang] is the canonical localized landing page
${sectionRoutes}
- /manifest.webmanifest is the generated PWA manifest
- /og-image is the generated Open Graph image
- /feed.xml is the generated RSS feed
- /sitemap.xml is the authoritative sitemap
- /health is the redirect-free JSON deployment health check

The application requires a Node/Next.js runtime or a provider with full Next.js support. It is not a static export.

## Architecture

- Next.js 16.3 preview App Router, React 19, and TypeScript 7
- Cache Components, Partial Prefetching, and Instant Navigation
- Dynamic metadata, sitemap, robots, RSS, manifest, OG image, and llms.txt
- Native one-click YouTube players inserted near the viewport to defer third-party work
- Installable PWA with localized offline fallback and update handling
- Self-hosted Lexend Deca, Tajawal, Amiri, and Scheherazade New fonts
- Central white-label configuration in src/config/site.ts
- Next.js standalone output for Docker, Render, and Railway

## White-label source of truth

Use src/config/site.ts for committed defaults and .env.example for reusable environment names. Public NEXT_PUBLIC_* values are build-time browser-visible configuration and require a rebuild after changes. They are never secret storage.

Configurable categories include identity, canonical URL, locale, memorial content, assets, SEO, social links, donation destination, media IDs, PWA values, analytics, typography, and theme colors.

## Direction and typography contract

- LTR interface controls use Lexend Deca.
- RTL interface controls use Tajawal.
- Quranic Arabic may use the dedicated Arabic/Quran font stack.
- Direction follows the active locale; Arabic and Urdu are RTL.
- All internal section URLs retain the active locale.

## PWA and media behavior

Cached or previously visited pages may remain available offline. Remote APIs, location lookup, prayer-time APIs, audio, and video streaming require connectivity.

Quran and favorite-reciter playlists use native video-specific YouTube embed paths together with playlist IDs. The actual native iframe is deferred until near the viewport; no custom intermediary play button or two-click flow is used.

## Validation contract

Run real commands and report their actual output:

- npm ci --legacy-peer-deps
- npm run lint
- npm run type-check
- npm run test:e2e
- npm run build
- git diff --check

Verify all localized routes, reciprocal hreflang, one self-canonical per page, redirects, invalid-route 404/noindex behavior, PWA lifecycle, native YouTube behavior, LTR/RTL typography, provider configuration, and repository hygiene. Never claim a deployment or test succeeded without execution evidence.

## Copy-ready agent prompt

Configure and validate this ongoing-charity application using src/config/site.ts and .env.example as its central white-label source. Preserve Quranic text, native one-click YouTube behavior, locale-prefixed canonical URLs, Arabic/Urdu RTL typography, the PWA offline/update lifecycle, and all security and repository-hygiene rules. Do not scatter identity, domains, assets, media IDs, or colors through components. Run the complete install, lint, type-check, build, browser, SEO/PWA, deployment, audit, and diff validation chain and report only real results before committing or deploying.
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
