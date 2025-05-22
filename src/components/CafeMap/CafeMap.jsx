import {
  GoogleMap,
  LoadScript,
  LoadScriptNext,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
const GOOGLE_MAP_API = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const base = import.meta.env.BASE_URL;

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 25.058,
  lng: 121.545,
};

const mapStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d4a40", // 非街道的大面積區塊
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#faf4d9", // 大區域非街道的地名字
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#666666", // 所有字的外框
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#1d4a40", // 一些區塊
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#1d4a40", // 街道
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#8d8f8e", // 高速公路
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#8d8f8e", // 道路
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#1d4a40", // 水域
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.school",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  // {
  //     "featureType": "landmarks",
  //     "elementType": "labels",
  //     "stylers": [
  //       {
  //         "visibility": "off"
  //       }
  //     ]
  // },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const CafeMap = ({filtered}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [customIcon, setCustomIcon] = useState(null);
  const [animation, setAnimation] = useState(null);

  const onMapLoad = useCallback(() => {
    const icon = {
      url: `${base}logo-sm.svg`,
      scaledSize: new window.google.maps.Size(30, 30), // 圖標尺寸
      origin: new window.google.maps.Point(0, 0), // 起點座標
      anchor: new window.google.maps.Point(15, 30), // 錨點（圖標的底部中心
    };
    setCustomIcon(icon);
  }, []);

  useEffect(() => {
    if (window.google) {
      setAnimation(window.google.Animation?.DROP);
    }
  }, [])

  // 咖啡廳資料
  const cafeLocations = filtered;

  return (
    <LoadScriptNext googleMapsApiKey={GOOGLE_MAP_API}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{
          // styles: mapStyles,
          colorScheme: "DARK",
          zoomControl: true,
          disableDefaultUI: true,
          keyboardShortcuts: false
          // scaleControl: false,
          // mapTypeControl: false,
          // streetViewControl: false,
          // rotateControl: false,
        }}
        onLoad={onMapLoad}
      >
        {cafeLocations.map((cafe) => (
          <Marker
            key={cafe.id}
            position={{ lat: cafe.lat, lng: cafe.lng }}
            title={cafe.name}
            onClick={() => setSelectedLocation(cafe)}
            icon={customIcon}
            animation={animation}
          />
        ))}
        {/* 顯示 InfoWindow */}
        {selectedLocation && (
          <InfoWindow
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h3>{selectedLocation.name_zh}</h3>
              <h3>{selectedLocation.name_en}</h3>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default CafeMap;
