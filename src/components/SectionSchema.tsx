import Script from "next/script";
import {
  generateSectionSchema,
  type SectionId,
} from "@/lib/section-metadata";
import { siteConfig, type SupportedLocale } from "@/config/site";

interface SectionSchemaProps {
  sectionId: SectionId;
  locale?: SupportedLocale;
}

export default function SectionSchema({
  sectionId,
  locale = siteConfig.identity.defaultLocale,
}: SectionSchemaProps) {
  const schema = generateSectionSchema(sectionId, locale);

  return (
    <Script
      id={`section-schema-${sectionId}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
