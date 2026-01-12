import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

export function MeshariFavoriteReciter() {
  const { t } = useLanguage();
  const { colors } = useTheme();

  const handleOpenPlaylist = async () => {
    const url = 'https://youtube.com/playlist?list=PL5YnzBdhLdkXy12BLR-2mjj9qrPg4QL-N';
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
          {t('meshari_favorite_reciter.title') || "Meshari's Favorite Reciter"}
        </Text>
      </View>

      <Text style={[styles.description, { color: colors.foreground, opacity: 0.8 }]}>
        {t('meshari_favorite_reciter.subtitle') || 'Listen to beautiful Quran recitations'}
      </Text>

      <TouchableOpacity
        onPress={handleOpenPlaylist}
        style={[styles.playlistButton, { backgroundColor: colors.gold }]}
      >
        <Ionicons name="play-circle" size={24} color="#0F172A" />
        <Text style={styles.playlistButtonText}>
          {t('youtube.view_playlist') || 'View Playlist'}
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
  playlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  playlistButtonText: {
    color: '#0F172A',
    fontWeight: '600',
    fontSize: 16,
  },
});
