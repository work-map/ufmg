import React, { useEffect, useRef } from 'react';
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
  avaliacaoUrl: string;
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
  avaliacaoUrl,
}) => {
  const fotoUrl = `/src/assets/photos/${foto}`;
  const screenRef = useRef<HTMLDivElement>(null);

  // Explicação: O onClose pode não funcionar se o componente PlaceScreen não estiver sendo controlado corretamente pelo pai.
  // Certifique-se de que a prop "open" está sendo usada para mostrar/ocultar o componente, e que o onClose realmente altera o estado no componente pai.
  // Aqui, adicionamos também o fechamento ao pressionar ESC e ao clicar fora do conteúdo principal.

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === screenRef.current) {
      onClose();
    }
  }

  return (
    <div
      ref={screenRef}
      className={`place-screen${open ? ' open' : ''}`}
      onClick={handleBackdropClick}
    >
      <div className="place-photo-container">
        <img src={fotoUrl} alt={`Foto de ${nome}`} className="place-photo" />
        <div className="place-back-btn-wrapper">
          <button
            className="place-back-btn"
            type="button"
            onClick={onClose}
            aria-label="Voltar"
            tabIndex={0}
          >
            <svg width="28" height="28" viewBox="0 0 32 32" focusable="false" aria-hidden="true">
              <circle cx="16" cy="16" r="16" fill="#222" opacity="0.7"/>
              <polyline points="19,10 13,16 19,22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
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
          {categorias.map((label) => (
            <span className="place-category-icon" key={label} title={label}>
              {categoryIcons[label] || label}
            </span>
          ))}
        </div>
        <a
          className="place-rate-action"
          href={avaliacaoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="star-icon">★</span> Avaliar
        </a>
      </div>
    </div>
  );
};

export default PlaceScreen; 