import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

interface Supplication {
  arabic: string;
  transliteration: string;
  translation: string;
  reference?: string;
}

const supplications: Supplication[] = [
  {
    arabic: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ',
    transliteration: 'Allahumma ighfir lahu warhamhu',
    translation: 'O Allah, forgive him and have mercy on him',
    reference: 'Sahih Muslim 963',
  },
  {
    arabic: 'رَبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ',
    transliteration: 'Rabbi ighfir warham wa anta khayru ar-rahimin',
    translation: 'My Lord, forgive and have mercy, and You are the best of the merciful',
  },
];

export function SupplicationsSection() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.header}>
        <Ionicons name="bookmark-outline" size={24} color={colors.gold} />
        <Text style={[styles.title, { color: colors.foreground }]}>
          {t('sections.supplications.title')}
        </Text>
      </View>

      <ScrollView style={styles.supplicationsList}>
        {supplications.map((supplication, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedIndex(index)}
            style={[
              styles.supplicationItem,
              selectedIndex === index && { backgroundColor: colors.gold + '20' },
            ]}
          >
            <Text style={[styles.arabicText, { color: colors.gold }]}>
              {supplication.arabic}
            </Text>
            <Text style={[styles.transliterationText, { color: colors.foreground + '80' }]}>
              {supplication.transliteration}
            </Text>
            <Text style={[styles.translationText, { color: colors.foreground }]}>
              {supplication.translation}
            </Text>
            {supplication.reference && (
              <Text style={[styles.referenceText, { color: colors.foreground + '60' }]}>
                {supplication.reference}
              </Text>
            )}
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
    maxHeight: 500,
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
  supplicationsList: {
    maxHeight: 400,
  },
  supplicationItem: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  arabicText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },
  transliterationText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
  },
  referenceText: {
    fontSize: 12,
    marginTop: 8,
  },
});
