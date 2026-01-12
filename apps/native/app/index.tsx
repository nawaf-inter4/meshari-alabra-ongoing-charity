import { View, Text, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to Arabic (default language)
  return <Redirect href="/ar" />;
}
