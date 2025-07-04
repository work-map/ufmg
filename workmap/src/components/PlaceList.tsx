import React from 'react';
import './PlaceList.css';

type Place = {
  nome: string;
  position: [number, number];
  descricao: string;
  categorias: string[];
  foto: string;
  avaliacao: number;
  avaliacoesCount: number;
};

const categoryIcons: Record<string, React.ReactNode> = {
  'Tomada': <span role="img" aria-label="Tomada">🔌</span>,
  'Wi-Fi': <span role="img" aria-label="Wi-Fi">📶</span>,
  'Ar-Condicionado': <span role="img" aria-label="Ar-Condicionado">❄️</span>,
  'Computadores': <span role="img" aria-label="Computadores">💻</span>,
  'Pouco barulho': <span role="img" aria-label="Pouco barulho">🔇</span>,
};

type PlaceListProps = {
  open: boolean;
  onClose: () => void;
  places: Place[];
  selectedCategories: string[];
  onSelectPlace: (place: Place) => void;
};

const PlaceList: React.FC<PlaceListProps> = ({
  open,
  onClose,
  places,
  selectedCategories,
  onSelectPlace,
}) => {
  // Filtra os lugares que possuem todas as categorias selecionadas
  const filtered = places.filter(place =>
    selectedCategories.every(cat => place.categorias.includes(cat))
  );

  return (
    <div className={`place-list-screen${open ? ' open' : ''}`}>
      <div className="place-list-header">
        <button className="place-back-btn" onClick={onClose} aria-label="Voltar">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" fill="#222" opacity="0.7"/>
            <polyline points="19,10 13,16 19,22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="place-list-title">Resultado da pesquisa</h2>
      </div>
      <div className="place-list-tiles">
        {filtered.length === 0 && (
          <div className="place-list-empty">Nenhum local encontrado.</div>
        )}
        {filtered.map((place, idx) => (
          <button
            className="place-list-tile"
            key={place.nome + idx}
            onClick={() => onSelectPlace(place)}
          >
            <span className="place-list-tile-title">{place.nome}</span>
            <span className="place-list-tile-categories">
              {place.categorias.map(cat => (
                <span key={cat} className="place-list-tile-cat">{categoryIcons[cat] || cat}</span>
              ))}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlaceList; 