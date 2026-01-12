import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

export function HeroSection() {
  const { t } = useLanguage();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.content}>
        <Ionicons name="heart" size={48} color={colors.gold} />
        <Text style={[styles.title, { color: colors.foreground }]}>
          {t('hero.title')}
        </Text>
        <Text style={[styles.subtitle, { color: colors.foreground, opacity: 0.8 }]}>
          {t('hero.subtitle') || 'Ongoing charity for Meshari bin Ahmed bin Suleiman Al-Abra (May Allah have mercy on him)'}
        </Text>
        <View style={[styles.badge, { backgroundColor: colors.gold }]}>
          <Text style={styles.badgeText}>
            {t('hero.charity') || 'Ongoing Charity'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF37',
  },
  content: {
    alignItems: 'center',
    maxWidth: 600,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  badge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  badgeText: {
    color: '#0F172A',
    fontWeight: '600',
    fontSize: 14,
  },
});
