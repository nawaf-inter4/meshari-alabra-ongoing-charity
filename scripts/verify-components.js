#!/usr/bin/env node

/**
 * Component Verification Script
 * Ensures all components are properly imported and exported
 */

const fs = require('fs');
const path = require('path');

// Define expected components
const expectedComponents = [
  'src/components/HomePage.tsx',
  'src/components/sections/HeroSection.tsx',
  'src/components/sections/YouTubePlaylist.tsx',
  'src/components/sections/DonationSection.tsx',
  'src/components/sections/PrayerTimesSection.tsx',
  'src/components/sections/SupplicationsSection.tsx',
  'src/components/sections/QuranSection.tsx',
  'src/components/sections/EnhancedQuranSection.tsx',
  'src/components/sections/TafseerSection.tsx',
  'src/components/sections/HadithSection.tsx',
  'src/components/sections/DhikrCounter.tsx',
  'src/components/sections/QiblaFinder.tsx',
  'src/components/sections/MeshariFavoriteReciter.tsx',
  'src/components/sections/QuranStoriesSection.tsx',
  'src/components/sections/IslamicChantSection.tsx',
  'src/components/sections/SectionNavigation.tsx',
  'src/components/Footer.tsx',
];

// Define expected translation files
const expectedTranslations = [
  'src/locales/ar.json',
  'src/locales/en.json',
  'src/locales/tr.json',
  'src/locales/ur.json',
  'src/locales/id.json',
  'src/locales/ms.json',
  'src/locales/bn.json',
  'src/locales/fr.json',
  'src/locales/zh.json',
  'src/locales/it.json',
  'src/locales/ja.json',
  'src/locales/ko.json',
];

console.log('🔍 Verifying component structure...\n');

let allComponentsExist = true;
let allTranslationsExist = true;

// Check components
console.log('📁 Checking components:');
expectedComponents.forEach(component => {
  const exists = fs.existsSync(component);
  console.log(`  ${exists ? '✅' : '❌'} ${component}`);
  if (!exists) allComponentsExist = false;
});

console.log('\n🌐 Checking translation files:');
expectedTranslations.forEach(translation => {
  const exists = fs.existsSync(translation);
  console.log(`  ${exists ? '✅' : '❌'} ${translation}`);
  if (!exists) allTranslationsExist = false;
});

// Check HomePage imports
console.log('\n🔗 Checking HomePage imports:');
try {
  const homePageContent = fs.readFileSync('src/components/HomePage.tsx', 'utf8');
  const expectedImports = [
    'MeshariFavoriteReciter',
    'HeroSection',
    'YouTubePlaylist',
    'DonationSection',
    'PrayerTimesSection',
    'SupplicationsSection',
    'QuranSection',
    'TafseerSection',
    'HadithSection',
    'DhikrCounter',
    'QiblaFinder',
    'Footer'
  ];

  expectedImports.forEach(importName => {
    const hasImport = homePageContent.includes(importName);
    console.log(`  ${hasImport ? '✅' : '❌'} ${importName}`);
    if (!hasImport) allComponentsExist = false;
  });
} catch (error) {
  console.log('  ❌ Could not read HomePage.tsx');
  allComponentsExist = false;
}

// Check translation keys
console.log('\n🔑 Checking critical translation keys:');
try {
  const arTranslations = JSON.parse(fs.readFileSync('src/locales/ar.json', 'utf8'));
  const criticalKeys = [
    'meshari_favorite_reciter.title',
    'meshari_favorite_reciter.subtitle',
    'quran.meshari_favorite',
    'navigation.sections_title',
    'navigation.sections_description'
  ];

  criticalKeys.forEach(key => {
    let hasKey;
    if (key.includes('.')) {
      // Handle nested keys
      const parts = key.split('.');
      if (parts.length === 2) {
        // Check if it's a nested object or a flat key with dots
        if (arTranslations[parts[0]] && typeof arTranslations[parts[0]] === 'object') {
          hasKey = arTranslations[parts[0]][parts[1]];
        } else {
          // It's a flat key with dots
          hasKey = arTranslations[key];
        }
      } else {
        hasKey = key.split('.').reduce((obj, k) => obj && obj[k], arTranslations);
      }
    } else {
      hasKey = arTranslations[key];
    }
    console.log(`  ${hasKey ? '✅' : '❌'} ${key} ${hasKey ? `(${hasKey})` : ''}`);
    if (!hasKey) allTranslationsExist = false;
  });
} catch (error) {
  console.log('  ❌ Could not read Arabic translations');
  allTranslationsExist = false;
}

// Final status
console.log('\n📊 Verification Summary:');
console.log(`  Components: ${allComponentsExist ? '✅ All present' : '❌ Missing components'}`);
console.log(`  Translations: ${allTranslationsExist ? '✅ All present' : '❌ Missing translations'}`);

if (allComponentsExist && allTranslationsExist) {
  console.log('\n🎉 All components and translations are properly configured!');
  process.exit(0);
} else {
  console.log('\n⚠️  Some components or translations are missing. Please check the output above.');
  process.exit(1);
}
