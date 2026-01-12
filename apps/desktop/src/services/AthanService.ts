// Desktop version of AthanService using localStorage
export interface AthanReciter {
  id: string;
  name: string;
  nameArabic: string;
  url: string;
}

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
];

export class DesktopAthanPreferencesService {
  private static STORAGE_KEY = 'athan-preferences';

  static getSelectedReciter(): string {
    if (typeof window === 'undefined') return ATHAN_RECITERS[0].id;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const prefs = JSON.parse(stored);
        return prefs.reciterId || ATHAN_RECITERS[0].id;
      }
    } catch (error) {
      console.error('Error loading athan preferences:', error);
    }
    return ATHAN_RECITERS[0].id;
  }

  static setSelectedReciter(reciterId: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify({ reciterId })
      );
    } catch (error) {
      console.error('Error saving athan preferences:', error);
    }
  }

  static getAthanUrl(): string {
    const reciterId = this.getSelectedReciter();
    const reciter = ATHAN_RECITERS.find(r => r.id === reciterId);
    return reciter?.url || ATHAN_RECITERS[0].url;
  }

  static getReciters(): AthanReciter[] {
    return ATHAN_RECITERS;
  }
}
