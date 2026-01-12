import { useState, useEffect } from 'react';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
}

export function QuranSection() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    try {
      const response = await fetch('https://api.alquran.cloud/v1/surah');
      const data = await response.json();
      if (data.code === 200) {
        setSurahs(data.data);
      }
    } catch (error) {
      console.error('Error fetching surahs:', error);
    }
  };

  const fetchVerses = async (surahNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
      const data = await response.json();
      if (data.code === 200) {
        setVerses(data.data.ayahs);
      }
    } catch (error) {
      console.error('Error fetching verses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSurah = (surah: Surah) => {
    setSelectedSurah(surah);
    fetchVerses(surah.number);
  };

  return (
    <div className="quran-section">
      <h2>Quran</h2>
      <div className="quran-layout">
        <div className="surah-list">
          <h3>Surahs</h3>
          <div className="surah-scroll">
            {surahs.map((surah) => (
              <button
                key={surah.number}
                onClick={() => handleSelectSurah(surah)}
                className={selectedSurah?.number === surah.number ? 'active' : ''}
              >
                {surah.number}. {surah.englishName}
              </button>
            ))}
          </div>
        </div>
        <div className="verses-display">
          {loading ? (
            <div>Loading...</div>
          ) : selectedSurah && verses.length > 0 ? (
            <>
              <h3>
                {selectedSurah.englishName} ({selectedSurah.number})
              </h3>
              <div className="verses-scroll">
                {verses.map((verse) => (
                  <div key={verse.number} className="verse">
                    <div className="verse-number">{verse.number}</div>
                    <div className="verse-text">{verse.text}</div>
                    {verse.translation && (
                      <div className="verse-translation">{verse.translation}</div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>Select a surah to view verses</div>
          )}
        </div>
      </div>
    </div>
  );
}
