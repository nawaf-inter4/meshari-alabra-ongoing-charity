import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const isTablet = width >= 768;
export const isPhone = width < 768;
// @ts-ignore - Platform.isTV may not be in types but exists at runtime
export const isTV = (Platform.OS as string) === 'tv' || (Platform as any).isTV === true;
// @ts-ignore - watchos may not be in types but exists at runtime
export const isWatch = (Platform.OS as string) === 'watchos';

export const screenWidth = width;
export const screenHeight = height;

// Responsive font sizes
export const fontSize = {
  xs: isTablet ? 12 : 10,
  sm: isTablet ? 14 : 12,
  base: isTablet ? 16 : 14,
  lg: isTablet ? 18 : 16,
  xl: isTablet ? 20 : 18,
  '2xl': isTablet ? 24 : 20,
  '3xl': isTablet ? 32 : 24,
  '4xl': isTablet ? 40 : 28,
};

// Responsive spacing
export const spacing = {
  xs: isTablet ? 8 : 4,
  sm: isTablet ? 12 : 8,
  md: isTablet ? 16 : 12,
  lg: isTablet ? 24 : 16,
  xl: isTablet ? 32 : 24,
  '2xl': isTablet ? 48 : 32,
};

// Responsive component sizes
export const sizes = {
  buttonHeight: isTablet ? 56 : 44,
  inputHeight: isTablet ? 52 : 44,
  iconSize: {
    sm: isTablet ? 20 : 16,
    md: isTablet ? 24 : 20,
    lg: isTablet ? 32 : 24,
    xl: isTablet ? 48 : 32,
  },
  touchTarget: isTablet ? 56 : 44, // Minimum touch target
};

// TV-specific sizes
export const tvSizes = {
  buttonHeight: 80,
  fontSize: {
    base: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
    '3xl': 56,
  },
  spacing: {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  },
  touchTarget: 100, // Large touch targets for TV remote
};

// Watch-specific sizes
export const watchSizes = {
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
  },
  spacing: {
    xs: 4,
    sm: 6,
    md: 8,
  },
  touchTarget: 44,
};
