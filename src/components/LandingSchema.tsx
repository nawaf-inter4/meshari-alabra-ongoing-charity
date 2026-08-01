import Script from "next/script";
import {
  siteAssetUrl,
  siteConfig,
  type SupportedLocale,
} from "@/config/site";
import { translate } from "@/lib/translations";
import { getCspNonce } from "@/lib/csp-nonce";
import {
  enrichMemorialDescription,
  formatHomeTitle,
  getHomeKeywords,
  memorialAlternateName,
  memorialLegalName,
} from "@/lib/seo";

export default async function LandingSchema({ locale }: { locale: SupportedLocale }) {
  const nonce = await getCspNonce();
  const url = `${siteConfig.identity.siteUrl}/${locale}`;
  const title = formatHomeTitle(locale);
  const description = enrichMemorialDescription(
    siteConfig.seo.description ||
      translate(locale, "seo.description", translate(locale, "hero.description")),
    locale,
  );
  const keywords = getHomeKeywords(locale);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        headline: title,
        description,
        keywords: keywords.join(", "),
        inLanguage: locale,
        isPartOf: { "@id": `${siteConfig.identity.siteUrl}/#website` },
        about: { "@id": `${siteConfig.identity.siteUrl}/#person` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: siteAssetUrl(siteConfig.assets.openGraphImage),
        },
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.identity.siteUrl}/#person`,
        name: memorialLegalName(),
        alternateName: memorialAlternateName(),
        deathDate: siteConfig.content.memorialDeathDate,
      },
    ],
  };

  return (
    <Script
      id="landing-schema"
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
