"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { Compass, MapPin, Navigation } from "lucide-react";
import SectionTitleLink from "./SectionTitleLink";
import { siteConfig } from "@/config/site";

type CompassOrientationEvent = DeviceOrientationEvent & {
  webkitCompassHeading?: number;
};

type AbsoluteOrientationSensorLike = {
  start: () => void;
  stop: () => void;
  addEventListener: (type: "reading" | "error", listener: () => void) => void;
  quaternion?: number[] | Float64Array | null;
};

function normalizeHeading(value: number) {
  let heading = value % 360;
  if (heading < 0) heading += 360;
  return heading;
}

function shortestAngleDelta(from: number, to: number) {
  let delta = ((to - from + 540) % 360) - 180;
  return delta;
}

function screenOrientationCompensation() {
  if (typeof window === "undefined") return 0;
  const orientation = window.screen?.orientation?.angle;
  if (typeof orientation === "number") return orientation;
  const legacy = (window as Window & { orientation?: number }).orientation;
  return typeof legacy === "number" ? legacy : 0;
}

/** Convert AbsoluteOrientationSensor quaternion to compass heading (deg). */
function headingFromQuaternion(q: ArrayLike<number>) {
  const [x, y, z, w] = [q[0], q[1], q[2], q[3]];
  // yaw around Z (device face-up on a table)
  const siny = 2 * (w * z + x * y);
  const cosy = 1 - 2 * (y * y + z * z);
  const yaw = Math.atan2(siny, cosy) * (180 / Math.PI);
  return normalizeHeading(-yaw);
}

