"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../LanguageProvider";
import { motion } from "framer-motion";
import { Clock, MapPin, Bell, Search, ChevronDown, Volume2, VolumeX, AlertCircle } from "lucide-react";

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
  time24: string;
  isNext: boolean;
  isCurrent: boolean;
  timeRemaining: string;
}

interface NotificationPermission {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

export default function PrayerTimesSection() {
  const { t, locale } = useLanguage();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get localized date format - only on client to prevent hydration mismatch
  const getLocalizedDate = () => {
    if (!mounted) return '';
    
    const date = new Date();
    const localeCode = locale === 'ar' ? 'ar-SA' : 'en-US';
    
    return new Intl.DateTimeFormat(localeCode, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{city: string, country: string, lat: number, lng: number} | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  
  // Prayer tracking state
  const [currentPrayer, setCurrentPrayer] = useState<string>("");
  const [nextPrayer, setNextPrayer] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [prayerData, setPrayerData] = useState<PrayerTimeData[]>([]);
  const [isAthanPlaying, setIsAthanPlaying] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>({ granted: false, denied: false, default: true });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const athanAudioRef = useRef<HTMLAudioElement>(null);
  const prayerCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchPrayerTimes();
    updateHijriDate();
    requestNotificationPermission();
    startPrayerTracking();
    
    return () => {
      if (prayerCheckIntervalRef.current) {
        clearInterval(prayerCheckIntervalRef.current);
      }
    };
  }, []);

  // Update Hijri date when locale changes
  useEffect(() => {
    updateHijriDate();
  }, [locale]);

  // Handle location search
  useEffect(() => {
    if (searchQuery.length > 2) {
      searchLocations();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setIsLocationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      let latitude = 24.7136; // Default to Riyadh
      let longitude = 46.6753;
      let city = 'Riyadh';
      let country = 'Saudi Arabia';

      // Try to get user location via IP
      try {
        const ipResponse = await fetch('https://ipapi.co/json/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (ipResponse.ok) {
          const ipData = await ipResponse.json();
          latitude = ipData.latitude;
          longitude = ipData.longitude;
          city = ipData.city;
          country = ipData.country_name;
        }
      } catch (error) {
        console.warn('IP location detection failed, using default location:', error);
      }

      // Fetch prayer times using coordinates
      const prayerResponse = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=4&school=1`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!prayerResponse.ok) {
        throw new Error(`Prayer times API failed: ${prayerResponse.status}`);
      }

      const prayerData = await prayerResponse.json();

      if (prayerData.code === 200) {
        // Convert to 12-hour format
        const timings = prayerData.data.timings;
        const formatTime = (time24: string) => {
          const [hours, minutes] = time24.split(':');
          const hour = parseInt(hours);
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const hour12 = hour % 12 || 12;
          return `${hour12}:${minutes} ${ampm}`;
        };

        setPrayerTimes({
          Fajr: formatTime(timings.Fajr),
          Dhuhr: formatTime(timings.Dhuhr),
          Asr: formatTime(timings.Asr),
          Maghrib: formatTime(timings.Maghrib),
          Isha: formatTime(timings.Isha),
          Sunrise: formatTime(timings.Sunrise),
        });
        setLocation(`${city}, ${country}`);
      } else {
        throw new Error('Invalid prayer times API response');
      }
      
      setLoading(false);
    } catch (error) {
      // Silent error handling
      setError("Failed to fetch prayer times");
      fetchDefaultPrayerTimes();
    }
  };

  const fetchDefaultPrayerTimes = async () => {
    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(
        "https://api.aladhan.com/v1/timingsByCity?city=Riyadh&country=Saudi Arabia&method=4",
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.code === 200) {
        // Convert to 12-hour format
        const timings = data.data.timings;
        const formatTime = (time24: string) => {
          const [hours, minutes] = time24.split(':');
          const hour = parseInt(hours);
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const hour12 = hour % 12 || 12;
          return `${hour12}:${minutes} ${ampm}`;
        };

        setPrayerTimes({
          Fajr: formatTime(timings.Fajr),
          Dhuhr: formatTime(timings.Dhuhr),
          Asr: formatTime(timings.Asr),
          Maghrib: formatTime(timings.Maghrib),
          Isha: formatTime(timings.Isha),
          Sunrise: formatTime(timings.Sunrise),
        });
        setLocation("Riyadh, Saudi Arabia");
      } else {
        throw new Error('Invalid API response');
      }
      setLoading(false);
    } catch (error) {
      // Error fetching default prayer times - using fallback
      setError("Using fallback prayer times");
      // Fallback to static prayer times for Riyadh (12-hour format)
      setPrayerTimes({
        Fajr: "5:15 AM",
        Sunrise: "6:30 AM",
        Dhuhr: "12:00 PM",
        Asr: "3:30 PM",
        Maghrib: "6:00 PM",
        Isha: "7:30 PM"
      });
      setLocation("Riyadh, Saudi Arabia");
      setLoading(false);
    }
  };

  const updateHijriDate = async () => {
    try {
      // Use Aladhan API for accurate Hijri date
      const response = await fetch('https://api.aladhan.com/v1/gToH');
      const data = await response.json();
      
      if (data.code === 200 && data.data) {
        const hijriData = data.data;
        const day = hijriData.hijri.day;
        const month = hijriData.hijri.month;
        const year = hijriData.hijri.year;
        
        // Format based on locale with proper error handling
        let formattedDate = '';
        
        if (locale === 'ar') {
          // Ensure we use Arabic month name with proper mapping
          const arabicMonth = month.ar || 
            (month.en === 'Jumada al-Ula' ? 'جُمادى الأولى' :
             month.en === 'Jumada al-Akhirah' ? 'جُمادى الآخرة' :
             month.en === 'Rajab' ? 'رجب' :
             month.en === 'Sha\'ban' ? 'شعبان' :
             month.en === 'Ramadan' ? 'رمضان' :
             month.en === 'Shawwal' ? 'شوال' :
             month.en === 'Dhul Qa\'dah' ? 'ذو القعدة' :
             month.en === 'Dhul Hijjah' ? 'ذو الحجة' :
             month.en === 'Muharram' ? 'محرم' :
             month.en === 'Safar' ? 'صفر' :
             month.en === 'Rabi\' al-Awwal' ? 'ربيع الأول' :
             month.en === 'Rabi\' al-Akhir' ? 'ربيع الآخر' :
             month.en);
          formattedDate = `${day} ${arabicMonth} ${year} هـ`;
        } else if (locale === 'fr') {
          formattedDate = `${day} ${month.fr || month.en} ${year} AH`;
        } else if (locale === 'tr') {
          formattedDate = `${day} ${month.tr || month.en} ${year} AH`;
        } else if (locale === 'ur') {
          formattedDate = `${day} ${month.ur || month.en} ${year} ہجری`;
        } else if (locale === 'id') {
          formattedDate = `${day} ${month.id || month.en} ${year} AH`;
        } else if (locale === 'ms') {
          formattedDate = `${day} ${month.ms || month.en} ${year} AH`;
        } else if (locale === 'bn') {
          formattedDate = `${day} ${month.bn || month.en} ${year} হিজরি`;
        } else if (locale === 'it') {
          formattedDate = `${day} ${month.it || month.en} ${year} AH`;
        } else if (locale === 'ja') {
          formattedDate = `${day} ${month.ja || month.en} ${year} AH`;
        } else if (locale === 'ko') {
          formattedDate = `${day} ${month.ko || month.en} ${year} AH`;
        } else if (locale === 'zh') {
          formattedDate = `${day} ${month.zh || month.en} ${year} 回历`;
        } else {
          formattedDate = `${day} ${month.en} ${year} AH`;
        }
        
        setHijriDate(formattedDate);
      } else {
        throw new Error('API response invalid');
      }
    } catch (error) {
      console.error('Error fetching Hijri date:', error);
      // Fallback to a proper Hijri date format
      const today = new Date();
      const hijriYear = 1447; // Approximate current Hijri year
      const hijriDay = today.getDate();
      
      if (locale === 'ar') {
        // Use proper Arabic month name
        const hijriMonth = 'جُمادى الأولى';
        setHijriDate(`${hijriDay} ${hijriMonth} ${hijriYear} هـ`);
      } else {
        setHijriDate(`${hijriDay} Jumada al-Ula ${hijriYear} AH`);
      }
    }
  };


  // Request notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission({
        granted: permission === 'granted',
        denied: permission === 'denied',
        default: permission === 'default'
      });
    }
  };

  // Start prayer time tracking
  const startPrayerTracking = () => {
    if (prayerCheckIntervalRef.current) {
      clearInterval(prayerCheckIntervalRef.current);
    }
    
    prayerCheckIntervalRef.current = setInterval(() => {
      checkPrayerTimes();
    }, 60000); // Check every minute
  };

  // Check current prayer and next prayer
  const checkPrayerTimes = () => {
    if (!prayerTimes) return;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayerTimes24 = {
      Fajr: parseTime24(prayerTimes.Fajr),
      Dhuhr: parseTime24(prayerTimes.Dhuhr),
      Asr: parseTime24(prayerTimes.Asr),
      Maghrib: parseTime24(prayerTimes.Maghrib),
      Isha: parseTime24(prayerTimes.Isha)
    };

    const prayers = [
      { name: 'Fajr', time: prayerTimes24.Fajr },
      { name: 'Dhuhr', time: prayerTimes24.Dhuhr },
      { name: 'Asr', time: prayerTimes24.Asr },
      { name: 'Maghrib', time: prayerTimes24.Maghrib },
      { name: 'Isha', time: prayerTimes24.Isha }
    ];

    // Find current and next prayer
    let currentPrayerName = '';
    let nextPrayerName = '';
    let nextPrayerTime = 0;

    for (let i = 0; i < prayers.length; i++) {
      const prayer = prayers[i];
      const nextPrayer = prayers[(i + 1) % prayers.length];
      
      if (currentTime >= prayer.time && currentTime < nextPrayer.time) {
        currentPrayerName = prayer.name;
        nextPrayerName = nextPrayer.name;
        nextPrayerTime = nextPrayer.time;
        break;
      }
    }

    // If it's past Isha, next prayer is Fajr tomorrow
    if (currentTime >= prayerTimes24.Isha) {
      currentPrayerName = 'Isha';
      nextPrayerName = 'Fajr';
      nextPrayerTime = prayerTimes24.Fajr + 24 * 60; // Next day
    }

    setCurrentPrayer(currentPrayerName);
    setNextPrayer(nextPrayerName);

    // Calculate time remaining
    const timeRemaining = nextPrayerTime - currentTime;
    const hours = Math.floor(timeRemaining / 60);
    const minutes = timeRemaining % 60;
    setTimeRemaining(`${hours}h ${minutes}m`);

    // Check if it's time for prayer (within 1 minute)
    if (timeRemaining <= 1 && timeRemaining >= 0) {
      triggerPrayerNotification(nextPrayerName);
    }
  };

  // Parse 12-hour time to 24-hour minutes
  const parseTime24 = (time12: string): number => {
    const [time, period] = time12.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    return hour24 * 60 + minutes;
  };

  // Trigger prayer notification
  const triggerPrayerNotification = async (prayerName: string) => {
    const prayerNames = {
      Fajr: locale === 'ar' ? 'الفجر' : 'Fajr',
      Dhuhr: locale === 'ar' ? 'الظهر' : 'Dhuhr',
      Asr: locale === 'ar' ? 'العصر' : 'Asr',
      Maghrib: locale === 'ar' ? 'المغرب' : 'Maghrib',
      Isha: locale === 'ar' ? 'العشاء' : 'Isha'
    };

    const message = locale === 'ar' 
      ? `حان وقت صلاة ${prayerNames[prayerName as keyof typeof prayerNames]}`
      : `It's time for ${prayerNames[prayerName as keyof typeof prayerNames]} prayer`;

    setNotificationMessage(message);
    setShowNotification(true);

    // Browser notification
    if (notificationPermission.granted) {
      new Notification('Prayer Time', {
        body: message,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png',
        tag: 'prayer-time',
        requireInteraction: true
      });
    }

    // Play athan
    playAthan();

    // Auto-hide notification after 10 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 10000);
  };

  // Play athan audio
  const playAthan = () => {
    if (athanAudioRef.current) {
      setIsAthanPlaying(true);
      athanAudioRef.current.play().catch(console.error);
    }
  };

  // Stop athan audio
  const stopAthan = () => {
    if (athanAudioRef.current) {
      athanAudioRef.current.pause();
      athanAudioRef.current.currentTime = 0;
      setIsAthanPlaying(false);
    }
  };

  const searchLocations = async () => {
    if (searchQuery.length < 3) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/citiesByCountry/${searchQuery}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.code === 200 && data.data) {
          setSearchResults(data.data.slice(0, 10)); // Limit to 10 results
        }
      }
    } catch (error) {
      console.error('Location search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationSelect = async (location: any) => {
    setSelectedLocation({
      city: location.city,
      country: location.country,
      lat: location.latitude,
      lng: location.longitude
    });
    setLocation(`${location.city}, ${location.country}`);
    setSearchQuery("");
    setSearchResults([]);
    setIsLocationDropdownOpen(false);
    
    // Fetch prayer times for selected location
    await fetchPrayerTimesForLocation(location.latitude, location.longitude, location.city, location.country);
  };

  const fetchPrayerTimesForLocation = async (lat: number, lng: number, city: string, country: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=4&school=1`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.code === 200) {
          const timings = data.data.timings;
          const formatTime = (time24: string) => {
            const [hours, minutes] = time24.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour % 12 || 12;
            return `${hour12}:${minutes} ${ampm}`;
          };

          setPrayerTimes({
            Fajr: formatTime(timings.Fajr),
            Dhuhr: formatTime(timings.Dhuhr),
            Asr: formatTime(timings.Asr),
            Maghrib: formatTime(timings.Maghrib),
            Isha: formatTime(timings.Isha),
            Sunrise: formatTime(timings.Sunrise),
          });
        }
      }
    } catch (error) {
      console.error('Error fetching prayer times for location:', error);
    } finally {
      setLoading(false);
    }
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
              {mounted ? (t("prayer.title") !== "prayer.title" ? t("prayer.title") : "مواقيت الصلاة") : "مواقيت الصلاة"}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {mounted ? (t("prayer.subtitle") !== "prayer.subtitle" ? t("prayer.subtitle") : "مواقيت الصلاة حسب موقعك") : "مواقيت الصلاة حسب موقعك"}
          </p>
        </motion.div>

        {/* Date and Prayer Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8 p-6 bg-gradient-to-r from-islamic-gold/20 via-islamic-green/20 to-islamic-blue/20 rounded-full"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{mounted ? (t("hijri.title") !== "hijri.title" ? t("hijri.title") : "التاريخ الهجري") : "التاريخ الهجري"}</p>
          <p className="text-2xl md:text-3xl font-bold text-islamic-gold">{hijriDate}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {getLocalizedDate()}
          </p>
          
          {/* Current Prayer Status */}
          {currentPrayer && (
            <div className="mt-4 p-4 bg-white/10 dark:bg-black/20 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-islamic-gold" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {locale === 'ar' ? 'الوقت الحالي' : 'Current Time'}
                </span>
              </div>
              <p className="text-lg font-bold text-islamic-gold">
                {locale === 'ar' ? 
                  (currentPrayer === 'Fajr' ? 'الفجر' : 
                   currentPrayer === 'Dhuhr' ? 'الظهر' :
                   currentPrayer === 'Asr' ? 'العصر' :
                   currentPrayer === 'Maghrib' ? 'المغرب' : 'العشاء') 
                  : currentPrayer}
              </p>
              
              {nextPrayer && timeRemaining && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {locale === 'ar' ? 'الوقت المتبقي لصلاة' : 'Time until'} {locale === 'ar' ? 
                      (nextPrayer === 'Fajr' ? 'الفجر' : 
                       nextPrayer === 'Dhuhr' ? 'الظهر' :
                       nextPrayer === 'Asr' ? 'العصر' :
                       nextPrayer === 'Maghrib' ? 'المغرب' : 'العشاء') 
                      : nextPrayer}
                  </p>
                  <p className="text-xl font-bold text-islamic-green">
                    {timeRemaining}
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Location Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="relative" ref={locationDropdownRef}>
            <button
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-light-secondary dark:bg-dark-secondary rounded-full border-2 border-islamic-gold/30 hover:border-islamic-gold transition-all duration-300"
            >
              <MapPin className="w-4 h-4 text-islamic-gold" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {location || "Select Location"}
              </span>
              <ChevronDown className="w-4 h-4 text-islamic-gold" />
            </button>
            
            {isLocationDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 min-w-80 max-w-sm sm:max-w-md">
                <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search city or country..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-islamic-gold"
                    />
                  </div>
                </div>
                
                <div className="max-h-60 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="shimmer w-full h-4 rounded" />
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleLocationSelect(result)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                      >
                        <div className="font-medium text-gray-900 dark:text-white">
                          {result.city}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {result.country}
                        </div>
                      </button>
                    ))
                  ) : searchQuery.length > 2 ? (
                    <div className="p-4 text-center text-gray-500">
                      No locations found
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Type to search for cities...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Prayer Times Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="shimmer w-full h-64 rounded-2xl" />
          </div>
        ) : prayerTimes ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {prayers.map((prayer, index) => (
              <motion.div
                key={prayer.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-light-secondary dark:bg-dark-secondary rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex flex-col items-center justify-center text-center border-2 border-transparent hover:border-islamic-gold transition-all duration-300 card-hover mx-auto"
              >
                <Bell className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-islamic-gold mb-1" />
                <h3 className="font-bold text-xs sm:text-sm md:text-base mb-1 leading-tight">{prayer.name}</h3>
                <p className="text-xs sm:text-sm md:text-base font-bold text-islamic-green dark:text-islamic-gold leading-tight">
                  {prayerTimes[prayer.key]}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="text-lg mb-4">{t("error")}</p>
            {error && (
              <p className="text-sm text-islamic-gold mb-4">
                {error}
              </p>
            )}
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchPrayerTimes();
              }}
              className="px-6 py-3 bg-islamic-gold text-white font-bold rounded-full hover:bg-islamic-green transition-all duration-300"
            >
              {t("retry")}
            </button>
          </div>
        )}

        {/* Athan Audio Controls */}
        {isAthanPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-islamic-gold/30 z-50"
          >
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-islamic-gold" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {locale === 'ar' ? 'الأذان' : 'Athan'}
              </span>
              <button
                onClick={stopAthan}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <VolumeX className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Prayer Notification Popup */}
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-islamic-gold/30 z-50 max-w-sm"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-islamic-gold" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {locale === 'ar' ? 'وقت الصلاة' : 'Prayer Time'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {notificationMessage}
                </p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        {/* Hidden Audio Element */}
        <audio
          ref={athanAudioRef}
          onEnded={() => setIsAthanPlaying(false)}
          onError={() => setIsAthanPlaying(false)}
        >
          <source src="/audio/athan.mp3" type="audio/mpeg" />
          <source src="/audio/athan.ogg" type="audio/ogg" />
        </audio>
      </div>
    </section>
  );
}
