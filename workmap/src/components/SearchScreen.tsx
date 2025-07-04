import React, { useState } from 'react';
import './SearchScreen.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

type Category = { label: string; icon: React.ReactNode };

const categories: Category[] = [
  { label: 'Tomada', icon: <span role="img" aria-label="Tomada">🔌</span> },
  { label: 'Wi-Fi', icon: <span role="img" aria-label="Wi-Fi">📶</span> },
  { label: 'Ar-Condicionado', icon: <span role="img" aria-label="Ar-Condicionado">❄️</span> },
  { label: 'Computadores', icon: <span role="img" aria-label="Computadores">💻</span> },
  { label: 'Pouco barulho', icon: <span role="img" aria-label="Pouco barulho">🔇</span> },
];

const rows: Category[][] = [];
for (let i = 0; i < categories.length; i += 2) {
  rows.push(categories.slice(i, i + 2));
}

const SearchScreen: React.FC<Props> = ({ open, onClose }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCategory = (label: string) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };

  return (
    <div className={`search-screen${open ? ' open' : ''}`}>
      <button className="close-btn" onClick={onClose} aria-label="Fechar">×</button>
      <h2>Encontrar locais com:</h2>
      <div className="categories">
        {rows.map((row, idx) => (
          <div className="categories-row" key={idx}>
            {row.map((cat: Category) => (
              <button
                className={`category${selected.includes(cat.label) ? ' selected' : ''}`}
                key={cat.label}
                onClick={() => toggleCategory(cat.label)}
                type="button"
              >
                {cat.icon} {cat.label}
              </button>
            ))}
            {row.length === 1 && (
              <button className="category category-placeholder" aria-hidden="true" tabIndex={-1} />
            )}
          </div>
        ))}
      </div>
      <button className="search-action">Buscar</button>
    </div>
  );
};

export default SearchScreen; 