import { useContext, useEffect, useState } from "react";
import { LoadDotaContext } from "../context/LoadDotaContext";
import { NavLink } from "react-router-dom";

export const LoadDocumentsDotacion = () => {
  const {
    initLoadDota,
    getDotaRejected,
    rejectDota,
    handlerUploadFilDota,
    uploadFileDota,
  } = useContext(LoadDotaContext);

  const [useForm, setUseForm] = useState(initLoadDota);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [rejectedDocsCount, setRejectedDocsCount] = useState(0);

  console.log('useForm :', useForm);

  const {
    idCertificado,
    user,
    division,
    tipoDoc,
    data,
    matricula,
    nombreBuque,
  } = useForm;

  useEffect(() => {
    getDotaRejected();
  }, []);

  useEffect(() => {
    if (rejectDota.length) {
      setRejectedDocsCount(rejectDota.length);
    }
  }, [rejectDota]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUseForm({
      ...useForm,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFiles || selectedFiles.length === 0) {
        setUploadStatus("Por favor, selecciona un archivo PDF.");
        return;
      }

      const file = selectedFiles[0];
      const reader = new FileReader();

      reader.onloadend = async () => {
        const fileData = reader.result; // Aquí tienes el archivo en formato Base64
        const base64Data = fileData.split(",")[1];

        const requestData = {
          idCertificado: useForm.idCertificado,
          user: useForm.user,
          division: useForm.division,
          tipoDoc: useForm.tipoDoc,
          data: base64Data, // Envía el archivo en formato Base64
          matricula: useForm.matricula,
          nombreBuque: useForm.nombreBuque,
        };
        console.log("requestData :", requestData);
        await handlerUploadFilDota(requestData);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
      setUploadStatus(
        "Error al procesar el archivo. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="container my-4">
      <div>
        {rejectedDocsCount > 0 && (
          <div className="alert alert-danger" role="alert">
            Usted tiene {rejectedDocsCount} documentos para corregir.
            <div>
              <NavLink
                className={"btn btn-light btn-sm"}
                to={"/cargarDocumentos/cargarDotacion/rejected"}
              >
                Ver Documentos
              </NavLink>
            </div>
          </div>
        )}
        <div className="container my-4">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="container d-flex justify-content-center align-items-center">
              <div className="card p-4">
                <h4 className="col-12 mb-4">
                  Cargue el formulario para enviar los documentos a la firma
                </h4>
                <h5 className="col-12 mb-4">
                  Division Dotacion minima de Seguridad
                </h5>
                <div className="mb-2">
                  <label htmlFor="inputId" className="form-label">
                    N° Certificado
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputId"
                    name="idCertificado"
                    value={idCertificado}
                    onChange={onInputChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="inputMatricula" className="form-label">
                    Matricula
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputMatricula"
                    placeholder="Ingrese matricula del buque si la tiene"
                    name="matricula"
                    value={matricula}
                    onChange={onInputChange}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="inputNombre" className="form-label">
                    Nombre Buque
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputNombre"
                    placeholder="nombre del buque"
                    name="nombreBuque"
                    value={nombreBuque}
                    onChange={onInputChange}
                    required
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                <div className="mb-2">
                  <label htmlFor="inputUser" className="form-label">
                    Usuario
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputUser"
                    placeholder="DNI"
                    name="user"
                    value={user}
                    onChange={onInputChange}
                    required
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="inputDivision" className="form-label">
                    División
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDivision"
                    name="division"
                    value={division}
                    onChange={onInputChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="inputTipoDoc" className="form-label">
                    Tipo de Documento
                  </label>
                  <select
                    className="form-select"
                    id="inputTipoDoc"
                    name="tipoDoc"
                    value={tipoDoc}
                    onChange={onInputChange}
                    required
                    aria-label="Default select example"
                  >
                    <option value="Desplegable">Desplegable</option>
                    <option value="19">
                      CERTIFICADO NACIONAL DE DOTACIÓN MÍNIMA DE SEGURIDAD
                    </option>
                    <option value="20">
                      DOCUMENTO INTERNACIONAL DE DOTACIÓN MÍNIMA DE SEGURIDAD
                    </option>
                    <option value="21">
                      CERTIFICADO DE DOTACIÓN DE SEGURIDAD PARA BUQUES CON
                      SERVICIOS ESPECIALES
                    </option>
                    <option value="22">
                      DISPOSICIÓN DOTACIÓN MÍNIMA DE SEGURIDAD
                    </option>
                  </select>
                </div>
                <div className="mb-2">
                  <label htmlFor="formFile" className="form-label">
                    Seleccione el archivo
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    multiple
                  />
                </div>
                <div className="my-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpload()}
                  >
                    Subir PDF
                  </button>
                  {uploadStatus && <p>{uploadStatus}</p>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
