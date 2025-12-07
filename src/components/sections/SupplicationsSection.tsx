"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { BookOpen, Sunrise, Sunset, Heart, Shield, Home, Car, Briefcase, Users, Star, Moon, Sun, Compass, ShieldCheck, HeartHandshake, MoonStar } from "lucide-react";

interface Supplication {
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
}

export default function SupplicationsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("deceased");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Fallback function for translations
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  const supplications = {
    deceased: [
      {
        arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ",
        transliteration: "Allāhumma-ghfir lahu warhamhu wa ʿāfihi waʿfu ʿanhu, wa akrim nuzulahu, wa wassiʿ mudkhalahu, waghsilhu bil-māʾi wath-thalji wal-barad, wa naqqihi minal-khaṭāyā kamā naqqayta-th-thawb al-abyaḍ min ad-danas",
        translation: getTranslation("supplications.deceased_1", "O Allah, forgive him, have mercy on him, grant him well-being, pardon him, honor his arrival, expand his entrance, wash him with water, snow and hail, and cleanse him of sins as You cleanse a white garment of dirt"),
        reference: "Sahih Muslim 963"
      },
      {
        arabic: "اللَّهُمَّ اجْعَلْ قَبْرَهُ رَوْضَةً مِنْ رِيَاضِ الْجَنَّةِ، وَلَا تَجْعَلْهُ حُفْرَةً مِنْ حُفَرِ النَّارِ",
        transliteration: "Allāhumma-jʿal qabrahu rawḍatan min riyāḍ al-jannah, wa lā tajʿalhu ḥufratan min ḥufar an-nār",
        translation: getTranslation("supplications.deceased_2", "O Allah, make his grave a garden from the gardens of Paradise, and do not make it a pit from the pits of Hell"),
        reference: "At-Tirmidhi"
      },
      {
        arabic: "اللَّهُمَّ أَبْدِلْهُ دَاراً خَيْراً مِنْ دَارِهِ، وَأَهْلاً خَيْراً مِنْ أَهْلِهِ، وَأَدْخِلْهُ الْجَنَّةَ وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ وَمِنْ عَذَابِ النَّارِ",
        transliteration: "Allāhumma abdilhu dāran khayran min dārihi, wa ahlan khayran min ahlihi, wa adkhilhu-l-jannah wa aʿidhhu min ʿadhāb al-qabr wa min ʿadhāb an-nār",
        translation: getTranslation("supplications.deceased_3", "O Allah, give him a better home than his home, and better family than his family, and admit him to Paradise and protect him from the punishment of the grave and the punishment of Hell"),
        reference: "Sahih Muslim 963"
      },
      {
        arabic: "اللَّهُمَّ ثَبِّتْهُ عَلَى الْقَوْلِ الثَّابِتِ فِي الْحَيَاةِ الدُّنْيَا وَفِي الْآخِرَةِ",
        transliteration: "Allāhumma thabbit-hu ʿalā-l-qawli-th-thābiti fil-ḥayāti-d-dunyā wa fil-ākhirah",
        translation: getTranslation("supplications.deceased_4", "O Allah, make him firm on the word of truth in this life and in the Hereafter"),
        reference: "Sahih al-Bukhari 1362"
      }
    ],
    morning: [
      {
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "Aṣbaḥnā wa aṣbaḥa-l-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illā-llāhu waḥdahu lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamdu wa huwa ʿalā kulli shay'in qadīr",
        translation: getTranslation("supplications.morning_1", "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah. There is no deity except Allah, alone, without a partner. To Him belongs the dominion and to Him belongs all praise, and He has power over everything"),
        reference: "Abu Dawud 5071"
      },
      {
        arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
        transliteration: "Allāhumma bika aṣbaḥnā, wa bika amsaynā, wa bika naḥyā, wa bika namūtu, wa ilayka-n-nushūr",
        translation: getTranslation("supplications.morning_2", "O Allah, by You we reach the morning, by You we reach the evening, by You we live, by You we die, and to You is the return"),
        reference: "At-Tirmidhi 3391"
      },
      {
        arabic: "اللَّهُمَّ أَصْبَحْنَا نُشْهِدُكَ وَنُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ",
        transliteration: "Allāhumma aṣbaḥnā nushhiduka wa nushhidu ḥamalata ʿarshika wa malāʾikataka wa jamīʿa khalqika annaka anta-llāhu lā ilāha illā anta waḥdaka lā sharīka laka wa anna Muḥammadan ʿabduka wa rasūluka",
        translation: getTranslation("supplications.morning_3", "O Allah, we have reached the morning and we bear witness to You and to the bearers of Your Throne and Your angels and all Your creation that You are Allah, there is no deity except You alone, You have no partner, and that Muhammad is Your servant and Your Messenger"),
        reference: "Abu Dawud 5077"
      }
    ],
    evening: [
      {
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "Amsaynā wa amsā-l-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illā-llāhu waḥdahu lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamdu wa huwa ʿalā kulli shay'in qadīr",
        translation: getTranslation("supplications.evening_1", "We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is for Allah. There is no deity except Allah, alone, without a partner. To Him belongs the dominion and to Him belongs all praise, and He has power over everything"),
        reference: "Abu Dawud 5071"
      },
      {
        arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
        transliteration: "Allāhumma bika amsaynā, wa bika aṣbaḥnā, wa bika naḥyā, wa bika namūtu, wa ilayka-l-maṣīr",
        translation: getTranslation("supplications.evening_2", "O Allah, by You we reach the evening, by You we reach the morning, by You we live, by You we die, and to You is the destination"),
        reference: "At-Tirmidhi 3391"
      }
    ],
    protection: [
      {
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        transliteration: "Aʿūdhu bi-kalimāti-llāhi-t-tāmmāti min sharri mā khalaq",
        translation: getTranslation("supplications.protection_1", "I seek refuge in the perfect words of Allah from the evil of what He has created"),
        reference: "Sahih Muslim 2708"
      },
      {
        arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        transliteration: "Bismi-llāhi-lladhī lā yaḍurru maʿa-smihi shay'un fil-arḍi wa lā fis-samāʾi wa huwa-s-samīʿu-l-ʿalīm",
        translation: getTranslation("supplications.protection_2", "In the name of Allah, with whose name nothing can harm on earth or in heaven, and He is the All-Hearing, All-Knowing"),
        reference: "Abu Dawud 5088"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنْ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنْ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
        transliteration: "Allāhumma innī aʿūdhu bika min al-hammi wal-ḥazan, wa aʿūdhu bika min al-ʿajzi wal-kasal, wa aʿūdhu bika min al-jubni wal-bukhl, wa aʿūdhu bika min ghalabati-d-dayn wa qahri-r-rijāl",
        translation: getTranslation("supplications.protection_3", "O Allah, I seek refuge in You from worry and grief, from incapacity and laziness, from cowardice and miserliness, from being overwhelmed by debt and from being overpowered by men"),
        reference: "Sahih al-Bukhari 6363"
      }
    ],
    travel: [
      {
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        transliteration: "Subḥāna-lladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn, wa innā ilā rabbinā la-munqalibūn",
        translation: getTranslation("supplications.travel_1", "Glory to Him who has subjected this to us, and we were not able to do it. And indeed, to our Lord we will return"),
        reference: "Sahih Muslim 1342"
      },
      {
        arabic: "اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الْأَهْلِ",
        transliteration: "Allāhumma hawwin ʿalaynā safaranā hādhā waṭwi ʿannā buʿdahu, Allāhumma anta-ṣ-ṣāḥibu fis-safari wal-khalīfatu fil-ahl",
        translation: getTranslation("supplications.travel_2", "O Allah, make this journey easy for us and make its distance short for us. O Allah, You are the companion on the journey and the successor in the family"),
        reference: "Sahih Muslim 1342"
      }
    ],
    family: [
      {
        arabic: "اللَّهُمَّ بَارِكْ لِي فِي أَوْلَادِي وَاحْفَظْهُمْ وَلَا تَضُرَّهُمْ",
        transliteration: "Allāhumma bārik lī fī awlādī waḥfaẓhum wa lā taḍurrahum",
        translation: getTranslation("supplications.family_1", "O Allah, bless me in my children and protect them and do not harm them"),
        reference: "Sahih al-Bukhari 1419"
      },
      {
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَاماً",
        transliteration: "Rabbana hab lanā min azwājinā wa dhurriyyātinā qurrata aʿyunin wa-jʿalnā lil-muttaqīna imāmā",
        translation: getTranslation("supplications.family_2", "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous"),
        reference: "Quran 25:74"
      }
    ],
    work: [
      {
        arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلاً، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً",
        transliteration: "Allāhumma lā sahlan illā mā jaʿaltahu sahlan, wa anta tajʿalu-l-ḥazna idhā shiʾta sahlan",
        translation: getTranslation("supplications.work_1", "O Allah, there is no ease except in what You have made easy, and You make the difficult easy if You will"),
        reference: "Sahih al-Bukhari 2670"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْماً نَافِعاً وَرِزْقاً طَيِّباً وَعَمَلاً مُتَقَبَّلاً",
        transliteration: "Allāhumma innī asʾaluka ʿilman nāfiʿan wa rizqan ṭayyiban wa ʿamalan mutaqabbalan",
        translation: getTranslation("supplications.work_2", "O Allah, I ask You for beneficial knowledge, good provision, and acceptable deeds"),
        reference: "Ibn Majah 925"
      }
    ],
    health: [
      {
        arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ",
        transliteration: "Allāhumma ʿāfinī fī badanī, Allāhumma ʿāfinī fī samʿī, Allāhumma ʿāfinī fī baṣarī, lā ilāha illā anta",
        translation: getTranslation("supplications.health_1", "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight. There is no deity except You"),
        reference: "Abu Dawud 5090"
      },
      {
        arabic: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَماً",
        transliteration: "Allāhumma rabba-n-nās, adhhibi-l-baʾs, ishfi wa anta-sh-shāfī, lā shifāʾa illā shifāʾuka, shifāʾan lā yughādiru saqamā",
        translation: getTranslation("supplications.health_2", "O Allah, Lord of the people, remove the difficulty, heal, for You are the Healer. There is no healing except Your healing, a healing that leaves no illness"),
        reference: "Sahih al-Bukhari 5742"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ وَالْجُنُونِ وَالْجُذَامِ وَمِنْ سَيِّئِ الْأَسْقَامِ",
        transliteration: "Allāhumma innī aʿūdhu bika min al-baraṣi wal-junūni wal-judhāmi wa min sayyiʾi-l-asqām",
        translation: getTranslation("supplications.health_3", "O Allah, I seek refuge in You from leprosy, madness, and leprosy, and from evil diseases"),
        reference: "Abu Dawud 1554"
      }
    ],
    guidance: [
      {
        arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
        transliteration: "Allāhumma-hdinī wa saddidnī",
        translation: getTranslation("supplications.guidance_1", "O Allah, guide me and make me steadfast"),
        reference: "Sahih Muslim 2725"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
        transliteration: "Allāhumma innī asʾaluka-l-hudā wa-t-tuqā wal-ʿafāfa wal-ghinā",
        translation: getTranslation("supplications.guidance_2", "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency"),
        reference: "Sahih Muslim 2721"
      },
      {
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbana ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā ʿadhāba-n-nār",
        translation: getTranslation("supplications.guidance_3", "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire"),
        reference: "Quran 2:201"
      }
    ],
    forgiveness: [
      {
        arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلَانِيَتَهُ وَسِرَّهُ",
        transliteration: "Allāhumma-ghfir lī dhanbī kullahu, diqqahu wa jillahu, wa awwalahu wa ākhirahu, wa ʿalāniyatahu wa sirrahu",
        translation: getTranslation("supplications.forgiveness_1", "O Allah, forgive me all my sins, small and large, first and last, open and secret"),
        reference: "Sahih Muslim 483"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْماً كَثِيراً وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ",
        transliteration: "Allāhumma innī ẓalamtu nafsī ẓulman kathīran wa lā yaghfiru-dh-dhunūba illā anta, fa-ghfir lī maghfiratan min ʿindika wa-rḥamnī innaka anta-l-ghafūru-r-raḥīm",
        translation: getTranslation("supplications.forgiveness_2", "O Allah, I have wronged myself greatly, and none forgives sins except You. So forgive me with forgiveness from You and have mercy on me. Indeed, You are the Forgiving, the Merciful"),
        reference: "Sahih al-Bukhari 834"
      }
    ],
    gratitude: [
      {
        arabic: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
        transliteration: "Allāhumma mā aṣbaḥa bī min niʿmatin aw bi-aḥadin min khalqika fa-minka waḥdaka lā sharīka laka, fa-laka-l-ḥamdu wa laka-sh-shukr",
        translation: getTranslation("supplications.gratitude_1", "O Allah, whatever blessing I or anyone of Your creation has received this morning is from You alone, You have no partner. To You belongs all praise and gratitude"),
        reference: "Abu Dawud 5074"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ أَنْ تَرْضَى عَنِّي",
        transliteration: "Allāhumma innī asʾaluka an tarḍā ʿannī",
        translation: getTranslation("supplications.gratitude_2", "O Allah, I ask You to be pleased with me"),
        reference: "At-Tirmidhi 3556"
      }
    ],
    sleep: [
      {
        arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
        transliteration: "Allāhumma bismika amūtu wa aḥyā",
        translation: getTranslation("supplications.sleep_1", "O Allah, in Your name I die and live"),
        reference: "Sahih al-Bukhari 6324"
      },
      {
        arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
        transliteration: "Allāhumma qinī ʿadhābaka yawma tabʿathu ʿibādaka",
        translation: getTranslation("supplications.sleep_2", "O Allah, protect me from Your punishment on the day You resurrect Your servants"),
        reference: "Abu Dawud 5042"
      }
    ],
    waking: [
      {
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        transliteration: "Al-ḥamdu lillāhi-lladhī aḥyānā baʿda mā amātanā wa ilayhi-n-nushūr",
        translation: getTranslation("supplications.waking_1", "Praise be to Allah who has given us life after death, and to Him is the resurrection"),
        reference: "Sahih al-Bukhari 6312"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ وَأَنَّ مُحَمَّداً عَبْدُكَ وَرَسُولُكَ",
        transliteration: "Allāhumma innī aṣbaḥtu ushhiduka wa ushhidu ḥamalata ʿarshika wa malāʾikataka wa jamīʿa khalqika annaka anta-llāhu lā ilāha illā anta waḥdaka lā sharīka laka wa anna Muḥammadan ʿabduka wa rasūluka",
        translation: getTranslation("supplications.waking_2", "O Allah, I have reached the morning bearing witness to You and to the bearers of Your Throne and Your angels and all Your creation that You are Allah, there is no deity except You alone, You have no partner, and that Muhammad is Your servant and Your Messenger"),
        reference: "Abu Dawud 5077"
      }
    ]
  };

  const tabs = [
    { id: "deceased", label: mounted ? getTranslation("supplications.deceased", "للمتوفى") : "للمتوفى", icon: Heart },
    { id: "morning", label: mounted ? getTranslation("supplications.morning", "الصباح") : "الصباح", icon: Sunrise },
    { id: "evening", label: mounted ? getTranslation("supplications.evening", "المساء") : "المساء", icon: Sunset },
    { id: "protection", label: mounted ? getTranslation("supplications.protection", "الحماية") : "الحماية", icon: Shield },
    { id: "travel", label: mounted ? getTranslation("supplications.travel", "السفر") : "السفر", icon: Car },
    { id: "family", label: mounted ? getTranslation("supplications.family", "العائلة") : "العائلة", icon: Users },
    { id: "work", label: mounted ? getTranslation("supplications.work", "العمل") : "العمل", icon: Briefcase },
    { id: "health", label: mounted ? getTranslation("supplications.health", "الصحة") : "الصحة", icon: Star },
    { id: "guidance", label: mounted ? getTranslation("supplications.guidance", "الهداية") : "الهداية", icon: Compass },
    { id: "forgiveness", label: mounted ? getTranslation("supplications.forgiveness", "المغفرة") : "المغفرة", icon: ShieldCheck },
    { id: "gratitude", label: mounted ? getTranslation("supplications.gratitude", "الشكر") : "الشكر", icon: HeartHandshake },
    { id: "sleep", label: mounted ? getTranslation("supplications.sleep", "النوم") : "النوم", icon: Moon },
    { id: "waking", label: mounted ? getTranslation("supplications.waking", "الاستيقاظ") : "الاستيقاظ", icon: Sunrise },
  ];

  return (
    <section id="supplications" className="py-20 px-4 bg-light-secondary dark:bg-dark-secondary">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {mounted ? t("supplications.title") : "الأدعية"}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {mounted ? t("supplications.subtitle") : "أدعية من القرآن والسنة"}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex justify-center gap-2 mb-4 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-islamic-gold text-white shadow-lg scale-105"
                    : "bg-light dark:bg-dark hover:bg-islamic-gold/20 text-gray-700 dark:text-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Supplications */}
        <div className="space-y-6">
          {supplications[activeTab as keyof typeof supplications].map((dua, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="bg-light dark:bg-dark rounded-2xl p-6 md:p-8 border-2 border-islamic-gold/30 hover:border-islamic-gold transition-all duration-300 motion-safe"
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
            >
              <p 
                className="text-2xl md:text-3xl font-arabic text-right leading-loose mb-4 text-islamic-green dark:text-islamic-gold py-2 px-4" 
                style={{ 
                  lineHeight: '2.5', 
                  wordSpacing: '0.2em',
                  direction: 'rtl',
                  unicodeBidi: 'isolate',
                  fontFamily: "'Tajawal', 'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', sans-serif",
                  fontFeatureSettings: '"liga", "clig", "calt"'
                }}
              >
                {dua.arabic}
              </p>
              <p className="text-sm italic text-gray-600 dark:text-gray-400 mb-3">
                {dua.transliteration}
              </p>
              <p className="text-base leading-loose mb-3 py-2">
                {dua.translation}
              </p>
              <p className="text-sm text-islamic-blue dark:text-islamic-gold font-semibold">
                {dua.reference}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
