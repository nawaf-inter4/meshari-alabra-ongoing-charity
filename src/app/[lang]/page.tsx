import HomePage from "@/components/HomePage";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function LanguagePage({ params }: PageProps) {
  const { lang } = await params;
  
  // Validate language code
  const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
  const validLang = supportedLanguages.includes(lang) ? lang : 'ar';
  
  return <HomePage language={validLang} />;
}
