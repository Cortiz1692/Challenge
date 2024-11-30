import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { DocsContext } from "../../Solicitudes/context/DocsContext";
import { ObservationModal } from "./ObservationModal";

export const RejectRow = ({
  idCertificado,
  tipoDoc,
  idTipoDoc,
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
            to={"/documentos/documentos/select/" + idTipoDoc}
          >
            corregir documento
          </NavLink>
        </td>
      </tr>
      <ObservationModal 
        show={showModal}
        handleClose={handleCloseModal}
        observation={observacion}
        showApprovalButtons={false}
      />
    </>
  );
};