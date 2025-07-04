import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import React from 'react';

// Ícone customizado (exemplo: azul)
const customIcon = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Mapeamento de label para ícone (pode ser expandido)
const categoryIcons: Record<string, React.ReactNode> = {
  'Tomada': <span role="img" aria-label="Tomada">🔌</span>,
  'Wi-Fi': <span role="img" aria-label="Wi-Fi">📶</span>,
  'Ar-Condicionado': <span role="img" aria-label="Ar-Condicionado">❄️</span>,
  'Computadores': <span role="img" aria-label="Computadores">💻</span>,
  'Pouco barulho': <span role="img" aria-label="Pouco barulho">🔇</span>,
};

type PlaceMarkerProps = {
  nome: string;
  position: [number, number];
  descricao: string;
  categorias: string[]; // apenas labels
  avaliacao: number; // 0 a 5
  foto: string; // nome do arquivo da foto em assets/photos
  onClick?: () => void;
  popup?: boolean;
};

const PlaceMarker: React.FC<PlaceMarkerProps> = ({
  nome,
  position,
  descricao,
  categorias,
  avaliacao,
  foto,
  onClick,
  popup = true,
}) => {
  // Caminho relativo para a foto
  const fotoUrl = `/src/assets/photos/${foto}`;

  if (onClick) {
    return (
      <Marker position={position} icon={customIcon} eventHandlers={{ click: onClick }} />
    );
  }

  return (
    <Marker position={position} icon={customIcon}>
      {popup && (
        <Popup>
          <div style={{ minWidth: 180 }}>
            <img
              src={fotoUrl}
              alt={`Foto de ${nome}`}
              style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
            />
            <strong>{nome}</strong>
            <div style={{ fontSize: '0.9em', color: '#555', marginBottom: 4 }}>
              {position[0].toFixed(5)}, {position[1].toFixed(5)}
            </div>
            <div style={{ marginBottom: 8 }}>{descricao}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
              {categorias.map((label) => (
                <span key={label} title={label} style={{ fontSize: 18 }}>
                  {categoryIcons[label] || label}
                </span>
              ))}
            </div>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: i < avaliacao ? '#FFD700' : '#ccc', fontSize: 18 }}>
                  ★
                </span>
              ))}
              <span style={{ marginLeft: 6, fontSize: 13, color: '#888' }}>{avaliacao.toFixed(1)}</span>
            </div>
          </div>
        </Popup>
      )}
    </Marker>
  );
};

export default PlaceMarker; 