import Script from "next/script";
import {
  generateSectionSchema,
  type SectionId,
} from "@/lib/section-metadata";
import { siteConfig, type SupportedLocale } from "@/config/site";
import { getCspNonce } from "@/lib/csp-nonce";

interface SectionSchemaProps {
  sectionId: SectionId;
  locale?: SupportedLocale;
}

export default async function SectionSchema({
  sectionId,
  locale = siteConfig.identity.defaultLocale,
}: SectionSchemaProps) {
  const nonce = await getCspNonce();
  const schema = generateSectionSchema(sectionId, locale);

  return (
    <Script
      id={`section-schema-${sectionId}`}
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
