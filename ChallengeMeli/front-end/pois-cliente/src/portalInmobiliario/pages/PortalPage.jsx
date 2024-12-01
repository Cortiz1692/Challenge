import React, { useState, useContext, useEffect } from 'react';
import { PortalContext, PortalProvider } from '../context/PortalProvider';
import MapView from '../components/MapView';
import POICard from '../components/POICard';
import POIModal from '../components/POIModal';
import { Button } from 'react-bootstrap';
import houseImage from '../../assets/R.jpg';
import useWebSocketPOI from '../hooks/useWebSocketPOI';

const PortalContent = () => {
  const { properties, pois, selectedProperty, getProperties, dispatch } = useContext(PortalContext);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const updatePois = (newPoi) => {
    dispatch({ type: 'ADD_POI', payload: newPoi });
  };

  // Usar el hook personalizado para manejar WebSocket
  useWebSocketPOI('ws://localhost:8080/ws/pois', (message) => {
    if (message.poiId) {
      updatePois(message);
    }
  });

  useEffect(() => {
    getProperties();
  }, [,]);

  if (!selectedProperty) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div className="card mb-4">
        <img src={houseImage} className="card-img-top" alt="Casa en venta" />
        <div className="card-body">
          <h5 className="card-title">Propiedad</h5>
          <p className="card-text">Dirección: {selectedProperty.address}</p>
          <p className="card-text">Ciudad: {selectedProperty.city}</p>
          <p className="card-text">Estado: {selectedProperty.state}</p>
          <p className="card-text">Código Postal: {selectedProperty.postalCode}</p>
          <p className="card-text">Coordenadas: {selectedProperty.location.coordinates.join(', ')}</p>
        </div>
      </div>
      <MapView property={selectedProperty} pois={pois} />
      <POICard pois={pois} propertyLocation={selectedProperty.location} />
      <Button variant="primary" onClick={handleShow} className="mt-4">
        Crear Nuevo Punto de Interés
      </Button>
      <POIModal show={show} handleClose={handleClose} />
    </div>
  );
};

export const PortalPage = () => (
  <PortalProvider>
    <div className="container mt-5">
      <h1 className="mb-4">Portal Inmobiliario</h1>
      <PortalContent />
    </div>
  </PortalProvider>
);
