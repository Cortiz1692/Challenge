const tipoDocumentoMap = {
  1: "DOCUMENTO PROVISIONAL DE CUMPLIMIENTO",
  2: "DOCUMENTO DE CUMPLIMIENTO NACIONAL",
  3: "CONSTANCIA DE CUMPLIMIENTO NACIONAL",
  4: "CERTIFICADO DE GESTION DE LA SEGURIDAD",
  5: "CERTIFICADO PROVISIONAL DE GESTION DE LA SEGURIDAD",
  6: "CERTIFICADO DEMOSTRATIVO DE CUMPLIMIENTO",
  7: "CERTIFICADO NACIONAL DE PROTECCION DEL BUQUE",
  8: "CERTIFICADO NACIONAL DE PROTECCION DEL BUQUE PROVISIONAL",
  9: "CERTIFICADO INTERNACIONAL DE PROTECCION DEL BUQUE",
  10: "CERTIFICADO INTERNACIONAL DE PROTECCION DEL BUQUE PROVISIONAL",
  11: "CERTIFICADO INTERNACIONAL PROVISIONAL DE GESTION DE LA SEGURIDAD",
  12: "DOCUMENTO DE CUMPLIMIENTO INTERNACIONAL",
  13: "CERTIFICADO PROVISIONAL DEMOSTRATIVO DE CUMPLIMIENTO",
  14: "CERTIFICADO INTERNACIONAL DE GESTION DE LA SEGURIDAD",
};

export const AditionalRow = ({
  idCertificado,
  tipoConvalidacion,
  idTipoDocumento,
  inspector,
  fechaInspeccionAdicional,
  observacion,
  onShowObservationModal,
}) => {
  const tipoDocumentoTexto = tipoDocumentoMap[idTipoDocumento] || "Tipo desconocido";
  

  return (
    <tr>
      <td>{idCertificado}</td>
      <td>{tipoConvalidacion}</td>
      <td>{tipoDocumentoTexto}</td>
      <td>{inspector}</td>
      <td>{fechaInspeccionAdicional}</td>
      <td>
        <button
          type="button"
          className="btn btn-dark btn-sm"
          onClick={() => onShowObservationModal(observacion)}
        >
          Ver Solicitud
        </button>
      </td>
    </tr>
  );
};
