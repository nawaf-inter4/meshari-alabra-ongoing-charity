import { QuranSection } from '../../../src/components/QuranSection';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../src/providers/ThemeProvider';

export default function QuranPage() {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <QuranSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
