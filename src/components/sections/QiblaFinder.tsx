"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { Compass, MapPin, Navigation } from "lucide-react";

export default function QiblaFinder() {
  const { t } = useLanguage();
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [userHeading, setUserHeading] = useState(0);
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getQiblaDirection();

    // Listen to device orientation
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      setUserHeading(360 - event.alpha);
    }
  };

  const getQiblaDirection = async () => {
    try {
      // Use IP-based geolocation instead of browser geolocation
      const ipResponse = await fetch('https://ipapi.co/json/');
      
      if (ipResponse.ok) {
        const ipData = await ipResponse.json();
        
        if (ipData.latitude && ipData.longitude) {
          const qibla = calculateQibla(ipData.latitude, ipData.longitude);
          setQiblaDirection(qibla.direction);
          setDistance(qibla.distance);
        } else {
          throw new Error('Invalid IP response');
        }
      } else {
        throw new Error('IP service failed');
      }
    } catch (error) {
      // Fallback to Riyadh coordinates
      const qibla = calculateQibla(24.7136, 46.6753);
      setQiblaDirection(qibla.direction);
      setDistance(qibla.distance);
    }
  };

  const calculateQibla = (lat: number, lng: number) => {
    // Kaaba coordinates
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;

    const dLng = ((kaabaLng - lng) * Math.PI) / 180;
    const lat1 = (lat * Math.PI) / 180;
    const lat2 = (kaabaLat * Math.PI) / 180;

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

    let bearing = (Math.atan2(y, x) * 180) / Math.PI;
    bearing = (bearing + 360) % 360;

    // Calculate distance using Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = ((kaabaLat - lat) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return { direction: bearing, distance: Math.round(distance) };
  };

  const getCompassRotation = () => {
    if (qiblaDirection === null) return 0;
    return qiblaDirection - userHeading;
  };

  return (
    <section id="qibla" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Compass className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {t("qibla.title")}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("qibla.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-light-secondary dark:bg-dark-secondary rounded-2xl p-8 md:p-12 border-2 border-islamic-gold/30 glow"
        >
          {error ? (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-islamic-gold mx-auto mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-400">{error}</p>
              <button
                onClick={getQiblaDirection}
                className="mt-4 px-6 py-3 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300"
              >
                {t("retry")}
              </button>
            </div>
          ) : qiblaDirection !== null ? (
            <div className="text-center">
              {/* Compass */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-islamic-gold/20 via-islamic-green/20 to-islamic-blue/20" />

                {/* Compass Circle */}
                <motion.div
                  className="absolute inset-4 rounded-full border-4 border-islamic-gold/30"
                  style={{
                    transform: `rotate(${getCompassRotation()}deg)`,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Qibla Arrow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Navigation className="w-12 h-12 text-islamic-gold" fill="currentColor" />
                  </div>

                  {/* Direction Text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-islamic-gold">
                        {Math.round(qiblaDirection)}°
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("qibla.direction")}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Cardinal Directions */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-sm font-bold">N</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm font-bold">S</div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-sm font-bold">W</div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-sm font-bold">E</div>
              </div>

              {/* Distance to Makkah */}
              {distance && (
                <div className="p-6 bg-islamic-gold/10 rounded-xl">
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                    {t("qibla.distance")}
                  </p>
                  <p className="text-3xl font-bold text-islamic-gold">
                    {distance.toLocaleString()} km
                  </p>
                </div>
              )}

              {/* Instructions */}
              <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                أمسك الجهاز بشكل مسطح ووجه السهم نحو القبلة
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="shimmer w-64 h-64 mx-auto rounded-full" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
