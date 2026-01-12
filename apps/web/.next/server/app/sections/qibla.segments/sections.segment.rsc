1:"$Sreact.fragment"
2:"$Sreact.suspense"
6:I[8013,["/_next/static/chunks/04f18b47d2784080.js","/_next/static/chunks/453443536a1f06bf.js"],"ThemeProvider"]
7:I[61267,["/_next/static/chunks/04f18b47d2784080.js","/_next/static/chunks/453443536a1f06bf.js"],"LanguageProvider"]
8:I[92224,["/_next/static/chunks/04f18b47d2784080.js","/_next/static/chunks/453443536a1f06bf.js"],"default"]
9:I[39756,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/f8f3db1bfd89192d.js"],"default"]
a:I[37457,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/f8f3db1bfd89192d.js"],"default"]
b:I[42203,["/_next/static/chunks/04f18b47d2784080.js","/_next/static/chunks/453443536a1f06bf.js"],"default"]
:HL["/_next/static/chunks/3b5793c2d8e85831.css","style"]
:HL["https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap","style",{"media":"print"}]
:HL["https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Scheherazade+New:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap","style",{"media":"print"}]
3:T798,
              (function() {
                try {
                  // Set theme immediately to prevent flash
                  const theme = localStorage.getItem('theme') || 'dark';
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const finalTheme = theme === 'system' ? systemTheme : theme;
                  
                  if (finalTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                  
                  // Set language from URL
                  const pathSegments = window.location.pathname.split('/').filter(Boolean);
                  const urlLang = pathSegments[0];
                  const supportedLanguages = ['ar', 'en', 'ur', 'tr', 'id', 'ms', 'bn', 'fr', 'zh', 'it', 'ja', 'ko'];
                  
                  if (urlLang && supportedLanguages.includes(urlLang)) {
                    document.documentElement.lang = urlLang;
                    document.documentElement.dir = ['ar', 'he', 'fa', 'ur', 'yi', 'ps'].includes(urlLang) ? 'rtl' : 'ltr';
                  } else {
                    document.documentElement.lang = 'ar';
                    document.documentElement.dir = 'rtl';
                  }
                  
                } catch (e) {
                  // Fallback to dark theme and Arabic
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                  document.documentElement.lang = 'ar';
                  document.documentElement.dir = 'rtl';
                }
              })();
            0:{"buildId":"9KUKkjiEgCpwH4qCFpEYs","rsc":["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/3b5793c2d8e85831.css","precedence":"next"}],["$","script","script-0",{"src":"/_next/static/chunks/04f18b47d2784080.js","async":true}],["$","script","script-1",{"src":"/_next/static/chunks/453443536a1f06bf.js","async":true}]],["$","$2",null,{"fallback":["$","html",null,{"lang":"ar","dir":"rtl","suppressHydrationWarning":true,"children":["$","body",null,{"className":"antialiased bg-light dark:bg-dark","children":["$","div",null,{"className":"min-h-screen flex items-center justify-center","children":["$","div",null,{"className":"animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-gold"}]}]}]}],"children":["$","html",null,{"lang":"ar","dir":"rtl","suppressHydrationWarning":true,"children":[["$","head",null,{"children":[["$","meta",null,{"charSet":"utf-8"}],["$","meta",null,{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover"}],["$","link",null,{"rel":"icon","href":"/favicon.svg","type":"image/svg+xml"}],["$","link",null,{"rel":"icon","href":"/favicon.ico","sizes":"any"}],["$","link",null,{"rel":"icon","href":"/icons/icon.svg","type":"image/svg+xml"}],["$","link",null,{"rel":"icon","href":"/icons/icon-32x32.png","sizes":"32x32","type":"image/png"}],["$","link",null,{"rel":"apple-touch-icon","href":"/icons/apple-icon-180.png"}],["$","link",null,{"rel":"dns-prefetch","href":"https://fonts.googleapis.com"}],["$","link",null,{"rel":"dns-prefetch","href":"https://fonts.gstatic.com"}],["$","link",null,{"rel":"dns-prefetch","href":"https://api.aladhan.com"}],["$","link",null,{"rel":"dns-prefetch","href":"https://api.alquran.cloud"}],["$","link",null,{"rel":"dns-prefetch","href":"https://api.quran.com"}],["$","link",null,{"rel":"dns-prefetch","href":"https://ipapi.co"}],["$","link",null,{"rel":"dns-prefetch","href":"https://img.youtube.com"}],["$","link",null,{"rel":"dns-prefetch","href":"https://i.ytimg.com"}],[["$","link",null,{"rel":"prefetch","href":"/sections/quran","as":"document"}],["$","link",null,{"rel":"prefetch","href":"/sections/tafseer","as":"document"}],["$","link",null,{"rel":"prefetch","href":"/sections/dhikr","as":"document"}],["$","link",null,{"rel":"prefetch","href":"/sections/prayer-times","as":"document"}],["$","link",null,{"rel":"prefetch","href":"/sections/qibla","as":"document"}]],["$","link",null,{"rel":"preconnect","href":"https://fonts.googleapis.com"}],["$","link",null,{"rel":"preconnect","href":"https://fonts.gstatic.com","crossOrigin":"anonymous"}],["$","link",null,{"href":"https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap","rel":"stylesheet","media":"print"}],["$","link",null,{"href":"https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap","rel":"stylesheet","media":"screen"}],["$","link",null,{"href":"https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Scheherazade+New:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap","rel":"stylesheet","media":"print"}],["$","link",null,{"href":"https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Scheherazade+New:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap","rel":"stylesheet","media":"screen"}],["$","meta",null,{"name":"color-scheme","content":"light dark"}],["$","meta",null,{"name":"theme-color","content":"#D4AF37","media":"(prefers-color-scheme: light)"}],["$","meta",null,{"name":"theme-color","content":"#0F172A","media":"(prefers-color-scheme: dark)"}],["$","meta",null,{"name":"msapplication-navbutton-color","content":"#D4AF37"}],["$","meta",null,{"name":"apple-mobile-web-app-status-bar-style","content":"default"}],["$","script",null,{"dangerouslySetInnerHTML":{"__html":"$3"}}]]}],"$L4"]}]}]]}],"loading":["$L5",[],[]],"isPartial":false}
4:["$","body",null,{"className":"antialiased bg-light dark:bg-dark islamic-pattern","suppressHydrationWarning":true,"children":["$","$L6",null,{"attribute":"class","defaultTheme":"dark","enableSystem":true,"disableTransitionOnChange":false,"children":["$","$L7",null,{"initialLocale":"ar","children":[["$","$L8",null,{}],["$","$L9",null,{"parallelRouterKey":"children","template":["$","$La",null,{}]}],["$","$Lb",null,{}]]}]}]}]
5:["$","div","l",{"className":"min-h-screen bg-light dark:bg-dark flex items-center justify-center","children":["$","div",null,{"className":"text-center","children":[["$","div",null,{"className":"inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-islamic-gold border-r-transparent"}],["$","p",null,{"className":"mt-4 text-lg text-gray-600 dark:text-gray-400","children":"Loading section..."}]]}]}]
