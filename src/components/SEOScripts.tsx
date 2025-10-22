"use client";

export default function SEOScripts() {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://meshari.charity/#website",
        "url": "https://meshari.charity",
        "name": "Meshari's Ongoing Charity",
        "description": "A tribute to Meshari Ahmed Sulaiman Alabra - Ongoing charity through Quran, supplications, and good deeds",
        "publisher": {
          "@type": "Organization",
          "name": "Meshari's Ongoing Charity",
          "logo": {
            "@type": "ImageObject",
            "url": "https://meshari.charity/icons/icon-512x512.png"
          }
        },
        "inLanguage": ["ar", "en", "tr", "ur", "id", "ms", "bn", "fr", "zh", "it", "ja", "ko"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://meshari.charity/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://meshari.charity/#organization",
        "name": "Meshari's Ongoing Charity",
        "url": "https://meshari.charity",
        "logo": {
          "@type": "ImageObject",
          "url": "https://meshari.charity/icons/icon-512x512.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://youtube.com/@meshari-charity",
          "https://facebook.com/meshari.charity",
          "https://twitter.com/meshari_charity"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://meshari.charity/#webpage",
        "url": "https://meshari.charity",
        "name": "Meshari's Ongoing Charity - صدقة جارية لمشاري",
        "isPartOf": { "@id": "https://meshari.charity/#website" },
        "about": { "@id": "https://meshari.charity/#organization" },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://meshari.charity/og-image.svg"
        },
        "inLanguage": "ar",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "WebPage",
                "@id": "https://meshari.charity",
                "url": "https://meshari.charity",
                "name": "Home"
              }
            }
          ]
        }
      },
      {
        "@type": "Person",
        "@id": "https://meshari.charity/#person",
        "name": "Meshari Ahmed Sulaiman Alabra",
        "givenName": "Meshari",
        "familyName": "Alabra",
        "deathDate": "2023-03-29",
        "nationality": "Saudi Arabian",
        "homeLocation": {
          "@type": "Place",
          "name": "Riyadh, Saudi Arabia"
        }
      },
      {
        "@type": "NonprofitType",
        "@id": "https://meshari.charity/#nonprofit",
        "name": "Meshari's Ongoing Charity",
        "nonprofitStatus": "Charitable Organization",
        "taxID": "YOUR_TAX_ID",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Riyadh",
          "addressCountry": "Saudi Arabia"
        },
        "member": [
          {
            "@type": "OrganizationRole",
            "member": { "@id": "https://meshari.charity/#person" },
            "roleName": "In Memory Of"
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": "https://meshari.charity/#services",
        "name": "Charitable Services",
        "itemListElement": [
          {
            "@type": "Service",
            "name": "Quran Recitations",
            "description": "Listen to Quran recitations as ongoing charity"
          },
          {
            "@type": "Service",
            "name": "Orphan Sponsorship",
            "description": "Support orphans through continuous charitable giving"
          },
          {
            "@type": "Service",
            "name": "Prayer Times",
            "description": "Accurate prayer times based on location"
          },
          {
            "@type": "Service",
            "name": "Islamic Supplications",
            "description": "Collection of authentic supplications from Quran and Sunnah"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      {/* Additional SEO Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#D4AF37" />
      <meta name="application-name" content="Meshari's Charity" />
      <meta name="apple-mobile-web-app-title" content="Meshari's Charity" />
      <meta name="msapplication-TileColor" content="#D4AF37" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Social Media Verification */}
      <meta name="facebook-domain-verification" content="YOUR_FACEBOOK_VERIFICATION" />
      <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION" />
      
      {/* Mobile App Deep Linking */}
      <meta property="al:ios:url" content="mesharicharity://" />
      <meta property="al:ios:app_store_id" content="YOUR_APP_STORE_ID" />
      <meta property="al:ios:app_name" content="Meshari's Charity" />
      <meta property="al:android:url" content="mesharicharity://" />
      <meta property="al:android:package" content="org.meshari.charity" />
      <meta property="al:android:app_name" content="Meshari's Charity" />
      
      {/* Additional OpenGraph Tags */}
      <meta property="og:site_name" content="Meshari's Charity" />
      <meta property="og:rich_attachment" content="true" />
      <meta property="article:publisher" content="https://facebook.com/meshari.charity" />
      
      {/* Twitter Additional Tags */}
      <meta name="twitter:site" content="@meshari_charity" />
      <meta name="twitter:creator" content="@meshari_charity" />
      <meta name="twitter:app:country" content="SA" />
      
      {/* Preload Critical Resources */}
      
      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" title="Meshari's Charity Updates" href="/feed.xml" />
      
      {/* Browser Config */}
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#D4AF37" />
    </>
  );
}
