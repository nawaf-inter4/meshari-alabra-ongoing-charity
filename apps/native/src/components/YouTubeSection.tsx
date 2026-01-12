import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

export function YouTubeSection() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  
  // Meshari's playlist videos
  const videos: Video[] = [
    {
      id: '1',
      title: 'Meshari Alafasy - Beautiful Recitation',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: '2',
      title: 'Islamic Lectures and Reminders',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
  ];

  const handleOpenVideo = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("Don't know how to open URI: " + url);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.header}>
        <Ionicons name="logo-youtube" size={24} color={colors.gold} />
        <Text style={[styles.title, { color: colors.foreground }]}>
          {t('youtube.title') || 'YouTube Playlist'}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {videos.map((video) => (
          <TouchableOpacity
            key={video.id}
            onPress={() => handleOpenVideo(video.url)}
            style={[styles.videoCard, { backgroundColor: colors.background }]}
          >
            <View style={[styles.thumbnail, { backgroundColor: colors.secondary }]}>
              <Ionicons name="play-circle" size={48} color={colors.gold} />
            </View>
            <Text style={[styles.videoTitle, { color: colors.foreground }]} numberOfLines={2}>
              {video.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => handleOpenVideo('https://www.youtube.com/playlist?list=PLozaqJ9egxJegXbK52PNLLlvWf4K5g-Cb')}
        style={[styles.playlistButton, { backgroundColor: colors.gold }]}
      >
        <Ionicons name="list" size={20} color="#0F172A" />
        <Text style={styles.playlistButtonText}>
          {t('youtube.view_playlist') || 'View Full Playlist'}
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
  scrollView: {
    marginBottom: 12,
  },
  videoCard: {
    width: 200,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTitle: {
    padding: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  playlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  playlistButtonText: {
    color: '#0F172A',
    fontWeight: '600',
  },
});
