// TipoBuqueSelect.jsx
import { useContext, useEffect, useState } from "react";
import { DocumentsContext } from "../context/DocumentsContext";
import { ModalTipoBuque } from "./ModalTipoBuque";

export const TipoBuqueSelect = ({ value, onChange }) => {
  const { getTiposBuques, tipoBuque, addTipoBuque } = useContext(DocumentsContext);
  const [showAddTipoBuqueModal, setShowAddTipoBuqueModal] = useState(false);
  const [newTipoBuque, setNewTipoBuque] = useState("");

  useEffect(() => {
    getTiposBuques();
  }, [getTiposBuques]);

  const handleAddTipoBuque = async (tipo) => {
    if (tipo.trim()) {
      await addTipoBuque(tipo);
      setShowAddTipoBuqueModal(false);
      setNewTipoBuque(""); // Limpia el input
    }
  };

  return (
    <div className="mb-2">
      <label htmlFor="tipoBuque" className="form-label">
        Tipo de Buque
      </label>
      <select
        className="form-select"
        id="tipoBuque"
        name="tipoBuque"
        value={value}
        onChange={onChange}
        required
      >
        <option value="">Tipo de Buque</option>
        {tipoBuque.map((tipo) => (
          <option key={tipo.idTipoBuque} value={tipo.idTipoBuque}>
            {tipo.tipoBuque}
          </option>
        ))}
      </select>
      <button
        className="btn btn-link mt-2"
        type="button"
        onClick={() => setShowAddTipoBuqueModal(true)}
      >
        ¿No encuentras el tipo de buque? ¡Agrégalo aquí!
      </button>
      <ModalTipoBuque
        show={showAddTipoBuqueModal}
        handleClose={() => setShowAddTipoBuqueModal(false)}
        handleAddTipoBuque={handleAddTipoBuque}
      />
    </div>
  );
};
