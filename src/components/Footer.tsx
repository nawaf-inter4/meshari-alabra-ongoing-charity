"use client";

import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "./LanguageProvider";
import { Heart, Share2, Github } from "lucide-react";
import ShareModal from "./ShareModal";

export default function Footer() {
  const { t, locale, direction } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  // Safety check for direction
  const safeDirection = direction || 'ltr';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize translations to prevent unnecessary re-renders
  const memoizedTranslations = useMemo(() => ({
    memorialName: t("memorial.name"),
    memorialDeath: t("memorial.death"),
    footerDescription: t("footer.description"),
    share: t("share"),
    socialXAccount: t("social.x_account"),
    socialGithub: t("social.github"),
    footerCharity: t("footer.charity"),
    footerAllRights: t("footer.all_rights"),
    footerTechnology: t("footer.technology"),
    footerSitemap: t("footer.sitemap"),
    footerLlmTxt: t("footer.llm_txt")
  }), [t]);
  
  // Get current year - using static year to avoid PPR issues
  const currentYear = "2025";
  
  // Fallback function for translations
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  // Get Quran verse with proper fallbacks
  const getQuranVerse = (part: 'bismillah' | 'verse' | 'sadaqallah') => {
    if (!mounted) {
      // Show fallback during SSR
      if (part === 'bismillah') {
        return locale === 'ar' ? "بسم الله الرحمن الرحيم" : "In the name of Allah, the Most Gracious, the Most Merciful";
      } else if (part === 'verse') {
        return locale === 'ar' 
          ? "وَبَشِّرِ الصَّابِرِينَ الَّذِينَ إِذَا أَصَابَتْهُمْ مُصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ أُوْلَئِكَ عَلَيْهِمْ صَلَوَاتٌ مِنْ رَبِّهِمْ وَرَحْمَةٌ وَأُوْلَئِكَ هُمُ الْمُهْتَدُونَ"
          : "And give good tidings to the patient, who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.' Those are the ones upon whom are blessings from their Lord and mercy. And it is those who are the [rightly] guided.";
      } else {
        return locale === 'ar' ? "صدق الله العلي العظيم" : "Allah Almighty has spoken the truth";
      }
    }

    const translation = t(`quran_verse.${part}`);
    if (translation === `quran_verse.${part}`) {
      // Translation not found, use fallback based on locale
      if (part === 'bismillah') {
        return locale === 'ar' ? "بسم الله الرحمن الرحيم" : 
               locale === 'ko' ? "자비로우시고 자애로우신 알라의 이름으로" :
               locale === 'tr' ? "Rahman ve Rahim olan Allah'ın adıyla" :
               locale === 'ur' ? "اللہ کے نام سے جو بڑا مہربان نہایت رحم والا" :
               locale === 'id' ? "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang" :
               locale === 'ms' ? "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang" :
               locale === 'bn' ? "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে" :
               locale === 'fr' ? "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux" :
               locale === 'zh' ? "奉至仁至慈的真主之名" :
               locale === 'it' ? "Nel nome di Allah, il Compassionevole, il Misericordioso" :
               locale === 'ja' ? "慈悲深く慈愛あまねきアッラーの御名において" :
               "In the name of Allah, the Most Gracious, the Most Merciful";
      } else if (part === 'verse') {
        return locale === 'ar' ? "وَبَشِّرِ الصَّابِرِينَ الَّذِينَ إِذَا أَصَابَتْهُمْ مُصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ أُوْلَئِكَ عَلَيْهِمْ صَلَوَاتٌ مِنْ رَبِّهِمْ وَرَحْمَةٌ وَأُوْلَئِكَ هُمُ الْمُهْتَدُونَ" :
               locale === 'ko' ? "그리고 인내하는 자들에게 복음을 전하라. 그들이 재앙을 당했을 때 '우리는 알라에게 속하며 우리는 그에게로 돌아간다'고 말하는 자들이다. 그들은 주님으로부터 축복과 자비를 받는 자들이며, 그들이 바로 올바르게 인도받은 자들이다." :
               locale === 'tr' ? "Sabırlılara müjde ver. Onlar başlarına bir musibet geldiğinde 'Biz Allah'a aidiz ve O'na döneceğiz' derler. İşte onlar Rablerinden bereket ve rahmete nail olanlardır ve onlar doğru yolda olanlardır." :
               locale === 'ur' ? "اور صبر کرنے والوں کو خوشخبری دو جو جب ان پر کوئی مصیبت آتی ہے تو کہتے ہیں کہ ہم اللہ کے ہیں اور ہمیں اسی کی طرف لوٹنا ہے۔ یہی لوگ ہیں جن پر ان کے رب کی طرف سے برکات اور رحمت ہے اور یہی ہدایت یافتہ ہیں۔" :
               locale === 'id' ? "Dan berikanlah kabar gembira kepada orang-orang yang sabar, yang apabila ditimpa musibah, mereka mengucapkan: 'Innaa lillaahi wa innaa ilaihi raaji'uun' (sesungguhnya kami milik Allah dan kepada-Nyalah kami kembali). Mereka itulah yang mendapat keberkahan dan rahmat dari Tuhan mereka, dan mereka itulah orang-orang yang mendapat petunjuk." :
               locale === 'ms' ? "Dan berikanlah khabar gembira kepada orang-orang yang sabar, yang apabila ditimpa musibah, mereka mengucapkan: 'Innaa lillaahi wa innaa ilaihi raaji'uun' (sesungguhnya kami milik Allah dan kepada-Nyalah kami kembali). Mereka itulah yang mendapat keberkahan dan rahmat dari Tuhan mereka, dan mereka itulah orang-orang yang mendapat petunjuk." :
               locale === 'bn' ? "এবং ধৈর্যশীলদের সুসংবাদ দাও, যারা যখন তাদের উপর বিপদ আসে তখন বলে, 'নিশ্চয়ই আমরা আল্লাহর জন্য এবং নিশ্চয়ই আমরা তাঁর কাছে ফিরে যাব।' তারাই যাদের উপর তাদের রবের পক্ষ থেকে বরকত ও রহমত রয়েছে এবং তারাই হিদায়াতপ্রাপ্ত।" :
               locale === 'fr' ? "Et annonce la bonne nouvelle aux patients, qui, quand un malheur les atteint, disent : 'Nous appartenons à Allah et c'est vers Lui que nous retournerons.' Ce sont eux qui reçoivent les bénédictions et la miséricorde de leur Seigneur, et ce sont eux les bien guidés." :
               locale === 'zh' ? "你当向坚忍的人报喜。他们遭难的时候，说：'我们确是真主所有的，我们必定只归依他。'这等人，是蒙主的慈恩和佑护的；这等人，确是遵循正道的。" :
               locale === 'it' ? "E da' la buona novella ai pazienti, che quando li colpisce una disgrazia dicono: 'In verità apparteniamo ad Allah e a Lui faremo ritorno.' Essi sono quelli su cui scendono benedizioni e misericordia dal loro Signore, e sono quelli che sono ben guidati." :
               locale === 'ja' ? "そして忍耐する者たちに吉報を伝えよ。災難が彼らに降りかかった時、彼らは言う：'私たちはアッラーに属し、私たちは彼に帰る。'これらは主からの祝福と慈悲を受ける者たちであり、これらは正しく導かれた者たちである。" :
               "And give good tidings to the patient, who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.' Those are the ones upon whom are blessings from their Lord and mercy. And it is those who are the [rightly] guided.";
      } else {
        return locale === 'ar' ? "صدق الله العلي العظيم" :
               locale === 'ko' ? "알라 지고하고 위대하신 분이 진실을 말씀하셨다" :
               locale === 'tr' ? "Allah yüce ve büyük olan doğru söyledi" :
               locale === 'ur' ? "اللہ تعالیٰ نے سچ فرمایا" :
               locale === 'id' ? "Allah Yang Maha Tinggi dan Maha Agung telah berfirman dengan benar" :
               locale === 'ms' ? "Allah Yang Maha Tinggi dan Maha Agung telah berfirman dengan benar" :
               locale === 'bn' ? "আল্লাহ সর্বোচ্চ এবং মহান সত্য বলেছেন" :
               locale === 'fr' ? "Allah le Très-Haut et le Très-Grand a dit la vérité" :
               locale === 'zh' ? "至高至大的真主说了实话" :
               locale === 'it' ? "Allah l'Altissimo e il Grandissimo ha detto la verità" :
               locale === 'ja' ? "アッラー、至高にして偉大なる方が真実を語られた" :
               "Allah Almighty has spoken the truth";
      }
    }
    
    return translation;
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <footer className="py-12 px-4 bg-light-secondary dark:bg-dark-secondary border-t-2 border-islamic-gold/30">
      <div className="max-w-6xl mx-auto">
        {/* Memorial */}
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-islamic-gold mx-auto mb-4" fill="currentColor" />
          <h3 className="text-2xl md:text-3xl font-bold mb-2 gradient-text leading-tight py-1">
            {memoizedTranslations.memorialName}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {memoizedTranslations.memorialDeath}
          </p>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto text-islamic-green dark:text-islamic-gold">
            {memoizedTranslations.footerDescription}
          </p>
        </div>

        {/* Separator */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-islamic-gold to-transparent" />

        {/* Share Button and Social Links */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-6 py-3 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300 hover:scale-105"
            >
              <Share2 className="w-5 h-5" />
              {memoizedTranslations.share}
            </button>
            
            {/* Share Modal */}
            <ShareModal
              isOpen={isShareModalOpen}
              onClose={() => setIsShareModalOpen(false)}
              mode="website"
            />
            
            <a
              href="https://x.com/alabrameshari"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white font-bold rounded-full hover:bg-blue-500 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              {memoizedTranslations.socialXAccount}
            </a>
            
            <a
              href="https://github.com/nawaf-inter4/meshari-alabra-ongoing-charity"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
            >
              <Github className="w-5 h-5" />
              {memoizedTranslations.socialGithub}
            </a>
          </div>
        </div>

        {/* Quranic Verse */}
        <div className="text-center mb-8">
          <div className="space-y-4">
            {/* Bismillah */}
            <p className={`text-xl md:text-2xl ${safeDirection === 'rtl' ? 'font-arabic' : ''} text-islamic-gold dark:text-islamic-green leading-relaxed`}>
              {getQuranVerse('bismillah')}
            </p>
            
            {/* Quran Verse */}
            <p className={`text-2xl md:text-3xl ${safeDirection === 'rtl' ? 'font-arabic' : ''} text-islamic-green dark:text-islamic-gold leading-loose max-w-4xl mx-auto`}>
              {getQuranVerse('verse')}
            </p>
            
            {/* Sadaqallah */}
            <p className={`text-lg md:text-xl ${safeDirection === 'rtl' ? 'font-arabic' : ''} text-islamic-gold dark:text-islamic-green leading-relaxed`}>
              {getQuranVerse('sadaqallah')}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-2">{memoizedTranslations.footerCharity}</p>
          <p>{memoizedTranslations.footerAllRights.replace(/\{\{year\}\}/g, currentYear)}</p>
          <p className="mt-4 text-xs">
            {memoizedTranslations.footerTechnology}
          </p>
          <div className="mt-2 text-xs flex justify-center gap-4">
            <a href="/sitemap.xml" className="text-islamic-gold hover:text-islamic-green transition-colors">
              {memoizedTranslations.footerSitemap}
            </a>
            <a href="/llm.txt" className="text-islamic-gold hover:text-islamic-green transition-colors">
              {memoizedTranslations.footerLlmTxt}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
