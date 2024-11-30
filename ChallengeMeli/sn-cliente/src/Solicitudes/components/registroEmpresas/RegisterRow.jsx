import React, { useContext, useState } from "react";
import { DocsContext } from "../../context/DocsContext";
import { ObservacionModalForm } from "../ObservacionModalForm";

export const RegisterRow = ({
  idCertificado,
  nombre,
  fechaGenerado,
  matricula,
  tipoDoc,
  idTipoDoc,
  firma,
  documento,
  onLoadPdf, 
}) => {
  const {
    handleDevolverDocumento,
    removeSignedDocument,
  } = useContext(DocsContext);
  const [showForm, setShowForm] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const handlerOpenForm = () => setShowForm(true);
  const handlerCloseForm = () => setShowForm(false);

  const handleProbarProtocolo = () => {
    const url = `firma://id=${idCertificado}&type=${idTipoDoc}`;
    console.log("url :", url);
    window.location.href = url;

    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      removeSignedDocument(idCertificado);
    }, 5000); 
  };

  let title = "register";

  return (
    <tr>
      <td>{idCertificado}</td>
      <td>{nombre}</td>
      <td>{fechaGenerado}</td>
      <td>
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={() => onLoadPdf(documento)} // Llama a la función para cargar el PDF
        >
          Documento
        </button>
      </td>
      <td>{tipoDoc}</td>
      <td>
        {!isSigning ? (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleProbarProtocolo} // Nuevo botón para probar el protocolo personalizado
          >
            Firmar
          </button>
        ) : (
          <span>Firma en proceso...</span>
        )}
      </td>
      <td>
        {showForm && (
          <ObservacionModalForm
            title={title}
            idCertificado={idCertificado}
            onClose={handlerCloseForm}
            onSubmit={handleDevolverDocumento}
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
