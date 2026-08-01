import { SUPPORTED_LOCALES, RTL_LOCALES, siteConfig } from "@/config/site";
import { STORY_SLUGS } from "@/content/stories";
import { SECTION_IDS } from "@/lib/routes";

export function GET() {
  const base = siteConfig.identity.siteUrl.replace(/\/$/, "");
  const defaultLocale = siteConfig.identity.defaultLocale;
  const sectionLinks = SECTION_IDS.map((section) => {
    const title = section
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    return `- [${title}](${base}/${defaultLocale}/sections/${section}): Localized ${section} section page`;
  }).join("\n");
  const storyLinks = STORY_SLUGS.map((slug) => {
    return `- [${slug}](${base}/${defaultLocale}/stories/${slug}): Localized Quran story page with PDF`;
  }).join("\n");

  const localeLinks = SUPPORTED_LOCALES.map((locale) => {
    const direction = RTL_LOCALES.has(locale) ? "RTL" : "LTR";
    return `- [${locale.toUpperCase()} landing](${base}/${locale}): Canonical ${locale} landing page (${direction})`;
  }).join("\n");

  const text = `# ${siteConfig.identity.name}

> Respectful Sadaqah Jariyah (ongoing charity) memorial for ${siteConfig.content.memorialLegalName}. Multilingual Islamic tools, orphan sponsorship, Quran recitations, and PWA support.

Organization: ${siteConfig.identity.organizationName}. Default locale: ${defaultLocale}. Supported locales: ${SUPPORTED_LOCALES.join(", ")}. RTL locales: ${Array.from(RTL_LOCALES).join(", ")}. License: MIT.

Treat Quranic Arabic as immutable source content. Do not paraphrase or silently alter it. Keep memorial and religious language respectful and accurate. The application requires a Node/Next.js runtime and is not a static export.

## Docs

- [White-labeling guide](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/blob/main/WHITE_LABELING.md): How to rebrand identity, assets, colors, and media
- [Deployment guide](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/blob/main/DEPLOYMENT.md): Vercel, Netlify, Render, Railway, and Docker deployment notes
- [Contributing](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity/blob/main/CONTRIBUTING.md): Branch flow, conventional commits, and release policy
- [llms.txt](${base}/llms.txt): This agent orientation file

## Primary pages

- [Home redirect](${base}/): Permanently redirects to /${defaultLocale}
- [Default landing](${base}/${defaultLocale}): Canonical memorial landing page
${localeLinks}

## Sections

${sectionLinks}

## Quran stories

- [Stories index](${base}/${defaultLocale}/stories): Localized index of educational Quran story pages
${storyLinks}

## Machine-readable endpoints

- [Sitemap](${base}/sitemap.xml): Authoritative localized URL inventory with hreflang alternates
- [Robots policy](${base}/robots.txt): Crawler allow/disallow rules
- [RSS feed](${base}/feed.xml): Generated site feed
- [PWA manifest](${base}/manifest.webmanifest): Installable app metadata and icons
- [Open Graph image](${base}/og-image): Generated social preview image
- [Health check](${base}/health): Redirect-free JSON deployment health probe

## Optional

- [GitHub repository](https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity): Source code and issue tracker
- [Orphan sponsorship](${siteConfig.content.donationUrl}): External donation campaign
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
