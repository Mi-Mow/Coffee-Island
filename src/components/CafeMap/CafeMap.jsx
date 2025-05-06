import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
const GOOGLE_MAP_API = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 25.0330,
  lng: 121.5654,
};

// 咖啡廳資料
const cafeLocations = [
  { id: 1, name: '復古咖啡 A', lat: 25.0335, lng: 121.5650 },
  { id: 2, name: '復古咖啡 B', lat: 25.0320, lng: 121.5675 },
];

const CafeMap = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAP_API}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {cafeLocations.map(cafe => (
          <Marker
            key={cafe.id}
            position={{ lat: cafe.lat, lng: cafe.lng }}
            title={cafe.name}
            onClick={() => setSelectedLocation(cafe)}
          />
        ))}
        {/* 顯示 InfoWindow */}
        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h3>{selectedLocation.name}</h3>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default CafeMap;
