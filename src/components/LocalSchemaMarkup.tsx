"use client";

import { useLanguage } from "./LanguageProvider";
import { languageMetadata } from "@/lib/metadata";

interface LocalSchemaMarkupProps {
  language?: string;
}

export default function LocalSchemaMarkup({ language }: LocalSchemaMarkupProps) {
  const { locale } = useLanguage();
  const lang = language || locale;
  const meta = languageMetadata[lang] || languageMetadata.ar;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://meshari.charity';
  const currentUrl = lang === 'ar' ? siteUrl : `${siteUrl}/${lang}`;

  // Organization Schema
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
    }
  };

  // Website Schema
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
    }
  };

  // Person Schema (for Meshari)
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
    }
  };

  // Religious Organization Schema
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
      "Charity Services"
    ]
  };

  // Breadcrumb Schema
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

  // FAQ Schema
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
      }
    ]
  };

  // Local Business Schema (for charity services)
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
    "serviceType": "Charity Services"
  };

  return (
    <>
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
    </>
  );
}
