import React, { useContext, useState } from "react";
import { DocumentsContext } from "../context/DocumentsContext";
import { VIEW_DOC_URL_CNPBP } from "./index.js";
import { DocumentActions } from "../components/DocumentActions";
import { TipoBuqueSelect } from "../components/TipoBuqueSelect.jsx";
import Swal from "sweetalert2";

export const CNPBP = () => {
  const { initCNPBPForm, handlerAddDoc } = useContext(DocumentsContext);
  const [userForm, setUserForm] = useState(initCNPBPForm);

  const {
    certificado,
    nombreBuque,
    senalDistintiva,
    puertoMatricula,
    tipoBuque,
    nat,
    nroOMI,
    nombreCompania,
    direccionCompania,
    nroOMICompania,
    segundoCertificado,
    fechaExpedicionProvInicial,
    puntoConformidad,
    validez,
    lugarExpedicion,
    fechaExpedicion,
    nroMatricula,
  } = userForm;

  const onInputChange = (e) => {
    const { name, value } = e.target;
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
    const VIEW_DOC = `${VIEW_DOC_URL_CNPBP}${certificado}`;
    window.open(VIEW_DOC, "_blank");
  };

  return (
    <div className="container mt-5">
      <form id="myForm" onSubmit={(e) => e.preventDefault()}>
        <div className="container d-flex justify-content-center align-items-center">
          <div className="card p-4">
            <div className="mb-2">
              <h1 className="col-12 mb-4">
                Certificado Nacional de Protección del Buque Provisional
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
            <div className="mb-2">
              <label htmlFor="inputArqueoBruto" className="form-label">
                N.A.T
              </label>
              <input
                type="number"
                className="form-control"
                id="inputnat"
                placeholder="251"
                name="nat"
                value={nat}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()}
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
            <div className="row">
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
                <label htmlFor="inputnroOMICompania" className="form-label">
                Número de ldentificación de la Compañía (IMO)
                </label>
                <input
                  type="text"
                  id="nroOMICompania"
                  className="form-control"
                  placeholder="nroOMICompania"
                  name="nroOMICompania"
                  value={nroOMICompania}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="col">
                <h6>El presente es un segundo Certificado Provisional</h6>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="segundoCertificado"
                    id="siSegundoCertificado"
                    checked={segundoCertificado === "si"}
                    onChange={() =>
                      onInputChange({
                        target: { name: "segundoCertificado", value: "si" },
                      })
                    }
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    si
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="segundoCertificado"
                    id="noSegundoCertificado"
                    checked={segundoCertificado === "no"}
                    onChange={() =>
                      onInputChange({
                        target: { name: "segundoCertificado", value: "no" },
                      })
                    }
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    no
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mb-2">
                <label
                  htmlFor="inputFechaExpedicionProvInicial"
                  className="form-label"
                >
                  Fecha de expedición del certificado provisional inicial
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="fechaExpedicionProvInicial"
                  value={fechaExpedicionProvInicial}
                  onChange={onInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h6>
                  Se expide el presente Certificado de conformidad con del punto
                </h6>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    onChange={() =>
                      onInputChange({
                        target: { name: "puntoConformidad", value: "9.3" },
                      })
                    }
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    9.3
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    onChange={() =>
                      onInputChange({
                        target: { name: "puntoConformidad", value: "9.5" },
                      })
                    }
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    9.5
                  </label>
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="inputValidez" className="form-label">
                  El presente certificado es valido hasta...
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
