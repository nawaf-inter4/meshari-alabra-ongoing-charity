import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AthanReciter {
  id: string;
  name: string;
  nameArabic: string;
  url: string;
}

// Popular athan reciters with CDN URLs
export const ATHAN_RECITERS: AthanReciter[] = [
  {
    id: 'mishary-rashid',
    name: 'Mishary Rashid Alafasy',
    nameArabic: 'مشاري راشد العفاسي',
    url: 'https://cdn.islamic.network/quran/audio-surah/128/ar.mishaaryraashid_alafasy/1.mp3',
  },
  {
    id: 'abdul-basit',
    name: 'Abdul Basit Abdul Samad',
    nameArabic: 'عبد الباسط عبد الصمد',
    url: 'https://cdn.islamic.network/quran/audio-surah/128/ar.abdulbasitmurattal/1.mp3',
  },
  {
    id: 'saad-al-ghamdi',
    name: 'Saad Al Ghamdi',
    nameArabic: 'سعد الغامدي',
    url: 'https://cdn.islamic.network/quran/audio-surah/128/ar.saadalgamdi/1.mp3',
  },
  {
    id: 'abdullah-matroud',
    name: 'Abdullah Matroud',
    nameArabic: 'عبد الله المطوع',
    url: 'https://cdn.islamic.network/quran/audio-surah/128/ar.abdullahmatroud/1.mp3',
  },
  {
    id: 'maher-al-muaiqly',
    name: 'Maher Al Muaiqly',
    nameArabic: 'ماهر المعيقلي',
    url: 'https://cdn.islamic.network/quran/audio-surah/128/ar.mahermuaiqly/1.mp3',
  },
  {
    id: 'mohammed-al-luhaidan',
    name: 'Mohammed Al Luhaidan',
    nameArabic: 'محمد اللحيدان',
    url: 'https://cdn.islamic.network/quran/audio-surah/128/ar.mohammedalluhaidan/1.mp3',
  },
];

// Alternative: Use aladhan.com API for athan
export const getAthanFromAPI = async (reciterId: string): Promise<string> => {
  // Aladhan.com provides athan audio
  // Format: https://cdn.aladhan.com/athan/{reciterId}.mp3
  const reciter = ATHAN_RECITERS.find(r => r.id === reciterId);
  if (reciter) {
    return reciter.url;
  }
  
  // Fallback to default
  return ATHAN_RECITERS[0].url;
};

export class AthanPreferencesService {
  private static STORAGE_KEY = 'athan-preferences';

  static async getSelectedReciter(): Promise<string> {
    try {
      const stored = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const prefs = JSON.parse(stored);
        return prefs.reciterId || ATHAN_RECITERS[0].id;
      }
      return ATHAN_RECITERS[0].id;
    } catch {
      return ATHAN_RECITERS[0].id;
    }
  }

  static async setSelectedReciter(reciterId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify({ reciterId })
      );
    } catch (error) {
      console.error('Error saving athan preferences:', error);
    }
  }

  static async getAthanUrl(): Promise<string> {
    const reciterId = await this.getSelectedReciter();
    return getAthanFromAPI(reciterId);
  }

  static getReciters(): AthanReciter[] {
    return ATHAN_RECITERS;
  }
}
