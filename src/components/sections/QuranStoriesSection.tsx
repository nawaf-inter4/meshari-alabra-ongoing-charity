"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageProvider";
import { BookOpen, Download, Eye, FileText, Heart, Star, ExternalLink } from "lucide-react";
import PDFThumbnail from "../PDFThumbnail";
import PDFViewer from "../PDFViewer";

interface QuranStory {
  id: string;
  title: {
    ar: string;
    en: string;
    tr: string;
    ur: string;
    id: string;
    ms: string;
    bn: string;
    fr: string;
    zh: string;
    it: string;
    ja: string;
    ko: string;
  };
  description: {
    ar: string;
    en: string;
    tr: string;
    ur: string;
    id: string;
    ms: string;
    bn: string;
    fr: string;
    zh: string;
    it: string;
    ja: string;
    ko: string;
  };
  pdfUrl: string;
  fileName: string;
  surahNumber?: number;
  surahName?: {
    ar: string;
    en: string;
  };
  pages?: number;
  readingTime?: string;
}

// Actual PDF files from your stories folder
const actualPdfFiles = [
  {
    fileName: "الخضر؟ أم القَدَر ؟ .pdf",
    title: {
      ar: "الخضر؟ أم القَدَر ؟",
      en: "Al-Khidr? Or Destiny?",
      tr: "Hızır mı? Yoksa Kader mi?",
      ur: "خضر؟ یا تقدیر؟",
      id: "Al-Khidr? Atau Takdir?",
      ms: "Al-Khidr? Atau Takdir?",
      bn: "আল-খিদর? নাকি ভাগ্য?",
      fr: "Al-Khidr? Ou le Destin?",
      zh: "海迪尔？还是命运？",
      it: "Al-Khidr? O il Destino?",
      ja: "アル・ヒドル？それとも運命？",
      ko: "알-히드르? 아니면 운명?"
    },
    description: {
      ar: "قصة رائعة عن الخضر عليه السلام وتأثير القدر في حياتنا",
      en: "A wonderful story about Al-Khidr (peace be upon him) and the impact of destiny in our lives",
      tr: "Hızır (aleyhisselam) ve kaderin hayatımızdaki etkisi hakkında harika bir hikaye",
      ur: "خضر علیہ السلام اور تقدیر کے ہماری زندگی میں اثرات کی شاندار کہانی",
      id: "Kisah menakjubkan tentang Al-Khidr (alaihissalam) dan dampak takdir dalam hidup kita",
      ms: "Kisah menakjubkan tentang Al-Khidr (alaihissalam) dan kesan takdir dalam hidup kita",
      bn: "আল-খিদর (আলাইহিস সালাম) এবং আমাদের জীবনে ভাগ্যের প্রভাব সম্পর্কে বিস্ময়কর গল্প",
      fr: "Une histoire merveilleuse sur Al-Khidr (paix sur lui) et l'impact du destin dans nos vies",
      zh: "关于海迪尔（愿他安息）和命运在我们生活中影响的精彩故事",
      it: "Una storia meravigliosa su Al-Khidr (pace su di lui) e l'impatto del destino nelle nostre vite",
      ja: "アル・ヒドル（彼に平安あれ）と運命が私たちの生活に与える影響についての素晴らしい物語",
      ko: "알-히드르(그에게 평화가 있기를)와 운명이 우리 삶에 미치는 영향에 대한 훌륭한 이야기"
    }
  },
  {
    fileName: "في رحاب سورة الشورى .pdf",
    title: {
      ar: "في رحاب سورة الشورى",
      en: "In the Realm of Surah Ash-Shura",
      tr: "Şura Suresi'nin Diyarında",
      ur: "سورہ الشوریٰ کے دائرے میں",
      id: "Dalam Lingkup Surat Ash-Shura",
      ms: "Dalam Lingkup Surah Ash-Shura",
      bn: "সূরা আশ-শুরার রাজ্যে",
      fr: "Dans le Royaume de la Sourate Ash-Shura",
      zh: "在协商章的世界里",
      it: "Nel Regno della Sura Ash-Shura",
      ja: "相談章の領域で",
      ko: "협의 장의 영역에서"
    },
    description: {
      ar: "تأملات عميقة في سورة الشورى ومعانيها العظيمة",
      en: "Deep reflections on Surah Ash-Shura and its great meanings",
      tr: "Şura Suresi ve büyük anlamları üzerine derin düşünceler",
      ur: "سورہ الشوریٰ اور اس کے عظیم معانی پر گہرے تفکرات",
      id: "Renungan mendalam tentang Surat Ash-Shura dan makna-makna agungnya",
      ms: "Renungan mendalam tentang Surah Ash-Shura dan makna-makna agungnya",
      bn: "সূরা আশ-শুরা এবং এর মহান অর্থ সম্পর্কে গভীর চিন্তাভাবনা",
      fr: "Réflexions profondes sur la Sourate Ash-Shura et ses grandes significations",
      zh: "对协商章及其伟大意义的深刻反思",
      it: "Riflessioni profonde sulla Sura Ash-Shura e i suoi grandi significati",
      ja: "相談章とその偉大な意味についての深い考察",
      ko: "협의 장과 그 위대한 의미에 대한 깊은 성찰"
    }
  },
  {
    fileName: "وقفات مع سورة الجن .pdf",
    title: {
      ar: "وقفات مع سورة الجن",
      en: "Moments with Surah Al-Jinn",
      tr: "Cin Suresi ile Anlar",
      ur: "سورہ الجن کے ساتھ لمحات",
      id: "Momen-momen dengan Surat Al-Jinn",
      ms: "Detik-detik dengan Surah Al-Jinn",
      bn: "জিন সূরার সাথে মুহূর্ত",
      fr: "Moments avec la Sourate Al-Jinn",
      zh: "与精灵章的时刻",
      it: "Momenti con la Sura Al-Jinn",
      ja: "ジン章との瞬間",
      ko: "진 장과의 순간들"
    },
    description: {
      ar: "وقفات تأملية مع سورة الجن وأسرار عالم الجن",
      en: "Contemplative moments with Surah Al-Jinn and the secrets of the jinn world",
      tr: "Cin Suresi ve cin dünyasının sırları ile düşünceli anlar",
      ur: "سورہ الجن اور جنوں کی دنیا کے رازوں کے ساتھ فکری لمحات",
      id: "Momen-momen kontemplatif dengan Surat Al-Jinn dan rahasia dunia jin",
      ms: "Detik-detik kontemplatif dengan Surah Al-Jinn dan rahsia dunia jin",
      bn: "জিন সূরা এবং জিন বিশ্বের রহস্যের সাথে চিন্তাশীল মুহূর্ত",
      fr: "Moments contemplatifs avec la Sourate Al-Jinn et les secrets du monde des djinns",
      zh: "与精灵章的沉思时刻和精灵世界的秘密",
      it: "Momenti contemplativi con la Sura Al-Jinn e i segreti del mondo dei jinn",
      ja: "ジン章とジンの世界の秘密との瞑想的な瞬間",
      ko: "진 장과 진 세계의 비밀과 함께하는 명상적 순간들"
    }
  },
  {
    fileName: "وقفات مع سورة النمل .pdf",
    title: {
      ar: "وقفات مع سورة النمل",
      en: "Moments with Surah An-Naml",
      tr: "Neml Suresi ile Anlar",
      ur: "سورہ النمل کے ساتھ لمحات",
      id: "Momen-momen dengan Surat An-Naml",
      ms: "Detik-detik dengan Surah An-Naml",
      bn: "নমল সূরার সাথে মুহূর্ত",
      fr: "Moments avec la Sourate An-Naml",
      zh: "与蚂蚁章的时刻",
      it: "Momenti con la Sura An-Naml",
      ja: "アン・ナムル章との瞬間",
      ko: "개미 장과의 순간들"
    },
    description: {
      ar: "وقفات تأملية مع سورة النمل وقصة سليمان عليه السلام",
      en: "Contemplative moments with Surah An-Naml and the story of Solomon (peace be upon him)",
      tr: "Neml Suresi ve Süleyman (aleyhisselam) hikayesi ile düşünceli anlar",
      ur: "سورہ النمل اور سلیمان علیہ السلام کی کہانی کے ساتھ فکری لمحات",
      id: "Momen-momen kontemplatif dengan Surat An-Naml dan kisah Sulaiman (alaihissalam)",
      ms: "Detik-detik kontemplatif dengan Surah An-Naml dan kisah Sulaiman (alaihissalam)",
      bn: "নমল সূরা এবং সুলাইমান (আলাইহিস সালাম) এর গল্পের সাথে চিন্তাশীল মুহূর্ত",
      fr: "Moments contemplatifs avec la Sourate An-Naml et l'histoire de Salomon (paix sur lui)",
      zh: "与蚂蚁章和所罗门（愿他安息）故事的沉思时刻",
      it: "Momenti contemplativi con la Sura An-Naml e la storia di Salomone (pace su di lui)",
      ja: "アン・ナムル章とソロモン（彼に平安あれ）の物語との瞑想的な瞬間",
      ko: "개미 장과 솔로몬(그에게 평화가 있기를)의 이야기와 함께하는 명상적 순간들"
    }
  }
];

