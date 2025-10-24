"use client";

import { useLanguage } from "./LanguageProvider";
import { languageMetadata } from "@/lib/metadata";

interface AdvancedSEOProps {
  language?: string;
  pageTitle?: string;
  pageDescription?: string;
  canonicalUrl?: string;
}

export default function AdvancedSEO({ 
  language, 
  pageTitle, 
  pageDescription, 
  canonicalUrl 
}: AdvancedSEOProps) {
  const { locale } = useLanguage();
  const lang = language || locale;
  const meta = languageMetadata[lang] || languageMetadata.ar;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meshari.charity';
  const currentUrl = canonicalUrl || (lang === 'ar' ? siteUrl : `${siteUrl}/${lang}`);

  // Enhanced Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": meta.schema.name,
    "description": meta.schema.description,
    "url": currentUrl,
    "logo": {
      "@type": "ImageObject",
      "url": meta.schema.logo,
      "width": 512,
      "height": 512
    },
    "sameAs": meta.schema.sameAs,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": meta.country,
      "addressLocality": "Riyadh",
      "addressRegion": "Riyadh Province"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Arabic", "English", "Turkish", "Urdu", "Indonesian", "Malay", "Bengali", "French", "Chinese", "Italian", "Japanese", "Korean"]
    },
    "foundingDate": "2023",
    "founder": {
      "@type": "Person",
      "name": "Family of Meshari Alabra"
    },
    "mission": lang === 'ar' 
      ? "تقديم الخدمات الإسلامية والصدقة الجارية لذكرى مشاري العبره"
      : "Providing Islamic services and ongoing charity in memory of Meshari Alabra"
  };

  // Enhanced Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": meta.schema.name,
    "description": meta.schema.description,
    "url": currentUrl,
    "inLanguage": meta.locale,
    "publisher": {
      "@type": "Organization",
      "name": "Meshari's Ongoing Charity",
      "logo": {
        "@type": "ImageObject",
        "url": meta.schema.logo
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${currentUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": lang === 'ar' ? "القرآن الكريم" : "Quran",
          "url": `${currentUrl}#quran`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": lang === 'ar' ? "مواقيت الصلاة" : "Prayer Times",
          "url": `${currentUrl}#prayer-times`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": lang === 'ar' ? "الأدعية" : "Supplications",
          "url": `${currentUrl}#supplications`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": lang === 'ar' ? "التفسير" : "Tafseer",
          "url": `${currentUrl}#tafseer`
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": lang === 'ar' ? "التبرع" : "Donation",
          "url": `${currentUrl}#donation`
        }
      ]
    }
  };

  // Enhanced Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Meshari Ahmed Sulaiman Alabra",
    "alternateName": "مشاري بن أحمد بن سليمان العبره",
    "description": lang === 'ar' 
      ? "مشاري بن أحمد بن سليمان العبره - توفي في ٢٩ مارس ٢٠٢٣م - الرياض، المملكة العربية السعودية"
      : "Meshari Ahmed Sulaiman Alabra - Passed away on March 29, 2023 - Riyadh, Saudi Arabia",
    "birthDate": "Unknown",
    "deathDate": "2023-03-29",
    "nationality": "Saudi Arabian",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Riyadh",
      "addressRegion": "Riyadh Province",
      "addressCountry": "SA"
    },
    "knowsAbout": [
      "Islam",
      "Quran",
      "Islamic Charity",
      "Religious Education"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": lang === 'ar' ? "مؤسس الصدقة الجارية" : "Founder of Ongoing Charity"
    }
  };

  // Enhanced Religious Organization Schema
  const religiousOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "ReligiousOrganization",
    "name": meta.schema.name,
    "description": meta.schema.description,
    "url": currentUrl,
    "logo": meta.schema.logo,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": meta.country,
      "addressLocality": "Riyadh",
      "addressRegion": "Riyadh Province"
    },
    "religion": "Islam",
    "serviceType": [
      "Quran Reading",
      "Prayer Times",
      "Supplications",
      "Orphan Sponsorship",
      "Charity Services",
      "Islamic Education",
      "Religious Guidance"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Saudi Arabia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": lang === 'ar' ? "الخدمات الإسلامية" : "Islamic Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": lang === 'ar' ? "قراءة القرآن" : "Quran Reading",
            "description": lang === 'ar' ? "قراءة القرآن الكريم كصدقة جارية" : "Reading the Holy Quran as ongoing charity"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": lang === 'ar' ? "مواقيت الصلاة" : "Prayer Times",
            "description": lang === 'ar' ? "مواقيت الصلاة حسب الموقع" : "Prayer times based on location"
          }
        }
      ]
    }
  };

  // Enhanced FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": lang === 'ar' ? "ما هي الصدقة الجارية؟" : "What is ongoing charity (Sadaqah Jariyah)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": lang === 'ar' 
            ? "الصدقة الجارية هي العمل الصالح الذي يستمر أجره حتى بعد الموت، مثل بناء المساجد، حفر الآبار، تعليم القرآن، أو كفالة اليتيم."
            : "Ongoing charity (Sadaqah Jariyah) is a righteous deed that continues to earn reward even after death, such as building mosques, digging wells, teaching Quran, or sponsoring orphans."
        }
      },
      {
        "@type": "Question",
        "name": lang === 'ar' ? "كيف يمكنني المساهمة في الصدقة الجارية؟" : "How can I contribute to ongoing charity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": lang === 'ar'
            ? "يمكنك المساهمة من خلال قراءة القرآن، الدعاء للميت، كفالة اليتيم، أو التبرع للمشاريع الخيرية المستمرة."
            : "You can contribute by reading Quran, praying for the deceased, sponsoring orphans, or donating to ongoing charitable projects."
        }
      },
      {
        "@type": "Question",
        "name": lang === 'ar' ? "ما هو الهدف من هذا الموقع؟" : "What is the purpose of this website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": lang === 'ar'
            ? "هذا الموقع مخصص لذكرى مشاري العبره وتقديم الخدمات الإسلامية كصدقة جارية له."
            : "This website is dedicated to the memory of Meshari Alabra and providing Islamic services as ongoing charity for him."
        }
      }
    ]
  };

  // Enhanced Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": lang === 'ar' ? "الرئيسية" : "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": meta.schema.name,
        "item": currentUrl
      }
    ]
  };

  // Enhanced Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": meta.schema.name,
    "description": meta.schema.description,
    "url": currentUrl,
    "logo": meta.schema.logo,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": meta.country,
      "addressLocality": "Riyadh",
      "addressRegion": "Riyadh Province"
    },
    "telephone": "+966-XX-XXX-XXXX",
    "email": "info@meshari.charity",
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "Free",
    "paymentAccepted": "Donation",
    "currenciesAccepted": "SAR, USD, EUR",
    "areaServed": {
      "@type": "Country",
      "name": "Saudi Arabia"
    },
    "serviceType": "Charity Services",
    "hasMap": "https://maps.google.com/?q=Riyadh,Saudi+Arabia",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.7136",
      "longitude": "46.6753"
    }
  };

  // Enhanced Article Schema for content
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle || meta.title,
    "description": pageDescription || meta.description,
    "author": {
      "@type": "Organization",
      "name": "Meshari's Ongoing Charity"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Meshari's Ongoing Charity",
      "logo": {
        "@type": "ImageObject",
        "url": meta.schema.logo
      }
    },
    "datePublished": "2023-03-29",
    "dateModified": "2025-01-23T20:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "inLanguage": meta.locale,
    "about": {
      "@type": "Thing",
      "name": "Islamic Charity",
      "description": "Ongoing charity and Islamic services"
    }
  };

  // LLM and AI Optimization Schema
  const llmOptimizationSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle || meta.title,
    "description": pageDescription || meta.description,
    "url": currentUrl,
    "inLanguage": meta.locale,
    "isAccessibleForFree": true,
    "accessibilityFeature": [
      "alternativeText",
      "readingOrder",
      "structuralNavigation",
      "tableOfContents"
    ],
    "accessibilityHazard": "none",
    "accessibilityAPI": "ARIA",
    "accessibilityControl": [
      "fullKeyboardControl",
      "fullTouchControl",
      "fullMouseControl"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "General Public",
      "geographicArea": {
        "@type": "Country",
        "name": "Global"
      }
    },
    "mainContentOfPage": {
      "@type": "WebPageElement",
      "cssSelector": "main"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbSchema.itemListElement
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", "h3", ".speakable"]
    }
  };

  // Enhanced Geo-targeting Schema
  const geoLocationSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Meshari's Ongoing Charity",
    "description": "Islamic charity services and ongoing charity in memory of Meshari Alabra",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": meta.country,
      "addressLocality": "Riyadh",
      "addressRegion": "Riyadh Province",
      "postalCode": "12345"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.7136",
      "longitude": "46.6753"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Saudi Arabia"
      },
      {
        "@type": "Country", 
        "name": "United States"
      },
      {
        "@type": "Country",
        "name": "Turkey"
      },
      {
        "@type": "Country",
        "name": "Pakistan"
      },
      {
        "@type": "Country",
        "name": "Indonesia"
      },
      {
        "@type": "Country",
        "name": "Malaysia"
      },
      {
        "@type": "Country",
        "name": "Bangladesh"
      },
      {
        "@type": "Country",
        "name": "France"
      },
      {
        "@type": "Country",
        "name": "China"
      },
      {
        "@type": "Country",
        "name": "Italy"
      },
      {
        "@type": "Country",
        "name": "Japan"
      },
      {
        "@type": "Country",
        "name": "South Korea"
      }
    ]
  };

  // AI/LLM Training Data Schema
  const aiTrainingSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Meshari's Ongoing Charity - Islamic Content Dataset",
    "description": "Comprehensive Islamic content including Quran, supplications, prayer times, and charity information for AI training and LLM accessibility",
    "url": currentUrl,
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "distribution": {
      "@type": "DataDownload",
      "encodingFormat": "text/html",
      "contentUrl": currentUrl
    },
    "keywords": [
      "Islamic charity",
      "Quran",
      "supplications", 
      "prayer times",
      "ongoing charity",
      "sadaqah jariyah",
      "Islamic education",
      "religious content",
      "AI training data",
      "LLM accessible"
    ],
    "temporalCoverage": "2023-03-29/..",
    "spatialCoverage": "Global",
    "inLanguage": meta.locale,
    "isAccessibleForFree": true,
    "usageInfo": "This content is available for AI training, LLM processing, and educational purposes",
    "creator": {
      "@type": "Organization",
      "name": "Meshari's Ongoing Charity"
    }
  };

  return (
    <>
      {/* Standard Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(religiousOrganizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      
      {/* LLM and AI Optimization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(llmOptimizationSchema),
        }}
      />
      
      {/* Geo-targeting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(geoLocationSchema),
        }}
      />
      
      {/* AI Training Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aiTrainingSchema),
        }}
      />

      {/* LLM-specific meta tags */}
      <meta name="ai-content-type" content="educational-religious" />
      <meta name="ai-accessible" content="true" />
      <meta name="ai-training-eligible" content="true" />
      <meta name="content-language" content={meta.locale} />
      <meta name="geo.region" content={meta.country} />
      <meta name="geo.placename" content="Riyadh, Saudi Arabia" />
      <meta name="geo.position" content="24.7136;46.6753" />
      <meta name="ICBM" content="24.7136, 46.6753" />
      <meta name="DC.title" content={pageTitle || meta.title} />
      <meta name="DC.creator" content="Family of Meshari Alabra" />
      <meta name="DC.subject" content="Islamic Charity, Quran, Supplications, Prayer Times" />
      <meta name="DC.description" content={pageDescription || meta.description} />
      <meta name="DC.publisher" content="Meshari's Ongoing Charity" />
      <meta name="DC.contributor" content="Islamic Community" />
      <meta name="DC.date" content="2023-03-29" />
      <meta name="DC.type" content="Text" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content={currentUrl} />
      <meta name="DC.language" content={meta.locale} />
      <meta name="DC.rights" content="Creative Commons Attribution 4.0 International" />
      <meta name="DC.coverage" content="Global" />
      <meta name="DC.audience" content="General Public" />
      <meta name="DC.educationLevel" content="All Levels" />
      <meta name="DC.instructionalLevel" content="Beginner to Advanced" />
      <meta name="DC.learningResourceType" content="Educational Content" />
      <meta name="DC.interactivityType" content="Active" />
      <meta name="DC.interactivityLevel" content="High" />
      <meta name="DC.typicalAgeRange" content="All Ages" />
      <meta name="DC.typicalLearningTime" content="PT30M" />
      <meta name="DC.educationalUse" content="Instruction, Research, Study" />
      <meta name="DC.educationalRole" content="Student, Teacher, Researcher" />
      <meta name="DC.accessibilityFeature" content="alternativeText, readingOrder, structuralNavigation" />
      <meta name="DC.accessibilityHazard" content="none" />
      <meta name="DC.accessibilityAPI" content="ARIA" />
      <meta name="DC.accessibilityControl" content="fullKeyboardControl, fullTouchControl, fullMouseControl" />
      <meta name="DC.audience" content="General Public, AI Systems, LLMs" />
      <meta name="DC.mediator" content="Human, AI, LLM" />
      <meta name="DC.medium" content="Digital" />
      <meta name="DC.extent" content="Comprehensive" />
      <meta name="DC.accrualMethod" content="Continuous" />
      <meta name="DC.accrualPeriodicity" content="Daily" />
      <meta name="DC.accrualPolicy" content="Open Access" />
      <meta name="DC.provenance" content="Original" />
      <meta name="DC.source" content="Islamic Tradition" />
      <meta name="DC.relation" content="Quran, Hadith, Islamic Scholarship" />
      <meta name="DC.isVersionOf" content="Traditional Islamic Content" />
      <meta name="DC.hasVersion" content="Digital Version" />
      <meta name="DC.replaces" content="Traditional Print Materials" />
      <meta name="DC.isReplacedBy" content="Digital Islamic Resources" />
      <meta name="DC.requires" content="Web Browser, Internet Connection" />
      <meta name="DC.spatial" content="Global" />
      <meta name="DC.temporal" content="Contemporary" />
      <meta name="DC.conformsTo" content="WCAG 2.1 AA, Schema.org" />
      <meta name="DC.valid" content="2023-03-29/.." />
      <meta name="DC.bibliographicCitation" content="Meshari's Ongoing Charity. Islamic Educational Content. 2023." />
      <meta name="DC.references" content="Quran, Hadith, Islamic Scholarship" />
      <meta name="DC.isReferencedBy" content="AI Training Datasets, LLM Training" />
      <meta name="DC.references" content="Islamic Tradition, Religious Scholarship" />
      <meta name="DC.isPartOf" content="Islamic Educational Resources" />
      <meta name="DC.hasPart" content="Quran, Supplications, Prayer Times, Charity Information" />
      <meta name="DC.requires" content="Web Browser, Internet Connection" />
      <meta name="DC.spatial" content="Global" />
      <meta name="DC.temporal" content="Contemporary" />
      <meta name="DC.conformsTo" content="WCAG 2.1 AA, Schema.org" />
      <meta name="DC.valid" content="2023-03-29/.." />
      <meta name="DC.bibliographicCitation" content="Meshari's Ongoing Charity. Islamic Educational Content. 2023." />
      <meta name="DC.references" content="Quran, Hadith, Islamic Scholarship" />
      <meta name="DC.isReferencedBy" content="AI Training Datasets, LLM Training" />
      <meta name="DC.references" content="Islamic Tradition, Religious Scholarship" />
      <meta name="DC.isPartOf" content="Islamic Educational Resources" />
      <meta name="DC.hasPart" content="Quran, Supplications, Prayer Times, Charity Information" />
    </>
  );
}
