import { NavLink } from "react-router-dom";
import { ObservationModal } from "../../buildDocuments/components/ObservationModal";
import { useState } from "react";

export const RejectedRowDotation = ({
  idCertificado,
  tipoDoc,
  documento,
  observacion,
  onLoadPdf,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <tr>
        <td>{idCertificado}</td>
        <td>{tipoDoc}</td>
        <td>
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => onLoadPdf(documento)} // Llama a la función para cargar el PDF
          >
            Documento
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-info btn-sm"
            onClick={handleShowModal}
          >
            Ver Observación
          </button>
        </td>

        <td>
          <NavLink
            className={"btn btn-secondary btn-sm"}
            to={"/cargarDocumentos/cargarDotacion"}
          >
            corregir documento
          </NavLink>
        </td>
      </tr>
      <ObservationModal
        show={showModal}
        handleClose={handleCloseModal}
        observation={observacion}
      />
    </>
  );
};
