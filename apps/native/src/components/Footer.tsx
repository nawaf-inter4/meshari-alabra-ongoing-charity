import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

export function Footer() {
  const { t, locale } = useLanguage();
  const { colors } = useTheme();
  const currentYear = new Date().getFullYear();

  const handleShare = async () => {
    // Native share functionality
    if (await Linking.canOpenURL('https://meshari.charity')) {
      // Use native share sheet
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.content}>
        <Text style={[styles.charityText, { color: colors.foreground }]}>
          {t('footer.charity') || 'Ongoing charity for Meshari bin Ahmed bin Suleiman Al-Abra (May Allah have mercy on him)'}
        </Text>
        
        <View style={styles.socialLinks}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://x.com/meshari_charity')}
            style={[styles.socialButton, { backgroundColor: colors.background }]}
          >
            <Ionicons name="logo-twitter" size={20} color={colors.foreground} />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => Linking.openURL('https://github.com/meshari-charity')}
            style={[styles.socialButton, { backgroundColor: colors.background }]}
          >
            <Ionicons name="logo-github" size={20} color={colors.foreground} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.copyright, { color: colors.foreground, opacity: 0.7 }]}>
          {t('footer.all_rights')?.replace('{{year}}', currentYear.toString()) || `All rights reserved © ${currentYear}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#D4AF37',
  },
  content: {
    alignItems: 'center',
    gap: 16,
  },
  charityText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyright: {
    fontSize: 12,
    textAlign: 'center',
  },
});
