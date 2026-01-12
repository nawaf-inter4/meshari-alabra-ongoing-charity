import { useState } from 'react';

export function DhikrCounter() {
  const [count, setCount] = useState(0);
  const [dhikrType, setDhikrType] = useState<'subhanallah' | 'alhamdulillah' | 'allahuakbar'>('subhanallah');

  const dhikrTypes = [
    { key: 'subhanallah' as const, label: 'Subhanallah', arabic: 'سُبْحَانَ اللَّهِ' },
    { key: 'alhamdulillah' as const, label: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ' },
    { key: 'allahuakbar' as const, label: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ' },
  ];

  const currentDhikr = dhikrTypes.find(d => d.key === dhikrType) || dhikrTypes[0];

  return (
    <div className="dhikr-counter">
      <h2>Dhikr Counter</h2>
      <div className="dhikr-selector">
        {dhikrTypes.map((dhikr) => (
          <button
            key={dhikr.key}
            onClick={() => {
              setDhikrType(dhikr.key);
              setCount(0);
            }}
            className={dhikrType === dhikr.key ? 'active' : ''}
          >
            {dhikr.arabic}
          </button>
        ))}
      </div>
      <div className="counter-display">
        <div className="arabic-text">{currentDhikr.arabic}</div>
        <div className="count">{count}</div>
        <div className="label">{currentDhikr.label}</div>
      </div>
      <div className="counter-actions">
        <button onClick={() => setCount(count + 1)} className="increment">
          +
        </button>
        <button onClick={() => setCount(0)} className="reset">
          Reset
        </button>
      </div>
      {count > 0 && count % 33 === 0 && (
        <div className="milestone">Milestone: {count}!</div>
      )}
    </div>
  );
}
