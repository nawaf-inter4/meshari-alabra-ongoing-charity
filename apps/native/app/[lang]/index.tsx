import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useLanguage } from '../../src/providers/LanguageProvider';
import { useTheme } from '../../src/providers/ThemeProvider';
import { isTablet, isTV, spacing, fontSize } from '../../src/utils/responsive';
import { HeroSection } from '../../src/components/HeroSection';
import { PrayerTimesSection } from '../../src/components/PrayerTimesSection';
import { QiblaFinder } from '../../src/components/QiblaFinder';
import { DhikrCounter } from '../../src/components/DhikrCounter';
import { QuranSection } from '../../src/components/QuranSection';
import { TafseerSection } from '../../src/components/TafseerSection';
import { YouTubeSection } from '../../src/components/YouTubeSection';
import { DonationSection } from '../../src/components/DonationSection';
import { SupplicationsSection } from '../../src/components/SupplicationsSection';
import { HadithSection } from '../../src/components/HadithSection';
import { QuranStoriesSection } from '../../src/components/QuranStoriesSection';
import { MeshariFavoriteReciter } from '../../src/components/MeshariFavoriteReciter';
import { IslamicChantSection } from '../../src/components/IslamicChantSection';
import { SectionNavigation } from '../../src/components/SectionNavigation';
import { Footer } from '../../src/components/Footer';
import { LanguageSwitcher } from '../../src/components/LanguageSwitcher';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LangIndex() {
  const { locale, setLocale, t, direction } = useLanguage();
  const { colors } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  // Responsive padding and spacing
  const containerPadding = isTV ? spacing['2xl'] : (isTablet ? spacing.lg : spacing.md);
  const headerPadding = isTV ? spacing.xl : (isTablet ? spacing.lg : spacing.md);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.secondary, padding: headerPadding, paddingTop: isTV ? 80 : (isTablet ? 60 : 50) }]}>
        <Text style={[styles.title, { color: colors.foreground, fontSize: isTV ? 36 : (isTablet ? 24 : 20) }]}>
          {t('hero.title')}
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            style={[styles.settingsButton, { backgroundColor: colors.background }]}
          >
            <Ionicons name="settings-outline" size={20} color={colors.foreground} />
          </TouchableOpacity>
          <LanguageSwitcher />
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection />
        <QuranSection />
        <DonationSection />
        <YouTubeSection />
        <SupplicationsSection />
        <PrayerTimesSection />
        <TafseerSection />
        <HadithSection />
        <DhikrCounter />
        <QiblaFinder />
        <QuranStoriesSection />
        <MeshariFavoriteReciter />
        <IslamicChantSection />
        <SectionNavigation />
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF37',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
});
