import Script from "next/script";
import {
  SUPPORTED_LOCALES,
  siteAssetUrl,
  siteConfig,
} from "@/config/site";
import { translate } from "@/lib/translations";

export default function SEOScripts() {
  const { identity, content, seo } = siteConfig;
  const description = seo.description || translate(identity.defaultLocale, "seo.description", translate(identity.defaultLocale, "hero.description"));
  const websiteId = `${identity.siteUrl}/#website`;
  const personId = `${identity.siteUrl}/#person`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: identity.siteUrl,
        name: identity.name,
        description,
        inLanguage: SUPPORTED_LOCALES,
        publisher: {
          "@type": "Organization",
          name: identity.organizationName,
          logo: {
            "@type": "ImageObject",
            url: siteAssetUrl(siteConfig.assets.logo),
          },
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: content.memorialLegalName,
        alternateName: content.memorialAlternateName,
        deathDate: content.memorialDeathDate,
      },
    ],
  };

  return (
    <Script
      id="site-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
