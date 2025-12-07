"use client";

import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { Heart, Star, FileText } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const { t, direction, locale } = useLanguage();
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [starKey, setStarKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Regenerate stars when language changes
  useEffect(() => {
    setStarKey(prev => prev + 1);
  }, [direction]);

  // Generate star positions
  const generateStarPositions = () => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * (dimensions.width - 100) + 50, // Keep stars within bounds
      y: Math.random() * (dimensions.height - 100) + 50, // Keep stars within bounds
      delay: i * 0.2,
    }));
  };

  const [starPositions, setStarPositions] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    setMounted(true);
    setStarPositions(generateStarPositions());
  }, []);

  useEffect(() => {
    if (mounted) {
      setStarPositions(generateStarPositions());
    }
  }, [dimensions, direction, starKey, mounted]);

  // Get Quran verse with proper fallbacks (same as Footer)
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

  const safeDirection = direction || 'ltr';

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-4 pt-28 pb-20 sm:pt-32 md:pt-28" 
      style={{ paddingTop: 'max(7rem, env(safe-area-inset-top, 7rem))' }}
      suppressHydrationWarning
    >
      {/* Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {starPositions.map((star) => (
          <motion.div
            key={`${starKey}-${star.id}`}
            className="absolute motion-safe"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 1],
              scale: [0, 1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              delay: star.delay,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: Math.random() * 3 + 2,
              ease: "easeInOut",
            }}
            style={{
              transform: `translate3d(${star.x}px, ${star.y}px, 0)`,
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <Star 
              size={Math.random() * 3 + 1} 
              className="text-islamic-gold/60 fill-current" 
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Memorial Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="bg-light-secondary/80 dark:bg-dark-secondary/80 backdrop-blur-lg rounded-2xl p-8 border-2 border-islamic-gold/30 glow motion-safe"
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          suppressHydrationWarning
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3" suppressHydrationWarning>
            {mounted ? t("memorial.name") : (locale === 'ar' ? "مشاري بن أحمد بن سليمان العبره" : "Meshari Ahmed Sulaiman Alabra")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4" suppressHydrationWarning>
            {mounted ? t("memorial.death") : (locale === 'ar' ? "توفي في 29 مارس 2023 - رحمه الله" : "Passed away on March 29, 2023 - May Allah have mercy on him")}
          </p>
          <p className="text-xl text-islamic-green dark:text-islamic-gold leading-relaxed mb-6" suppressHydrationWarning>
            {mounted ? t("hero.description") : (locale === 'ar' ? "صفحة مخصصة لأخي مشاري، توفي إثر مرض سرطان الدماغ. اللهم اغفر له وارحمه واجعل القرآن والصدقة الجارية شفيعاً له" : "A page dedicated to my brother Meshari, who passed away from brain cancer. O Allah, forgive him, have mercy on him, and make the Quran and ongoing charity intercede for him")}
          </p>

          {/* Supplications Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <a
              href="/mehsari (دعاء).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-islamic-gold to-islamic-green text-white font-semibold rounded-full hover:from-islamic-green hover:to-islamic-blue transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FileText className="w-5 h-5" />
              <span>{t("hero.supplications_button")}</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Quranic Verse - Same as Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <div className="space-y-6">
            {/* Bismillah */}
            <p className={`text-xl md:text-2xl ${safeDirection === 'rtl' ? 'font-arabic' : ''} text-islamic-gold dark:text-islamic-green leading-relaxed`}>
              {getQuranVerse('bismillah')}
            </p>
            
            {/* Quran Verse */}
            <p className={`text-2xl md:text-3xl ${safeDirection === 'rtl' ? 'font-arabic' : ''} text-islamic-green dark:text-islamic-gold leading-[2.5] max-w-4xl mx-auto`} style={{ lineHeight: '2.5' }}>
              {getQuranVerse('verse')}
            </p>
            
            {/* Sadaqallah */}
            <p className={`text-lg md:text-xl ${safeDirection === 'rtl' ? 'font-arabic' : ''} text-islamic-gold dark:text-islamic-green leading-relaxed`}>
              {getQuranVerse('sadaqallah')}
            </p>
          </div>
        </motion.div>

        {/* Scroll Down Icon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <div className="w-4 h-6 border border-islamic-gold dark:border-islamic-gold rounded-full flex items-center justify-center animate-bounce">
            <div className="w-0.5 h-3 bg-islamic-gold dark:bg-islamic-gold"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}