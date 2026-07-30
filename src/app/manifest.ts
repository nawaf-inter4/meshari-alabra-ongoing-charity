import type { MetadataRoute } from "next";
import { localeDirection, siteConfig } from "@/config/site";
import { translate } from "@/lib/translations";

export default function manifest(): MetadataRoute.Manifest {
  const locale = siteConfig.identity.defaultLocale;
  const localePath = `/${locale}`;
  const configuredStartUrl = siteConfig.pwa.startUrl;
  const startPath = configuredStartUrl === "/" ? localePath : configuredStartUrl;
  const startUrl = `${startPath}${startPath.includes("?") ? "&" : "?"}source=pwa`;
  const sectionBase = `${localePath}/sections`;


  return {
    id: siteConfig.pwa.id.startsWith("/") ? siteConfig.pwa.id : `/${siteConfig.pwa.id}`,
    name: siteConfig.identity.name,
    short_name: siteConfig.identity.shortName,
    description: siteConfig.seo.description || translate(locale, "hero.description"),
    start_url: startUrl,
    scope: "/",
    display: siteConfig.pwa.display,
    background_color: siteConfig.colors.backgroundDark,
    theme_color: siteConfig.colors.brand,
    orientation: "portrait-primary",
    lang: siteConfig.identity.defaultLocale,
    dir: localeDirection(locale),
    categories: ["religion", "lifestyle"],
    prefer_related_applications: false,
    icons: [
      {
        src: siteConfig.assets.pwaIcon192,
        sizes: "192x192",
        type: siteConfig.assets.pwaIcon192.endsWith(".svg") ? "image/svg+xml" : "image/png",
        purpose: "any",
      },
      {
        src: siteConfig.assets.pwaIcon512,
        sizes: "512x512",
        type: siteConfig.assets.pwaIcon512.endsWith(".svg") ? "image/svg+xml" : "image/png",
        purpose: "any",
      },
      {
        src: siteConfig.assets.pwaMaskableIcon,
        sizes: "512x512",
        type: siteConfig.assets.pwaMaskableIcon.endsWith(".svg") ? "image/svg+xml" : "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: translate(locale, "quran.title"),
        short_name: translate(locale, "quran.title"),
        description: translate(locale, "quran.subtitle"),
        url: `${sectionBase}/quran?source=pwa-shortcut`,
        icons: [{ src: siteConfig.assets.pwaIcon192, sizes: "192x192" }],
      },
      {
        name: translate(locale, "prayer.title"),
        short_name: translate(locale, "prayer.title"),
        description: translate(locale, "prayer.subtitle"),
        url: `${sectionBase}/prayer-times?source=pwa-shortcut`,
        icons: [{ src: siteConfig.assets.pwaIcon192, sizes: "192x192" }],
      },
      {
        name: translate(locale, "dhikr.title"),
        short_name: translate(locale, "dhikr.title"),
        description: translate(locale, "dhikr.subtitle"),
        url: `${sectionBase}/dhikr?source=pwa-shortcut`,
        icons: [{ src: siteConfig.assets.pwaIcon192, sizes: "192x192" }],
      },
      {
        name: translate(locale, "supplications.title"),
        short_name: translate(locale, "supplications.title"),
        description: translate(locale, "supplications.subtitle"),
        url: `${sectionBase}/supplications?source=pwa-shortcut`,
        icons: [{ src: siteConfig.assets.pwaIcon192, sizes: "192x192" }],
      },
    ],
  };
}
