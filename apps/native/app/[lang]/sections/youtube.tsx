import { YouTubeSection } from '../../../src/components/YouTubeSection';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../src/providers/ThemeProvider';

export default function YouTubePage() {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <YouTubeSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
