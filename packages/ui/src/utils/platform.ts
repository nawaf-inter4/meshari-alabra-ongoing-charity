// Platform detection utilities
export const Platform = {
  OS: typeof window !== 'undefined' ? 'web' : 'server',
  isWeb: typeof window !== 'undefined',
  isNative: false, // Will be true in React Native context
  isDesktop: false, // Will be true in Tauri context
};

// Check if running in React Native
if (typeof navigator !== 'undefined' && (navigator as any).product === 'ReactNative') {
  Platform.OS = 'native';
  Platform.isNative = true;
}

// Check if running in Tauri
if (typeof window !== 'undefined' && (window as any).__TAURI__) {
  Platform.OS = 'desktop';
  Platform.isDesktop = true;
}
