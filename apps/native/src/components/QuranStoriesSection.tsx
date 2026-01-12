import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

interface Story {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
}

export function QuranStoriesSection() {
  const { t, locale } = useLanguage();
  const { colors } = useTheme();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Sample stories - in production, these would come from API or assets
  const stories: Story[] = [
    {
      id: '1',
      title: t('quran_stories.story_1_title') || 'Story of Prophet Adam',
      description: t('quran_stories.story_1_desc') || 'The creation of Adam',
      pdfUrl: 'https://meshari.charity/stories/story1.pdf',
    },
    {
      id: '2',
      title: t('quran_stories.story_2_title') || 'Story of Prophet Noah',
      description: t('quran_stories.story_2_desc') || 'The great flood',
      pdfUrl: 'https://meshari.charity/stories/story2.pdf',
    },
  ];

  const handleOpenStory = async (story: Story) => {
    const supported = await Linking.canOpenURL(story.pdfUrl);
    if (supported) {
      await Linking.openURL(story.pdfUrl);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.header}>
        <Ionicons name="book-outline" size={24} color={colors.gold} />
        <Text style={[styles.title, { color: colors.foreground }]}>
          {t('quran_stories.title') || 'Quran Stories'}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesList}>
        {stories.map((story) => (
          <TouchableOpacity
            key={story.id}
            onPress={() => handleOpenStory(story)}
            style={[styles.storyCard, { backgroundColor: colors.background }]}
          >
            <Ionicons name="document-text-outline" size={32} color={colors.gold} />
            <Text style={[styles.storyTitle, { color: colors.foreground }]} numberOfLines={2}>
              {story.title}
            </Text>
            <Text style={[styles.storyDesc, { color: colors.foreground, opacity: 0.7 }]} numberOfLines={2}>
              {story.description}
            </Text>
            <View style={[styles.readButton, { backgroundColor: colors.gold }]}>
              <Ionicons name="open-outline" size={16} color="#0F172A" />
              <Text style={styles.readButtonText}>
                {t('common.read') || 'Read'}
              </Text>
            </View>
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
  storiesList: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  storyCard: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  storyDesc: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  readButtonText: {
    color: '#0F172A',
    fontWeight: '600',
    fontSize: 12,
  },
});
