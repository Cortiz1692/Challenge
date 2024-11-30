import { useState } from "react";
import { RejectRow } from "./RejectRow";
import { PdfViewModal } from "../../Solicitudes/components/PdfViewModal";

export const RejectList = ({ documents }) => {
  const [selectedPdfData, setSelectedPdfData] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  console.log('documents :',documents);

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
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Certificado</th>
            <th>Detalle documento</th>
            <th>Documento</th>
            <th>Observacion</th>
            <th>Corregir</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(
            (
              { idCertificado, detalleDocumento, documento, observacion },
              index
            ) => (
              <RejectRow
                key={`${idCertificado}_${index}`}
                idCertificado={idCertificado}
                tipoDoc={ detalleDocumento?.tipoDocumento || "Sin tipo de documento" }
                idTipoDoc={ detalleDocumento?.idTipoCertificado || "Sin tipo de documento" }
                documento={documento}
                observacion={observacion}
                onLoadPdf={loadPdfData}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
