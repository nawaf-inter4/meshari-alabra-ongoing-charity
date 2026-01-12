import { useState } from 'react';

interface Hadith {
  arabic: string;
  translation: string;
  source: string;
}

export function HadithSection() {
  const [hadiths] = useState<Hadith[]>([
    {
      arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
      translation: 'Actions are but by intention',
      source: 'Sahih al-Bukhari',
    },
  ]);

  const [currentHadith, setCurrentHadith] = useState(0);

  const handleNext = () => {
    setCurrentHadith((prev) => (prev + 1) % hadiths.length);
  };

  return (
    <div className="hadith-section">
      <h2>Hadith</h2>
      <div className="hadith-card">
        <div className="hadith-arabic">{hadiths[currentHadith].arabic}</div>
        <div className="hadith-translation">{hadiths[currentHadith].translation}</div>
        <div className="hadith-source">{hadiths[currentHadith].source}</div>
        <button onClick={handleNext} className="next-button">
          Next Hadith
        </button>
      </div>
    </div>
  );
}
