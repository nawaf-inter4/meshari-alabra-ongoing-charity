"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "../LanguageProvider";
import { localizedSectionHref } from "@/lib/routes";

interface SectionTitleLinkProps {
  section: string;
  children: ReactNode;
}

/**
 * Section hub link wrapped around gradient titles.
 * Do not use opacity, filter, or transform on hover — they isolate the child and
 * break parent `bg-clip-text` + `text-transparent` (title vanishes). Hover cue is
 * an explicit-color underline via `.section-title-link` in globals.css.
 */
export default function SectionTitleLink({ section, children }: SectionTitleLinkProps) {
  const { locale } = useLanguage();

  return (
    <Link
      href={localizedSectionHref(locale, section)}
      prefetch
      data-section-title-link={section}
      className="section-title-link rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-islamic-gold focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
    >
      {children}
    </Link>
  );
}
