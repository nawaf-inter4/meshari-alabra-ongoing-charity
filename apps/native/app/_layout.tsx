import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { LanguageProvider } from '../src/providers/LanguageProvider';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NotificationService } from '../src/services/NotificationService';
import * as Notifications from 'expo-notifications';
import { AudioService } from '../src/services/AudioService';
import '../global.css';

export default function RootLayout() {
  useEffect(() => {
    // Initialize notification service
    const notificationService = NotificationService.getInstance();
    notificationService.initialize();

    // Set up notification response handler
    Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data;
      
      if (data.type === 'prayer-time' && data.playAthan) {
        const audioService = AudioService.getInstance();
        audioService.playAthan(0.8);
      }
    });

    // Set up notification received handler (when app is in foreground)
    Notifications.addNotificationReceivedListener((notification) => {
      const data = notification.request.content.data;
      
      if (data.type === 'prayer-time' && data.playAthan) {
        const audioService = AudioService.getInstance();
        audioService.playAthan(0.8);
      }
    });
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="[lang]" />
            <Stack.Screen name="settings" options={{ title: 'Settings' }} />
            <Stack.Screen name="tv" options={{ title: 'TV' }} />
            <Stack.Screen name="watch" options={{ title: 'Watch' }} />
          </Stack>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
