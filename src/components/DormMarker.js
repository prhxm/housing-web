// DormMarker.js
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import dormIconUrl from '../icons/dorm.png';

const dormIcon = new L.Icon({
  iconUrl: dormIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export default function DormMarker() {
  return (
    <Marker position={[49.2827, -123.1207]} icon={dormIcon} />
  );
}
