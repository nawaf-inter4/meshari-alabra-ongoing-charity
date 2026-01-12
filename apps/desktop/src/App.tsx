import { useState, useEffect } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { LanguageSwitcher } from "@repo/ui";
import { HeroSection } from "./components/HeroSection";
import { PrayerTimes } from "./components/PrayerTimes";
import { QiblaFinder } from "./components/QiblaFinder";
import { DhikrCounter } from "./components/DhikrCounter";
import { QuranSection } from "./components/QuranSection";
import { DonationSection } from "./components/DonationSection";
import { SupplicationsSection } from "./components/SupplicationsSection";
import { HadithSection } from "./components/HadithSection";
import { YouTubeSection } from "./components/YouTubeSection";
import { Footer } from "./components/Footer";
import { DesktopNotificationService } from "./services/NotificationService";
import { DesktopAudioService } from "./services/AudioService";
import "./App.css";

function App() {
  const [locale, setLocale] = useState("ar");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set up Tauri window
    const appWindow = getCurrentWindow();
    appWindow.setTitle("Meshari's Continuous Charity");

    // Initialize notification service
    const notificationService = new DesktopNotificationService();
    notificationService.requestPermission();

    // Initialize audio service
    const audioService = new DesktopAudioService();
    audioService.initialize();
    // Load preferred athan from API
    audioService.loadPreferredAthan();
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Meshari's Continuous Charity</h1>
        <LanguageSwitcher locale={locale} setLocale={setLocale} />
      </header>
      <main className="main">
        <HeroSection />
        <QuranSection />
        <DonationSection />
        <YouTubeSection />
        <SupplicationsSection />
        <PrayerTimes />
        <HadithSection />
        <DhikrCounter />
        <QiblaFinder />
        <Footer />
      </main>
    </div>
  );
}

export default App;
