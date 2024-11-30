import { useContext, useState } from "react";
import { DocsContext } from "../context/DocsContext";
import { DocListSigned } from "../components/firmadas/DocListSigned";

export const SolicitudesSigned = () => {
  const { docSigned, getDocSigned } = useContext(DocsContext);

  console.log("docSigned :", docSigned);

  // Estados para manejar los inputs del formulario
  const [idCertificado, setIdCertificado] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Para manejar errores en la búsqueda

  // Handler para manejar los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "idCertificado") {
      setIdCertificado(value);
    } else if (name === "type") {
      setType(value);
    }
  };

  // Handler para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir que la página se recargue

    // Validar que los campos no estén vacíos
    if (!idCertificado || !type) {
      setError(
        "Por favor, ingresa el ID del certificado y el tipo de documento."
      );
      return;
    }

    setLoading(true); // Mostrar spinner mientras se busca el documento
    setError(null); // Limpiar cualquier error anterior
    try {
      await getDocSigned({ idCertificado, type }); // Llamar a la función con los parámetros ingresados
      setLoading(false); // Ocultar el spinner
    } catch (error) {
      console.error("Error al obtener documento firmado:", error);
      setError("No se encontró el documento con el ID y tipo especificados.");
      setLoading(false); // Ocultar el spinner en caso de error
    }
  };

  return (
    <>
      <div className="container my-4">
        <h2>Buscar Documentos Firmados</h2>
        {/* Formulario de búsqueda */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="idCertificado" className="form-label">
              ID del Certificado
            </label>
            <input
              type="text"
              className="form-control"
              id="idCertificado"
              name="idCertificado"
              value={idCertificado}
              onChange={handleInputChange}
              placeholder="Ingresa el ID del certificado"
            />
          </div>
          <div className="mb-3">
            <div className="form-floating">
              <select
                className="form-select"
                id="floatingSelect"
                name="type" // Asegúrate de agregar el nombre
                value={type} // Usa el estado para el valor seleccionado
                onChange={handleInputChange} // Maneja el cambio
              >
                <option value="" disabled>
                  Seleccione el tipo de Documento
                </option>
                <optgroup label="División Control de Gestión">
                  <option value="1">
                    DOCUMENTO PROVISIONAL DE CUMPLIMIENTO
                  </option>
                  <option value="2">DOCUMENTO DE CUMPLIMIENTO NACIONAL</option>
                  <option value="3">CONSTANCIA DE CUMPLIMIENTO NACIONAL</option>
                  <option value="4">
                    CERTIFICADO DE GESTION DE LA SEGURIDAD
                  </option>
                  <option value="5">
                    CERTIFICADO PROVISIONAL DE GESTION DE LA SEGURIDAD
                  </option>
                  <option value="6">
                    CERTIFICADO DEMOSTRATIVO DE CUMPLIMIENTO
                  </option>
                  <option value="7">
                    CERTIFICADO NACIONAL DE PROTECCION DEL BUQUE
                  </option>
                  <option value="8">
                    CERTIFICADO NACIONAL DE PROTECCION DEL BUQUE PROVISIONAL
                  </option>
                  <option value="9">
                    CERTIFICADO INTERNACIONAL DE PROTECCION DEL BUQUE
                  </option>
                  <option value="10">
                    CERTIFICADO INTERNACIONAL DE PROTECCION DEL BUQUE
                    PROVISIONAL
                  </option>
                  <option value="11">
                    CERTIFICADO INTERNACIONAL PROVISIONAL DE GESTION DE LA
                    SEGURIDAD
                  </option>
                  <option value="12">
                    DOCUMENTO DE CUMPLIMIENTO INTERNACIONAL
                  </option>
                  <option value="13">
                    CERTIFICADO PROVISIONAL DEMOSTRATIVO DE CUMPLIMIENTO
                  </option>
                  <option value="14">
                    CERTIFICADO INTERNACIONAL DE GESTION DE LA SEGURIDAD
                  </option>
                </optgroup>
                <optgroup label="División Documentación">
                  <option value="15">
                    CERTIFICADOS DE SEGURIDAD PARA BUQUE DE CARGA
                  </option>
                  <option value="16">REGISTRO SINOPTICO CONTINUO</option>
                  <option value="17">
                    INFORME SOBRE PRUEBAS DE CONFORMIDAD (LRIT)
                  </option>
                  <option value="18">
                    CERTIFICADO DE SEGURIDAD DE LA NAVEGACIÓN
                  </option>
                </optgroup>
                <optgroup label="División Navegación">
                  <option value="19">
                    CERTIFICADO NACIONAL DE DOTACIÓN MÍNIMA DE SEGURIDADAD
                  </option>
                  <option value="20">
                    DOCUMENTO INTERNACIONAL DE DOTACIÓN MÍNIMA DE SEGURIDAD
                  </option>
                  <option value="21">
                    CERTIFICADO DE DOTACIÓN DE SEGURIDAD PARA BUQUES CON
                    SERVICIOS ESPECIALES
                  </option>
                </optgroup>
              </select>
              <label htmlFor="floatingSelect">Documento a seleccionar</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Buscar Documento
          </button>
        </form>
        {/* Mostrar loading mientras se busca */}
        {loading && (
          <div className="d-flex justify-content-center my-4">
            <div className="spinner-grow text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {/* Mostrar error si ocurre alguno */}
        {error && <div className="alert alert-danger my-4">{error}</div>}

        {/* Mostrar documentos firmados si existen */}
        {!loading && !error && docSigned && (
          <div className="row my-4">
            <div className="col">
              <DocListSigned document={docSigned} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
