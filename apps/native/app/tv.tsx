import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLanguage } from '../src/providers/LanguageProvider';
import { useTheme } from '../src/providers/ThemeProvider';
import { PrayerTimesSection } from '../src/components/PrayerTimesSection';
import { QiblaFinder } from '../src/components/QiblaFinder';
import { QuranSection } from '../src/components/QuranSection';
import { DhikrCounter } from '../src/components/DhikrCounter';
import { DonationSection } from '../src/components/DonationSection';
import { useRouter } from 'expo-router';
import { useWindowDimensions } from 'react-native';

export default function TVScreen() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isLargeTV = width > 1920;

  // TV-optimized navigation with large touch targets
  const sections = [
    { id: 'prayer-times', label: t('prayer_times.title'), component: PrayerTimesSection },
    { id: 'qibla', label: t('qibla.title'), component: QiblaFinder },
    { id: 'quran', label: t('quran.title'), component: QuranSection },
    { id: 'dhikr', label: t('dhikr.title'), component: DhikrCounter },
    { id: 'donation', label: t('donation.title'), component: DonationSection },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.secondary }]}>
        <Text style={[styles.title, { color: colors.foreground, fontSize: isLargeTV ? 48 : 36 }]}>
          {t('hero.title')}
        </Text>
        <Text style={[styles.subtitle, { color: colors.foreground, opacity: 0.8, fontSize: isLargeTV ? 24 : 20 }]}>
          {t('hero.subtitle') || 'TV Experience'}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { padding: isLargeTV ? 48 : 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section) => (
          <Pressable
            key={section.id}
            style={({ pressed }) => [
              styles.sectionCard,
              {
                backgroundColor: colors.secondary,
                minHeight: isLargeTV ? 400 : 300,
                padding: isLargeTV ? 32 : 24,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
            onPress={() => {
              // Navigate to section detail on TV
              router.push(`/sections/${section.id}` as any);
            }}
          >
            <Text style={[styles.sectionTitle, { color: colors.gold, fontSize: isLargeTV ? 32 : 24 }]}>
              {section.label}
            </Text>
            <View style={styles.sectionContent}>
              {section.id === 'prayer-times' && <PrayerTimesSection />}
              {section.id === 'qibla' && <QiblaFinder />}
              {section.id === 'quran' && <QuranSection />}
              {section.id === 'dhikr' && <DhikrCounter />}
              {section.id === 'donation' && <DonationSection />}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 32,
    paddingTop: 80,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#D4AF37',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 32,
  },
  sectionCard: {
    borderRadius: 20,
    marginBottom: 24,
    // Large touch target for TV remote
    minHeight: 300,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionContent: {
    flex: 1,
  },
});
