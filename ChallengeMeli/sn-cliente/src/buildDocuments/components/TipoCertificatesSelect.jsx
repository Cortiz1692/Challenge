import { useContext, useEffect } from "react";
import { DocumentsContext } from "../context/DocumentsContext";

export const TipoCertificatesSelect = ({ value, onChange }) => {
  const { getTiposCertificados, tipoCertificado } = useContext(DocumentsContext);

  useEffect(() => {
    getTiposCertificados(); // Llama a la función para obtener los tipos de certificados
  }, []);


  return (
    <div className="mb-2">
      <label htmlFor="idTipoDocumento" className="form-label">
        Tipo de Certificado
      </label>
      <select
        className="form-select"
        id="idTipoDocumento"
        name="idTipoDocumento"  // El nombre del campo para vincular con el formulario
        value={value}
        onChange={onChange}
        required
      >
        <option value="">Seleccionar Tipo de Certificado</option>
        {tipoCertificado.map((tipo) => (
          <option key={tipo.idTipoCertificado} value={tipo.idTipoCertificado}>
            {tipo.tipoCertificado}
          </option>
        ))}
      </select>
    </div>
  );
};
