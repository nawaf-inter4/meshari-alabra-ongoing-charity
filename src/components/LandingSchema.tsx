import Script from "next/script";
import {
  siteAssetUrl,
  siteConfig,
  type SupportedLocale,
} from "@/config/site";
import { translate } from "@/lib/translations";

export default function LandingSchema({ locale }: { locale: SupportedLocale }) {
  const url = `${siteConfig.identity.siteUrl}/${locale}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: siteConfig.seo.title || translate(locale, "seo.title", translate(locale, "site.title", siteConfig.identity.name)),
    description: siteConfig.seo.description || translate(locale, "seo.description", translate(locale, "hero.description")),
    inLanguage: locale,
    isPartOf: { "@id": `${siteConfig.identity.siteUrl}/#website` },
    about: { "@id": `${siteConfig.identity.siteUrl}/#person` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: siteAssetUrl(siteConfig.assets.openGraphImage),
    },
  };

  return (
    <Script
      id="landing-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
