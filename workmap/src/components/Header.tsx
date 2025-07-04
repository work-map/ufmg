import './Header.css';

type HeaderProps = {
  onSearchClick?: () => void;
};

const Header = ({ onSearchClick }: HeaderProps) => {
  return (
    <header className="header">
      <h1>WorkMap</h1>
      <button className="search-btn" aria-label="Buscar" onClick={onSearchClick}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
          <line x1="15.2" y1="15.2" x2="20" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </header>
  );
};

export default Header; 