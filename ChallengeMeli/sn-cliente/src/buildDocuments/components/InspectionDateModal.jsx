import React from "react";
import { Modal, Button } from "react-bootstrap";

export const InspectionDateModal = ({
  show,
  handleClose,
  idCertificado,
  tipoDocumento,
  onSubmit,
  setFechaInspeccionAdicional, // Asegúrate de recibir el setter
}) => {
  const handleDateChange = (event) => {
    // Actualiza la fecha en el estado padre
    setFechaInspeccionAdicional(event.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cargar Fecha de Inspección</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="fechaInspeccion" className="form-label">
            Fecha de Inspección Adicional:
          </label>
          <input type="date" id="fechaInspeccion"  className={`form-control custom-input`} onChange={handleDateChange} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Cargar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
