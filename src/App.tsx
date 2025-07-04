import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import './App.css';
import Header from './components/Header';
import SearchScreen from './components/SearchScreen';
import PlaceMarker from './components/PlaceMarker';
import PlaceScreen from './components/PlaceScreen';
import PlaceList from './components/PlaceList';

const personIcon = L.divIcon({
  className: '',
  html: `<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#2563eb">
    <path d="m280-40 112-564-72 28v136h-80v-188l202-86q14-6 29.5-7t29.5 4q14 5 26.5 14t20.5 23l40 64q26 42 70.5 69T760-520v80q-70 0-125-29t-94-74l-25 123 84 80v300h-80v-260l-84-64-72 324h-84Zm260-700q-33 0-56.5-23.5T460-820q0-33 23.5-56.5T540-900q33 0 56.5 23.5T620-820q0 33-23.5 56.5T540-740Z"/>
  </svg>`,
  iconSize: [64, 64],
  iconAnchor: [16, 32],
});

// Lista de locais disponíveis
const placesData = [
  {
    nome: "DACompSI",
    position: [-19.868938, -43.964687] as [number, number],
    descricao: 'Ambiente com muitas tomadas, excelente wifi e muitos nerds',
    categorias: ["Tomada", "Wi-Fi"],
    foto: 'dacompsi.png',
    avaliacao: 4.7,
    avaliacoesCount: 120,
  },
  {
    nome: "Biblioteca Central",
    position: [-19.867063,-43.965563] as [number, number],
    descricao: 'Silêncio, ar-condicionado e Wi-Fi disponíveis.',
    categorias: ["Ar-Condicionado", "Wi-Fi", "Pouco barulho"],
    foto: 'biblioteca.png',
    avaliacao: 4.2,
    avaliacoesCount: 80,
  },
  // Adicione mais locais conforme necessário
];

const suggestionUrl = import.meta.env.VITE_SUGGESTION_URL;
const avaliacaoUrl = import.meta.env.VITE_AVALIACAO_URL;

const App = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [placeScreenOpen, setPlaceScreenOpen] = useState(false);
  const [placeListOpen, setPlaceListOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<typeof placesData[0] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        alert('Não foi possível obter a localização!');
        setPosition([-19.867938,-43.964938]);
      }
    );
  }, []);

  // Handler para abrir a lista de resultados
  const handleSearch = (categories: string[]) => {
    setSelectedCategories(categories);
    setSearchOpen(false);
    setPlaceListOpen(true);
  };

  // Handler para abrir a tela do local
  const handleSelectPlace = (place: typeof placesData[0]) => {
    setSelectedPlace(place);
    setPlaceListOpen(false);
    setPlaceScreenOpen(true);
  };

  // Handler para abrir PlaceScreen a partir do marker
  const handleMarkerClick = (place: typeof placesData[0]) => {
    setSelectedPlace(place);
    setPlaceScreenOpen(true);
  };

  return (
    <div>
      <Header onSearchClick={() => setSearchOpen(true)} />
      {searchOpen && (
        <SearchScreen
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          onSearch={() => handleSearch(selectedCategories)}
        />
      )}
      {placeListOpen && (
        <PlaceList
          open={placeListOpen}
          onClose={() => setPlaceListOpen(false)}
          places={placesData}
          selectedCategories={selectedCategories}
          onSelectPlace={handleSelectPlace}
        />
      )}
      {selectedPlace && placeScreenOpen && (
        <PlaceScreen
          open={placeScreenOpen}
          onClose={() => setPlaceScreenOpen(false)}
          nome={selectedPlace.nome}
          foto={selectedPlace.foto}
          descricao={selectedPlace.descricao}
          categorias={selectedPlace.categorias}
          avaliacao={selectedPlace.avaliacao}
          avaliacoesCount={selectedPlace.avaliacoesCount}
          avaliacaoUrl={avaliacaoUrl}
        />
      )}
      {position && (
        <MapContainer
          center={position}
          zoom={17}
          scrollWheelZoom={true}
          dragging={true}
          touchZoom={true}
          doubleClickZoom={true}
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
          {placesData.map((place) => (
            <PlaceMarker
              key={place.nome}
              nome={place.nome}
              position={place.position}
              descricao={place.descricao}
              categorias={place.categorias}
              avaliacao={place.avaliacao}
              foto={place.foto}
              onClick={() => handleMarkerClick(place)}
              popup={false}
            />
          ))}
        </MapContainer>
      )}
      {!position && <p>Obtendo localização...</p>}
      <a
        href={suggestionUrl}
        className="suggestion-pill-btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Sugerir novo local"
      >
        <span className="suggestion-plus-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{display: 'block'}} xmlns="http://www.w3.org/2000/svg">
            <line x1="9" y1="3" x2="9" y2="15" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="3" y1="9" x2="15" y2="9" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </span>
        Sugerir novo local
      </a>
    </div>
  );
};

export default App;