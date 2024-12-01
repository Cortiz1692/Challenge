import L from 'leaflet';
import iconMap from '../../assets/icons8-maps.svg'; // Asegúrate de que el nombre y la ruta son correctos

const propertyIcon = new L.Icon({
  iconUrl: iconMap,
  iconRetinaUrl: iconMap,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

export default propertyIcon;
