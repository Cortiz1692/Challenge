import React, { useContext, useState } from "react";
import { DocuRow } from "./DocuRow";
import { PdfViewModal } from "../PdfViewModal";

export const DocuList = ({ documents }) => {

  const [selectedPdfData, setSelectedPdfData] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);


  const loadPdfData = (documento) => {
   
    const decodedPdfData = atob(documento);
    setSelectedPdfData(decodedPdfData);
    setShowPdfModal(true);
  };

  const goBack = () => {
    setSelectedPdfData(null);
    setShowPdfModal(false);
  };

  return (
    <div>
      {showPdfModal && (
        <div>
          <PdfViewModal pdfData={selectedPdfData} onClose={() => goBack()} />
        </div>
      )}
      {!selectedPdfData && (
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Certificado</th>
              <th>Nombre</th>
              <th>Buque</th>
              <th>Matricula</th>
              <th>FechaExpedicion</th>
              <th>Documento</th>
              <th>Tipo de Documeto</th>
              <th>Firmar Digitalmente</th>
              <th>Rechazar</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(
              (
                {
                  idCertificado,
                  usuario,
                  nombreBuque,
                  matricula,
                  fechaGenerado,
                  detalleDocumento,
                  documento,
                },
                index
              ) => (
                <DocuRow
                  key={`${idCertificado}_${index}`}
                  idCertificado={idCertificado}
                  usuario={usuario}
                  nombreBuque={nombreBuque}
                  matricula={matricula}
                  fechaGenerado={fechaGenerado}
                  tipoDoc={detalleDocumento?.tipoDocumento || 'Sin tipo de documento'}
                  idTipoDoc={detalleDocumento?.idTipoDocumento || 'Sin tipo de documento'}
                  documento={documento}
                  onLoadPdf={loadPdfData}
                />
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
