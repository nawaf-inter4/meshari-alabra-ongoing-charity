---
name: Solito Expo Mobile Extension + Tauri Desktop
overview: Extend the Next.js web app to mobile, tablet, watch, TV, and desktop (Windows, macOS, Linux) using Solito (Next.js + React Native bridge), Expo for native mobile builds, and Tauri for desktop apps. This approach maximizes code sharing while enabling native features across all platforms.
todos:
  - id: create-branch
    content: Create feature branch 'feature/solito-expo-mobile' for mobile extension work
    status: pending
  - id: monorepo-setup
    content: Convert project to Turborepo monorepo structure (apps/web, apps/native, packages/ui, packages/translations)
    status: pending
  - id: vercel-config
    content: Configure Vercel for monorepo deployment (update vercel.json, set root directory to apps/web)
    status: pending
  - id: install-dependencies
    content: Install Solito, Expo, React Native, and required native modules (expo-location, expo-sensors, expo-notifications, expo-haptics)
    status: pending
  - id: extract-shared-components
    content: Extract components to packages/ui, convert to React Native Web compatible (div→View, p→Text, etc.)
    status: pending
  - id: setup-solito-navigation
    content: Set up Solito navigation bridge between Next.js App Router and React Navigation
    status: pending
  - id: create-expo-app
    content: Initialize Expo app with Expo Router, configure file-based routing matching Next.js structure
    status: pending
  - id: migrate-prayer-times
    content: Migrate PrayerTimesSection to use expo-location on native, keep web API for web
    status: completed
  - id: migrate-qibla-finder
    content: Migrate QiblaFinder to use expo-sensors for compass on native
    status: pending
  - id: migrate-dhikr-counter
    content: Migrate DhikrCounter to use expo-haptics for native feedback
    status: pending
  - id: setup-watch-app
    content: Create watchOS app with simplified UI (prayer times, dhikr, qibla)
    status: pending
  - id: setup-tv-app
    content: Configure tvOS/Android TV app with TV-optimized navigation and layouts
    status: pending
  - id: test-all-platforms
    content: Test on iOS, Android, watch, and TV devices, verify all 12 languages work
    status: pending
---

# Extending Next.js App to Mobile, Tablet, Watch, TV, and Desktop with Solito + Expo + Tauri

## Overview

This plan extends your Next.js 16 Islamic charity app to native mobile, tablet, watch, TV, and desktop (Windows, macOS, Linux) platforms using **Solito** (Next.js + React Native bridge), **Expo** for native mobile builds, and **Tauri** for desktop apps. This approach maximizes code sharing while providing native performance and features across all platforms.

## Why Solito + Expo?

**Advantages:**

- ✅ **Maximum code sharing**: Share components, logic, translations, API calls between web, mobile, and desktop
- ✅ **All platforms**: iOS, Android, watchOS, tvOS, Android TV, tablets, Windows, macOS, Linux
- ✅ **Native performance**: True native apps, not web wrappers
- ✅ **Gradual migration**: Can adopt incrementally, keep web app working
- ✅ **Future-proof**: Easy to add native features (camera, biometrics, file system, etc.) later
- ✅ **Navigation sharing**: Solito unifies Next.js and React Navigation routing
- ✅ **Lightweight desktop**: Tauri uses system webview (smaller bundles than Electron)

**vs Capacitor:**

- Capacitor wraps your web app (less native feel, limited watch/TV support)
- Solito creates true native apps with shared code
- Tauri provides native desktop with smaller bundle sizes than Electron

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Shared Code Layer                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Components  │  │   Business    │  │ Translations │ │
│  │  (React)     │  │    Logic      │  │   (i18n)     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   API Calls  │  │   Utilities  │  │   Types      │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
         │                        │              │
         │                        │              │
    ┌────▼────┐            ┌─────▼─────┐   ┌────▼────┐
    │  Next.js │            │   Expo    │   │  Tauri  │
    │   Web    │            │  Native   │   │ Desktop │
    │  (App)   │            │   Apps    │   │   App   │
    └──────────┘            └───────────┘   └─────────┘
                                  │              │
                    ┌─────────────┼──────────────┼─────────┐
                    │             │              │         │
              ┌─────▼──┐    ┌────▼────┐   ┌────▼────┐ ┌─▼────┐
              │ Mobile │    │  Watch  │   │   TV    │ │Desktop│
              │  App   │    │   App   │   │   App   │ │(3 OS) │
              └────────┘    └─────────┘   └─────────┘ └──────┘
