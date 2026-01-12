import { Suspense } from "react";
import HomePage from "@/components/HomePage";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

// Generate static params for all supported languages to enable static generation
export async function generateStaticParams() {
  const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
  return supportedLanguages.map((lang) => ({
    lang,
  }));
}

async function LanguagePageContent({ params }: PageProps) {
  const { lang } = await params;
  
  // Validate language code
  const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
  const validLang = supportedLanguages.includes(lang) ? lang : 'ar';
  
  return <HomePage language={validLang} />;
}

export default async function LanguagePage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LanguagePageContent params={params} />
    </Suspense>
  );
}
