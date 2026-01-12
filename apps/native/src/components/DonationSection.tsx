import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

const DONATION_URL = 'https://ehsan.sa/campaign/6FC11E15DA';

export function DonationSection() {
  const { t } = useLanguage();
  const { colors } = useTheme();

  const handleDonate = async () => {
    const supported = await Linking.canOpenURL(DONATION_URL);
    if (supported) {
      await Linking.openURL(DONATION_URL);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.header}>
        <Ionicons name="heart-outline" size={24} color={colors.gold} />
        <Text style={[styles.title, { color: colors.foreground }]}>
          {t('sections.donation.title')}
        </Text>
      </View>

      <Text style={[styles.description, { color: colors.foreground }]}>
        {t('sections.donation.description')}
      </Text>

      <TouchableOpacity
        onPress={handleDonate}
        style={[styles.donateButton, { backgroundColor: colors.gold }]}
      >
        <Ionicons name="gift-outline" size={20} color="#0F172A" />
        <Text style={styles.donateButtonText}>
          {t('sections.donation.button')}
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
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  donateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  donateButtonText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
