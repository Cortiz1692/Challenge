import React, { useContext, useState } from "react";
import { DocumentacionContext } from "../../context/DocumentacionContext ";
import { ObservacionModalForm } from "../ObservacionModalForm";

export const DocuRow = ({
  idCertificado,
  usuario,
  nombreBuque,
  matricula,
  fechaGenerado,
  tipoDoc,
  idTipoDoc,
  documento,
  onLoadPdf, // Nueva prop para cargar el PDF
}) => {
  const {
    handleDevolverDocu,
    handleOpenPdfInNewTab,
    removeSignedDocument
  } = useContext(DocumentacionContext);




  const [showForm, setShowForm] = useState(false);
  const [isSigning, setIsSigning] = useState(false);


  const handlerOpenForm = () => setShowForm(true);
  const handlerCloseForm = () => setShowForm(false);


  const handleProbarProtocolo = () => {
    const url = `firma://id=${idCertificado}&type=${idTipoDoc}`;
    console.log("url :", url);
    window.location.href = url; // Abre la URL con el protocolo personalizadoidTipoDoc });
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      removeSignedDocument(idCertificado);
    }, 5000); 
  };


  let title = "documentacion";

  return (
    <tr>
      <td>{idCertificado}</td>
      <td>{usuario}</td>
      <td>{nombreBuque}</td>
      <td>{matricula}</td>
      <td>{fechaGenerado}</td>
      <td>
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={
            idTipoDoc !== 15
              ? () => onLoadPdf(documento)
              : () => handleOpenPdfInNewTab(documento)
          } // Llama a la función para cargar el PDF
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
            onSubmit={handleDevolverDocu}
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
