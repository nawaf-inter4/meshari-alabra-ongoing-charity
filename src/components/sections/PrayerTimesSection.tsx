"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { Clock, MapPin, Bell } from "lucide-react";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
}

export default function PrayerTimesSection() {
  const { t } = useLanguage();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrayerTimes();
    updateHijriDate();
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      // Get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Fetch prayer times from Aladhan API
            const response = await fetch(
              `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=4`
            );
            const data = await response.json();

            if (data.code === 200) {
              setPrayerTimes(data.data.timings);
              setLocation(data.data.meta.timezone);
            }
            setLoading(false);
          },
          () => {
            // Default to Riyadh if location access denied
            fetchDefaultPrayerTimes();
          }
        );
      } else {
        fetchDefaultPrayerTimes();
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      setLoading(false);
    }
  };

  const fetchDefaultPrayerTimes = async () => {
    try {
      const response = await fetch(
        "https://api.aladhan.com/v1/timingsByCity?city=Riyadh&country=Saudi Arabia&method=4"
      );
      const data = await response.json();

      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        setLocation("Riyadh, Saudi Arabia");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching default prayer times:", error);
      setLoading(false);
    }
  };

  const updateHijriDate = () => {
    const hijri = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());
    setHijriDate(hijri);
  };

  const prayers = [
    { name: t("prayer.fajr"), key: "Fajr" as keyof PrayerTimes },
    { name: t("prayer.sunrise"), key: "Sunrise" as keyof PrayerTimes },
    { name: t("prayer.dhuhr"), key: "Dhuhr" as keyof PrayerTimes },
    { name: t("prayer.asr"), key: "Asr" as keyof PrayerTimes },
    { name: t("prayer.maghrib"), key: "Maghrib" as keyof PrayerTimes },
    { name: t("prayer.isha"), key: "Isha" as keyof PrayerTimes },
  ];

  return (
    <section id="prayer-times" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Clock className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {t("prayer.title")}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("prayer.subtitle")}
          </p>
        </motion.div>

        {/* Hijri Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8 p-6 bg-gradient-to-r from-islamic-gold/20 via-islamic-green/20 to-islamic-blue/20 rounded-2xl"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t("hijri.title")}</p>
          <p className="text-2xl md:text-3xl font-bold text-islamic-gold">{hijriDate}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </motion.div>

        {/* Location */}
        {location && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-2 mb-8 text-gray-600 dark:text-gray-400"
          >
            <MapPin className="w-5 h-5" />
            <span>{location}</span>
          </motion.div>
        )}

        {/* Prayer Times Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="shimmer w-full h-64 rounded-2xl" />
          </div>
        ) : prayerTimes ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {prayers.map((prayer, index) => (
              <motion.div
                key={prayer.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-light-secondary dark:bg-dark-secondary rounded-2xl p-6 text-center border-2 border-transparent hover:border-islamic-gold transition-all duration-300 card-hover"
              >
                <Bell className="w-6 h-6 text-islamic-gold mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">{prayer.name}</h3>
                <p className="text-2xl font-bold text-islamic-green dark:text-islamic-gold">
                  {prayerTimes[prayer.key]}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400">
            {t("error")}
          </div>
        )}
      </div>
    </section>
  );
}
