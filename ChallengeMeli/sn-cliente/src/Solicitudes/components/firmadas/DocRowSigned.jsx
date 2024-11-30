import React, { useContext, useState } from "react";
import { DocumentacionContext } from "../../context/DocumentacionContext ";

export const DocRowSigned = ({
  idCertificado,
  nombreBuque,
  matricula,
  detalleDocumento,
  idtipoDocumento,
  fechaFirma,
  docFirmado,
  convalidaciones,
  onLoadPdf,
  onShowEmailModal, // Nueva prop
}) => {
  const { handleOpenPdfInNewTab } = useContext(DocumentacionContext);

  return (
    <tr>
      <td>{idCertificado}</td>
      <td>{nombreBuque}</td>
      <td>{matricula}</td>
      <td>{detalleDocumento}</td>
      <td>{fechaFirma}</td>
      <td>
        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={
            idtipoDocumento !== 15
              ? () => onLoadPdf(docFirmado)
              : () => handleOpenPdfInNewTab(docFirmado)
          }
        >
          Documento
        </button>
      </td>
      <td>
        {convalidaciones !== null ? (
          <button
            type="button"
            className="btn btn-info btn-sm"
            onClick={() => onLoadPdf(convalidaciones)}
          >
            Convalidaciones
          </button>
        ) : (
          <button type="button" className="btn btn-light">
            No posee
          </button>
        )}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => onShowEmailModal({ idCertificado, idtipoDocumento })} // Utiliza la nueva prop
        >
          Enviar documento
        </button>
      </td>
    </tr>
  );
};
