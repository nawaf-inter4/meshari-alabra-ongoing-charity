import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

interface Hadith {
  arabic: string;
  translation: string;
  source: string;
}

const hadiths: Hadith[] = [
  {
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
    translation: 'Actions are but by intention',
    source: 'Sahih al-Bukhari 1',
  },
  {
    arabic: 'مَنْ سَنَّ فِي الإِسْلامِ سُنَّةً حَسَنَةً',
    translation: 'Whoever introduces a good practice in Islam',
    source: 'Sahih Muslim 1017',
  },
  {
    arabic: 'لاَ ضَرَرَ وَلاَ ضِرَارَ',
    translation: 'There should be neither harming nor reciprocating harm',
    source: 'Sunan Ibn Majah 2340',
  },
];

export function HadithSection() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const [currentHadith, setCurrentHadith] = useState(
    hadiths[Math.floor(Math.random() * hadiths.length)]
  );

  const getRandomHadith = () => {
    const randomIndex = Math.floor(Math.random() * hadiths.length);
    setCurrentHadith(hadiths[randomIndex]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.header}>
        <Ionicons name="library-outline" size={24} color={colors.gold} />
        <Text style={[styles.title, { color: colors.foreground }]}>
          {t('sections.hadith.title')}
        </Text>
        <TouchableOpacity onPress={getRandomHadith}>
          <Ionicons name="refresh-outline" size={24} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      <View style={styles.hadithContainer}>
        <Text style={[styles.arabicText, { color: colors.gold }]}>
          {currentHadith.arabic}
        </Text>
        <Text style={[styles.translationText, { color: colors.foreground }]}>
          {currentHadith.translation}
        </Text>
        <Text style={[styles.sourceText, { color: colors.foreground + '80' }]}>
          {currentHadith.source}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  hadithContainer: {
    padding: 16,
    borderRadius: 8,
  },
  arabicText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
    lineHeight: 32,
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  sourceText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});
