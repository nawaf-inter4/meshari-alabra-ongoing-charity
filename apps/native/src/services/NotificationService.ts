import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationPreferences {
  prayerTimes: {
    enabled: boolean;
    prayers: {
      fajr: boolean;
      dhuhr: boolean;
      asr: boolean;
      maghrib: boolean;
      isha: boolean;
    };
    playAthan: boolean;
    athanVolume: number;
    advanceMinutes: number;
  };
  randomDuaa: {
    enabled: boolean;
    frequency: 'hourly' | '2hours' | '4hours' | 'daily';
    quietHours: {
      enabled: boolean;
      start: string; // "23:00"
      end: string; // "06:00"
    };
  };
  quranVerses: {
    enabled: boolean;
    frequency: '1x' | '2x' | '3x' | 'custom';
    customTimes?: string[]; // ["08:00", "14:00", "20:00"]
  };
  afterPrayer: {
    enabled: boolean;
    delay: number; // minutes
    prayers: {
      fajr: boolean;
      dhuhr: boolean;
      asr: boolean;
      maghrib: boolean;
      isha: boolean;
    };
  };
  dailyReminders: {
    morning: boolean;
    evening: boolean;
  };
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  prayerTimes: {
    enabled: true,
    prayers: {
      fajr: true,
      dhuhr: true,
      asr: true,
      maghrib: true,
      isha: true,
    },
    playAthan: true,
    athanVolume: 0.8,
    advanceMinutes: 0,
  },
  randomDuaa: {
    enabled: false,
    frequency: '2hours',
    quietHours: {
      enabled: true,
      start: '23:00',
      end: '06:00',
    },
  },
  quranVerses: {
    enabled: false,
    frequency: '2x',
  },
  afterPrayer: {
    enabled: false,
    delay: 5,
    prayers: {
      fajr: true,
      dhuhr: true,
      asr: true,
      maghrib: true,
      isha: true,
    },
  },
  dailyReminders: {
    morning: false,
    evening: false,
  },
};

export class NotificationService {
  private static instance: NotificationService;
  private preferences: NotificationPreferences = DEFAULT_PREFERENCES;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initialize() {
    // Request permissions
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Notification permissions not granted');
      return false;
    }

    // Load preferences
    await this.loadPreferences();

    // Set up notification channels (Android)
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('prayer-times', {
        name: 'Prayer Times',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'athan.mp3',
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#D4AF37',
      });

      await Notifications.setNotificationChannelAsync('duaa', {
        name: 'Duaa & Supplications',
        importance: Notifications.AndroidImportance.DEFAULT,
        sound: 'default',
      });

