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
    if (typeof document === 'undefined' || !document.head || !document.head.parentNode) return;
    
    try {
      const schema = generateSectionSchema(sectionId, locale);
      const scriptId = `section-schema-${sectionId}`;
      
      // Remove existing schema if any
      const existingScript = document.getElementById(scriptId);
      if (existingScript && existingScript.parentNode) {
        existingScript.remove();
      }

      // Add new schema - only if head is still in DOM
      if (document.head && document.head.parentNode) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
      }

      return () => {
        // Cleanup - check if element exists and is still in DOM
        const scriptToRemove = document.getElementById(scriptId);
        if (scriptToRemove && scriptToRemove.parentNode) {
          try {
            scriptToRemove.remove();
          } catch (e) {
            // Silently fail if element is already removed
          }
        }
      };
    } catch (e) {
      // Silently fail if DOM manipulation fails
      console.warn('Failed to add section schema:', e);
    }
  }, [sectionId, locale]);

  return null;
}

