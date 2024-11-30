import React, { useContext, useState } from "react";
import { DocsContext } from "../../context/DocsContext";
import { RegisterRow } from "./RegisterRow";
import { PdfViewModal } from "../PdfViewModal";

export const RegisterList = ({ documents }) => {


  const { docs } = useContext(DocsContext);
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
                  nombre,
                  fechaGenerado,
                  matricula,
                  detalleDocumento,
                  documento,
                },
                index
              ) => (
                <RegisterRow
                  key={`${idCertificado}_${index}`}
                  idCertificado={idCertificado}
                  nombre={nombre}
                  fechaGenerado={fechaGenerado}
                  matricula={matricula}
                  tipoDoc={detalleDocumento?.tipoDocumento || 'Sin tipo de documento'}
                  idTipoDoc={detalleDocumento?.idTipoCertificado || 'Sin tipo de documento'}
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
