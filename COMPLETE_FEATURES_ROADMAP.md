# Complete Features Roadmap

## 📱 Platform Coverage Status

### ✅ Currently Supported
- **iOS Mobile** (iPhone) - ✅ Working
- **Android Mobile** - ✅ Working  
- **iOS Tablet (iPad)** - ✅ Supported (`supportsTablet: true`)
- **Android Tablet** - ✅ Responsive layouts work

### 🔄 To Be Implemented
- **watchOS** - Separate app needed
- **tvOS** - Configuration added to app.json ✅
- **Android TV** - Configuration added to app.json ✅

## 🔔 Push Notifications - Complete Plan

### Notification Types

#### 1. Prayer Time Notifications ⏰
**Features:**
- Notify at each prayer time (Fajr, Dhuhr, Asr, Maghrib, Isha)
- **Background audio**: Play athan automatically
- Action buttons: "Mark as prayed", "Snooze 5 min"
- Per-prayer enable/disable
- Volume control for athan

**Implementation:**
- Use `expo-notifications` for scheduling
- Use `expo-av` for background audio
- Calculate prayer times 30+ days ahead
- Handle timezone/location changes

#### 2. Random Duaa/Supplications 📿
**Features:**
- User-configurable frequency:
  - Every hour
  - Every 2 hours
  - Every 4 hours
  - Daily
- Random selection from supplications database
- Arabic text + transliteration + translation
- Quiet hours support (e.g., 11 PM - 6 AM)

**Implementation:**
- Store supplications locally
- Random selection algorithm
- Schedule based on user preference
- Respect quiet hours

#### 3. Quran Verse Reminders 📖
**Features:**
- User-configurable frequency:
  - 1x daily
  - 2x daily
  - 3x daily
  - Custom times
- Random verse selection
- Arabic text + translation
- Surah name and verse number

**Implementation:**
- Fetch verses from API
- Cache locally
- Random selection
- Schedule based on frequency

#### 4. After Prayer Supplications 🤲
**Features:**
- Trigger 5-10 minutes after each prayer
- Prayer-specific supplications
- Configurable delay time
- Per-prayer enable/disable

**Implementation:**
- Calculate prayer end time (prayer time + duration)
- Schedule supplication notification
- Store prayer-specific supplications

#### 5. Daily Reminders 🌅
**Features:**
- Morning reminder (Fajr or sunrise)
- Evening reminder (Maghrib)
- General Islamic reminders
- Dhikr prompts

## 📱 Widgets Plan

### iOS Widgets (WidgetKit)

1. **Prayer Times Widget**
   - Small (2x2): Current prayer + countdown
   - Medium (4x2): All 5 prayers for today
   - Large (4x4): Full prayer schedule + location
   - Updates: Every 15 minutes

2. **Dhikr Counter Widget**
   - Small (2x2): Current count
   - Medium (4x2): Count + dhikr type + increment button
   - Updates: Real-time via App Groups

3. **Quran Verse Widget**
   - Small (2x2): Verse (Arabic)
   - Medium (4x2): Verse + translation
   - Large (4x4): Full verse + surah info
   - Updates: Daily or user-triggered

4. **Qibla Direction Widget**
   - Small (2x2): Compass direction
   - Updates: Real-time

### Android Widgets
- Same widgets as iOS
- Sizes: 2x2, 4x2, 4x4
- Updates via AppWidgetProvider

## 🍎 Dynamic Island / Live Activities

### Live Activities (iOS 16.1+)

1. **Prayer Time Countdown**
   - Real-time countdown to next prayer
   - Updates every minute
   - Quick actions

2. **Dhikr Counter**
   - Live count display
   - Increment button
   - Real-time updates

3. **Qibla Compass**
   - Real-time direction indicator
   - Distance display

## 📺 TV App Features

### tvOS (Apple TV)
- Remote control navigation
- Focus management
- Larger UI elements
- Video playback for YouTube
- TV-optimized layouts

### Android TV
- D-pad navigation
- Leanback launcher
- TV-optimized layouts
- Video playback

## 🎯 Implementation Roadmap

### Phase 1: Core Notifications (Week 1-2)
1. Set up `expo-notifications` infrastructure
2. Prayer time notifications
3. Background audio for athan (`expo-av`)
4. Basic notification preferences

### Phase 2: Additional Notifications (Week 2-3)
1. Random duaa notifications
2. Quran verse reminders
3. After prayer supplications
4. Daily reminders
5. Advanced preferences screen

### Phase 3: Widgets (Week 3-4)
1. iOS WidgetKit setup
2. Prayer times widget
3. Dhikr counter widget
4. Quran verse widget
5. Android widgets

### Phase 4: Dynamic Island (Week 4)
1. Live Activities setup
2. Prayer countdown activity
3. Dhikr counter activity

### Phase 5: Watch & TV (Week 5-6)
1. Watch app (`apps/native-watch/`)
2. TV app optimization
3. TV-specific layouts

## 📦 Dependencies Needed

```json
{
  "expo-av": "~14.0.0",           // Background audio
  "expo-task-manager": "~12.0.0", // Background tasks
  "expo-widgets": "~1.0.0"        // Widgets (or native)
}
```

## 🎨 Notification Preferences UI

```
┌─────────────────────────────────┐
│  Notification Settings          │
├─────────────────────────────────┤
│ 🔔 Prayer Times                 │
│   ☑ Fajr    ☑ Dhuhr            │
│   ☑ Asr     ☑ Maghrib          │
│   ☑ Isha                        │
│   🔊 Play Athan: ☑              │
│   🔊 Volume: [====●──] 80%      │
│   ⏰ Advance: [5 min] ▼        │
├─────────────────────────────────┤
│ 📿 Random Duaa                  │
│   ☑ Enabled                     │
│   Frequency: [Every 2 hrs] ▼   │
│   Quiet Hours: 11 PM - 6 AM     │
├─────────────────────────────────┤
│ 📖 Quran Verses                 │
│   ☑ Enabled                     │
│   Frequency: [3x daily] ▼      │
│   Times: [8 AM, 2 PM, 8 PM]    │
├─────────────────────────────────┤
│ 🤲 After Prayer Supplications   │
│   ☑ Enabled                     │
│   Delay: [5 minutes]            │
│   ☑ Fajr  ☑ Dhuhr  ☑ Asr      │
│   ☑ Maghrib  ☑ Isha            │
├─────────────────────────────────┤
│ ⏰ Daily Reminders               │
│   ☑ Morning (Fajr)              │
│   ☑ Evening (Maghrib)          │
└─────────────────────────────────┘
```

## ✅ Summary

**Platform Coverage:**
- ✅ Mobile (iOS/Android) - DONE
- ✅ Tablet (iPad/Android) - Supported
- 🔄 Watch (watchOS) - Needs separate app
- 🔄 TV (tvOS/Android TV) - Configuration added

**Notifications:**
- 🔄 Prayer times with athan - To implement
- 🔄 Random duaa - To implement
- 🔄 Quran verses - To implement
- 🔄 After prayer - To implement
- 🔄 Daily reminders - To implement

**Widgets:**
- 🔄 iOS Widgets - To implement
- 🔄 Android Widgets - To implement

**Dynamic Island:**
- 🔄 Live Activities - To implement

**Ready to start implementation!** 🚀
