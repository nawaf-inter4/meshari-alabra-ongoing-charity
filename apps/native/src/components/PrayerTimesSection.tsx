import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { isTablet, isTV, fontSize, spacing, sizes, tvSizes } from '../utils/responsive';

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
}

interface PrayerTimeData {
  name: string;
  time: string;
  isNext: boolean;
  isCurrent: boolean;
}

export function PrayerTimesSection() {
  const { t, locale } = useLanguage();
  const { colors } = useTheme();
  const windowWidth = useWindowDimensions().width;
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<Location.PermissionStatus | null>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (locationPermission === Location.PermissionStatus.GRANTED) {
      fetchPrayerTimes();
    }
  }, [locationPermission]);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);
      
      if (status === Location.PermissionStatus.GRANTED) {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(`${loc.coords.latitude},${loc.coords.longitude}`);
      }
    } catch (err) {
      console.error('Location permission error:', err);
      setError(t('prayer_times.location_error'));
    }
  };

  const fetchPrayerTimes = async () => {
    try {
      setLoading(true);
      setError(null);

      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      const response = await fetch(
        `http://api.aladhan.com/v1/calendar/${today.getFullYear()}/${month}?latitude=${latitude}&longitude=${longitude}&method=2`
      );
      const data = await response.json();

      if (data.code === 200 && data.data) {
        const dayData = data.data[day - 1];
        if (dayData && dayData.timings) {
          setPrayerTimes({
            Fajr: dayData.timings.Fajr,
            Dhuhr: dayData.timings.Dhuhr,
            Asr: dayData.timings.Asr,
            Maghrib: dayData.timings.Maghrib,
            Isha: dayData.timings.Isha,
            Sunrise: dayData.timings.Sunrise,
          });
        }
      }

      // Try to get location name
      try {
        const locResponse = await fetch(`https://ipapi.co/json/`);
        const locData = await locResponse.json();
        if (locData.city) {
          setLocation(`${locData.city || 'Riyadh'}, ${locData.countryName || 'Saudi Arabia'}`);
        }
      } catch (err) {
        // Ignore location name error
      }
    } catch (err) {
      console.error('Prayer times error:', err);
      setError(t('prayer_times.fetch_error'));
    } finally {
      setLoading(false);
    }
  };

  const getPrayerTimeData = (): PrayerTimeData[] => {
    if (!prayerTimes) return [];

    const prayers = [
      { key: 'Fajr', name: t('prayer_times.fajr'), time: prayerTimes.Fajr },
      { key: 'Dhuhr', name: t('prayer_times.dhuhr'), time: prayerTimes.Dhuhr },
      { key: 'Asr', name: t('prayer_times.asr'), time: prayerTimes.Asr },
      { key: 'Maghrib', name: t('prayer_times.maghrib'), time: prayerTimes.Maghrib },
      { key: 'Isha', name: t('prayer_times.isha'), time: prayerTimes.Isha },
    ];

    const now = new Date();
    let nextPrayerIndex = -1;

    prayers.forEach((prayer, index) => {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = new Date();
      prayerTime.setHours(hours, minutes, 0, 0);
      
      if (prayerTime > now && nextPrayerIndex === -1) {
        nextPrayerIndex = index;
      }
    });

    return prayers.map((prayer, index) => ({
      name: prayer.name,
      time: prayer.time,
      isNext: index === nextPrayerIndex,
      isCurrent: false,
    }));
  };

  // Responsive styles based on screen size
  const dynamicStyles = {
    container: {
      padding: isTV ? tvSizes.spacing.lg : (isTablet ? spacing.lg : spacing.md),
      borderRadius: isTablet ? 16 : 12,
    },
    title: {
      fontSize: isTV ? tvSizes.fontSize.lg : (isTablet ? fontSize.xl : fontSize.lg),
    },
    prayerItem: {
      padding: isTV ? tvSizes.spacing.md : (isTablet ? spacing.md : spacing.sm),
      minHeight: isTV ? tvSizes.touchTarget : sizes.touchTarget,
    },
    prayerName: {
      fontSize: isTV ? tvSizes.fontSize.base : (isTablet ? fontSize.base : fontSize.sm),
    },
    prayerTime: {
      fontSize: isTV ? tvSizes.fontSize.base : (isTablet ? fontSize.base : fontSize.sm),
    },
  };

  if (loading) {
    return (
      <View style={[styles.container, dynamicStyles.container, { backgroundColor: colors.secondary }]}>
        <ActivityIndicator size="large" color={colors.gold} />
        <Text style={[styles.loadingText, { color: colors.foreground }]}>
          {t('prayer_times.loading')}
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, dynamicStyles.container, { backgroundColor: colors.secondary }]}>
        <Text style={[styles.errorText, { color: 'red' }]}>{error}</Text>
        <TouchableOpacity
          onPress={fetchPrayerTimes}
          style={[styles.retryButton, { backgroundColor: colors.gold, minHeight: dynamicStyles.prayerItem.minHeight }]}
        >
          <Text style={styles.retryButtonText}>{t('common.retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const prayerData = getPrayerTimeData();

  return (
    <View style={[styles.container, dynamicStyles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.header}>
        <Ionicons name="time-outline" size={isTV ? 32 : (isTablet ? 28 : 24)} color={colors.gold} />
        <Text style={[styles.title, dynamicStyles.title, { color: colors.foreground }]}>
          {t('prayer_times.title')}
        </Text>
      </View>

      {location && (
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={isTablet ? 18 : 16} color={colors.foreground} />
          <Text style={[styles.locationText, { color: colors.foreground, fontSize: dynamicStyles.prayerName.fontSize }]}>
            {location}
          </Text>
        </View>
      )}

      <ScrollView style={styles.prayersList} showsVerticalScrollIndicator={false}>
        {prayerData.map((prayer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.prayerItem,
              dynamicStyles.prayerItem,
              prayer.isNext && { backgroundColor: colors.gold, opacity: 0.8 },
            ]}
            activeOpacity={0.7}
          >
            <Text style={[styles.prayerName, dynamicStyles.prayerName, { color: prayer.isNext ? '#0F172A' : colors.foreground }]}>
              {prayer.name}
            </Text>
            <Text style={[styles.prayerTime, dynamicStyles.prayerTime, { color: prayer.isNext ? '#0F172A' : colors.foreground }]}>
              {prayer.time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  locationText: {
    fontWeight: '500',
  },
  prayersList: {
    maxHeight: 400,
  },
  prayerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 4,
  },
  prayerName: {
    fontWeight: '500',
    flex: 1,
  },
  prayerTime: {
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 12,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButtonText: {
    color: '#0F172A',
    fontWeight: '600',
  },
});
