import React, { useState } from "react";

export const ObservacionModalForm = ({ title, idCertificado, onClose, onSubmit }) => {
  const [observacion, setObservacion] = useState("");

  const handleSave = () => {
    onSubmit({ idCertificado, observacion });
    onClose();
  };

  return (
    <div className="abrir-modal animacion fadeIn">
      <div className="modal" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ingresar Observación</h5>
              <button type="button" className="btn btn-outline-dark" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                placeholder="Observación"
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                rows={4}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cerrar
              </button>
              <button type="button" className="btn btn-danger" onClick={handleSave}>
                Devolver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
