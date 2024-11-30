import React, { useContext, useState } from "react";
import { DocumentsContext } from "../context/DocumentsContext";
import { VIEW_DOC_URL_CIPGS } from "./index.js";
import { DocumentActions } from "../components/DocumentActions";
import { TipoBuqueSelect } from "../components/TipoBuqueSelect.jsx";
import Swal from "sweetalert2";

export const CIPGS = () => {
  const { initCIPGSForm, handlerDocSelectedForm, handlerAddDoc } =
    useContext(DocumentsContext);

  const [userForm, setUserForm] = useState(initCIPGSForm);

  // Crear objeto de datos
  const {
    certificado,
    nombreBuque,
    senalDistintiva,
    puertoMatricula,
    tipoBuque,
    arqueoBruto,
    numeroOMI,
    nombreCompania,
    direccionCompania,
    numeroOMICompania,
    validez,
    fechaVerificacion,
    lugarExpedicion,
    fechaExpedicion,
    nroMatricula,
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
    const VIEW_DOC = `${VIEW_DOC_URL_CIPGS}${certificado}`;
    window.open(VIEW_DOC, "_blank");
  };

  return (
    <div className="container">
      <form id="myForm" onSubmit={(e) => e.preventDefault()}>
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="card p-4">
            <div className="mb-2 ">
              <h1 className="col-12 mb-4">
                Certificado Internacional Provisional de Gestion de la Seguridad
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
            <div className="mb-2 ">
              <label htmlFor="inputnombre" className="form-label">
                Nombre del Buque
              </label>
              <input
                type="text"
                id="inputnombre"
                value={nombreBuque}
                className="form-control"
                placeholder="Nombre de Buque"
                name="nombreBuque"
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
            <div className="mb-2 ">
              <label htmlFor="inputSenalDistintiva" className="form-label">
              Número o letras distintivos
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

            <div className="mb-2 ">
              <label htmlFor="inputPtoMatricula" className="form-label">
                Puerto de matricula
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Buenos Aires"
                id="inputPtoMatricula"
                name="puertoMatricula"
                value={puertoMatricula}
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
            <div className="mb-2 ">
              <label htmlFor="inputArqueoBruto" className="form-label">
                Arqueo bruto
              </label>
              <input
                type="number"
                className="form-control"
                id="inputArqueoBruto"
                placeholder="251"
                name="arqueoBruto"
                value={arqueoBruto}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>
            <div className="mb-2 ">
              <label htmlFor="inputNroImo" className="form-label">
                Nro OMI
              </label>
              <input
                type="text"
                id="inputNroImo"
                className="form-control"
                placeholder="12345"
                name="numeroOMI"
                value={numeroOMI}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>

            <div className="mb-2 ">
              <label htmlFor="inputNombreCompania" className="form-label">
                Nombre Compañía
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

            <div className="mb-2 ">
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
            <div className="mb-2 ">
              <label htmlFor="inputIdCompania" className="form-label">
                Nro identificación de la compañía
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="12345"
                id="inputIdCompania"
                name="numeroOMICompania"
                value={numeroOMICompania}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>

            <div className="mb-2 ">
              <label htmlFor="inputValidez" className="form-label">
                El presente Certificado de gestión de la seguridad es válido
                hasta
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

            <div className="mb-2 ">
              <label htmlFor="verificacion" className="form-label">
                Fecha de terminación de la verificación en la que se basa el
                presente certificado
              </label>
              <input
                type="date"
                className="form-control"
                id="verificacion"
                name="fechaVerificacion"
                value={fechaVerificacion}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="mb-2 ">
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
