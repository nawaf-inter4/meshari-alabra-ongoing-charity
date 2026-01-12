import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { isTablet, isTV, fontSize, spacing, sizes, tvSizes } from '../utils/responsive';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
}

export function QuranSection() {
  const { t, locale } = useLanguage();
  const { colors } = useTheme();
  const windowWidth = useWindowDimensions().width;
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurahs();
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      fetchVerses(selectedSurah.number);
    }
  }, [selectedSurah]);

  const fetchSurahs = async () => {
    try {
      const response = await fetch('https://api.alquran.cloud/v1/surah');
      const data = await response.json();
      setSurahs(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching surahs:', error);
      setLoading(false);
    }
  };

  const fetchVerses = async (surahNumber: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/${locale === 'ar' ? 'ar.asad' : 'en.asad'}`
      );
      const data = await response.json();
      setVerses(data.data.ayahs || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching verses:', error);
      setLoading(false);
    }
  };

  // Responsive styles
  const dynamicStyles = {
    container: {
      padding: isTV ? tvSizes.spacing.lg : (isTablet ? spacing.lg : spacing.md),
      borderRadius: isTablet ? 16 : 12,
    },
    title: {
      fontSize: isTV ? tvSizes.fontSize.lg : (isTablet ? fontSize.xl : fontSize.lg),
    },
    surahItem: {
      padding: isTV ? tvSizes.spacing.md : (isTablet ? spacing.md : spacing.sm),
      minHeight: isTV ? tvSizes.touchTarget : sizes.touchTarget,
    },
    surahText: {
      fontSize: isTV ? tvSizes.fontSize.base : (isTablet ? fontSize.base : fontSize.sm),
    },
    verseText: {
      fontSize: isTV ? tvSizes.fontSize.base : (isTablet ? fontSize.lg : fontSize.base),
    },
  };

  if (loading && surahs.length === 0) {
    return (
      <View style={[styles.container, dynamicStyles.container, { backgroundColor: colors.secondary }]}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  if (selectedSurah) {
    return (
      <View style={[styles.container, dynamicStyles.container, { backgroundColor: colors.secondary }]}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => setSelectedSurah(null)}
            style={[styles.backButton, { minHeight: dynamicStyles.surahItem.minHeight }]}
          >
            <Ionicons name="arrow-back" size={isTV ? 32 : (isTablet ? 28 : 24)} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={[styles.surahTitle, dynamicStyles.title, { color: colors.foreground }]}>
            {selectedSurah.name}
          </Text>
          <View style={{ width: isTV ? 32 : (isTablet ? 28 : 24) }} />
        </View>

        <ScrollView style={styles.versesContainer} showsVerticalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.gold} />
          ) : (
            verses.map((verse, index) => (
              <View key={index} style={[styles.verseCard, { backgroundColor: colors.background }]}>
                <View style={[styles.verseNumber, { backgroundColor: colors.gold }]}>
                  <Text style={styles.verseNumberText}>{verse.number}</Text>
                </View>
                <Text style={[styles.verseText, dynamicStyles.verseText, { color: colors.foreground }]}>
                  {verse.text}
                </Text>
                {verse.translation && (
                  <Text style={[styles.translation, { color: colors.foreground, opacity: 0.8, fontSize: dynamicStyles.surahText.fontSize }]}>
                    {verse.translation}
                  </Text>
                )}
              </View>
            ))
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, dynamicStyles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.header}>
        <Ionicons name="book-outline" size={isTV ? 32 : (isTablet ? 28 : 24)} color={colors.gold} />
        <Text style={[styles.title, dynamicStyles.title, { color: colors.foreground }]}>
          {t('quran.title')}
        </Text>
      </View>

      <ScrollView style={styles.surahsList} showsVerticalScrollIndicator={false}>
        {surahs.map((surah) => (
          <TouchableOpacity
            key={surah.number}
            onPress={() => setSelectedSurah(surah)}
            style={[
              styles.surahItem,
              dynamicStyles.surahItem,
              { backgroundColor: colors.background },
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.surahNumber}>
              <Text style={[styles.surahNumberText, { color: colors.gold }]}>
                {surah.number}
              </Text>
            </View>
            <View style={styles.surahInfo}>
              <Text style={[styles.surahName, dynamicStyles.surahText, { color: colors.foreground }]}>
                {surah.englishName}
              </Text>
              <Text style={[styles.surahAyahs, { color: colors.foreground, opacity: 0.7, fontSize: dynamicStyles.surahText.fontSize - 2 }]}>
                {surah.numberOfAyahs} {t('quran.ayahs')}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={isTablet ? 24 : 20} color={colors.foreground} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  backButton: {
    padding: 8,
    justifyContent: 'center',
  },
  surahTitle: {
    flex: 1,
    textAlign: 'center',
  },
  surahsList: {
    maxHeight: 400,
  },
  surahItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 4,
    gap: 12,
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surahNumberText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  surahInfo: {
    flex: 1,
  },
  surahName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  surahAyahs: {
    fontWeight: '400',
  },
  versesContainer: {
    maxHeight: 600,
  },
  verseCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  verseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  verseNumberText: {
    color: '#0F172A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  verseText: {
    lineHeight: 32,
    textAlign: 'right',
    marginBottom: 8,
  },
  translation: {
    lineHeight: 22,
    fontStyle: 'italic',
  },
});
