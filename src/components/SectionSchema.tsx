"use client";

import { useLanguage } from "./LanguageProvider";
import { generateSectionSchema, SectionId } from "@/lib/section-metadata";
import { useEffect } from "react";

interface SectionSchemaProps {
  sectionId: SectionId;
}

export default function SectionSchema({ sectionId }: SectionSchemaProps) {
  const { locale } = useLanguage();

  useEffect(() => {
    const schema = generateSectionSchema(sectionId, locale);
    const scriptId = `section-schema-${sectionId}`;
    
    // Remove existing schema if any
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Add new schema
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [sectionId, locale]);

  return null;
}

