import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useLanguage } from '../providers/LanguageProvider';
import { useTheme } from '../providers/ThemeProvider';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import { Ionicons } from '@expo/vector-icons';
import { isTablet, isTV, fontSize, spacing, tvSizes } from '../utils/responsive';

export function QiblaFinder() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const windowWidth = useWindowDimensions().width;
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  
  // Responsive compass size
  const compassSize = isTV ? 300 : (isTablet ? 250 : 200);

  // Kaaba coordinates
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  useEffect(() => {
    initializeQibla();
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const initializeQibla = async () => {
    try {
      setLoading(true);
      
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        setError(t('qibla.location_permission_denied'));
        setLoading(false);
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Calculate Qibla direction
      const direction = calculateQiblaDirection(latitude, longitude);
      setQiblaDirection(direction);

      // Calculate distance
      const dist = calculateDistance(latitude, longitude, KAABA_LAT, KAABA_LNG);
      setDistance(dist);

      // Start magnetometer for compass
      Magnetometer.setUpdateInterval(100);
      const magnetometer = Magnetometer.addListener((data) => {
        const { x, y } = data;
        const heading = Math.atan2(y, x) * (180 / Math.PI);
        const adjustedDirection = (direction - heading + 360) % 360;
        setQiblaDirection(adjustedDirection);
      });

      setSubscription(magnetometer);

      setLoading(false);
    } catch (err) {
      console.error('Qibla error:', err);
      setError(t('qibla.error'));
      setLoading(false);
    }
  };

  const calculateQiblaDirection = (lat: number, lng: number): number => {
    const lat1 = (lat * Math.PI) / 180;
    const lat2 = (KAABA_LAT * Math.PI) / 180;
    const deltaLng = ((KAABA_LNG - lng) * Math.PI) / 180;

    const y = Math.sin(deltaLng) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);

    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180) / Math.PI;
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };


  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.secondary }]}>
        <ActivityIndicator size="large" color={colors.gold} />
        <Text style={[styles.loadingText, { color: colors.foreground }]}>
          {t('qibla.loading')}
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: colors.secondary }]}>
        <Text style={[styles.errorText, { color: 'red' }]}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <View style={styles.header}>
        <Ionicons name="compass-outline" size={24} color={colors.gold} />
        <Text style={[styles.title, { color: colors.foreground }]}>
          {t('qibla.title')}
        </Text>
      </View>

      <View style={styles.compassContainer}>
        <View style={[styles.compass, { borderColor: colors.gold, width: compassSize, height: compassSize, borderRadius: compassSize / 2 }]}>
          {qiblaDirection !== null && (
            <View
              style={[
                styles.arrow,
                {
                  transform: [{ rotate: `${qiblaDirection}deg` }],
                  borderTopColor: colors.gold,
                  borderTopWidth: isTV ? 100 : (isTablet ? 90 : 80),
                  borderLeftWidth: isTV ? 10 : (isTablet ? 9 : 8),
                  borderRightWidth: isTV ? 10 : (isTablet ? 9 : 8),
                  top: isTV ? 15 : (isTablet ? 12 : 10),
                },
              ]}
            />
          )}
          <View style={[styles.centerDot, { backgroundColor: colors.gold, width: isTV ? 16 : (isTablet ? 14 : 12), height: isTV ? 16 : (isTablet ? 14 : 12), borderRadius: isTV ? 8 : (isTablet ? 7 : 6) }]} />
        </View>
      </View>

      {distance !== null && (
        <Text style={[styles.distanceText, { color: colors.foreground, fontSize: isTV ? tvSizes.fontSize.base : (isTablet ? fontSize.base : fontSize.sm) }]}>
          {t('qibla.distance')}: {distance.toFixed(0)} km
        </Text>
      )}

      <Text style={[styles.directionText, { color: colors.foreground, fontSize: isTV ? tvSizes.fontSize.base : (isTablet ? fontSize.sm : 14) }]}>
        {qiblaDirection !== null
          ? `${t('qibla.direction')}: ${Math.round(qiblaDirection)}°`
          : t('qibla.calculating')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  compassContainer: {
    marginVertical: 20,
  },
  compass: {
    borderWidth: isTV ? 4 : 3,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  centerDot: {
    // Size set dynamically
  },
  distanceText: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: '500',
  },
  directionText: {
    fontSize: 14,
    marginTop: 8,
  },
  loadingText: {
    marginTop: 12,
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
  },
});
