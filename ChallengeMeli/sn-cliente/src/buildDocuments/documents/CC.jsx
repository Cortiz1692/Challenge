import React, { useContext, useState } from "react";
import { DocumentsContext } from "../context/DocumentsContext";
import { VIEW_DOC_URL_CC } from "./index.js";
import { DocumentActions } from "../components/DocumentActions";
import { TipoBuqueSelect } from "../components/TipoBuqueSelect.jsx";
import Swal from "sweetalert2";

export const CC = () => {
  const { initCCForm, handlerDocSelectedForm, handlerAddDoc } =
    useContext(DocumentsContext);

  const [userForm, setUserForm] = useState(initCCForm);

  const {
    certificado,
    nombreBuque,
    senalDistintiva,
    tipoBuque,
    nroMatricula,
    nat,
    nombreCompania,
    direccionCompania,
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
  console.log("userForm :", userForm);
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
    const VIEW_DOC = `${VIEW_DOC_URL_CC}${certificado}`;
    window.open(VIEW_DOC, "_blank");
  };

  return (
    <div className="container mt-5">
      <form id="myForm" onSubmit={(e) => e.preventDefault()}>
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="card p-4">
            <div className="mb-2 ">
              <h1 className="col-12 mb-4">Constancia de Cumplimiento</h1>
              <label htmlFor="inputCertificado" className="form-label">
                N° Certificado
              </label>
              <input
                type="number"
                className="form-control"
                id="inputCertificado"
                name="certificado"
                value={certificado}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()} // Evitar que el usuario cambie el valor desplazando
                required
              />
            </div>
            {/* Rest of the form inputs */}
            <div className="mb-2">
              <label htmlFor="inputnombre" className="form-label">
                Nombre del Buque
              </label>
              <input
                type="text"
                className="form-control"
                id="inputnombre"
                name="nombreBuque"
                value={nombreBuque}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputSenalDistintiva" className="form-label">
                Señal Distintiva
              </label>
              <input
                type="text"
                className="form-control"
                id="inputSenalDistintiva"
                name="senalDistintiva"
                placeholder="LA45848AS"
                value={senalDistintiva}
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
            <div className="mb-2">
              <label htmlFor="inputNroMatricula" className="form-label">
                N° Matrícula
              </label>
              <input
                type="text"
                className="form-control"
                id="inputNroMatricula"
                name="nroMatricula"
                value={nroMatricula}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()} // Evitar que el usuario cambie el valor desplazando
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputNAT" className="form-label">
                N.A.T
              </label>
              <input
                type="number"
                className="form-control"
                id="inputNAT"
                name="nat"
                value={nat}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()} // Evitar que el usuario cambie el valor desplazando
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputNombreCompania" className="form-label">
                Nombre Compañia
              </label>
              <input
                type="text"
                className="form-control"
                id="inputNombreCompania"
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
                className="form-control"
                id="inputDireccionCompania"
                name="direccionCompania"
                value={direccionCompania}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputValidez" className="form-label">
                Valido hasta...
              </label>
              <input
                type="date"
                className="form-control"
                id="inputValidez"
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
                className="form-control"
                id="inputLugarExpedicion"
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
                className="form-control"
                id="inputFechaExpedicion"
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
