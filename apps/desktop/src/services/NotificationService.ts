import { sendNotification } from '@tauri-apps/plugin-notification';

export interface PrayerTime {
  name: string;
  time: string;
}

export class DesktopNotificationService {
  async requestPermission() {
    // Tauri notifications don't require explicit permission on desktop
    return true;
  }

  async schedulePrayerNotification(prayer: PrayerTime) {
    await sendNotification({
      title: `Prayer Time: ${prayer.name}`,
      body: `It's time for ${prayer.name} prayer`,
      icon: 'icon.png',
      sound: 'default',
    });
  }

  async sendDuaaNotification(duaa: { arabic: string; translation: string }) {
    await sendNotification({
      title: 'Daily Supplication',
      body: duaa.translation,
      icon: 'icon.png',
    });
  }

  async sendQuranVerseNotification(verse: { arabic: string; translation: string }) {
    await sendNotification({
      title: 'Quran Verse Reminder',
      body: verse.translation,
      icon: 'icon.png',
    });
  }
}
