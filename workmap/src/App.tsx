import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import './App.css';
import Header from './components/Header';
import SearchScreen from './components/SearchScreen';
import PlaceMarker from './components/PlaceMarker';
import PlaceScreen from './components/PlaceScreen';

const personIcon = L.divIcon({
  className: '',
  html: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="10" r="4" fill="#2563eb"/>
    <rect x="14" y="14" width="4" height="10" rx="2" fill="#2563eb"/>
    <rect x="10" y="24" width="3" height="6" rx="1.5" fill="#2563eb"/>
    <rect x="19" y="24" width="3" height="6" rx="1.5" fill="#2563eb"/>
    <rect x="10" y="16" width="3" height="7" rx="1.5" transform="rotate(-20 10 16)" fill="#2563eb"/>
    <rect x="19" y="16" width="3" height="7" rx="1.5" transform="rotate(20 19 16)" fill="#2563eb"/>
  </svg>`,
  iconSize: [64, 64],
  iconAnchor: [16, 32],
});

const App = () => {
  // Estado para armazenar a posição do usuário
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [placeScreenOpen, setPlaceScreenOpen] = useState(false);

  // Dados do local de exemplo
  const placeData = {
    nome: "DACompSI",
    position: [-19.868938, -43.964687] as [number, number],
    descricao: 'Ambiente com muitas tomadas, excelente wifi e muitos nerds',
    categorias: ["Tomada", "Wi-Fi"],
    foto: 'dacompsi.png',
    avaliacao: 4.7,
    avaliacoesCount: 120,
  };

  useEffect(() => {
    // Solicita a localização do usuário
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        alert('Não foi possível obter a localização!');
        // Se quiser, defina uma posição padrão
        setPosition([-19.867938,-43.964938]); // Exemplo: Belo Horizonte
      }
    );
  }, []);

  return (
    <div>
      <Header onSearchClick={() => setSearchOpen(true)} />
      <SearchScreen open={searchOpen} onClose={() => setSearchOpen(false)} />
      <PlaceScreen
        open={placeScreenOpen}
        onClose={() => setPlaceScreenOpen(false)}
        nome={placeData.nome}
        foto={placeData.foto}
        descricao={placeData.descricao}
        categorias={placeData.categorias}
        avaliacao={placeData.avaliacao}
        avaliacoesCount={placeData.avaliacoesCount}
      />
      {position && (
        <MapContainer
          center={position}
          zoom={17}
          scrollWheelZoom={true}
          style={{ height: "100vh", width: "100vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={personIcon}>
            <Popup>
              Você está aqui!
            </Popup>
          </Marker>
          <PlaceMarker
            nome={placeData.nome}
            position={placeData.position}
            descricao={placeData.descricao}
            categorias={placeData.categorias}
            avaliacao={placeData.avaliacao}
            foto={placeData.foto}
            onClick={() => setPlaceScreenOpen(true)}
            popup={false}
          />
        </MapContainer>
      )}
      {!position && <p>Obtendo localização...</p>}
    </div>
  );
};

export default App;