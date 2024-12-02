import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import propertyIcon from './propertyIcon'; // Importar el icono de la propiedad

const MapView = ({ property, pois }) => {
  if (!property || !property.location || !property.location.coordinates) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer center={[property.location.coordinates[1], property.location.coordinates[0]]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[property.location.coordinates[1], property.location.coordinates[0]]} icon={propertyIcon} key="property-marker">
        <Popup>
          {property.name}
        </Popup>
      </Marker>
      {pois.map((poi, index) => (
        poi.location && poi.location.coordinates && (
          <Marker key={`${poi._id ?? poi.name}-${index}`} position={[poi.location.coordinates[1], poi.location.coordinates[0]]}>
            <Popup>
              {poi.name} - {poi.category} <br/> {poi.distance} metros - {poi.time} mins
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default MapView;
