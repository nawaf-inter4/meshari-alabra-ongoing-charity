import { Metadata } from 'next';
import { LanguageProvider } from '@/components/LanguageProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Meshari Alabra Ongoing Charity',
  description: 'Islamic charity and educational content',
};

export default function SectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
