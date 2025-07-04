import React from 'react';
import './SearchScreen.css';

type Props = {
  open: boolean;
  onClose: () => void;
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
  onSearch: () => void;
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

const SearchScreen: React.FC<Props> = ({ open, onClose, selectedCategories, setSelectedCategories, onSearch }) => {
  const toggleCategory = (label: string) => {
    setSelectedCategories(
      selectedCategories.includes(label)
        ? selectedCategories.filter((l) => l !== label)
        : [...selectedCategories, label]
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
                className={`category${selectedCategories.includes(cat.label) ? ' selected' : ''}`}
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
      <button className="search-action search-action-highlighted" onClick={onSearch}>
        <span className="search-icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
            <line x1="15.2" y1="15.2" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        Pesquisar
      </button>
    </div>
  );
};

export default SearchScreen; 