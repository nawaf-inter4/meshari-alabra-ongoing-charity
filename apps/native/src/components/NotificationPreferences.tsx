import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import { NotificationService, NotificationPreferences } from '../services/NotificationService';
import { Ionicons } from '@expo/vector-icons';

export function NotificationPreferencesScreen() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const notificationService = NotificationService.getInstance();
  const [preferences, setPreferences] = useState<NotificationPreferences>(
    notificationService.getPreferences()
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setPreferences(notificationService.getPreferences());
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await notificationService.savePreferences(preferences);
    setSaving(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.section, { backgroundColor: colors.secondary }]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="time-outline" size={24} color={colors.gold} />
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            {t('notifications.prayer_times')}
          </Text>
          <Switch
            value={preferences.prayerTimes.enabled}
            onValueChange={(value) =>
              setPreferences({
                ...preferences,
                prayerTimes: { ...preferences.prayerTimes, enabled: value },
              })
            }
            trackColor={{ false: '#767577', true: colors.gold }}
          />
        </View>

        {preferences.prayerTimes.enabled && (
          <View style={styles.options}>
            {Object.entries(preferences.prayerTimes.prayers).map(([prayer, enabled]) => (
              <View key={prayer} style={styles.optionRow}>
                <Text style={[styles.optionLabel, { color: colors.foreground }]}>
                  {t(`prayer_times.${prayer}`)}
                </Text>
                <Switch
                  value={enabled}
                  onValueChange={(value) =>
                    setPreferences({
                      ...preferences,
                      prayerTimes: {
                        ...preferences.prayerTimes,
                        prayers: { ...preferences.prayerTimes.prayers, [prayer]: value },
                      },
                    })
                  }
                  trackColor={{ false: '#767577', true: colors.gold }}
                />
              </View>
            ))}

            <View style={styles.optionRow}>
              <Text style={[styles.optionLabel, { color: colors.foreground }]}>
                {t('notifications.play_athan')}
              </Text>
              <Switch
                value={preferences.prayerTimes.playAthan}
                onValueChange={(value) =>
                  setPreferences({
                    ...preferences,
                    prayerTimes: { ...preferences.prayerTimes, playAthan: value },
                  })
                }
                trackColor={{ false: '#767577', true: colors.gold }}
              />
            </View>
          </View>
        )}
      </View>

      <View style={[styles.section, { backgroundColor: colors.secondary }]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="bookmark-outline" size={24} color={colors.gold} />
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            {t('notifications.random_duaa')}
          </Text>
          <Switch
            value={preferences.randomDuaa.enabled}
            onValueChange={(value) =>
              setPreferences({
                ...preferences,
                randomDuaa: { ...preferences.randomDuaa, enabled: value },
              })
            }
            trackColor={{ false: '#767577', true: colors.gold }}
          />
        </View>

        {preferences.randomDuaa.enabled && (
          <View style={styles.options}>
            <Text style={[styles.optionLabel, { color: colors.foreground }]}>
              {t('notifications.frequency')}: {preferences.randomDuaa.frequency}
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.section, { backgroundColor: colors.secondary }]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="book-outline" size={24} color={colors.gold} />
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            {t('notifications.quran_verses')}
          </Text>
          <Switch
            value={preferences.quranVerses.enabled}
            onValueChange={(value) =>
              setPreferences({
                ...preferences,
                quranVerses: { ...preferences.quranVerses, enabled: value },
              })
            }
            trackColor={{ false: '#767577', true: colors.gold }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSave}
        disabled={saving}
        style={[styles.saveButton, { backgroundColor: colors.gold }]}
      >
        <Text style={styles.saveButtonText}>
          {saving ? t('common.saving') : t('common.save')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  options: {
    marginTop: 8,
    gap: 12,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  optionLabel: {
    fontSize: 16,
  },
  saveButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
