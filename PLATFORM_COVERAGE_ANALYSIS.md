# Platform Coverage & Features Analysis

## 📱 Current Platform Support

### ✅ Fully Supported
- **iOS Mobile** (iPhone) - Expo supports natively
- **Android Mobile** - Expo supports natively
- **iOS Tablet (iPad)** - `supportsTablet: true` in app.json ✅
- **Android Tablet** - Responsive layouts work automatically

### ⚠️ Needs Implementation
- **watchOS** - Requires separate Expo app
- **tvOS** - Requires configuration in app.json
- **Android TV** - Requires configuration in app.json

## 🔔 Push Notifications Requirements

### Notification Types Needed

1. **Prayer Time Notifications** 🔔
   - Trigger: At each prayer time (Fajr, Dhuhr, Asr, Maghrib, Isha)
   - Audio: Play athan automatically (background audio)
   - Content: Prayer name, time, location
   - Actions: "Mark as prayed", "Snooze 5 min"
   - Settings: Enable/disable per prayer

2. **Random Duaa/Supplications** 📿
   - Trigger: User-configurable frequency
     - Options: Every hour, Every 2 hours, Every 4 hours, Daily
   - Content: Random supplication
     - Arabic text
     - Transliteration
     - Translation
   - Settings: Frequency, quiet hours (e.g., 11 PM - 6 AM)

3. **Quran Verse Reminders** 📖
   - Trigger: User-configurable
     - Options: 1x daily, 2x daily, 3x daily, Custom times
   - Content: Random verse
     - Arabic text
     - Translation
     - Surah name and verse number
   - Settings: Frequency, preferred surahs (optional)

4. **After Prayer Supplications** 🤲
   - Trigger: 5-10 minutes after each prayer
   - Content: Supplication specific to that prayer
   - Settings: Enable/disable per prayer, delay time

5. **Daily Reminders** ⏰
   - Morning: At Fajr or sunrise
   - Evening: At Maghrib
   - Content: General Islamic reminders, dhikr prompts

### Technical Requirements

#### Background Audio (Athan)
- **iOS**: Requires `UIBackgroundModes: ['audio']` in Info.plist
- **Android**: Requires foreground service for background audio
- **Implementation**: `expo-av` with background audio capability
- **Features**:
  - Play athan when prayer notification triggers
  - Continue playing even if app is in background
  - Handle interruptions (calls, other audio)
  - Volume control integration

#### Notification Scheduling
- Calculate prayer times for 30+ days ahead
- Handle timezone changes automatically
- Handle location changes (reschedule)
- Efficient battery usage
- Respect system battery saver mode

## 📱 Widgets Requirements

### iOS Widgets (WidgetKit)

1. **Prayer Times Widget**
   - Sizes: Small (2x2), Medium (4x2), Large (4x4)
   - Content:
     - Current prayer time
     - Next prayer countdown
     - All 5 prayers for today
   - Update: Every 15 minutes
   - Timeline Provider: Calculate prayer times

2. **Dhikr Counter Widget**
   - Sizes: Small (2x2), Medium (4x2)
   - Content:
     - Current count
     - Dhikr type (SubhanAllah, Alhamdulillah, Allahu Akbar)
     - Quick increment button (iOS 17+)
   - Update: Real-time via App Groups

3. **Quran Verse Widget**
   - Sizes: Small (2x2), Medium (4x2), Large (4x4)
   - Content:
     - Random verse (Arabic + translation)
     - Refresh button
   - Update: Daily or user-triggered

4. **Qibla Direction Widget**
   - Sizes: Small (2x2)
   - Content:
     - Compass direction to Kaaba
     - Distance in km
   - Update: Real-time

### Android Widgets

- Same widgets as iOS
- Sizes: 2x2, 4x2, 4x4
- Update via AppWidgetProvider
- Data sharing via SharedPreferences

## 🍎 Dynamic Island / Live Activities (iOS 16+)

### Live Activities Needed

1. **Prayer Time Countdown**
   - Display: Time until next prayer
   - Updates: Real-time countdown
   - Actions: Quick access to prayer times
   - Dismiss: After prayer time passes

2. **Dhikr Counter**
   - Display: Current count
   - Updates: Real-time
   - Actions: Increment button
   - Dismiss: User-controlled

3. **Qibla Compass**
   - Display: Direction indicator
   - Updates: Real-time compass
   - Actions: Open Qibla screen

### Implementation
- Use ActivityKit framework (iOS 16.1+)
- `expo-live-activities` or native module
- Background updates via push notifications

## 📺 TV App Requirements

### tvOS (Apple TV)
- Configure in `app.json`:
  ```json
  "ios": {
    "tv": {
      "enabled": true
    }
  }
  ```
- Features:
  - Remote control navigation
  - Focus management
  - Larger UI elements
  - Video playback support

### Android TV
- Configure in `app.json`:
  ```json
  "android": {
    "tv": {
      "enabled": true
    }
  }
  ```
- Features:
  - D-pad navigation
  - TV-optimized layouts
  - Leanback launcher support

## 🎯 Implementation Priority

### High Priority (Core Features)
1. ✅ Native app (mobile/tablet) - DONE
2. 🔄 Push notifications for prayer times with athan
3. 🔄 Notification preferences screen
4. 🔄 Background audio for athan

### Medium Priority
1. Random duaa notifications
2. Quran verse reminders
3. After prayer supplications
4. iOS Widgets (Prayer Times, Dhikr Counter)

### Lower Priority
1. Android Widgets
2. Dynamic Island / Live Activities
3. Watch app
4. TV app

## 📦 Required Dependencies

### Already Installed ✅
- `expo-notifications` ~0.32.16
- `expo-location` ~19.0.8
- `expo-device` ~8.0.10

### Need to Install
- `expo-av` - Background audio for athan
- `expo-task-manager` - Background tasks
- `expo-widgets` or native modules - Widgets
- `expo-live-activities` or native - Dynamic Island

## 🎨 User Experience

### Notification Flow Example

```
1. User enables prayer time notifications
2. App calculates next 30 days of prayer times
3. Schedules notifications for all prayers
4. At prayer time:
   - Notification appears
   - Athan plays automatically (if enabled)
   - User can:
     - Mark as prayed
     - Snooze 5 minutes
     - Open app
5. 5 minutes after prayer:
   - After prayer supplication notification (if enabled)
```

### Widget Experience

```
User adds Prayer Times widget to home screen
→ Widget shows current prayer and countdown
→ Updates every 15 minutes
→ Tap to open app
→ Quick access to all prayer times
```

## ✅ Next Steps

1. **Review this analysis**
2. **Approve implementation plan**
3. **Start with Phase 6.5**: Push notifications infrastructure
4. **Implement prayer time notifications with athan**
5. **Add notification preferences**
6. **Continue with widgets and other features**

---

**Summary**: The native app currently supports iOS/Android mobile and tablets. We need to add:
- Watch app (separate app)
- TV support (configuration)
- Comprehensive push notifications system
- Widgets for iOS/Android
- Dynamic Island for iOS

All of this is feasible with Expo! 🚀
