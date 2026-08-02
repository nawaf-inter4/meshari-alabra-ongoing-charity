import Script from "next/script";
import {
  SUPPORTED_LOCALES,
  siteAssetUrl,
  siteConfig,
} from "@/config/site";
import { translate } from "@/lib/translations";
import {
  enrichMemorialDescription,
  formatHomeTitle,
  memorialAlternateName,
  memorialLegalName,
} from "@/lib/seo";

export default function SEOScripts({ nonce }: { nonce?: string }) {
  const { identity, content, seo } = siteConfig;
  const description = enrichMemorialDescription(
    seo.description ||
      translate(
        identity.defaultLocale,
        "seo.description",
        translate(identity.defaultLocale, "hero.description"),
      ),
    identity.defaultLocale,
  );
  const websiteId = `${identity.siteUrl}/#website`;
  const personId = `${identity.siteUrl}/#person`;
  const legalName = memorialLegalName();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: identity.siteUrl,
        name: formatHomeTitle(identity.defaultLocale),
        alternateName: [identity.name, identity.shortName, legalName],
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
        about: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: legalName,
        alternateName: [
          memorialAlternateName(),
          "Meshari Alabra",
          "مشاري العبره",
        ],
        deathDate: content.memorialDeathDate,
        description,
      },
    ],
  };

  return (
    <Script
      id="site-schema"
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
