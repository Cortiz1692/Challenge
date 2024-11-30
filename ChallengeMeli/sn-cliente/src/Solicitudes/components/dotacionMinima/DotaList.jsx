import React, { useContext, useEffect, useState } from "react";
import { DocsContext } from "../../context/DocsContext";
import { DotaRow } from "./DotaRow";
import { PdfViewModal } from "../PdfViewModal";
import { AuthContext } from "../../../auth/context/AuthContext";

export const DotaList = ({ documents }) => {

  const { login } = useContext(AuthContext);
  const { docs } = useContext(DocsContext);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [selectedPdfData, setSelectedPdfData] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);

  useEffect(() => {
    // Filtrar documentos según el estado del usuario
    const filtered = documents.filter(doc => {
      if (login.isFirmanteDivision) {
        return doc.estado === 0;
      } else {
        return doc.estado === 1 || doc.estado === 3;
      }
    });
    setFilteredDocuments(filtered);
  }, [documents, login.isFirmanteDivision]);

  

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
              <th>Usuario</th>
              <th>FechaExpedicion</th>
              <th>Documento</th>
              <th>Tipo de Documeto</th>
              <th>Firmar Digitalmente</th>
              <th>Rechazar</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map(
              (
                {
                  idCertificado,
                  usuario,
                  fechaGenerado,
                  detalleDotacion,
                  documento,
                  
                },
                index
              ) => (
                <DotaRow
                  key={`${idCertificado}_${index}`}
                  idCertificado={idCertificado}
                  usuario={usuario}
                  fechaGenerado={fechaGenerado}
                  tipoDocumento={detalleDotacion.tipoDocumento}
                  idTipoCertificado={detalleDotacion.idTipoCertificado}
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
