import { useState } from 'react';

interface Supplication {
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
}

export function SupplicationsSection() {
  const [supplications] = useState<Supplication[]>([
    {
      arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      transliteration: 'Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā ʿadhāban-nār',
      translation: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
      reference: 'Quran 2:201',
    },
  ]);

  return (
    <div className="supplications-section">
      <h2>Daily Supplications</h2>
      <div className="supplications-list">
        {supplications.map((supplication, index) => (
          <div key={index} className="supplication-card">
            <div className="supplication-arabic">{supplication.arabic}</div>
            <div className="supplication-transliteration">{supplication.transliteration}</div>
            <div className="supplication-translation">{supplication.translation}</div>
            <div className="supplication-reference">{supplication.reference}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
