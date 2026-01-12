import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { AthanPreferencesService, ATHAN_RECITERS, AthanReciter } from '../services/AthanService';
import { Ionicons } from '@expo/vector-icons';
import { AudioService } from '../services/AudioService';

export function AthanPreferencesScreen() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const [selectedReciter, setSelectedReciter] = useState<string>(ATHAN_RECITERS[0].id);
  const [loading, setLoading] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    loadSelectedReciter();
  }, []);

  const loadSelectedReciter = async () => {
    const reciterId = await AthanPreferencesService.getSelectedReciter();
    setSelectedReciter(reciterId);
  };

  const handleSelectReciter = async (reciter: AthanReciter) => {
    setSelectedReciter(reciter.id);
    await AthanPreferencesService.setSelectedReciter(reciter.id);
  };

  const handlePlayPreview = async (reciter: AthanReciter) => {
    if (playingId === reciter.id) {
      // Stop if already playing
      AudioService.getInstance().stopAthan();
      setPlayingId(null);
      return;
    }

    setPlayingId(reciter.id);
    setLoading(true);

    try {
      const { Audio } = require('expo-av');
      const { sound } = await Audio.Sound.createAsync(
        { uri: reciter.url },
        { shouldPlay: true, volume: 0.5 }
      );

      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.isLoaded && status.didJustFinish) {
          setPlayingId(null);
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error playing preview:', error);
      setPlayingId(null);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.secondary }]}>
        <Ionicons name="musical-notes-outline" size={24} color={colors.gold} />
        <Text style={[styles.title, { color: colors.foreground }]}>
          {t('settings.athan_preferences') || 'Athan Sound Preferences'}
        </Text>
      </View>

      <View style={styles.recitersList}>
        {ATHAN_RECITERS.map((reciter) => (
          <TouchableOpacity
            key={reciter.id}
            onPress={() => handleSelectReciter(reciter)}
            style={[
              styles.reciterCard,
              {
                backgroundColor: colors.secondary,
                borderColor: selectedReciter === reciter.id ? colors.gold : 'transparent',
                borderWidth: selectedReciter === reciter.id ? 2 : 0,
              },
            ]}
          >
            <View style={styles.reciterInfo}>
              <Text style={[styles.reciterName, { color: colors.foreground }]}>
                {reciter.name}
              </Text>
              <Text style={[styles.reciterNameArabic, { color: colors.gold }]}>
                {reciter.nameArabic}
              </Text>
            </View>

            <View style={styles.reciterActions}>
              {selectedReciter === reciter.id && (
                <Ionicons name="checkmark-circle" size={24} color={colors.gold} />
              )}
              <TouchableOpacity
                onPress={() => handlePlayPreview(reciter)}
                style={[styles.playButton, { backgroundColor: colors.gold }]}
                disabled={loading}
              >
                {playingId === reciter.id ? (
                  <Ionicons name="stop" size={20} color="#0F172A" />
                ) : (
                  <Ionicons name="play" size={20} color="#0F172A" />
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.infoBox, { backgroundColor: colors.secondary }]}>
        <Ionicons name="information-circle-outline" size={20} color={colors.gold} />
        <Text style={[styles.infoText, { color: colors.foreground }]}>
          {t('settings.athan_info') || 'Select your preferred athan reciter. The selected reciter will be used for prayer time notifications.'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  recitersList: {
    gap: 12,
    marginBottom: 20,
  },
  reciterCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  reciterInfo: {
    flex: 1,
  },
  reciterName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  reciterNameArabic: {
    fontSize: 14,
  },
  reciterActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
