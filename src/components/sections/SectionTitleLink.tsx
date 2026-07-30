"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "../LanguageProvider";
import { localizedSectionHref } from "@/lib/routes";

interface SectionTitleLinkProps {
  section: string;
  children: ReactNode;
}

export default function SectionTitleLink({ section, children }: SectionTitleLinkProps) {
  const { locale } = useLanguage();

  return (
    <Link
      href={localizedSectionHref(locale, section)}
      prefetch
      data-section-title-link={section}
      className="rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-islamic-gold focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
    >
      {children}
    </Link>
  );
}
