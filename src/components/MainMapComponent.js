import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { supabase } from '../lib/supabase';
import 'leaflet/dist/leaflet.css';
import '../App.css';
import ReactSlider from 'react-slider';
import Select from 'react-select';

import houseIconUrl from '../icons/house.png';
import houseDark from '../icons/house-dark.png';
import unknownIconUrl from '../icons/unknown.png';

const unknownIcon = new L.Icon({
  iconUrl: unknownIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

function FlyToSelected({ message }) {
  const map = useMap();

  useEffect(() => {
    if (message?.lat && message?.lng) {
      map.flyTo([message.lat, message.lng], 15, { duration: 1.5 });
    }
  }, [message, map]);

  return null;
}

export default function MainMapComponent() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const modalRef = useRef(null);

  const houseIcon = new L.Icon({
    iconUrl: darkMode ? houseIconUrl : houseDark,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('id, lat, lng, price, price_num,property, location, raw_text');

      if (!error && data) setLocations(data);
      else console.error('Error loading data:', error);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setSelectedMessage(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedMessage]);

  const filtered = locations.filter((msg) => {
    const priceValue = parseFloat(msg.price_num);
    const matchesLocation =
      !selectedLocation ||
      (msg.location && msg.location.split(',')[0].trim() === selectedLocation);

    const matchesType = (msg.property || '').toLowerCase().includes(searchType.toLowerCase());
    const matchesPrice = !priceValue || (priceValue >= priceRange[0] && priceValue <= priceRange[1]);

    return matchesLocation && matchesType && matchesPrice;
  });

  const filteredWithCoords = filtered.filter(
    (msg) => msg.lat && msg.lng && msg.price !== 'N/A' && msg.property !== 'N/A' && msg.location !== 'N/A'
  );

  const locationOptions = Array.from(
    new Set(
      locations
        .map((l) => {
          const loc = l.location?.trim();
          if (!loc || loc === 'N/A' || loc.toLowerCase() === 'none') return null;
          return loc.split(',')[0].trim();
        })
        .filter(Boolean)
    )
  ).map((loc) => ({ label: loc, value: loc }));
  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="map-section">
        <MapContainer
          center={[49.2827, -123.1207]}
          zoom={12}
          scrollWheelZoom={true}
          style={{
            height: '100vh',
            width: '100vw',
            margin: 0,
            padding: 0,
            zIndex: 1
          }}
        >
          <TileLayer
            url={
              darkMode
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            }
            attribution="&copy; CARTO | OSM"
          />
          <FlyToSelected message={selectedMessage} />
          {filteredWithCoords.map((msg) => {
            const icon = msg.lat && msg.lng ? houseIcon : unknownIcon;
            const position = msg.lat && msg.lng ? [msg.lat, msg.lng] : [49.28, -123.12];
            return (
              <Marker key={msg.id} position={position} icon={icon}>
                <Popup>
                  <strong>{msg.price || 'No price'}</strong><br />
                  Type: {msg.property || 'N/A'}<br />
                  Location: {msg.location || 'N/A'}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        <div className="housing-scroll-wrapper">
          <div className="housing-scroll-track">
            <div className="housing-scroll">
              {filteredWithCoords.map((msg) => (
                <div
                  key={`loop1-${msg.id}`}
                  className="housing-card"
                  onClick={() => setSelectedMessage(msg)}  
                >
                  <strong>{msg.price || 'No price'}</strong><br />
                  {msg.property}<br />
                  {msg.location}
                </div>
              ))}
              {filteredWithCoords.map((msg) => (
                <div key={`loop2-${msg.id}`} className="housing-card">
                  <strong>{msg.price || 'No price'}</strong><br />
                  {msg.property}<br />
                  {msg.location}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> 
    </div>  
  );
}
