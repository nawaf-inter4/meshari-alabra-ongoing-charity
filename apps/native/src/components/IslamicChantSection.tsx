import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

export function IslamicChantSection() {
  const { t } = useLanguage();
  const { colors } = useTheme();

  const handleOpenVideo = async () => {
    const url = 'https://www.youtube.com/watch?v=1yP3UPr-L20';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.header}>
        <Ionicons name="musical-notes-outline" size={24} color={colors.gold} />
        <Text style={[styles.title, { color: colors.foreground }]}>
          {t('islamic_chant.title') || 'Islamic Chant'}
        </Text>
      </View>

      <Text style={[styles.description, { color: colors.foreground, opacity: 0.8 }]}>
        {t('islamic_chant.subtitle') || 'Beautiful Islamic chants'}
      </Text>

      <TouchableOpacity
        onPress={handleOpenVideo}
        style={[styles.playButton, { backgroundColor: colors.gold }]}
      >
        <Ionicons name="play-circle" size={24} color="#0F172A" />
        <Text style={styles.playButtonText}>
          {t('common.play') || 'Play'}
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
    alignItems: 'center',
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
    textAlign: 'center',
    marginBottom: 16,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  playButtonText: {
    color: '#0F172A',
    fontWeight: '600',
    fontSize: 16,
  },
});
