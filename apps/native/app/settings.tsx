import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NotificationPreferencesScreen } from '../src/components/NotificationPreferences';
import { AthanPreferencesScreen } from '../src/components/AthanPreferences';
import { useTheme } from '../src/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

type SettingsTab = 'notifications' | 'athan';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<SettingsTab>('notifications');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.tabs, { backgroundColor: colors.secondary }]}>
        <TouchableOpacity
          onPress={() => setActiveTab('notifications')}
          style={[
            styles.tab,
            activeTab === 'notifications' && { backgroundColor: colors.gold },
          ]}
        >
          <Ionicons
            name="notifications-outline"
            size={20}
            color={activeTab === 'notifications' ? '#0F172A' : colors.foreground}
          />
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === 'notifications' ? '#0F172A' : colors.foreground,
              },
            ]}
          >
            Notifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('athan')}
          style={[
            styles.tab,
            activeTab === 'athan' && { backgroundColor: colors.gold },
          ]}
        >
          <Ionicons
            name="musical-notes-outline"
            size={20}
            color={activeTab === 'athan' ? '#0F172A' : colors.foreground}
          />
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === 'athan' ? '#0F172A' : colors.foreground,
              },
            ]}
          >
            Athan
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'notifications' && <NotificationPreferencesScreen />}
        {activeTab === 'athan' && <AthanPreferencesScreen />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF37',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});
