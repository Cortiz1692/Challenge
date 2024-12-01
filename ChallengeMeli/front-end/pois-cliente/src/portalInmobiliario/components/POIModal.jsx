import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { usePOIForm } from '../hooks/usePOIForm';

const POIModal = ({ show, handleClose }) => {
  const { formData, handleChange, handleSubmit, handleGetCoordinates } = usePOIForm();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Punto de Interés</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name">Nombre</Form.Label>
            <Form.Control
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="category">Categoría</Form.Label>
            <Form.Control
              type="text"
              id="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="address">Dirección</Form.Label>
            <Form.Control
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <Button variant="secondary" onClick={handleGetCoordinates} className="mt-2">
              Obtener Coordenadas
            </Button>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="latitude">Latitud</Form.Label>
            <Form.Control
              type="number"
              step="any"
              id="latitude"
              value={formData.latitude}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="longitude">Longitud</Form.Label>
            <Form.Control
              type="number"
              step="any"
              id="longitude"
              value={formData.longitude}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Crear POI
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default POIModal;
