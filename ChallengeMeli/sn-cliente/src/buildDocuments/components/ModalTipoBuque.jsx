// ModalTipoBuque.jsx
import { useState } from "react";
import { Modal } from "react-bootstrap";

export const ModalTipoBuque = ({ show, handleClose, handleAddTipoBuque }) => {
  const [newTipoBuque, setNewTipoBuque] = useState("");

  const handleSubmit = async () => {
    if (newTipoBuque.trim()) {
      await handleAddTipoBuque(newTipoBuque); // Pasar el nuevo tipo de buque
      setNewTipoBuque(""); // Limpiar el input después de agregar
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar nuevo Tipo de Buque</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control"
          value={newTipoBuque}
          onChange={(e) => setNewTipoBuque(e.target.value)}
          placeholder="Nombre del nuevo tipo de buque"
        />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Cancelar
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Agregar
        </button>
      </Modal.Footer>
    </Modal>
  );
};
