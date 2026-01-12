import { useState, useEffect } from 'react';

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      // Use Tauri's HTTP client or fetch API
      const response = await fetch(
        'https://api.aladhan.com/v1/timingsByCity?city=Riyadh&country=Saudi Arabia&method=2'
      );
      const data = await response.json();
      
      if (data.code === 200) {
        const timings = data.data.timings;
        setPrayerTimes({
          Fajr: timings.Fajr,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
        });
      }
    } catch (error) {
      console.error('Error fetching prayer times:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading prayer times...</div>;
  }

  if (!prayerTimes) {
    return <div>Failed to load prayer times</div>;
  }

  return (
    <div className="prayer-times">
      <h2>Prayer Times</h2>
      <div className="prayer-list">
        <div className="prayer-item">
          <span>Fajr:</span>
          <span>{prayerTimes.Fajr}</span>
        </div>
        <div className="prayer-item">
          <span>Dhuhr:</span>
          <span>{prayerTimes.Dhuhr}</span>
        </div>
        <div className="prayer-item">
          <span>Asr:</span>
          <span>{prayerTimes.Asr}</span>
        </div>
        <div className="prayer-item">
          <span>Maghrib:</span>
          <span>{prayerTimes.Maghrib}</span>
        </div>
        <div className="prayer-item">
          <span>Isha:</span>
          <span>{prayerTimes.Isha}</span>
        </div>
      </div>
    </div>
  );
}
