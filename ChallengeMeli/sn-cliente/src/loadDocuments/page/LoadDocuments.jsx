import React, { useContext, useEffect, useState } from "react";
import { LoadDocContext } from "../context/LoadDocContext";
import { NavLink } from "react-router-dom";
import "./style/styles.css";

export const LoadDocuments = () => {
  const { initLoadDoc, handlerUploadFile } = useContext(LoadDocContext);

  const [useForm, setUseForm] = useState(initLoadDoc);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [rejectedDocsCount, setRejectedDocsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tipoDocument, setTipoDocument] = useState("");

  const { getDocuRejected, rejectDocs } = useContext(LoadDocContext);
  const {
    idCertificado,
    user,
    division,
    tipoDoc,
    data,
    matricula,
    nombreBuque,
  } = useForm;
  console.log("useForm :", useForm);

  useEffect(() => {
    getDocuRejected();
  }, []);

  useEffect(() => {
    // Establecer el formulario inicial
    setUseForm(initLoadDoc);
  }, [initLoadDoc]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getDocuRejected();
        setRejectedDocsCount(rejectDocs.length);
      } catch (error) {
        console.error("Error al obtener documentos rechazados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (rejectDocs.length) {
      setRejectedDocsCount(rejectDocs.length);
    }
  }, [rejectDocs]);

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
          data: base64Data,
          matricula: useForm.matricula,
          nombreBuque: useForm.nombreBuque, // Envía el archivo en formato Base64
          estructuraInicio0: useForm.estructuraInicio0,
          estructuraFin0: useForm.estructuraFin0,
          estructuraInicio1: useForm.estructuraInicio1,
          estructuraFin1: useForm.estructuraFin1,
          estructuraInicio2: useForm.estructuraInicio2,
          estructuraFin2: useForm.estructuraFin2,
          estructuraInicio3: useForm.estructuraInicio3,
          estructuraFin3: useForm.estructuraFin3,
          obraVivaInicio0: useForm.obraVivaInicio0,
          obraVivaFin0: useForm.obraVivaFin0,
          obraVivaInicio1: useForm.obraVivaInicio1,
          obraVivaFin1: useForm.obraVivaFin1,
          salvamentoInicio0: useForm.salvamentoInicio0,
          salvamentoFin0: useForm.salvamentoFin0,
          salvamentoInicio1: useForm.salvamentoInicio1,
          salvamentoFin1: useForm.salvamentoFin1,
          salvamentoInicio2: useForm.salvamentoInicio2,
          salvamentoFin2: useForm.salvamentoFin2,
          salvamentoInicio3: useForm.salvamentoInicio3,
          salvamentoFin3: useForm.salvamentoFin3,
          radioelectricoInicio0: useForm.radioelectricoInicio0,
          radioelectricoFin0: useForm.radioelectricoFin0,
          radioelectricoInicio1: useForm.radioelectricoInicio1,
          radioelectricoFin1: useForm.radioelectricoFin1,
          radioelectricoInicio2: useForm.radioelectricoInicio2,
          radioelectricoFin2: useForm.radioelectricoFin2,
          radioelectricoInicio3: useForm.radioelectricoInicio3,
          radioelectricoFin3: useForm.radioelectricoFin3,
        };
        
        console.log("requestData :", requestData);
        await handlerUploadFile(requestData);
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
        {loading ? (
          <div className="d-flex justify-content-center mb-4">
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          rejectedDocsCount > 0 && (
            <div className="alert alert-danger" role="alert">
              Usted tiene {rejectedDocsCount} documentos para corregir.
              <div>
                <NavLink
                  className={"btn btn-light btn-sm"}
                  to={"/cargarDocumentos/cargarDocumentacion/rejected"}
                >
                  Ver Documentos
                </NavLink>
              </div>
            </div>
          )
        )}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="container d-flex justify-content-center align-items-center">
            <div className="card p-4">
              <h3 className="col-12 mb-4">
                Documentos para ser enviados a firmar
              </h3>
              <h5 className="col-12 mb-4">Division Documentacion</h5>
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
                  <option value="15">
                    {" "}
                    CERTIFICADO DE SEGURIDAD PARA BUQUE DE CARGA{" "}
                  </option>
                  <option value="16">REGISTRO SINÓPTICO CONTINUO</option>
                  <option value="17">
                    {" "}
                    INFORME SOBRE PRUEBAS DE CONFORMIDAD (LRIT)
                  </option>
                </select>
              </div>

              {/* Campos para fechas si se selecciona el tipo 15 */}

              {tipoDoc === "15" && (
                <div className="mb-4">
                  <h5 className="inspeccion-title">
                    Fechas y Tipos de Inspección
                  </h5>

                  <div className="inspeccion-group">
                    <h6>Estructura, máquinas y equipo</h6>
                    {[
                      "Reconocimiento anual",
                      "Reconocimiento Anual / intermedio",
                      "Reconocimiento Anual / intermedio",
                      "Reconocimiento anual",
                    ].map((tipo, index) => (
                      <div key={index} className="mb-2">
                        <label className="form-label">{`${
                          index + 1
                        } - ${tipo}`}</label>
                        <input
                          type="date"
                          className="form-control"
                          name={`estructuraInicio${index}`}
                          onChange={onInputChange}
                          required
                        />
                        <input
                          type="date"
                          className="form-control mt-2"
                          name={`estructuraFin${index}`}
                          onChange={onInputChange}
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div className="inspeccion-group">
                    <h6>Inspecciones de la obra viva del buque</h6>
                    {["Primera inspección", "Segunda inspección"].map(
                      (tipo, index) => (
                        <div key={index} className="mb-2">
                          <label className="form-label">{`${
                            index + 1
                          } - ${tipo}`}</label>
                          <input
                            type="date"
                            className="form-control"
                            name={`obraVivaInicio${index}`}
                            onChange={onInputChange}
                            required
                          />
                          <input
                            type="date"
                            className="form-control mt-2"
                            name={`obraVivaFin${index}`}
                            onChange={onInputChange}
                            required
                          />
                        </div>
                      )
                    )}
                  </div>

                  <div className="inspeccion-group">
                    <h6>Dispositivos de salvamento y otro equipo</h6>
                    {[
                      "Reconocimiento anual",
                      "Reconocimiento Anual / intermedio",
                      "Reconocimiento Anual / periódico",
                      "Reconocimiento anual",
                    ].map((tipo, index) => (
                      <div key={index} className="mb-2">
                        <label className="form-label">{`${
                          index + 1
                        } - ${tipo}`}</label>
                        <input
                          type="date"
                          className="form-control"
                          name={`salvamentoInicio${index}`}
                          onChange={onInputChange}
                          required
                        />
                        <input
                          type="date"
                          className="form-control mt-2"
                          name={`salvamentoFin${index}`}
                          onChange={onInputChange}
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div className="inspeccion-group">
                    <h6>
                      Reconocimiento periódicos relativos a las instalaciones
                      radioeléctricas
                    </h6>
                    {Array.from({ length: 4 }, (_, index) => (
                      <div key={index} className="mb-2">
                        <label className="form-label">{`${
                          index + 1
                        } - Reconocimiento periódico`}</label>
                        <input
                          type="date"
                          className="form-control"
                          name={`radioelectricoInicio${index}`}
                          onChange={onInputChange}
                          required
                        />
                        <input
                          type="date"
                          className="form-control mt-2"
                          name={`radioelectricoFin${index}`}
                          onChange={onInputChange}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
  );
};
