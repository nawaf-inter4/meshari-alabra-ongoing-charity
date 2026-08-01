import type { QuranStoryDefinition } from "./types";

/**
 * Quran stories metadata + indexable body copy.
 * Titles/descriptions live in locale JSON (`quran_stories.stories.{slug}.*`).
 * PDF URLs resolve via `resolveStoryPdf` (locale file or Arabic fallback).
 */
export const QURAN_STORIES: QuranStoryDefinition[] = [
  {
    slug: "al-khidr-or-destiny",
    pages: 3,
    surahNumber: 18,
    surahName: { ar: "الكهف", en: "Al-Kahf" },
    legacyArabicFileName: "الخضر؟ أم القَدَر ؟ .pdf",


    body: {
      ar: [
        "في رحلة موسى عليه السلام مع العبد الصالح الذي يذكره كثير من العلماء باسم الخضر، نتعلم أن ظاهر الأحداث قد يخفي حكمة بالغة لا تُدرك إلا بالصبر والتسليم.",
        "تعلّمنا القصة أن القدر يجري بحساب دقيق، وأن ما نظنه شراً قد يكون طريقاً إلى خير أعظم، وما نظنه خيراً قد يُختبر به صبرنا وإيماننا.",
        "هذه الوقفات تدعو القارئ إلى الثقة بالله، وحسن الظن بقضائه، والتأني قبل الحكم على ما يجري في الحياة اليومية.",
      ],
      en: [
        "In the journey of Moses (peace be upon him) with the righteous servant many scholars identify as Al-Khidr, we learn that the surface of events can hide profound wisdom that is only grasped through patience and trust.",
        "The story teaches that destiny unfolds with precise wisdom: what appears harmful may lead to a greater good, and what appears good may test our patience and faith.",
        "These reflections invite the reader to trust God, think well of His decree, and pause before judging the events of daily life.",
      ],
      ur: [
        "موسیٰ علیہ السلام کے اس سفر میں جو ایک نیک بندے کے ساتھ تھا—جسے بہت سے علماء خضر کہتے ہیں—ہم سیکھتے ہیں کہ واقعات کی ظاہری صورت کے پیچھے گہری حکمت ہو سکتی ہے جو صرف صبر اور سپردگی سے سمجھ آتی ہے۔",
        "یہ کہانی سکھاتی ہے کہ تقدیر ایک نازک حساب سے چلتی ہے: جو چیز نقصان نظر آئے وہ بڑے بھلائی کا راستہ بن سکتی ہے، اور جو فائدہ معلوم ہو وہ ہمارے صبر اور ایمان کی آزمائش بھی ہو سکتی ہے۔",
        "یہ تاملات قاری کو اللہ پر بھروسہ، اس کی تقدیر کے بارے میں حسن ظن، اور روزمرہ کے فیصلوں میں جلدی سے پرہیز کی دعوت دیتے ہیں۔",
      ],
      tr: [
        "Musa'nın (aleyhisselam) birçok âlimin Hızır olarak andığı salih kul ile yolculuğunda, olayların yüzeyinin ancak sabır ve teslimiyetle anlaşılan derin bir hikmeti gizleyebileceğini öğreniriz.",
        "Hikaye, kaderin ince bir hikmetle işlediğini öğretir: zarar gibi görünen bir şey daha büyük bir hayra yol açabilir; hayır gibi görünen bir şey de sabrımızı ve imanımızı imtihan edebilir.",
        "Bu düşünceler okuyucuyu Allah'a güvenmeye, O'nun takdirine hüsnüzan beslemeye ve günlük olayları yargılamadan önce durmaya davet eder.",
      ],
      id: [
        "Dalam perjalanan Musa (alaihissalam) bersama hamba saleh yang oleh banyak ulama disebut Al-Khidr, kita belajar bahwa permukaan peristiwa bisa menyembunyikan hikmah mendalam yang hanya dipahami dengan sabar dan tawakal.",
        "Kisah ini mengajarkan bahwa takdir berjalan dengan hikmah yang teliti: apa yang tampak buruk bisa menjadi jalan menuju kebaikan yang lebih besar, dan apa yang tampak baik bisa menjadi ujian kesabaran dan iman.",
        "Renungan ini mengajak pembaca untuk percaya kepada Allah, berbaik sangka terhadap ketetapan-Nya, dan menahan diri sebelum menilai peristiwa sehari-hari.",
      ],
      ms: [
        "Dalam perjalanan Musa (alaihissalam) bersama hamba soleh yang disebut ramai ulama sebagai Al-Khidr, kita belajar bahawa permukaan peristiwa boleh menyembunyikan hikmah mendalam yang hanya difahami dengan sabar dan tawakkal.",
        "Kisah ini mengajar bahawa takdir berjalan dengan hikmah yang teliti: apa yang kelihatan buruk boleh menjadi jalan kepada kebaikan yang lebih besar, dan apa yang kelihatan baik boleh menguji kesabaran dan iman kita.",
        "Renungan ini mengajak pembaca untuk percaya kepada Allah, berbaik sangka terhadap ketentuan-Nya, dan berhenti sebelum menghukum peristiwa harian.",
      ],
      bn: [
        "মূসা (আলাইহিস সালাম)-এর সেই সফরে—যে সৎ বান্দার সঙ্গে অনেক আলেম খিদির বলে অভিহিত করেন—আমরা শিখি যে ঘটনার বাইরের রূপ গভীর হিকমত লুকিয়ে রাখতে পারে, যা কেবল ধৈর্য ও সমর্পণে বোঝা যায়।",
        "গল্পটি শেখায় যে তাকদির সূক্ষ্ম প্রজ্ঞায় চলে: যা ক্ষতি মনে হয় তা আরও বড় কল্যাণের পথ হতে পারে, আর যা উপকার মনে হয় তা আমাদের ধৈর্য ও ঈমানের পরীক্ষাও হতে পারে।",
        "এই চিন্তাভাবনা পাঠককে আল্লাহর ওপর ভরসা, তাঁর ফয়সালার প্রতি সদ্বিচার, এবং দৈনন্দিন ঘটনা বিচারের আগে থেমে ভাবার আহ্বান জানায়।",
      ],
      fr: [
        "Dans le voyage de Moïse (paix sur lui) avec le serviteur pieux que de nombreux savants appellent Al-Khidr, nous apprenons que la surface des événements peut cacher une sagesse profonde, saisie seulement par la patience et la confiance.",
        "L'histoire enseigne que le destin se déploie avec une sagesse précise : ce qui paraît nuisible peut mener à un plus grand bien, et ce qui paraît bon peut éprouver notre patience et notre foi.",
        "Ces réflexions invitent le lecteur à faire confiance à Dieu, à bien penser de Son décret, et à s'arrêter avant de juger les événements du quotidien.",
      ],
      zh: [
        "在穆萨（愿他平安）与那位被许多学者称为海迪尔的清廉仆人同行的旅程中，我们认识到：事情的表象可能隐藏深刻智慧，唯有忍耐与托靠才能领悟。",
        "这个故事教导我们：命运以精细的智慧展开——看似有害的事可能通向更大的益处，看似美好的事也可能考验我们的耐心与信仰。",
        "这些思考邀请读者信赖真主，对其判定抱持善意，并在评判日常事件之前先停顿思考。",
      ],
      it: [
        "Nel viaggio di Mosè (pace su di lui) con il servo pio che molti sapienti identificano come Al-Khidr, impariamo che la superficie degli eventi può nascondere una saggezza profonda, compresa solo con pazienza e affidamento.",
        "La storia insegna che il destino si dispiega con sapienza precisa: ciò che sembra dannoso può condurre a un bene maggiore, e ciò che sembra buono può mettere alla prova la nostra pazienza e la nostra fede.",
        "Queste riflessioni invitano il lettore a confidare in Dio, a pensare bene del Suo decreto e a fermarsi prima di giudicare gli eventi della vita quotidiana.",
      ],
      ja: [
        "ムーサー（彼に平安あれ）が、多くの学者がアル・ヒドルと呼ぶ敬虔な僕と共に旅した物語から、出来事の表面には、忍耐と委託によってのみ理解される深い英知が隠れうることを学びます。",
        "この物語は、運命が精密な英知をもって展開することを教えます。害に見えるものがより大きな善へと通じることもあり、善に見えるものが忍耐と信仰を試すこともあります。",
        "これらの考察は、読者に神への信頼、その定めへの善い思い、そして日常の出来事を判断する前に立ち止まることを促します。",
      ],
      ko: [
        "많은 학자들이 알-히드르로 부르는 경건한 종과 함께한 무사(그에게 평화가 있기를)의 여정에서, 사건의 표면은 인내와 의탁으로만 파악되는 깊은 지혜를 숨길 수 있음을 배웁니다.",
        "이 이야기는 운명이 정밀한 지혜로 전개됨을 가르칩니다. 해로워 보이는 일이 더 큰 선으로 이어질 수 있고, 좋아 보이는 일이 우리의 인내와 신앙을 시험할 수도 있습니다.",
        "이러한 성찰은 독자에게 하나님을 신뢰하고, 그분의 결정을 좋게 여기며, 일상의 일을 판단하기 전에 멈추어 생각할 것을 권합니다.",
      ],
      es: [
        "En el viaje de Moisés (la paz sea con él) con el siervo piadoso a quien muchos sabios llaman Al-Khidr, aprendemos que la superficie de los hechos puede ocultar una sabiduría profunda que solo se comprende con paciencia y confianza.",
        "La historia enseña que el destino se despliega con sabiduría precisa: lo que parece dañino puede conducir a un bien mayor, y lo que parece bueno puede poner a prueba nuestra paciencia y nuestra fe.",
        "Estas reflexiones invitan al lector a confiar en Dios, a pensar bien de Su decreto y a detenerse antes de juzgar los acontecimientos cotidianos.",
      ],
      pt: [
        "Na jornada de Moisés (a paz esteja com ele) com o servo piedoso a quem muitos sábios chamam Al-Khidr, aprendemos que a superfície dos acontecimentos pode esconder uma sabedoria profunda, compreendida apenas com paciência e confiança.",
        "A história ensina que o destino se desenrola com sabedoria precisa: o que parece prejudicial pode levar a um bem maior, e o que parece bom pode pôr à prova a nossa paciência e a nossa fé.",
        "Estas reflexões convidam o leitor a confiar em Deus, a pensar bem do Seu decreto e a pausar antes de julgar os acontecimentos do dia a dia.",
      ],
      hi: [
        "मूसा (अलैहिस्सलाम) की उस यात्रा में—जो एक नेक बंदे के साथ थी जिसे बहुत से विद्वान खिज़्र कहते हैं—हम सीखते हैं कि घटनाओं की सतह गहरी हिकमत छिपा सकती है, जो केवल सब्र और तवक्कुल से समझ आती है।",
        "यह कहानी सिखाती है कि तक़दीर बारीक हिकमत से चलती है: जो नुकसान लगे वह बड़ी भलाई का रास्ता बन सकता है, और जो फायदा लगे वह हमारे सब्र और ईमान की परीक्षा भी हो सकता है।",
        "ये चिंतन पाठक को अल्लाह पर भरोसा, उसकी तक़दीर के बारे में अच्छा गुमान, और रोज़मर्रा की घटनाओं पर फ़ैसला करने से पहले रुकने की दावत देते हैं।",
      ],
    },

  },
  {
    slug: "ash-shura",
    pages: 8,
    surahNumber: 42,
    surahName: { ar: "الشورى", en: "Ash-Shura" },
    legacyArabicFileName: "في رحاب سورة الشورى .pdf",


    body: {
      ar: [
        "سورة الشورى تذكّرنا بأن الوحي مصدر الهداية، وأن التشاور خُلقٌ إيماني يضبط الرأي ويصون الجماعة من الاستبداد بالرأي.",
        "تتأمل هذه الوقفات معاني الرحمة، والاستجابة لله، ووحدة الرسالة بين الأنبياء، وكيف يبني الإيمان مجتمعاً يتشاور بالعدل والرفق.",
        "ندعو القارئ إلى أن يجعل الشورى منهجاً في بيته وعمله ومجتمعه، طلباً لما يرضي الله ونفع الناس.",
      ],
      en: [
        "Surah Ash-Shura reminds us that revelation is the source of guidance, and that mutual consultation is a faith-based ethic that refines opinion and protects a community from authoritarian decision-making.",
        "These reflections explore mercy, answering God's call, the unity of the prophetic message, and how faith builds a community that consults with justice and kindness.",
        "Readers are invited to make consultation a method at home, at work, and in society—seeking what pleases God and benefits people.",
      ],
      ur: [
        "سورہ الشوریٰ ہمیں یاد دلاتی ہے کہ وحی ہدایت کا منبع ہے، اور باہمی مشورہ ایک ایمانی خلق ہے جو رائے کو سنوارتا اور جماعت کو خودرائی سے بچاتا ہے۔",
        "یہ تاملات رحمت، اللہ کی پکار پر لبیک، انبیاء کے پیغام کی وحدت، اور اس بات پر غور کرتے ہیں کہ ایمان کیسے ایسا معاشرہ بناتا ہے جو عدل و نرمی سے مشورہ کرے۔",
        "قارئین کو دعوت ہے کہ مشورے کو گھر، کام اور معاشرے میں طریقہ بنائیں—اللہ کی رضا اور لوگوں کے نفع کی تلاش میں۔",
      ],
      tr: [
        "Şura Suresi, vahyin hidayet kaynağı olduğunu ve karşılıklı istişarenin, görüşü olgunlaştırıp toplumu tek başına karar dayatmaktan koruyan imani bir ahlak olduğunu hatırlatır.",
        "Bu düşünceler rahmeti, Allah'ın çağrısına icabeti, peygamberlik mesajının birliğini ve imanın adalet ve yumuşaklıkla istişare eden bir toplum inşa edişini ele alır.",
        "Okuyucu, istişareyi evde, işte ve toplumda bir yöntem kılmaya—Allah'ın rızasını ve insanların faydasını aramaya—davet edilir.",
      ],
      id: [
        "Surat Ash-Shura mengingatkan bahwa wahyu adalah sumber petunjuk, dan musyawarah adalah etika iman yang merapikan pendapat serta melindungi umat dari keputusan otoriter.",
        "Renungan ini menelaah rahmat, menyambut panggilan Allah, kesatuan risalah para nabi, dan bagaimana iman membangun komunitas yang bermusyawarah dengan adil dan lembut.",
        "Pembaca diajak menjadikan musyawarah sebagai metode di rumah, kerja, dan masyarakat—mencari apa yang diridai Allah dan bermanfaat bagi manusia.",
      ],
      ms: [
        "Surah Ash-Shura mengingatkan bahawa wahyu ialah sumber petunjuk, dan syura ialah etika iman yang memperhalus pendapat serta melindungi masyarakat daripada keputusan autoritarian.",
        "Renungan ini meneliti rahmat, menyahut seruan Allah, kesatuan risalah para nabi, dan bagaimana iman membina komuniti yang bermesyuarat dengan adil dan lemah lembut.",
        "Pembaca dijemput menjadikan syura sebagai kaedah di rumah, kerja, dan masyarakat—mencari apa yang diredai Allah dan bermanfaat kepada manusia.",
      ],
      bn: [
        "সূরা আশ-শুরা মনে করিয়ে দেয় যে ওহী হলো হিদায়াতের উৎস, আর পারস্পরিক পরামর্শ একটি ঈমানি নীতি যা মতামত পরিশুদ্ধ করে এবং সমাজকে একচেটিয়া সিদ্ধান্ত থেকে রক্ষা করে।",
        "এই চিন্তাভাবনা রহমত, আল্লাহর ডাকে সাড়া, নবীদের রিসালাতের ঐক্য, এবং ঈমান কীভাবে ন্যায় ও কোমলতার সাথে পরামর্শকারী সমাজ গড়ে তোলে তা আলোচনা করে।",
        "পাঠককে বাড়ি, কর্মস্থল ও সমাজে পরামর্শকে পদ্ধতি বানানোর—আল্লাহর সন্তুষ্টি ও মানুষের কল্যাণ খোঁজার—আহ্বান জানানো হয়।",
      ],
      fr: [
        "La sourate Ash-Shura nous rappelle que la révélation est la source de la guidance, et que la consultation mutuelle est une éthique de foi qui affine l'opinion et protège une communauté de l'autoritarisme.",
        "Ces réflexions explorent la miséricorde, la réponse à l'appel de Dieu, l'unité du message prophétique, et la façon dont la foi construit une communauté qui consulte avec justice et douceur.",
        "Le lecteur est invité à faire de la consultation une méthode à la maison, au travail et dans la société—en cherchant ce qui plaît à Dieu et profite aux gens.",
      ],
      zh: [
        "《协商》章提醒我们：启示是引导之源，而相互协商是一种信仰伦理，能完善意见并保护群体免于独断专行。",
        "这些思考探讨慈悯、回应真主的召唤、众先知信息的统一，以及信仰如何建立以公正与温和进行协商的社群。",
        "我们邀请读者在家庭、工作与社会中把协商作为方法——寻求取悦真主并造福人群之事。",
      ],
      it: [
        "La Sura Ash-Shura ci ricorda che la rivelazione è fonte di guida, e che la consultazione reciproca è un'etica di fede che affina l'opinione e protegge una comunità dall'autoritarismo.",
        "Queste riflessioni esplorano la misericordia, la risposta alla chiamata di Dio, l'unità del messaggio profetico e il modo in cui la fede costruisce una comunità che consulta con giustizia e mitezza.",
        "Il lettore è invitato a fare della consultazione un metodo a casa, al lavoro e nella società—cercando ciò che piace a Dio e giova alle persone.",
      ],
      ja: [
        "相談章は、啓示が導きの源であること、そして相互の協議が意見を洗練し、共同体を独断から守る信仰の倫理であることを思い出させます。",
        "これらの考察は、慈悲、神の呼びかけへの応答、預言者のメッセージの一体性、そして信仰が公正と優しさをもって協議する共同体を築く様子を探ります。",
        "読者は、家庭・職場・社会で協議を方法とし、神が喜ばれ人々に益となることを求めるよう招かれます。",
      ],
      ko: [
        "협의 장은 계시가 인도의 근원이며, 상호 협의는 의견을 다듬고 공동체를 독단에서 지키는 신앙 윤리임을 상기시킵니다.",
        "이러한 성찰은 자비, 하나님의 부르심에 대한 응답, 예언자 메시지의 통일성, 그리고 신앙이 정의와 온유로 협의하는 공동체를 세우는 방식을 탐구합니다.",
        "독자는 가정·직장·사회에서 협의를 방법으로 삼아, 하나님이 기뻐하시고 사람들에게 유익한 것을 찾도록 초대됩니다.",
      ],
      es: [
        "La Sura Ash-Shura nos recuerda que la revelación es fuente de guía, y que la consulta mutua es una ética de fe que afina la opinión y protege a una comunidad del autoritarismo.",
        "Estas reflexiones exploran la misericordia, la respuesta al llamado de Dios, la unidad del mensaje profético y cómo la fe construye una comunidad que consulta con justicia y amabilidad.",
        "Se invita al lector a hacer de la consulta un método en casa, en el trabajo y en la sociedad—buscando lo que agrada a Dios y beneficia a las personas.",
      ],
      pt: [
        "A Surata Ash-Shura lembra-nos que a revelação é a fonte da orientação, e que a consulta mútua é uma ética de fé que afina a opinião e protege uma comunidade do autoritarismo.",
        "Estas reflexões exploram a misericórdia, a resposta ao chamado de Deus, a unidade da mensagem profética e como a fé constrói uma comunidade que consulta com justiça e brandura.",
        "O leitor é convidado a tornar a consulta um método em casa, no trabalho e na sociedade—buscando o que agrada a Deus e beneficia as pessoas.",
      ],
      hi: [
        "सूरह अश-शूरा याद दिलाती है कि वह्य हिदायत का स्रोत है, और आपसी मशविरा एक ईमानी अख़लाक़ है जो राय को सँवारता और जमाअत को तानाशाही फ़ैसलों से बचाता है।",
        "ये चिंतन रहमत, अल्लाह की पुकार पर लब्बैक, अंबिया के पैग़ाम की एकता, और इस बात पर विचार करते हैं कि ईमान कैसे ऐसा समाज बनाता है जो अदल और नर्मी से मशविरा करे।",
        "पाठकों को दावत है कि मशविरे को घर, काम और समाज में तरीक़ा बनाएँ—अल्लाह की रज़ा और लोगों के फ़ायदे की तलाश में।",
      ],
    },

  },
  {
    slug: "al-jinn",
    pages: 3,
    surahNumber: 72,
    surahName: { ar: "الجن", en: "Al-Jinn" },
    legacyArabicFileName: "وقفات مع سورة الجن .pdf",


    body: {
      ar: [
        "سورة الجن تفتح نافذة على عالم الغيب بإذن الله، وتبيّن أن الجن يسمعون القرآن ويتأثرون به، وأن الهداية والضلال طريقان واضحان.",
        "توقف هذه التأملات عند توحيد الله، ورفض الشرك، ومسؤولية الإنسان والجن معاً أمام الوحي والرسالة.",
        "الغاية ليست إثارة الخوف، بل تعميق اليقينين بأن الله رب العالمين، وأن القرآن نور لمن أنصت بصدق.",
      ],
      en: [
        "Surah Al-Jinn opens a window onto the unseen by God's permission. It shows that the jinn hear the Quran and are moved by it, and that guidance and misguidance are two clear paths.",
        "These reflections pause at the oneness of God, the rejection of associating partners with Him, and the shared responsibility of humans and jinn before revelation.",
        "The aim is not to stir fear, but to deepen certainty that God is Lord of the worlds, and that the Quran is light for whoever listens sincerely.",
      ],
      ur: [
        "سورہ الجن اللہ کے اذن سے غیب کی دنیا کی ایک کھڑکی کھولتی ہے، اور بتاتی ہے کہ جن قرآن سنتے اور متاثر ہوتے ہیں، اور ہدایت و گمراہی دو واضح راستے ہیں۔",
        "یہ تاملات توحید، شرک سے انکار، اور انسان و جن دونوں کی وحی کے سامنے ذمہ داری پر رک جاتے ہیں۔",
        "مقصد خوف پیدا کرنا نہیں بلکہ یہ یقین گہرا کرنا ہے کہ اللہ رب العالمین ہے، اور قرآن اُس کے لیے نور ہے جو سچائی سے سنے۔",
      ],
      tr: [
        "Cin Suresi, Allah'ın izniyle gayb âlemine bir pencere açar; cinlerin Kur'an'ı işitip etkilendiğini ve hidayet ile dalaletin iki açık yol olduğunu gösterir.",
        "Bu düşünceler tevhidde, şirkı reddetmede ve insan ile cinin vahiy karşısındaki ortak sorumluluğunda durur.",
        "Amaç korku uyandırmak değil; Allah'ın âlemlerin Rabbi olduğuna ve Kur'an'ın samimiyetle dinleyenler için nur olduğuna dair yakini derinleştirmektir.",
      ],
      id: [
        "Surat Al-Jinn membuka jendela ke alam gaib dengan izin Allah. Ia menunjukkan bahwa jin mendengar Al-Quran dan terpengaruh olehnya, serta bahwa petunjuk dan kesesatan adalah dua jalan yang jelas.",
        "Renungan ini berhenti pada keesaan Allah, penolakan syirik, dan tanggung jawab bersama manusia serta jin di hadapan wahyu.",
        "Tujuannya bukan menakut-nakuti, melainkan memperdalam keyakinan bahwa Allah adalah Tuhan semesta alam, dan Al-Quran adalah cahaya bagi siapa pun yang mendengarkan dengan tulus.",
      ],
      ms: [
        "Surah Al-Jinn membuka tingkap ke alam ghaib dengan izin Allah. Ia menunjukkan bahawa jin mendengar Al-Quran dan terkesan dengannya, serta bahawa petunjuk dan kesesatan ialah dua jalan yang jelas.",
        "Renungan ini berhenti pada keesaan Allah, penolakan syirik, dan tanggungjawab bersama manusia serta jin di hadapan wahyu.",
        "Matlamatnya bukan menakutkan, tetapi memperdalam keyakinan bahawa Allah ialah Tuhan sekalian alam, dan Al-Quran ialah cahaya bagi sesiapa yang mendengar dengan ikhlas.",
      ],
      bn: [
        "সূরা আল-জিন আল্লাহর অনুমতিতে গায়েব জগতের একটি জানালা খুলে দেয়। এটি দেখায় যে জিনেরা কুরআন শোনে ও প্রভাবিত হয়, আর হিদায়াত ও গোমরাহি দুটি স্পষ্ট পথ।",
        "এই চিন্তাভাবনা তাওহীদ, শিরক প্রত্যাখ্যান, এবং ওহীর সামনে মানুষ ও জিন উভয়ের দায়িত্বে থামে।",
        "উদ্দেশ্য ভয় সৃষ্টি নয়, বরং এই প্রত্যয় গভীর করা যে আল্লাহ রব্বুল আলামীন, আর কুরআন আলো তাদের জন্য যারা আন্তরিকভাবে শোনে।",
      ],
      fr: [
        "La sourate Al-Jinn ouvre, avec la permission de Dieu, une fenêtre sur l'invisible. Elle montre que les djinns entendent le Coran et en sont touchés, et que la guidance et l'égarement sont deux voies claires.",
        "Ces réflexions s'arrêtent sur l'unicité de Dieu, le rejet de l'associationnisme, et la responsabilité partagée des humains et des djinns face à la révélation.",
        "Le but n'est pas d'inspirer la peur, mais d'approfondir la certitude que Dieu est le Seigneur des mondes, et que le Coran est une lumière pour quiconque écoute sincèrement.",
      ],
      zh: [
        "蒙真主许可，《精灵》章为我们打开窥见幽玄世界的一扇窗。它表明精灵能聆听并受《古兰经》感化，引导与迷误是两条清晰之路。",
        "这些思考停驻于认主独一、拒绝以物配主，以及人类与精灵在启示面前的共同责任。",
        "目的不是制造恐惧，而是加深确信：真主是众世界的养主，《古兰经》是凡真诚倾听者的光明。",
      ],
      it: [
        "La Sura Al-Jinn apre, con il permesso di Dio, una finestra sull'invisibile. Mostra che i jinn odono il Corano e ne sono toccati, e che guida e smarrimento sono due vie chiare.",
        "Queste riflessioni si soffermano sull'unicità di Dio, sul rifiuto dell'associazionismo e sulla responsabilità condivisa di umani e jinn davanti alla rivelazione.",
        "Lo scopo non è suscitare paura, ma approfondire la certezza che Dio è il Signore dei mondi, e che il Corano è luce per chi ascolta con sincerità.",
      ],
      ja: [
        "ジン章は、神の許可のもと、不可視の世界への窓を開きます。ジンがクルアーンを聴き心を動かされること、導きと迷いが二つの明確な道であることを示します。",
        "これらの考察は、神の唯一性、同位者を配することの拒否、そして啓示の前での人間とジンの共同責任に立ち止まります。",
        "目的は恐れを煽ることではなく、神が諸世界の主であること、クルアーンが誠実に耳を傾ける者にとっての光であるという確信を深めることです。",
      ],
      ko: [
        "진 장은 하나님의 허락으로 비가시 세계를 향한 창을 엽니다. 진이 꾸란을 듣고 감화되며, 인도과 미혹이 두 갈래의 분명한 길임을 보여 줍니다.",
        "이러한 성찰은 하나님의 유일성, 동반자를 두는 행위의 거부, 그리고 계시 앞에서 인간과 진의 공동 책임에 머뭅니다.",
        "목적은 공포를 일으키는 것이 아니라, 하나님이 만유의 주이시며 꾸란이 진심으로 듣는 이에게 빛이라는 확신을 깊게 하는 것입니다.",
      ],
      es: [
        "La Sura Al-Jinn abre, con permiso de Dios, una ventana a lo invisible. Muestra que los genios oyen el Corán y se conmueven con él, y que la guía y el extravío son dos caminos claros.",
        "Estas reflexiones se detienen en la unicidad de Dios, el rechazo de asociarle pares, y la responsabilidad compartida de humanos y genios ante la revelación.",
        "El objetivo no es sembrar miedo, sino profundizar la certeza de que Dios es el Señor de los mundos, y de que el Corán es luz para quien escucha con sinceridad.",
      ],
      pt: [
        "A Surata Al-Jinn abre, com a permissão de Deus, uma janela para o invisível. Mostra que os gênios ouvem o Alcorão e são tocados por ele, e que a orientação e o desvio são dois caminhos claros.",
        "Estas reflexões param na unicidade de Deus, na rejeição da associação de parceiros a Ele, e na responsabilidade partilhada de humanos e gênios perante a revelação.",
        "O objetivo não é despertar medo, mas aprofundar a certeza de que Deus é o Senhor dos mundos, e de que o Alcorão é luz para quem escuta com sinceridade.",
      ],
      hi: [
        "सूरह अल-जिन्न अल्लाह की इजाज़त से ग़ैब की दुनिया की एक खिड़की खोलती है। यह बताती है कि जिन्न कुरआन सुनते और प्रभावित होते हैं, और हिदायत व गुमराही दो واضح रास्ते हैं।",
        "ये चिंतन तौहीद, शिर्क से इनकार, और वह्य के सामने इंसान व जिन्न दोनों की ज़िम्मेदारी पर ठहरते हैं।",
        "मक़सद ख़ौफ़ पैदा करना नहीं, बल्कि यह यक़ीन गहरा करना है कि अल्लाह रब्बुल आलमीन है, और कुरआन उसके लिए नूर है जो सच्चाई से सुने।",
      ],
    },

  },
  {
    slug: "an-naml",
    pages: 8,
    surahNumber: 27,
    surahName: { ar: "النمل", en: "An-Naml" },
    legacyArabicFileName: "وقفات مع سورة النمل .pdf",


    body: {
      ar: [
        "سورة النمل تعرض مشاهد من قصة سليمان عليه السلام: علمٌ يُفهم به منطق الطير، ومملكةٌ تُساس بالعدل، ونملةٌ تذكّر بعظمة الخلق ودقة التدبير.",
        "تتأمل هذه الوقفات الشكر عند النعمة، والتواضع مع القدرة، ودعوة بلقيس إلى الإيمان بحكمة ولين.",
        "الرسالة العملية أن القوة بلا شكر خطر، وأن القيادة الراشدة تجمع بين العلم والرحمة والمسؤولية.",
      ],
      en: [
        "Surah An-Naml presents scenes from the story of Solomon (peace be upon him): knowledge that understands the speech of birds, a kingdom governed with justice, and an ant that recalls the greatness of creation and the precision of providence.",
        "These reflections consider gratitude in times of blessing, humility alongside power, and the invitation of Bilqis to faith with wisdom and gentleness.",
        "The practical message is that power without gratitude is dangerous, and that sound leadership joins knowledge, mercy, and responsibility.",
      ],
      ur: [
        "سورہ النمل سلیمان علیہ السلام کی کہانی کے مناظر پیش کرتی ہے: وہ علم جس سے پرندوں کی بات سمجھی جائے، عدل سے چلنے والی سلطنت، اور ایک چیونٹی جو مخلوق کی عظمت اور تقدیر کی باریکی یاد دلاتی ہے۔",
        "یہ تاملات نعمت پر شکر، طاقت کے ساتھ عاجزی، اور بلقیس کو حکمت و نرمی سے ایمان کی دعوت پر غور کرتے ہیں۔",
        "عملی پیغام یہ ہے کہ بے شکری کی طاقت خطرناک ہے، اور درست قیادت علم، رحمت اور ذمہ داری کو یکجا کرتی ہے۔",
      ],
      tr: [
        "Neml Suresi, Süleyman'ın (aleyhisselam) kıssasından sahneler sunar: kuşların dilini anlayan ilim, adaletle yönetilen bir mülk ve yaratılışın büyüklüğü ile tedbirin inceliğini hatırlatan bir karınca.",
        "Bu düşünceler nimet anında şükürü, güçle birlikte tevazuyu ve Belkıs'ın hikmet ve yumuşaklıkla imana davetini ele alır.",
        "Pratik mesaj şudur: şükürsüz güç tehlikelidir; sağlıklı liderlik ilim, rahmet ve sorumluluğu birleştirir.",
      ],
      id: [
        "Surat An-Naml menampilkan adegan dari kisah Sulaiman (alaihissalam): ilmu yang memahami bahasa burung, kerajaan yang dikelola dengan adil, dan seekor semut yang mengingatkan keagungan ciptaan serta ketelitian takdir.",
        "Renungan ini menimbang syukur saat nikmat, kerendahan hati bersama kekuasaan, dan ajakan Bilqis kepada iman dengan hikmah dan kelembutan.",
        "Pesan praktisnya: kekuasaan tanpa syukur berbahaya, dan kepemimpinan yang sehat menyatukan ilmu, rahmat, dan tanggung jawab.",
      ],
      ms: [
        "Surah An-Naml memaparkan adegan daripada kisah Sulaiman (alaihissalam): ilmu yang memahami bahasa burung, kerajaan yang ditadbir dengan adil, dan seekor semut yang mengingatkan keagungan ciptaan serta ketelitian takdir.",
        "Renungan ini menimbang syukur ketika nikmat, kerendahan hati bersama kuasa, dan ajakan Balqis kepada iman dengan hikmah dan kelembutan.",
        "Pesan praktikalnya: kuasa tanpa syukur berbahaya, dan kepimpinan yang sihat menyatukan ilmu, rahmat, dan tanggungjawab.",
      ],
      bn: [
        "সূরা আন-নমল সুলাইমান (আলাইহিস সালাম)-এর কাহিনির দৃশ্য তুলে ধরে: পাখির ভাষা বোঝার জ্ঞান, ন্যায়ের সাথে পরিচালিত রাজ্য, এবং একটি পিঁপড়া যা সৃষ্টির মহত্ত্ব ও তদবিরের সূক্ষ্মতা স্মরণ করিয়ে দেয়।",
        "এই চিন্তাভাবনা নেয়ামতের সময় শুকর, ক্ষমতার সাথে বিনয়, এবং হিকমত ও কোমলতায় বিলকিসকে ঈমানের দাওয়াত নিয়ে ভাবায়।",
        "বাস্তব বাণী এই যে কৃতজ্ঞতাহীন শক্তি বিপজ্জনক, আর সুস্থ নেতৃত্ব জ্ঞান, রহমত ও দায়িত্বকে একত্র করে।",
      ],
      fr: [
        "La sourate An-Naml présente des scènes de l'histoire de Salomon (paix sur lui) : une science qui comprend le langage des oiseaux, un royaume gouverné avec justice, et une fourmi qui rappelle la grandeur de la création et la précision de la providence.",
        "Ces réflexions envisagent la gratitude dans le bienfait, l'humilité avec le pouvoir, et l'invitation de Bilqis à la foi avec sagesse et douceur.",
        "Le message pratique est que le pouvoir sans gratitude est dangereux, et qu'un leadership sain unit savoir, miséricorde et responsabilité.",
      ],
      zh: [
        "《蚂蚁》章呈现苏莱曼（愿他平安）故事中的场景：能理解鸟语的知识、以公正治理的王国，以及一只提醒造化伟大与安排精微的蚂蚁。",
        "这些思考省察恩典中的感恩、能力中的谦卑，以及以智慧与温和邀请比勒吉斯归信。",
        "实践信息是：没有感恩的力量是危险的；健全的领导把知识、慈悯与责任结合起来。",
      ],
      it: [
        "La Sura An-Naml presenta scene dalla storia di Salomone (pace su di lui): una scienza che comprende il linguaggio degli uccelli, un regno governato con giustizia, e una formica che richiama la grandezza della creazione e la precisione della provvidenza.",
        "Queste riflessioni considerano la gratitudine nel favore, l'umiltà insieme al potere, e l'invito di Bilqis alla fede con saggezza e mitezza.",
        "Il messaggio pratico è che il potere senza gratitudine è pericoloso, e che una guida sana unisce conoscenza, misericordia e responsabilità.",
      ],
      ja: [
        "アン・ナムル章はソロモン（彼に平安あれ）の物語の場面を示します。鳥の言葉を理解する知、公正に治められる王国、そして創造の偉大さと摂理の精密さを思い起こさせる一匹のアリです。",
        "これらの考察は、恩恵における感謝、力と共にある謙遜、そして知恵と優しさをもってビルキースを信仰へ招くことを考えます。",
        "実践的なメッセージは、感謝なき力は危険であり、健全な指導は知・慈悲・責任を結ぶということです。",
      ],
      ko: [
        "개미 장은 솔로몬(그에게 평화가 있기를) 이야기의 장면을 보여 줍니다. 새의 말을 이해하는 지식, 정의로 다스려지는 왕국, 그리고 창조의 위대함과 섭리의 정밀함을 상기시키는 개미입니다.",
        "이러한 성찰은 은혜 속의 감사, 권능과 함께하는 겸손, 그리고 지혜와 온유로 빌키스에게 신앙을 권하는 일을 다룹니다.",
        "실천적 메시지는 감사 없는 힘이 위험하며, 건전한 지도력은 지식·자비·책임을 결합한다는 것입니다.",
      ],
      es: [
        "La Sura An-Naml presenta escenas de la historia de Salomón (la paz sea con él): un saber que entiende el habla de las aves, un reino gobernado con justicia, y una hormiga que recuerda la grandeza de la creación y la precisión de la providencia.",
        "Estas reflexiones consideran la gratitud en la bendición, la humildad junto al poder, y la invitación de Bilqis a la fe con sabiduría y suavidad.",
        "El mensaje práctico es que el poder sin gratitud es peligroso, y que un liderazgo sano une conocimiento, misericordia y responsabilidad.",
      ],
      pt: [
        "A Surata An-Naml apresenta cenas da história de Salomão (a paz esteja com ele): um saber que compreende a fala das aves, um reino governado com justiça, e uma formiga que recorda a grandeza da criação e a precisão da providência.",
        "Estas reflexões consideram a gratidão na bênção, a humildade juntamente com o poder, e o convite de Bilqis à fé com sabedoria e brandura.",
        "A mensagem prática é que o poder sem gratidão é perigoso, e que uma liderança sã une conhecimento, misericórdia e responsabilidade.",
      ],
      hi: [
        "सूरह अन-नम्ल सुलैमान (अलैहिस्सलाम) की कहानी के मंज़र पेश करती है: वह इल्म जिससे पक्षियों की बात समझी जाए, अदल से चलने वाली सल्तनत, और एक चींटी जो मख़लूक़ की अज़मत और तदबीर की बारीकी याद दिलाती है।",
        "ये चिंतन नेमत पर शुक्र, ताक़त के साथ इंक्सारी, और हिकमत व नर्मी से बिल्कीस को ईमान की दावत पर ग़ौर करते हैं।",
        "अमली पैग़ाम यह है कि बे-शुक्री की ताक़त ख़तरनाक है, और सही क़ियादत इल्म, रहमत और ज़िम्मेदारी को एक करती है।",
      ],
    },

  },
];