export default function QiblaFinder() {
  const { t } = useLanguage();
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [userHeading, setUserHeading] = useState(0);
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState<"prompt" | "granted" | "denied">("prompt");
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);
  const [compassReady, setCompassReady] = useState(false);
  const [compassMode, setCompassMode] = useState<"absolute" | "relative" | "none">("none");
  const orientationBound = useRef(false);
  const smoothedHeading = useRef<number | null>(null);
  const absoluteSensor = useRef<AbsoluteOrientationSensorLike | null>(null);
  const onOrientation = useRef<(event: Event) => void>(() => {});
  const applyHeadingRef = useRef<(rawHeading: number, mode: "absolute" | "relative") => void>(() => {});

  const applyHeading = (rawHeading: number, mode: "absolute" | "relative") => {
    const compensated = normalizeHeading(rawHeading - screenOrientationCompensation());
    if (smoothedHeading.current === null) {
      smoothedHeading.current = compensated;
    } else {
      // Low-pass filter — reduces jitter from magnetometer noise.
      const delta = shortestAngleDelta(smoothedHeading.current, compensated);
      smoothedHeading.current = normalizeHeading(smoothedHeading.current + delta * 0.22);
    }
    setUserHeading(smoothedHeading.current);
    setCompassReady(true);
    setCompassMode(mode);
  };

  const orientationListener = useRef((event: Event) => {
    onOrientation.current(event);
  });

  // Keep handlers fresh without writing refs during render (react-hooks/refs).
  useEffect(() => {
    applyHeadingRef.current = applyHeading;
    onOrientation.current = (event: Event) => {
      // AbsoluteOrientationSensor is the sole source while active.
      if (absoluteSensor.current) return;

      const orientation = event as CompassOrientationEvent;
      let heading: number | null = null;
      let mode: "absolute" | "relative" = "relative";

      // iOS Safari: true / magnetic north degrees (best web signal).
      if (typeof orientation.webkitCompassHeading === "number") {
        heading = orientation.webkitCompassHeading;
        mode = "absolute";
      } else if (orientation.absolute === true && orientation.alpha !== null) {
        // W3C absolute orientation: alpha=0 when device top points north.
        heading = 360 - orientation.alpha;
        mode = "absolute";
      } else if (event.type === "deviceorientationabsolute" && orientation.alpha !== null) {
        heading = 360 - orientation.alpha;
        mode = "absolute";
      } else if (orientation.alpha !== null) {
        // Relative only — useful after calibration but not true north.
        heading = 360 - orientation.alpha;
        mode = "relative";
      }

      if (heading === null || Number.isNaN(heading)) return;
      applyHeadingRef.current(heading, mode);
    };
  });

  useEffect(() => {
    const listener = orientationListener.current;
    return () => {
      if (absoluteSensor.current) {
        try {
          absoluteSensor.current.stop();
        } catch {
          /* ignore */
        }
        absoluteSensor.current = null;
      }
      if (!orientationBound.current || typeof window === "undefined") return;
      window.removeEventListener("deviceorientation", listener, true);
      window.removeEventListener("deviceorientationabsolute", listener, true);
    };
  }, []);

  const enableDeviceCompass = async () => {
    if (typeof window === "undefined") return;

    const DeviceOrientation = window.DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied" | "default">;
    };

    if (DeviceOrientation) {
      try {
        if (typeof DeviceOrientation.requestPermission === "function") {
          // Must run from a user gesture on iOS.
          const response = await DeviceOrientation.requestPermission();
          if (response !== "granted") {
            setError(t("qibla.compass_denied"));
            return;
          }
        }
      } catch {
        setError(t("qibla.compass_denied"));
        return;
      }
    }

    const bindDeviceOrientationFallback = () => {
      if (orientationBound.current || !window.DeviceOrientationEvent) return;
      const listener = orientationListener.current;
      window.addEventListener("deviceorientationabsolute", listener, true);
      window.addEventListener("deviceorientation", listener, true);
      orientationBound.current = true;
    };

    // Prefer Generic Sensor API absolute orientation when available (Chrome Android).
    // Do not also bind relative DeviceOrientation events while this sensor is active —
    // mixing streams pulls the smoothed heading off true north.
    const SensorCtor = (
      window as Window & {
        AbsoluteOrientationSensor?: new (options?: { frequency?: number; referenceFrame?: string }) => AbsoluteOrientationSensorLike;
      }
    ).AbsoluteOrientationSensor;

    if (typeof SensorCtor === "function" && !absoluteSensor.current) {
      try {
        const sensor = new SensorCtor({ frequency: 30, referenceFrame: "device" });
        sensor.addEventListener("reading", () => {
          if (!sensor.quaternion) return;
          applyHeadingRef.current(headingFromQuaternion(sensor.quaternion), "absolute");
        });
        sensor.addEventListener("error", () => {
          try {
            sensor.stop();
          } catch {
            /* ignore */
          }
          if (absoluteSensor.current === sensor) {
            absoluteSensor.current = null;
          }
          bindDeviceOrientationFallback();
        });
        sensor.start();
        absoluteSensor.current = sensor;
      } catch {
        absoluteSensor.current = null;
      }
    }

    if (!absoluteSensor.current) {
      bindDeviceOrientationFallback();
    }
  };

  const getQiblaDirection = async () => {
    setError("");
    setLoading(true);
    setHasRequestedLocation(true);
    await enableDeviceCompass();
    let latitude = siteConfig.fallbackLocation.latitude;
    let longitude = siteConfig.fallbackLocation.longitude;
    let locationDetected = false;

    // First, try browser geolocation API (most accurate)
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            {
              enableHighAccuracy: true,
              timeout: 15000, // Increased timeout
              maximumAge: 0
            }
          );
        });
        
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        setLocationPermission("granted");
        locationDetected = true;
        setError(""); // Clear any previous errors
      } catch (geoError: any) {
        console.warn('Geolocation failed:', geoError);
        setLocationPermission("denied");
        
        // Fallback to IP-based location (use proxy to avoid CORS)
        try {
          const ipResponse = await fetch('/api/ip-location', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          });
          
          if (ipResponse.ok) {
            const ipData = await ipResponse.json();
            if (ipData.latitude && ipData.longitude) {
              latitude = ipData.latitude;
              longitude = ipData.longitude;
              locationDetected = true;
              setError(""); // Clear any previous errors
            } else {
              setError(t("qibla.error") || "Unable to determine location. Please allow location access or try again.");
            }
          } else {
            setError(t("qibla.error") || "Unable to determine location. Please allow location access or try again.");
          }
        } catch (ipError) {
          console.warn('IP location detection failed:', ipError);
          setError(t("qibla.error") || "Unable to determine location. Please allow location access or try again.");
        }
      }
    } else {
      // Browser doesn't support geolocation, try IP (use proxy to avoid CORS)
      try {
        const ipResponse = await fetch('/api/ip-location', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (ipResponse.ok) {
          const ipData = await ipResponse.json();
          if (ipData.latitude && ipData.longitude) {
            latitude = ipData.latitude;
            longitude = ipData.longitude;
            locationDetected = true;
            setError(""); // Clear any previous errors
          } else {
            setError(t("qibla.error") || "Unable to determine location. Please try again.");
          }
        } else {
          setError(t("qibla.error") || "Unable to determine location. Please try again.");
        }
      } catch (ipError) {
        console.warn('IP location detection failed:', ipError);
        setError(t("qibla.error") || "Unable to determine location. Please try again.");
      }
    }

    // Calculate Qibla direction even if using default location
    const qibla = calculateQibla(latitude, longitude);
    setQiblaDirection(qibla.direction);
    setDistance(qibla.distance);
    setLoading(false);
    
    // If location was detected successfully, clear any errors
    if (locationDetected) {
      setError("");
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
    // The compass should rotate so that the Qibla arrow points in the correct direction
    // userHeading is the device's current heading (0 = North)
    // qiblaDirection is the bearing to Qibla from North
    // We need to rotate the compass by the difference
    let rotation = qiblaDirection - userHeading;
    
    // Normalize to -180 to 180 for smoother rotation
    if (rotation > 180) rotation -= 360;
    if (rotation < -180) rotation += 360;
    
    return rotation;
  };

  return (
    <section id="qibla" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Compass className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              <SectionTitleLink section="qibla">{t("qibla.title")}</SectionTitleLink>
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("qibla.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.98, y: 8 }}
          whileInView={{ scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.4,
            delay: 0.08,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="bg-light-secondary dark:bg-dark-secondary rounded-2xl p-8 md:p-12 border-2 border-islamic-gold/30 glow"
        >
          {!hasRequestedLocation ? (
            <div className="text-center py-12">
              <Compass className="w-16 h-16 text-islamic-gold mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t("qibla.title")}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                {t("qibla.subtitle") || "Click the button below to find the Qibla direction from your location"}
              </p>
              <button
                onClick={getQiblaDirection}
                className="px-8 py-4 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300 hover:scale-105 glow flex items-center gap-2 mx-auto"
              >
                <Navigation className="w-5 h-5" />
                {t("qibla.find_direction") || "Find Qibla Direction"}
              </button>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-islamic-gold/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-islamic-gold rounded-full animate-spin"></div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t("qibla.detecting_location") || "Detecting your location..."}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                {t("qibla.please_allow") || "Please allow location access if prompted"}
              </p>
            </div>
          ) : error && !qiblaDirection ? (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <button
                onClick={getQiblaDirection}
                className="px-6 py-3 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300 glow"
              >
                {t("qibla.retry") || "Retry"}
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
              <div className="mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t("qibla.location_hint")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                  {compassReady
                    ? t("qibla.compass_active").replace("{heading}", String(Math.round(userHeading)))
                    : t("qibla.compass_hint")}
                </p>
                {compassReady && compassMode === "relative" && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-2">
                    {t("qibla.compass_relative")}
                  </p>
                )}
                {locationPermission === "denied" && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                    {t("qibla.location_hint") || "For better accuracy, please allow location access in your browser settings."}
                  </p>
                )}
                <button
                  onClick={getQiblaDirection}
                  className="mt-4 px-4 py-2 text-sm bg-islamic-gold/20 text-islamic-gold font-semibold rounded-full hover:bg-islamic-gold/30 transition-all duration-300"
                >
                  {t("qibla.refresh") || "Refresh Location"}
                </button>
              </div>
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
