import React from "react";
import { Modal, Button } from "react-bootstrap";

export const CombinationModal = ({
  show,
  handleClose,
  observation,
  fechaInspeccionAdicional,
  setFechaInspeccionAdicional,
  onReject,
  onSubmitDate,
  isSubmitted,
}) => {
  const isAprobarDisabled = !isSubmitted; 

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Inspección</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Observación</h5>
          <p>{observation}</p>
          <h5>Cargue la nueva fecha de la inspección adicional</h5>
          <input
            type="date"
            className="form-control form-control-lg"
            value={fechaInspeccionAdicional}
            onChange={(e) => setFechaInspeccionAdicional(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onReject}>
          Rechazar
        </Button>
        <Button variant="success" onClick={onSubmitDate}>
          Cargar Inspección
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