export default function QuranStoriesSection() {
  const { t, locale } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<QuranStory | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Convert actual PDF files to QuranStory format
  const quranStories: QuranStory[] = actualPdfFiles.map((file, index) => ({
    id: `story-${index + 1}`,
    title: file.title,
    description: file.description,
    pdfUrl: `/stories/${encodeURIComponent(file.fileName)}`,
    fileName: file.fileName,
    pages: Math.floor(Math.random() * 20) + 10, // Random pages between 10-30
    readingTime: `${Math.floor(Math.random() * 10) + 5} min` // Random time between 5-15 min
  }));

  const handleStoryClick = (story: QuranStory) => {
    setSelectedStory(story);
    setPdfPreviewUrl(story.pdfUrl);
    setIsPreviewOpen(true);
  };

  const handleDownload = (story: QuranStory) => {
    const link = document.createElement('a');
    link.href = story.pdfUrl;
    link.download = story.fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewInBrowser = (story: QuranStory) => {
    window.open(story.pdfUrl, '_blank');
  };

  if (!mounted) {
    return (
      <section id="quran-stories" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-islamic-gold" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                {t("quran_stories.title")}
              </h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t("quran_stories.description")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quran-stories" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text leading-tight py-2">
              {mounted && t("quran_stories.title") !== "quran_stories.title" ? t("quran_stories.title") : "قصص القرآن الكريم"}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t("quran_stories.description")}
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {quranStories.map((story) => (
            <div
              key={story.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-islamic-gold"
            >
              {/* PDF Preview */}
              <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                {/* Try PDF.js thumbnail first, fallback to object tag */}
                <div className="absolute inset-0">
                  <PDFThumbnail
                    pdfUrl={story.pdfUrl}
                    className="w-full h-full"
                    width={400}
                    height={192}
                  />
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleStoryClick(story)}
                      className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{t("quran_stories.preview")}</span>
                    </button>
                    <button
                      onClick={() => handleViewInBrowser(story)}
                      className="bg-islamic-gold text-white px-4 py-2 rounded-full hover:bg-islamic-green transition-colors duration-200 flex items-center space-x-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{t("quran_stories.read")}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-islamic-gold fill-current" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {t("quran_stories.featured_story")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                    <Heart className="w-4 h-4" />
                    <span>{story.pages} {mounted && t("quran_stories.pages") !== "quran_stories.pages" ? t("quran_stories.pages") : "صفحة"}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {story.title[locale as keyof typeof story.title] || story.title.ar}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {story.description[locale as keyof typeof story.description] || story.description.ar}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{story.readingTime?.replace('min', mounted && t("quran_stories.reading_time") !== "quran_stories.reading_time" ? t("quran_stories.reading_time") : "دقيقة") || "5 دقيقة"}</span>
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleDownload(story)}
                    className="bg-gradient-to-r from-islamic-gold to-islamic-green text-white px-6 py-3 rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 flex items-center space-x-2 text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t("quran_stories.download")}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Modal with PDF Viewer */}
        {isPreviewOpen && selectedStory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedStory.title[locale as keyof typeof selectedStory.title] || selectedStory.title.ar}
                </h3>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                {/* PDF Preview - Use react-pdf viewer */}
                <div className="rounded-2xl mb-4 overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  {pdfPreviewUrl ? (
                    <PDFViewer pdfUrl={pdfPreviewUrl} className="w-full" />
                  ) : (
                    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <FileText className="w-20 h-20 mx-auto mb-4 text-islamic-gold" />
                        <p>Loading PDF preview...</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Story Info */}
                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {selectedStory.title[locale as keyof typeof selectedStory.title] || selectedStory.title.ar}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {selectedStory.description[locale as keyof typeof selectedStory.description] || selectedStory.description.ar}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span>{selectedStory.pages} {mounted && t("quran_stories.pages") !== "quran_stories.pages" ? t("quran_stories.pages") : "صفحة"}</span>
                    <span>•</span>
                    <span>{selectedStory.readingTime?.replace('min', mounted && t("quran_stories.reading_time") !== "quran_stories.reading_time" ? t("quran_stories.reading_time") : "دقيقة") || "5 دقيقة"}</span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleViewInBrowser(selectedStory)}
                    className="flex-1 bg-gradient-to-r from-islamic-gold to-islamic-green text-white px-6 py-3 rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>{locale === 'ar' ? 'فتح في المتصفح' : 'Open in Browser'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload(selectedStory)}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
                  >
                    <Download className="w-5 h-5" />
                    <span>{t("quran_stories.download")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}