      await Notifications.setNotificationChannelAsync('quran', {
        name: 'Quran Verses',
        importance: Notifications.AndroidImportance.DEFAULT,
        sound: 'default',
      });
    }

    return true;
  }

  async loadPreferences() {
    try {
      const stored = await AsyncStorage.getItem('notification-preferences');
      if (stored) {
        this.preferences = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading notification preferences:', error);
    }
  }

  async savePreferences(prefs: NotificationPreferences) {
    try {
      this.preferences = prefs;
      await AsyncStorage.setItem('notification-preferences', JSON.stringify(prefs));
      // Reschedule all notifications
      await this.scheduleAllNotifications();
    } catch (error) {
      console.error('Error saving notification preferences:', error);
    }
  }

  getPreferences(): NotificationPreferences {
    return this.preferences;
  }

  async scheduleAllNotifications() {
    // Cancel all existing notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    if (this.preferences.prayerTimes.enabled) {
      await this.schedulePrayerTimeNotifications();
    }

    if (this.preferences.randomDuaa.enabled) {
      await this.scheduleRandomDuaaNotifications();
    }

    if (this.preferences.quranVerses.enabled) {
      await this.scheduleQuranVerseNotifications();
    }

    if (this.preferences.afterPrayer.enabled) {
      // Will be scheduled after prayer notifications
    }

    if (this.preferences.dailyReminders.morning || this.preferences.dailyReminders.evening) {
      await this.scheduleDailyReminders();
    }
  }

  private async schedulePrayerTimeNotifications() {
    try {
      // Get location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Calculate prayer times for next 30 days
      const today = new Date();
      for (let day = 0; day < 30; day++) {
        const date = new Date(today);
        date.setDate(today.getDate() + day);
        const month = date.getMonth() + 1;
        const dayOfMonth = date.getDate();

        const response = await fetch(
          `http://api.aladhan.com/v1/calendar/${date.getFullYear()}/${month}?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const data = await response.json();
        const dayData = data.data[dayOfMonth - 1];

        if (!dayData) continue;

        const prayers = [
          { name: 'Fajr', time: dayData.timings.Fajr, key: 'fajr' },
          { name: 'Dhuhr', time: dayData.timings.Dhuhr, key: 'dhuhr' },
          { name: 'Asr', time: dayData.timings.Asr, key: 'asr' },
          { name: 'Maghrib', time: dayData.timings.Maghrib, key: 'maghrib' },
          { name: 'Isha', time: dayData.timings.Isha, key: 'isha' },
        ];

        for (const prayer of prayers) {
          if (!this.preferences.prayerTimes.prayers[prayer.key as keyof typeof this.preferences.prayerTimes.prayers]) {
            continue;
          }

          const [hours, minutes] = prayer.time.split(':').map(Number);
          const notificationDate = new Date(date);
          notificationDate.setHours(hours, minutes - this.preferences.prayerTimes.advanceMinutes, 0, 0);

          if (notificationDate < new Date()) continue;

          await Notifications.scheduleNotificationAsync({
            content: {
              title: `Prayer Time: ${prayer.name}`,
              body: `It's time for ${prayer.name} prayer`,
              sound: this.preferences.prayerTimes.playAthan ? 'athan.mp3' : 'default',
              data: {
                type: 'prayer-time',
                prayer: prayer.key,
                playAthan: this.preferences.prayerTimes.playAthan,
              },
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DATE,
              date: notificationDate,
            },
            identifier: `prayer-${prayer.key}-${day}`,
          });

          // Schedule after-prayer supplication if enabled
          if (this.preferences.afterPrayer.enabled && 
              this.preferences.afterPrayer.prayers[prayer.key as keyof typeof this.preferences.afterPrayer.prayers]) {
            const afterPrayerDate = new Date(notificationDate);
            afterPrayerDate.setMinutes(afterPrayerDate.getMinutes() + this.preferences.afterPrayer.delay);

            await Notifications.scheduleNotificationAsync({
              content: {
                title: 'After Prayer Supplication',
                body: `Supplication after ${prayer.name}`,
                data: {
                  type: 'after-prayer',
                  prayer: prayer.key,
                },
              },
              trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: afterPrayerDate,
              },
              identifier: `after-prayer-${prayer.key}-${day}`,
            });
          }
        }
      }
    } catch (error) {
      console.error('Error scheduling prayer notifications:', error);
    }
  }

  private async scheduleRandomDuaaNotifications() {
    // Schedule based on frequency
    const intervals: Record<string, number> = {
      hourly: 60 * 60 * 1000,
      '2hours': 2 * 60 * 60 * 1000,
      '4hours': 4 * 60 * 60 * 1000,
      daily: 24 * 60 * 60 * 1000,
    };

    const interval = intervals[this.preferences.randomDuaa.frequency];
    if (!interval) return;

    // Schedule for next 30 days
    const now = new Date();
    for (let i = 0; i < 30; i++) {
      const nextNotification = new Date(now.getTime() + interval * (i + 1));
      
      // Check quiet hours
      if (this.preferences.randomDuaa.quietHours.enabled) {
        const [startHour, startMin] = this.preferences.randomDuaa.quietHours.start.split(':').map(Number);
        const [endHour, endMin] = this.preferences.randomDuaa.quietHours.end.split(':').map(Number);
        const notificationHour = nextNotification.getHours();
        const notificationMin = nextNotification.getMinutes();
        
        // Skip if in quiet hours
        if (notificationHour >= startHour || notificationHour < endHour) {
          continue;
        }
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Daily Supplication',
          body: 'A reminder for you',
          data: { type: 'random-duaa' },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: nextNotification,
        },
        identifier: `duaa-${i}`,
      });
    }
  }

  private async scheduleQuranVerseNotifications() {
    const frequencies: Record<string, number[]> = {
      '1x': [12], // Noon
      '2x': [8, 20], // Morning and evening
      '3x': [8, 14, 20], // Morning, afternoon, evening
    };

    const times = this.preferences.quranVerses.frequency === 'custom' 
      ? this.preferences.quranVerses.customTimes?.map(t => {
          const [h, m] = t.split(':').map(Number);
          return h * 60 + m;
        }) || []
      : frequencies[this.preferences.quranVerses.frequency] || [];

    // Schedule for next 30 days
    const today = new Date();
    for (let day = 0; day < 30; day++) {
      for (const timeMinutes of times) {
        const notificationDate = new Date(today);
        notificationDate.setDate(today.getDate() + day);
        const [hours, minutes] = [Math.floor(timeMinutes / 60), timeMinutes % 60];
        notificationDate.setHours(hours, minutes, 0, 0);

        if (notificationDate < new Date()) continue;

        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Quran Verse Reminder',
            body: 'A verse from the Quran',
            data: { type: 'quran-verse' },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: notificationDate,
          },
          identifier: `quran-${day}-${timeMinutes}`,
        });
      }
    }
  }

  private async scheduleDailyReminders() {
    // This will be implemented to schedule morning/evening reminders
    // based on prayer times
  }
}
