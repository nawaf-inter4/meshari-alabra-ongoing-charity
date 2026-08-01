import { Suspense } from "react";
import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import LandingSchema from "@/components/LandingSchema";
import ServerHeroSection from "@/components/sections/ServerHeroSection";
import {
  SUPPORTED_LOCALES,
  isSupportedLocale,
} from "@/config/site";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

async function LanguagePageContent({ params }: PageProps) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) notFound();

  return (
    <>
      <LandingSchema locale={lang} />
      <HomePage language={lang} hero={<ServerHeroSection locale={lang} />} />
    </>
  );
}

export default function LanguagePage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-light-primary dark:bg-dark-primary" />}>
      <LanguagePageContent params={params} />
    </Suspense>
  );
}
