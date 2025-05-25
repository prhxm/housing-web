import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { supabase } from '../lib/supabase.js';
import L from 'leaflet';
import houseIconUrl from '../icons/house.png';
import unknownIconUrl from '../icons/unknown.png';

const houseIcon = new L.Icon({
  iconUrl: houseIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const unknownIcon = new L.Icon({
  iconUrl: unknownIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export default function Markers() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('messages')
        .select('id, lat, lng, price, property, location, geocode_status');

      if (error) {
        console.error('❌ خطا در دریافت داده:', error);
      } else {
        setLocations(data);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {locations.map((msg) => {
        // دسته‌بندی داده‌ها
        const hasCoords = !!msg.lat && !!msg.lng;
        const isFailed = msg.geocode_status === 'failed';

        // فقط موارد معتبر رو نمایش بده
        if (!hasCoords && !isFailed) return null;

        // مشخص کردن موقعیت و آیکون
        const position = hasCoords
          ? [msg.lat, msg.lng]
          : [49.2827, -123.1207]; // fallback downtown
        const icon = hasCoords ? houseIcon : unknownIcon;

        return (
          <Marker key={msg.id} position={position} icon={icon}>
            <Popup>
              {hasCoords ? (
                <>
                  <strong>{msg.price || 'No price'}</strong><br />
                  🏠 {msg.property || 'No type'}<br />
                  📍 {msg.location || 'No location'}
                </>
              ) : (
                <>
                  <strong>📍 Location not found</strong><br />
                  🕵️ {msg.location || 'N/A'}
                </>
              )}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
