import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../src/providers/LanguageProvider';
import { useTheme } from '../src/providers/ThemeProvider';
import { useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WatchScreen() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const isSmallWatch = width < 200;

  // Watch-optimized compact UI
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { backgroundColor: colors.secondary }]}>
          <Ionicons name="heart" size={isSmallWatch ? 20 : 24} color={colors.gold} />
          <Text style={[styles.title, { color: colors.gold, fontSize: isSmallWatch ? 14 : 16 }]}>
            {t('hero.title')}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontSize: isSmallWatch ? 12 : 14 }]}>
            {t('prayer_times.title')}
          </Text>
          <Text style={[styles.cardValue, { color: colors.gold, fontSize: isSmallWatch ? 16 : 18 }]}>
            {t('prayer_times.fajr')}: 05:30
          </Text>
          <Text style={[styles.cardValue, { color: colors.foreground, fontSize: isSmallWatch ? 14 : 16 }]}>
            {t('prayer_times.dhuhr')}: 12:15
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontSize: isSmallWatch ? 12 : 14 }]}>
            {t('dhikr.title')}
          </Text>
          <TouchableOpacity
            style={[styles.dhikrButton, { backgroundColor: colors.gold, minHeight: isSmallWatch ? 36 : 44 }]}
          >
            <Text style={[styles.dhikrText, { color: '#0F172A', fontSize: isSmallWatch ? 14 : 16 }]}>
              سُبْحَانَ اللَّهِ
            </Text>
            <Text style={[styles.dhikrCount, { color: '#0F172A', fontSize: isSmallWatch ? 18 : 24 }]}>
              0
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.footer, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.footerText, { color: colors.foreground, opacity: 0.7, fontSize: isSmallWatch ? 10 : 12 }]}>
            {t('hero.charity') || 'Ongoing Charity'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 12,
    gap: 12,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardValue: {
    marginVertical: 4,
    textAlign: 'center',
  },
  dhikrButton: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  dhikrText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dhikrCount: {
    fontWeight: 'bold',
  },
  footer: {
    padding: 8,
    borderRadius: 8,
    width: '100%',
  },
  footerText: {
    textAlign: 'center',
  },
});
