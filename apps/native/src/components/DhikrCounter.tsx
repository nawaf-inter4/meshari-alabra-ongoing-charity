import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { isTablet, isTV, fontSize, spacing, sizes, tvSizes } from '../utils/responsive';

type DhikrType = 'subhanallah' | 'alhamdulillah' | 'allahuakbar';

export function DhikrCounter() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const windowWidth = useWindowDimensions().width;
  const [count, setCount] = useState(0);
  const [dhikrType, setDhikrType] = useState<DhikrType>('subhanallah');

  const dhikrTypes = [
    { key: 'subhanallah' as DhikrType, label: t('dhikr.subhanallah'), arabic: 'سُبْحَانَ اللَّهِ' },
    { key: 'alhamdulillah' as DhikrType, label: t('dhikr.alhamdulillah'), arabic: 'الْحَمْدُ لِلَّهِ' },
    { key: 'allahuakbar' as DhikrType, label: t('dhikr.allahuakbar'), arabic: 'اللَّهُ أَكْبَرُ' },
  ];

  const handleIncrement = async () => {
    const newCount = count + 1;
    setCount(newCount);

    // Haptic feedback
    if (newCount % 33 === 0) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleReset = () => {
    setCount(0);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const currentDhikr = dhikrTypes.find(d => d.key === dhikrType) || dhikrTypes[0];

  // Dynamic styles based on screen size
  const dynamicStyles = {
    container: {
      padding: isTV ? tvSizes.spacing.lg : (isTablet ? spacing.lg : spacing.md),
      borderRadius: isTablet ? 16 : 12,
    },
    title: {
      fontSize: isTV ? tvSizes.fontSize.lg : (isTablet ? fontSize.xl : fontSize.lg),
    },
    dhikrButton: {
      padding: isTV ? tvSizes.spacing.sm : (isTablet ? spacing.sm : 8),
      minWidth: isTV ? 120 : (isTablet ? 100 : 80),
      minHeight: isTV ? tvSizes.touchTarget : sizes.touchTarget,
    },
    dhikrButtonText: {
      fontSize: isTV ? tvSizes.fontSize.base : (isTablet ? fontSize.base : fontSize.sm),
    },
    arabicText: {
      fontSize: isTV ? tvSizes.fontSize['2xl'] : (isTablet ? fontSize['3xl'] : fontSize['2xl']),
    },
    countText: {
      fontSize: isTV ? tvSizes.fontSize['3xl'] : (isTablet ? fontSize['4xl'] : fontSize['3xl']),
    },
    labelText: {
      fontSize: isTV ? tvSizes.fontSize.base : (isTablet ? fontSize.lg : fontSize.base),
    },
    incrementButton: {
      width: isTV ? 100 : (isTablet ? 80 : 64),
      height: isTV ? 100 : (isTablet ? 80 : 64),
      borderRadius: isTV ? 50 : (isTablet ? 40 : 32),
    },
    resetButton: {
      padding: isTV ? tvSizes.spacing.md : (isTablet ? spacing.md : spacing.sm),
      minHeight: isTV ? tvSizes.touchTarget : sizes.touchTarget,
    },
    resetButtonText: {
      fontSize: isTV ? tvSizes.fontSize.base : (isTablet ? fontSize.base : fontSize.sm),
    },
    milestoneText: {
      fontSize: isTV ? tvSizes.fontSize.base : (isTablet ? fontSize.lg : fontSize.base),
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.header}>
        <Ionicons name="ellipse-outline" size={isTV ? 32 : (isTablet ? 28 : 24)} color={colors.gold} />
        <Text style={[styles.title, dynamicStyles.title, { color: colors.foreground }]}>
          {t('dhikr.title')}
        </Text>
      </View>

      <View style={styles.dhikrSelector}>
        {dhikrTypes.map((dhikr) => (
          <TouchableOpacity
            key={dhikr.key}
            onPress={() => {
              setDhikrType(dhikr.key);
              setCount(0);
            }}
            style={[
              styles.dhikrButton,
              dynamicStyles.dhikrButton,
              dhikrType === dhikr.key && { backgroundColor: colors.gold, opacity: 0.8 },
            ]}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.dhikrButtonText,
                dynamicStyles.dhikrButtonText,
                { color: dhikrType === dhikr.key ? '#0F172A' : colors.foreground },
              ]}
            >
              {dhikr.arabic}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.counterContainer}>
        <Text style={[styles.arabicText, dynamicStyles.arabicText, { color: colors.gold }]}>
          {currentDhikr.arabic}
        </Text>
        <Text style={[styles.countText, dynamicStyles.countText, { color: colors.foreground }]}>
          {count}
        </Text>
        <Text style={[styles.labelText, dynamicStyles.labelText, { color: colors.foreground }]}>
          {currentDhikr.label}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={handleIncrement}
          style={[styles.incrementButton, dynamicStyles.incrementButton, { backgroundColor: colors.gold }]}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={isTV ? 48 : (isTablet ? 36 : 32)} color="#0F172A" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleReset}
          style={[styles.resetButton, dynamicStyles.resetButton, { borderColor: colors.foreground }]}
          activeOpacity={0.7}
        >
          <Ionicons name="refresh-outline" size={isTV ? 32 : (isTablet ? 28 : 24)} color={colors.foreground} />
          <Text style={[styles.resetButtonText, dynamicStyles.resetButtonText, { color: colors.foreground }]}>
            {t('dhikr.reset')}
          </Text>
        </TouchableOpacity>
      </View>

      {count > 0 && count % 33 === 0 && (
        <View style={[styles.milestone, { backgroundColor: colors.gold }]}>
          <Text style={[styles.milestoneText, dynamicStyles.milestoneText, { color: '#0F172A' }]}>
            {t('dhikr.milestone')} {count}!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  dhikrSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  dhikrButton: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dhikrButtonText: {
    fontWeight: '500',
  },
  counterContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  arabicText: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  countText: {
    fontWeight: 'bold',
    marginVertical: 12,
  },
  labelText: {
    // Font size set dynamically
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 20,
  },
  incrementButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  resetButtonText: {
    fontWeight: '500',
  },
  milestone: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  milestoneText: {
    fontWeight: 'bold',
  },
});
