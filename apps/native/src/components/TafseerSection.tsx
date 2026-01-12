import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

interface Tafseer {
  surah: number;
  ayah: number;
  text: string;
  translation: string;
}

export function TafseerSection() {
  const { t, locale } = useLanguage();
  const { colors } = useTheme();
  const [tafseer, setTafseer] = useState<Tafseer | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTafseer = async (surah: number, ayah: number) => {
    setLoading(true);
    try {
      // Using Al-Quran Cloud API for tafseer
      const response = await fetch(
        `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/${locale === 'ar' ? 'ar' : 'en.asad'}`
      );
      const data = await response.json();
      
      if (data.code === 200 && data.data) {
        setTafseer({
          surah,
          ayah,
          text: data.data.text,
          translation: data.data.translation || '',
        });
      }
    } catch (error) {
      console.error('Error fetching tafseer:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load random tafseer on mount
  useEffect(() => {
    const randomSurah = Math.floor(Math.random() * 114) + 1;
    const randomAyah = Math.floor(Math.random() * 20) + 1;
    fetchTafseer(randomSurah, randomAyah);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.header}>
        <Ionicons name="book-outline" size={24} color={colors.gold} />
        <Text style={[styles.title, { color: colors.foreground }]}>
          {t('tafseer.title') || 'Tafseer'}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.gold} style={styles.loader} />
      ) : tafseer ? (
        <ScrollView style={styles.content}>
          <View style={[styles.verseCard, { backgroundColor: colors.background }]}>
            <Text style={[styles.verseNumber, { color: colors.gold }]}>
              {t('quran.surah')} {tafseer.surah}, {t('quran.ayah')} {tafseer.ayah}
            </Text>
            <Text style={[styles.verseText, { color: colors.foreground }]}>
              {tafseer.text}
            </Text>
            {tafseer.translation && (
              <Text style={[styles.translation, { color: colors.foreground, opacity: 0.8 }]}>
                {tafseer.translation}
              </Text>
            )}
          </View>
        </ScrollView>
      ) : (
        <Text style={[styles.errorText, { color: colors.foreground }]}>
          {t('common.error_loading') || 'Error loading tafseer'}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => {
          const randomSurah = Math.floor(Math.random() * 114) + 1;
          const randomAyah = Math.floor(Math.random() * 20) + 1;
          fetchTafseer(randomSurah, randomAyah);
        }}
        style={[styles.refreshButton, { backgroundColor: colors.gold }]}
      >
        <Ionicons name="refresh" size={20} color="#0F172A" />
        <Text style={styles.refreshButtonText}>
          {t('common.refresh') || 'Refresh'}
        </Text>
      </TouchableOpacity>
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
  },
  loader: {
    marginVertical: 40,
  },
  content: {
    maxHeight: 300,
  },
  verseCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  verseNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  verseText: {
    fontSize: 18,
    lineHeight: 32,
    textAlign: 'right',
    marginBottom: 12,
  },
  translation: {
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  errorText: {
    textAlign: 'center',
    marginVertical: 20,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  refreshButtonText: {
    color: '#0F172A',
    fontWeight: '600',
  },
});
