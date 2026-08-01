import Script from "next/script";
import type { QuranStoryDefinition } from "@/content/stories";
import { generateStorySchema } from "@/lib/story-metadata";
import { siteConfig, type SupportedLocale } from "@/config/site";

interface StorySchemaProps {
  story: QuranStoryDefinition;
  locale?: SupportedLocale;
}

export default function StorySchema({
  story,
  locale = siteConfig.identity.defaultLocale,
}: StorySchemaProps) {
  const schema = generateStorySchema(story, locale);

  return (
    <Script
      id={`story-schema-${story.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
