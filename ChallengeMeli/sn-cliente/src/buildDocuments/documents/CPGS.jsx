import React, { useContext, useState } from "react";
import { DocumentsContext } from "../context/DocumentsContext";
import { VIEW_DOC_URL_CPGS } from "./index.js";
import { DocumentActions } from "../components/DocumentActions";
import { TipoBuqueSelect } from "../components/TipoBuqueSelect.jsx";
import Swal from "sweetalert2";

export const CPGS = () => {
  const { initCPGSForm, handlerDocSelectedForm, handlerAddDoc } =
    useContext(DocumentsContext);

  const [userForm, setUserForm] = useState(initCPGSForm);

  // Crear objeto de datos
  const {
    certificado,
    nombreBuque,
    numeroIMO,
    senalDistintiva,
    tipoBuque,
    nroMatricula,
    nat,
    nombreCompania,
    direccionCompania,
    nroOMI,
    validez,
    lugarExpedicion,
    fechaExpedicion,
  } = userForm;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const generateDocument = async () => {
    const form = document.getElementById("myForm");
    if (form.checkValidity()) {
      try {
        await handlerAddDoc(userForm);
      } catch (error) {
        console.error("Error al generar el documento:", error);
      }
    } else {
      console.log("Formulario inválido");
      Swal.fire({
        icon: "error",
        title: "Algo salio mal!",
        text: "Revisa si completaste todos los campos del formulario",
        footer: '<a href="#">Volver al formulario?</a>',
      });
    }
  };

  const viewDocument = () => {
    const { certificado } = userForm;
    const VIEW_DOC = `${VIEW_DOC_URL_CPGS}${certificado}`;
    window.open(VIEW_DOC, "_blank");
  };

  return (
    <div className="container mt-5">
      <form id="myForm" onSubmit={(e) => e.preventDefault()}>
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="card p-4">
            <div className="mb-2 ">
              <h1 className="col-12 mb-4">
                {" "}
                Certificado Provisional de Gestion de la Seguridad
              </h1>
              <label htmlFor="inputCertificado" className="form-label">
                N° Certificado
              </label>
              <input
                type="number"
                id="inputCertificado"
                className="form-control"
                placeholder=" N° Certificado"
                name="certificado"
                value={certificado}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputnombre" className="form-label">
                Nombre del Buque
              </label>
              <input
                type="text"
                id="inputnombre"
                name="nombreBuque"
                value={nombreBuque}
                className="form-control"
                placeholder="Nombre de Buque"
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputImo" className="form-label">
                Nro Imo
              </label>
              <input
                type="text"
                id="inputNroImo"
                className="form-control"
                placeholder="12345"
                name="numeroIMO"
                value={numeroIMO}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputSenalDistintiva" className="form-label">
                Señal Distintiva
              </label>
              <input
                type="text"
                id="inputSenalDistintiva"
                placeholder="LA45848AS"
                name="senalDistintiva"
                value={senalDistintiva}
                className="form-control"
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <TipoBuqueSelect
                tipoBuque="tipoBuque"
                name="tipoBuque"
                value={tipoBuque}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="inputNroMatricula" className="form-label">
              N° Matrícula
              </label>
              <input
                type="text"
                id="inputNroMatricula"
                className="form-control"
                placeholder="12345"
                name="nroMatricula"
                value={nroMatricula}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputNAT" className="form-label">
                N.A.T
              </label>
              <input
                type="number"
                id="inputNAT"
                className="form-control"
                placeholder="nat"
                name="nat"
                value={nat}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputNombreCompania" className="form-label">
                Nombre Compañia
              </label>
              <input
                type="text"
                id="inputNombreCompania"
                className="form-control"
                placeholder="test S.A"
                name="nombreCompania"
                value={nombreCompania}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputDireccionCompania" className="form-label">
                Dirección de Compañía
              </label>
              <input
                type="text"
                id="inputDireccionCompania"
                className="form-control"
                placeholder="Dirección compañia"
                name="direccionCompania"
                value={direccionCompania}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputNroOmi" className="form-label">
                Nro Omi
              </label>
              <input
                type="text"
                id="inputNroOmi"
                className="form-control"
                placeholder="12345"
                name="nroOMI"
                value={nroOMI}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputValidez" className="form-label">
                Valido hasta...
              </label>
              <input
                type="date"
                id="inputValidez"
                className="form-control"
                placeholder="fecha"
                name="validez"
                value={validez}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputLugarExpedicion" className="form-label">
                Expedido en...
              </label>
              <input
                type="text"
                id="inputLugarExpedicion"
                className="form-control"
                placeholder="Buenos Aires"
                name="lugarExpedicion"
                value={lugarExpedicion}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputFechaExpedicion" className="form-label">
                Fecha expedición
              </label>
              <input
                type="date"
                id="inputFechaExpedicion"
                className="form-control"
                placeholder="00/00/000"
                name="fechaExpedicion"
                value={fechaExpedicion}
                onChange={onInputChange}
                required
              />
            </div>
            <DocumentActions
              certificado={userForm.certificado}
              generateDocument={generateDocument}
              viewDocument={viewDocument}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
