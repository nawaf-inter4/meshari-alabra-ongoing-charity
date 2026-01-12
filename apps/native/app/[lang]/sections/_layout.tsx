import { Stack } from 'expo-router';

export default function SectionsLayout() {
  return (
    <Stack>
      <Stack.Screen name="quran" options={{ title: 'Quran' }} />
      <Stack.Screen name="tafseer" options={{ title: 'Tafseer' }} />
      <Stack.Screen name="dhikr" options={{ title: 'Dhikr' }} />
      <Stack.Screen name="prayer-times" options={{ title: 'Prayer Times' }} />
      <Stack.Screen name="qibla" options={{ title: 'Qibla' }} />
      <Stack.Screen name="donation" options={{ title: 'Donation' }} />
      <Stack.Screen name="supplications" options={{ title: 'Supplications' }} />
      <Stack.Screen name="hadith" options={{ title: 'Hadith' }} />
      <Stack.Screen name="youtube" options={{ title: 'YouTube' }} />
    </Stack>
  );
}
