import { useContext, useState } from "react";
import { AditionalRow } from "./AditionalRow";
import { DocumentsContext } from "../context/DocumentsContext";
import Swal from "sweetalert2";
import { CombinationModal } from "./CombinationModal";

export const AditionalList = ({ aditionalDocs }) => {
  const { updateAditionalStatus, submitInspectionDate } =
    useContext(DocumentsContext);
  const [selectedObservation, setSelectedObservation] = useState("");
  const [showCombinedModal, setShowCombinedModal] = useState(false);
  const [selectedConvalidacionId, setSelectedConvalidacionId] = useState(null);
  const [selectedCertificadoId, setSelectedCertificadoId] = useState(null);
  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState(null);
  const [fechaInspeccionAdicional, setFechaInspeccionAdicional] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const handleShowCombinedModal = (
    observation,
    idConvalidacion,
    idCertificado,
    tipoDocumento
  ) => {
    setSelectedObservation(observation);
    setSelectedConvalidacionId(idConvalidacion);
    setSelectedCertificadoId(idCertificado);
    setSelectedTipoDocumento(tipoDocumento);
    setShowCombinedModal(true);
    setIsSubmitted(false); 
    setFechaInspeccionAdicional("");
  };

  const handleCloseCombinedModal = () => setShowCombinedModal(false);

  const handleApprove = () => {
    try {
      updateAditionalStatus({
        idConvalidacion: selectedConvalidacionId,
        estado: 1,
      });
      Swal.fire({
        icon: "success",
        title: "¡Aprobado!",
        text: "El estado ha sido aprobado correctamente.",
        confirmButtonText: "Aceptar",
      });
      handleCloseCombinedModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo aprobar el estado.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleReject = () => {
    try {
      updateAditionalStatus({
        idConvalidacion: selectedConvalidacionId,
        estado: 2,
      });
      Swal.fire({
        icon: "error",
        title: "¡Rechazado!",
        text: "El estado ha sido rechazado.",
        confirmButtonText: "Aceptar",
      });
      handleCloseCombinedModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo rechazar el estado.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleSubmitDate = async () => {
    const success = await submitInspectionDate({
      idCertificado: selectedCertificadoId,
      tipoDocumento: selectedTipoDocumento,
      fechaInspeccionAdicional: fechaInspeccionAdicional,
    });
    handleApprove(); 
    handleCloseCombinedModal();
  };

  return (
    <div>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Certificado</th>
            <th>Tipo de Convalidación</th>
            <th>Documento</th>
            <th>Inspector</th>
            <th>Fecha Propuesta</th>
            <th>Inspección adicional</th>
          </tr>
        </thead>
        <tbody>
          {aditionalDocs.map(
            ({
              idCertificado,
              idConvalidacion,
              tipoConvalidacion,
              idTipoDocumento,
              inspector,
              fechaInspeccionAdicional,
              observacion,
            }) => (
              <AditionalRow
                key={idCertificado}
                idCertificado={idCertificado}
                tipoConvalidacion={tipoConvalidacion.descripcion || "Sin tipo"}
                idTipoDocumento={idTipoDocumento}
                inspector={inspector}
                fechaInspeccionAdicional={fechaInspeccionAdicional}
                observacion={observacion}
                onShowObservationModal={() =>
                  handleShowCombinedModal(
                    observacion,
                    idConvalidacion,
                    idCertificado,
                    idTipoDocumento
                  )
                }
              />
            )
          )}
        </tbody>
      </table>

      <CombinationModal
        show={showCombinedModal}
        handleClose={handleCloseCombinedModal}
        observation={selectedObservation}
        fechaInspeccionAdicional={fechaInspeccionAdicional}
        setFechaInspeccionAdicional={setFechaInspeccionAdicional}
        onApprove={handleApprove}
        onReject={handleReject}
        onSubmitDate={handleSubmitDate}
        isSubmitted={isSubmitted}// Pasar el estado de aprobación
      />
    </div>
  );
};
