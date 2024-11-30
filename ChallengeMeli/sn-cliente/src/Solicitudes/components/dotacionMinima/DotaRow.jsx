import React, { useContext, useState } from "react";
import { DotacionContext } from "../../context/DotacionContext";
import { ObservacionModalForm } from "../ObservacionModalForm";

export const DotaRow = ({
  idCertificado,
  usuario,
  fechaGenerado,
  tipoDocumento,
  idTipoCertificado,
  documento,
  onLoadPdf,
  isSelected,
}) => {
  const { handleDevolverDotacion, removeSignedDocumentDota } =
    useContext(DotacionContext);

  const [showForm, setShowForm] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const handlerOpenForm = () => setShowForm(true);
  const handlerCloseForm = () => setShowForm(false);

  const [observacion, setObservacion] = useState("");

  const handleProbarProtocolo = () => {
    const url = `firma://id=${idCertificado}&type=${idTipoCertificado}`;
    console.log("url :", url);
    window.location.href = url;
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      removeSignedDocumentDota(idCertificado);
    }, 5000);
  };

  let title = "dotacion";

  return (
    <tr>
      <td>{idCertificado}</td>
      <td>{usuario}</td>
      <td>{fechaGenerado}</td>
      <td>
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={() => onLoadPdf(documento)}
        >
          Documento
        </button>
      </td>
      <td>{tipoDocumento}</td>
      <td>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleProbarProtocolo} 
        >
          Firmar
        </button>
      </td>
      <td>
        {showForm && (
          <ObservacionModalForm
            title={title}
            idCertificado={idCertificado}
            onClose={handlerCloseForm}
            onSubmit={handleDevolverDotacion}
          />
        )}
        {!showForm && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={handlerOpenForm}
          >
            Devolver
          </button>
        )}
      </td>
    </tr>
  );
};