```

## Project Structure

```
meshari-alabra-ongoing-charity/
├── apps/
│   ├── web/                    # Existing Next.js app (moved here)
│   │   ├── src/                # [current structure moved here]
│   │   ├── public/             # [current public moved here]
│   │   ├── next.config.js      # Updated for monorepo
│   │   ├── package.json        # Web app dependencies
│   │   └── tsconfig.json       # Extends root tsconfig
│   ├── native/                 # New Expo app
│   │   ├── app/                # Expo Router (file-based routing)
│   │   ├── src/
│   │   │   ├── app/            # App entry
│   │   │   ├── navigation/     # React Navigation setup
│   │   │   └── providers/      # Context providers
│   │   ├── app.json
│   │   └── package.json
│   └── desktop/                # Tauri desktop app
│       ├── src/                # React app (uses shared components)
│       ├── src-tauri/           # Tauri Rust backend
│       │   ├── Cargo.toml
│       │   └── tauri.conf.json
│       └── package.json
├── packages/
│   ├── ui/                     # Shared UI components
│   │   ├── src/
│   │   │   ├── components/     # React Native Web compatible
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── config/                 # Shared configs
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   ├── translations/           # Shared i18n files
│   │   ├── src/
│   │   │   └── [existing locales/]
│   │   └── package.json
│   └── navigation/             # Solito navigation
│       ├── src/
│       └── package.json
├── turbo.json                  # Turborepo configuration
├── package.json                # Root workspace (Turborepo)
├── .gitignore                  # Updated for monorepo
└── vercel.json                 # Updated for monorepo (root directory: apps/web)
```

## Implementation Steps

### Phase 1: Turborepo Monorepo Setup

1. **Install Turborepo**
   ```bash
   npm install turbo --save-dev
   ```

2. **Convert to monorepo structure**

   - Create `turbo.json` with build pipeline configuration
   - Set up workspace in root `package.json` with workspaces
   - Move existing Next.js app to `apps/web/`
   - Move `public/` folder to `apps/web/public/`
   - Update all import paths in web app
   - Create `apps/native/` for Expo app
   - Create `packages/` for shared code

3. **Configure Turborepo**

   - Set up build pipeline for web app
   - Configure caching for faster builds
   - Set up task dependencies (web depends on shared packages)
   - Configure dev mode with `turbo dev`

4. **Vercel Configuration**

   - Update `vercel.json` to set root directory: `apps/web`
   - Update build command: `cd ../.. && npm run build --filter=web`
   - Ensure Vercel detects Next.js in `apps/web/`
   - Test deployment to ensure web app still works

5. **Install dependencies**

   - Root: `turbo`, `solito`, `expo`, `react-native`, `react-native-web`
   - Native: Expo SDK, React Navigation, NativeWind (Tailwind for RN)
   - Web: Keep existing dependencies (moved to apps/web/package.json)

### Phase 2: Shared Code Extraction

1. **Extract shared components**

   - Move components from `src/components/` to `packages/ui/src/components/`
   - Convert to React Native Web compatible (use `react-native-web` primitives)
   - Replace DOM elements: `div` → `View`, `p` → `Text`, etc.
   - Keep Framer Motion for web, use Reanimated for native

2. **Extract business logic**

   - Move API calls to shared utilities
   - Extract prayer times logic, qibla calculations, etc.
   - Share TypeScript types/interfaces

3. **Share translations**

   - Move `src/locales/` to `packages/translations/`
   - Use same i18next setup for both platforms

### Phase 3: Solito Integration

1. **Install Solito**
   ```bash
   npm install solito
   ```

2. **Set up navigation bridge**

   - Create `packages/navigation/` with Solito navigation
   - Configure Next.js App Router integration
   - Set up React Navigation for native

3. **Create shared navigation components**

   - `<Link />` component that works on both platforms
   - Route definitions shared between web and native
   - Screen params typed with Solito

### Phase 4: Expo App Setup

1. **Initialize Expo app**
   ```bash
   npx create-expo-app apps/native --template blank-typescript
   ```

2. **Configure Expo Router**

   - Set up file-based routing matching Next.js structure
   - Configure deep linking
   - Set up language routes `/[lang]` and section routes

3. **Install native dependencies**

   - `expo-location` (prayer times, qibla)
   - `expo-device` (device info)
   - `expo-notifications` (prayer time alerts)
   - `expo-haptics` (dhikr counter feedback)
   - `expo-sensors` (compass for qibla)

4. **Styling setup**

   - Install NativeWind (Tailwind for React Native)
   - Share Tailwind config from web
   - Configure RTL support for Arabic/Urdu

### Phase 5: Component Migration

1. **Priority components to migrate:**

   - `HomePage.tsx` → Shared component
   - `PrayerTimesSection.tsx` → Use `expo-location` on native
   - `QiblaFinder.tsx` → Use `expo-sensors` for compass
   - `DhikrCounter.tsx` → Use `expo-haptics` for feedback
   - `LanguageSwitcher.tsx` → Shared navigation
   - `ThemeToggle.tsx` → Shared with native theme support

2. **Platform-specific adaptations:**

   - **Geolocation**: Web API → `expo-location` on native
   - **Device Orientation**: Web API → `expo-sensors` on native
   - **Notifications**: Web Notifications API → `expo-notifications` on native
   - **Haptics**: CSS → `expo-haptics` on native

### Phase 6: Watch & TV Apps

1. **Watch App (watchOS)**

   - Create `apps/native-watch/` with Expo watchOS template
   - Simplified UI: Prayer times, Dhikr counter, Qibla direction
   - Share business logic from main app
   - Use Watch Connectivity for data sync
   - Complications (watch faces) for prayer times

2. **TV App (tvOS/Android TV)**

   - Configure Expo for TV in `app.json`
   - TV-optimized navigation (focus management)
   - Larger touch targets, remote control support
   - Share components with responsive layouts
   - Video playback for YouTube playlists

### Phase 6.5: Push Notifications System

1. **Notification Infrastructure**

   - Set up `expo-notifications` with channels
   - Background notification handler
   - Notification categories (prayer, duaa, quran, etc.)
   - Permission management

2. **Prayer Time Notifications**

   - Calculate prayer times for 30+ days
   - Schedule notifications for all prayers
   - Background audio with `expo-av` for athan
   - Action buttons (Mark as prayed, Snooze)
   - Per-prayer enable/disable settings

3. **Random Duaa Notifications**

   - User-configurable frequency (hourly, 2hrs, 4hrs, daily)
   - Random selection from supplications
   - Quiet hours support (e.g., 11 PM - 6 AM)
   - Arabic text with transliteration and translation

4. **Quran Verse Reminders**

   - User-configurable frequency (1x, 2x, 3x daily)
   - Random verse selection from API
   - Cache verses locally
   - Arabic with translation

5. **After Prayer Supplications**

   - Trigger 5-10 minutes after each prayer
   - Prayer-specific supplications
   - Configurable delay time
   - Per-prayer enable/disable

6. **Daily Reminders**

   - Morning reminder (Fajr or sunrise)
   - Evening reminder (Maghrib)
   - General Islamic reminders
   - Dhikr prompts

7. **Notification Preferences Screen**

   - Enable/disable each notification type
   - Frequency selectors
   - Quiet hours configuration
   - Prayer-specific toggles
   - Audio preferences (athan volume, enable/disable)

### Phase 6.6: Widgets & Dynamic Island

1. **iOS Widgets (WidgetKit)**

   - Prayer Times Widget (Small, Medium, Large)
     - Current prayer time
     - Next prayer countdown
     - All 5 prayers for today
   - Dhikr Counter Widget (Small, Medium)
     - Current count display
     - Quick increment (iOS 17+)
   - Quran Verse Widget (Small, Medium, Large)
     - Random verse with translation
     - Refresh capability
   - Qibla Direction Widget (Small)
     - Compass direction
     - Distance to Kaaba

2. **Android Widgets**

   - Same widgets as iOS
   - 2x2, 4x2, 4x4 sizes
   - Real-time updates

3. **Dynamic Island / Live Activities (iOS 16+)**

   - Prayer Time Countdown
     - Real-time countdown to next prayer
     - Quick access actions
   - Dhikr Counter
     - Live count display
     - Increment button
   - Qibla Compass
     - Real-time direction indicator

4. **Implementation**

   - Use `expo-widgets` or native modules
   - WidgetKit framework (iOS)
   - AppWidgetProvider (Android)
   - ActivityKit for Live Activities (iOS)
   - App Groups for data sharing (iOS)
   - SharedPreferences for data sharing (Android)

### Phase 7: Tauri Desktop App

1. **Initialize Tauri app**
   ```bash
   npm create tauri-app@latest apps/desktop
   ```


   - Choose React + TypeScript template
   - Set up in `apps/desktop/` directory

2. **Configure Tauri**

   - Update `src-tauri/tauri.conf.json` for app metadata
   - Configure window settings (size, title, etc.)
   - Set up build targets (Windows, macOS, Linux)
   - Configure auto-updater if needed

3. **Share web components**

   - Use same React components from `packages/ui/`
   - Reuse translations from `packages/translations/`
   - Share business logic and API calls
   - Use Vite for bundling (Tauri default)

4. **Native desktop features**

   - File system access (for PDF stories)
   - System notifications (prayer time alerts)
   - Tray icon support
   - Window management
   - Native menus (if needed)

5. **Platform-specific optimizations**

   - **Windows**: MSI installer, Windows Store support
   - **macOS**: DMG installer, App Store support, code signing
   - **Linux**: AppImage, DEB, RPM packages

6. **Styling**

   - Use same Tailwind CSS config
   - Share theme system
   - Desktop-optimized layouts (larger screens)

### Phase 8: Testing & Optimization

1. **Testing**

   - Test on iOS/Android devices
   - Test watch apps on simulators/devices
   - Test TV apps on Apple TV/Android TV
   - Test desktop apps on Windows, macOS, and Linux
   - Verify all 12 languages work across all platforms

2. **Performance optimization**

   - Code splitting for native bundles
   - Image optimization for native
   - Lazy loading for heavy sections
   - Native module optimization

## Key Files to Modify

### New Files to Create:

- `apps/native/app.json` - Expo configuration
- `apps/native/app/_layout.tsx` - Root layout with navigation
- `apps/native/app/[lang]/index.tsx` - Language routes
- `packages/ui/src/components/` - Shared components
- `packages/navigation/` - Solito navigation setup

### Files to Modify:

- `apps/web/src/components/` - Import from shared packages
- `apps/web/next.config.js` - Configure for monorepo (transpile packages)
- `apps/web/package.json` - Update dependencies, add workspace references
- `package.json` (root) - Add Turborepo workspace configuration
- `turbo.json` - Configure build pipeline and caching
- `vercel.json` - Update for monorepo (root directory, build commands)
- `.gitignore` - Add Turborepo cache directories
- Translation files - Move to shared package

## Dependencies to Add

**Root workspace:**

- `turbo` - Turborepo for monorepo build system
- `solito` - Next.js + React Native bridge
- `expo` - Expo SDK
- `react-native` - React Native core
- `react-native-web` - Web compatibility

**Turborepo benefits:**

- ✅ Fast incremental builds with intelligent caching
- ✅ Parallel task execution
- ✅ Remote caching (optional, for team)
- ✅ Task dependencies and pipeline management
- ✅ Perfect for Next.js + Expo monorepo

**Native app:**

- `expo-router` - File-based routing
- `react-navigation` - Navigation (via Solito)
- `nativewind` - Tailwind for React Native
- `expo-location` - Geolocation
- `expo-sensors` - Device sensors (compass)
- `expo-notifications` - Push notifications ✅
- `expo-haptics` - Haptic feedback
- `expo-device` - Device info
- `expo-av` - Background audio for athan
- `expo-task-manager` - Background tasks
- `expo-widgets` or native modules - Widgets
- `expo-live-activities` or native - Dynamic Island

**Desktop app (Tauri):**

- `@tauri-apps/api` - Tauri JavaScript API
- `@tauri-apps/plugin-fs` - File system access
- `@tauri-apps/plugin-notification` - System notifications
- `@tauri-apps/plugin-shell` - Shell commands
- `vite` - Build tool (Tauri default)
- `react` + `react-dom` - UI framework (shared with web)

## Challenges & Solutions

1. **Styling differences**

   - **Solution**: Use NativeWind (Tailwind for RN) to share styles
   - Platform-specific styles with `Platform.select()`

2. **Animation libraries**

   - **Web**: Keep Framer Motion
   - **Native**: Use Reanimated 3 (similar API)
   - **Solution**: Create animation wrapper component

3. **PDF viewing**

   - **Web**: `react-pdf` works
   - **Native**: Use `expo-document-picker` + native PDF viewer
   - **Solution**: Platform-specific PDF component

4. **Image optimization**

   - **Web**: Next.js Image component
   - **Native**: Expo Image with caching
   - **Solution**: Shared Image component with platform detection

5. **RTL support**

   - **Solution**: React Native has built-in RTL support, configure in `app.json`
   - **Desktop**: CSS direction property works in Tauri

6. **Desktop-specific features**

   - **File system**: Use Tauri's file system API for PDF access
   - **Notifications**: Use Tauri's notification plugin (system native)
   - **Window management**: Tauri provides window controls
   - **Solution**: Create platform abstraction layer for file/notification APIs

## Migration Strategy

**Gradual adoption approach:**

1. Create feature branch for isolation
2. Set up Turborepo monorepo, keep web app working
3. Verify Vercel deployment still works after monorepo conversion
4. Create native app alongside web
5. Migrate components one by one to shared package
6. Test each component on both platforms
7. Deploy native apps when core features work
8. Merge feature branch to main when stable
9. Iterate and add platform-specific features

## Estimated Timeline

- **Phase 0** (Git Branch): 5 minutes
- **Phase 1** (Turborepo Setup + Vercel Config): 2-3 days
- **Phase 2** (Shared Code Extraction): 1 week
- **Phase 3-4** (Solito + Expo Setup): 1 week
- **Phase 5** (Component Migration): 2-3 weeks
- **Phase 6** (Watch/TV): 1-2 weeks
- **Phase 6.5** (Push Notifications): 2-3 weeks
- **Phase 6.6** (Widgets & Dynamic Island): 2 weeks
- **Phase 7** (Tauri Desktop): 1-2 weeks
- **Phase 8** (Testing): 1 week

**Total: 10-14 weeks** for full implementation (including notifications, widgets, watch, TV, desktop)

**Critical Milestone:** After Phase 1, verify Vercel deployment works before proceeding

## Vercel Deployment Configuration

**Critical: Ensure web app continues deploying after monorepo conversion**

### Option 1: Vercel.json Configuration (Recommended)

Update root `vercel.json`:

```json
{
  "buildCommand": "cd ../.. && npm run build --filter=web",
  "devCommand": "cd ../.. && npm run dev --filter=web",
  "installCommand": "npm install",
  "framework": "nextjs",
  "rootDirectory": "apps/web",
  "build": {
    "env": {
      "NEXT_TURBOPACK": "1"
    }
  }
}
```

### Option 2: Vercel Dashboard Settings

In Vercel project settings:

- **Root Directory**: `apps/web`
- **Build Command**: `cd ../.. && npm run build --filter=web`
- **Dev Command**: `cd ../.. && npm run dev --filter=web`
- **Install Command**: `npm install` (runs at root, installs all workspaces)

### Turborepo Scripts in Root package.json

```json
{
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "build:web": "turbo run build --filter=web",
    "dev:web": "turbo run dev --filter=web",
    "lint": "turbo run lint"
  }
}
```

### Testing Deployment

1. Push feature branch to GitHub
2. Verify Vercel detects Next.js app in `apps/web/`
3. Check build logs for Turborepo commands
4. Verify production deployment works
5. Test all routes and functionality
6. **Only proceed to Phase 2 after successful deployment**

## Next Steps

1. ✅ Review and confirm this approach (with Turborepo + branch strategy + Tauri)
2. ✅ Create feature branch `feature/solito-expo-mobile`
3. Set up Turborepo monorepo structure
4. **Verify Vercel deployment works** (critical checkpoint)
5. Begin shared code extraction
6. Test with one component first (e.g., PrayerTimesSection)
7. Set up Tauri desktop app alongside mobile
8. Iterate and expand
9. Merge to main when stable

## Why Tauri for Desktop?

**Advantages over Electron:**

- ✅ **Smaller bundle size**: Uses system webview (10-20MB vs 100-200MB for Electron)
- ✅ **Better performance**: Native Rust backend, faster startup
- ✅ **Lower memory usage**: No bundled Chromium
- ✅ **Better security**: Smaller attack surface
- ✅ **Native feel**: Better integration with OS features
- ✅ **Code sharing**: Can reuse React components from web app

**Perfect for this project:**

- Already using React (shared components)
- Need file system access for PDF stories
- System notifications for prayer times
- Small app size is important
- Cross-platform (Windows, macOS, Linux)

## Key Configuration Files

### `turbo.json` (Root)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "outputs": []
    }
  }
}
```

### Root `package.json` workspaces

```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

### `apps/web/next.config.js` updates

- Add `transpilePackages: ['@repo/ui', '@repo/translations']`
- Ensure shared packages are transpiled correctly