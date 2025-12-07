"use client";

import { useLanguage } from "./LanguageProvider";
import { languageMetadata } from "@/lib/metadata";

interface LocalSchemaMarkupProps {
  language?: string;
}

export default function LocalSchemaMarkup({ language }: LocalSchemaMarkupProps) {
  // All schemas have been moved to AdvancedSEO component to avoid duplicates
  // This component is kept for backward compatibility but returns null
  // All schema markup is now handled by AdvancedSEO component
  return null;
}
