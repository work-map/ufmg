import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './App.css';
import Header from './components/Header';
import SearchScreen from './components/SearchScreen';
import PlaceMarker from './components/PlaceMarker';

const App = () => {
  // Estado para armazenar a posição do usuário
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

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
          <Marker position={position}>
            <Popup>
              Você está aqui!
            </Popup>
          </Marker>
          <PlaceMarker
          nome="DACompSI"
          position={[-19.868938,-43.964687]}
          descricao='Ambiente com muitas tomadas, excelente wifi e muitos nerds'
          categorias={["Tomada", "Wi-Fi"]}
          avaliacao={5}
          />
        </MapContainer>
      )}
      {!position && <p>Obtendo localização...</p>}
    </div>
  );
};

export default App;