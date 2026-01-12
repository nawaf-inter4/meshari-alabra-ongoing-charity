import { TafseerSection } from '../../../src/components/TafseerSection';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../src/providers/ThemeProvider';

export default function TafseerPage() {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TafseerSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
