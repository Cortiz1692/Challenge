import React, { useState } from "react";
import { DocRowSigned } from "./DocRowSigned";
import { PdfViewModal } from "../PdfViewModal";
import { EmailModalForm } from "../email/EmailModalForm";

export const DocListSigned = ({ document }) => {
  const [selectedPdfData, setSelectedPdfData] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const loadPdfData = (documento) => {
    const decodedPdfData = atob(documento);
    setSelectedPdfData(decodedPdfData);
    setShowPdfModal(true);
  };

  const goBack = () => {
    setSelectedPdfData(null);
    setShowPdfModal(false);
  };

  const handleShowEmailModal = (document) => {
    setSelectedDocument(document);
    setShowEmailModal(true);
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setSelectedDocument(null);
  };

  if (!document || Object.keys(document).length === 0) {
    return <p>No hay documentos disponibles.</p>;
  }

  return (
    <div>
      {showPdfModal && (
        <PdfViewModal pdfData={selectedPdfData} onClose={goBack} />
      )}

      {/* Renderizar el modal de envío de email fuera de la tabla */}
      <EmailModalForm
        show={showEmailModal}
        handleClose={handleCloseEmailModal}
        document={selectedDocument}
      />

      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Certificado</th>
            <th>Nombre</th>
            <th>Matrícula</th>
            <th>Tipo Documento</th>
            <th>Fecha Firma</th>
            <th>Documento</th>
            <th>Convalidaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <>
            <DocRowSigned
              key={document.idCertificado}
              idCertificado={document.idCertificado}
              nombreBuque={document.nombreBuque}
              matricula={document.matricula}
              fechaFirma={document.fechaFirma}
              detalleDocumento={document.detalleDocumento}
              idtipoDocumento={document.idtipoDocumento}
              docFirmado={document.documento}
              convalidaciones={document.docConvalidacion}
              onLoadPdf={loadPdfData}
              onShowEmailModal={handleShowEmailModal}
            />
          </>
        </tbody>
      </table>
    </div>
  );
};
