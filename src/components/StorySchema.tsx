import Script from "next/script";
import type { QuranStoryDefinition } from "@/content/stories";
import { generateStorySchema } from "@/lib/story-metadata";
import { siteConfig, type SupportedLocale } from "@/config/site";
import { getCspNonce } from "@/lib/csp-nonce";

interface StorySchemaProps {
  story: QuranStoryDefinition;
  locale?: SupportedLocale;
}

export default async function StorySchema({
  story,
  locale = siteConfig.identity.defaultLocale,
}: StorySchemaProps) {
  const nonce = await getCspNonce();
  const schema = generateStorySchema(story, locale);

  return (
    <Script
      id={`story-schema-${story.slug}`}
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
