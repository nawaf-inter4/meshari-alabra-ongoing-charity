import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Section {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

export function SectionNavigation() {
  const { t, locale } = useLanguage();
  const { colors } = useTheme();
  const router = useRouter();

  const sections: Section[] = [
    { id: 'quran', title: t('quran.title'), icon: 'book-outline', route: `/${locale}/sections/quran` },
    { id: 'tafseer', title: t('tafseer.title'), icon: 'library-outline', route: `/${locale}/sections/tafseer` },
    { id: 'dhikr', title: t('dhikr.title'), icon: 'heart-outline', route: `/${locale}/sections/dhikr` },
    { id: 'prayer-times', title: t('prayer.title'), icon: 'time-outline', route: `/${locale}/sections/prayer-times` },
    { id: 'qibla', title: t('qibla.title'), icon: 'compass-outline', route: `/${locale}/sections/qibla` },
    { id: 'supplications', title: t('supplications.title'), icon: 'star-outline', route: `/${locale}/sections/supplications` },
    { id: 'hadith', title: t('hadith.title'), icon: 'shield-outline', route: `/${locale}/sections/hadith` },
    { id: 'youtube', title: t('youtube.title'), icon: 'logo-youtube', route: `/${locale}/sections/youtube` },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <Text style={[styles.title, { color: colors.foreground }]}>
        {t('navigation.sections_title') || 'Explore Sections'}
      </Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            onPress={() => router.push(section.route as any)}
            style={[styles.sectionCard, { backgroundColor: colors.background }]}
          >
            <Ionicons name={section.icon} size={32} color={colors.gold} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]} numberOfLines={2}>
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 4,
    gap: 12,
  },
  sectionCard: {
    width: 100,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
});
