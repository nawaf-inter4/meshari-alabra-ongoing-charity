import { useState, useEffect } from 'react';

export function QiblaFinder() {
  const [direction, setDirection] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  // Kaaba coordinates
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  useEffect(() => {
    // Get user location and calculate Qibla
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const dir = calculateQiblaDirection(latitude, longitude);
        const dist = calculateDistance(latitude, longitude, KAABA_LAT, KAABA_LNG);
        setDirection(dir);
        setDistance(dist);
      });
    }
  }, []);

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

  return (
    <div className="qibla-finder">
      <h2>Qibla Direction</h2>
      {direction !== null && (
        <>
          <div className="compass">
            <div
              className="arrow"
              style={{ transform: `rotate(${direction}deg)` }}
            />
          </div>
          <p>Direction: {Math.round(direction)}°</p>
          {distance !== null && <p>Distance: {distance.toFixed(0)} km</p>}
        </>
      )}
    </div>
  );
}
