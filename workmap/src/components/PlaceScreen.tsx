import React from 'react';
import './PlaceScreen.css';

type PlaceScreenProps = {
  open: boolean;
  onClose: () => void;
  nome: string;
  foto: string;
  descricao: string;
  categorias: string[];
  avaliacao?: number;
  avaliacoesCount?: number;
};

const categoryIcons: Record<string, React.ReactNode> = {
  'Tomada': <span role="img" aria-label="Tomada">🔌</span>,
  'Wi-Fi': <span role="img" aria-label="Wi-Fi">📶</span>,
  'Ar-Condicionado': <span role="img" aria-label="Ar-Condicionado">❄️</span>,
  'Computadores': <span role="img" aria-label="Computadores">💻</span>,
  'Pouco barulho': <span role="img" aria-label="Pouco barulho">🔇</span>,
};

function renderStars(avaliacao: number) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (avaliacao >= i + 1) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else if (avaliacao > i && avaliacao < i + 1) {
      stars.push(<span key={i} className="star half">★</span>);
    } else {
      stars.push(<span key={i} className="star">★</span>);
    }
  }
  return stars;
}

const PlaceScreen: React.FC<PlaceScreenProps> = ({
  open,
  onClose,
  nome,
  foto,
  descricao,
  categorias,
  avaliacao = 0,
  avaliacoesCount = 0,
}) => {
  // Divide as categorias em linhas de dois
  const rows: string[][] = [];
  for (let i = 0; i < categorias.length; i += 2) {
    rows.push(categorias.slice(i, i + 2));
  }

  const fotoUrl = `/src/assets/photos/${foto}`;

  return (
    <div className={`place-screen${open ? ' open' : ''}`}>
      <div className="place-photo-container">
        <img src={fotoUrl} alt={`Foto de ${nome}`} className="place-photo" />
        <button className="place-back-btn" onClick={onClose} aria-label="Voltar">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" fill="#222" opacity="0.7"/>
            <polyline points="19,10 13,16 19,22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="place-content">
        <h2 className="place-title">{nome}</h2>
        <div className="place-rating-row">
          <span className="place-rating-value">{avaliacao.toFixed(1)}</span>
          <span className="place-rating-stars">
            {renderStars(avaliacao)}
          </span>
          <span className="place-rating-count">· {avaliacoesCount} avaliações</span>
        </div>
        <div className="place-desc">{descricao}</div>
        <div className="place-categories">
          {rows.map((row, idx) => (
            <div className="place-categories-row" key={idx}>
              {row.map((label) => (
                <button className="category" key={label} type="button">
                  {categoryIcons[label] || label} {label}
                </button>
              ))}
              {row.length === 1 && (
                <button className="category category-placeholder" aria-hidden="true" tabIndex={-1} />
              )}
            </div>
          ))}
        </div>
      </div>
      <a
        className="place-rate-action"
        href="https://forms.gle/EXEMPLO"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="star-icon">★</span> Avaliar
      </a>
    </div>
  );
};

export default PlaceScreen; 