# Native App (Expo)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI (included in dependencies)
- iOS Simulator (for Mac) or Android Emulator

### Development

```bash
# Start development server
npm start
# or
npm run dev

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web (Expo Web)
npm run web
```

## 📱 Features Implemented

### ✅ Core Features
- **Language Support**: 12 languages with RTL support
- **Theme Support**: Light/Dark mode
- **Prayer Times**: Location-based with expo-location
- **Qibla Finder**: Compass with expo-sensors
- **Dhikr Counter**: Haptic feedback with expo-haptics
- **Quran Section**: Full Quran with translations
- **Donation Section**: Link to Ehsan.sa

### 📦 Native Dependencies
- `expo-location` - Geolocation for prayer times
- `expo-sensors` - Compass for Qibla
- `expo-haptics` - Haptic feedback for Dhikr
- `expo-notifications` - Push notifications (ready)
- `expo-device` - Device information
- `@react-native-async-storage/async-storage` - Local storage
- `@expo/vector-icons` - Icons

## 🏗️ Project Structure

```
apps/native/
├── app/                    # Expo Router (file-based routing)
│   ├── _layout.tsx        # Root layout with providers
│   ├── index.tsx          # Redirect to /ar
│   └── [lang]/            # Language routes
│       └── index.tsx      # Main page
├── src/
│   ├── providers/         # Context providers
│   │   ├── LanguageProvider.tsx
│   │   └── ThemeProvider.tsx
│   └── components/        # Native components
│       ├── PrayerTimesSection.tsx
│       ├── QiblaFinder.tsx
│       ├── DhikrCounter.tsx
│       ├── QuranSection.tsx
│       ├── DonationSection.tsx
│       └── LanguageSwitcher.tsx
└── app.json              # Expo configuration
```

## 🎨 Styling

Uses React Native StyleSheet. Colors and themes are managed through ThemeProvider.

## 📝 Notes

- All components use shared translations from `@repo/translations`
- Navigation uses Expo Router (file-based)
- Platform-specific features use Expo modules
- Ready for additional sections (Tafseer, Hadith, Supplications, etc.)

## 🚢 Building

```bash
# Build for production
npm run build

# Or use EAS Build
eas build --platform ios
eas build --platform android
```
