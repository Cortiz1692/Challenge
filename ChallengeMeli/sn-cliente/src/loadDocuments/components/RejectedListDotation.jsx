import { useState } from "react";
import { PdfViewModal } from "../../Solicitudes/components/PdfViewModal";
import { RejectedRowDotation } from "./RejectedRowDotation";

export const RejectedListDotation = ({ documents }) => {
  
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
      <table className="table table-hover table-striped">
        <thead>
            <tr>
                <th>Certificado</th>
                <th>Detalle documento</th>
                <th>Documento</th>
                <th>Observacion</th>
                <th>Coregir</th>
            </tr>
        </thead>
        <tbody>
            {documents.map(
                (
                    {
                        idCertificado,
                        detalleDocumento,
                        documento,
                        observacion
                },
                index
            ) => (
                <RejectedRowDotation
                key={`${idCertificado}_${index}`}
                idCertificado={idCertificado}
                tipoDoc={detalleDocumento?.tipoDocumento || 'Sin tipo de documento'}
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
