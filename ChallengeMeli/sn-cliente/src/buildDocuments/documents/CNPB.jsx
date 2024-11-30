import React, { useContext, useState } from "react";
import { DocumentsContext } from "../context/DocumentsContext";
import { VIEW_DOC_URL_CNPB } from "./index.js";
import { DocumentActions } from "../components/DocumentActions";
import { TipoBuqueSelect } from "../components/TipoBuqueSelect.jsx";
import { CampoConvalidacion } from "../components/CampoConvalidacion.jsx";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

export const CNPB = () => {
  const { initCNPBForm, handlerDocSelectedForm, handlerAddDoc } =
    useContext(DocumentsContext);

  const [userForm, setUserForm] = useState(initCNPBForm);
  console.log("userForm", userForm);

  // Crear objeto de datos
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
    numeroOMICompania,
    planProteccionBuque,
    verificacionFecha,
    verificacion,
    validez,
    lugarExpedicion,
    fechaExpedicion,
    nrocertiAnterior,
    expte,
    nroMatricula,
    convalidaciones: {
      1: { fechaInicio: inicioVeriUno, fechaFin: FinVeriUno },
    },
    veriAdicionalUno,
    veriAdicionalDos,
    veriAdicionalTres,
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
    const VIEW_DOC = `${VIEW_DOC_URL_CNPB}${certificado}`;
    window.open(VIEW_DOC, "_blank");
  };

  return (
    <div className="container">
      <form id="myForm" onSubmit={(e) => e.preventDefault()}>
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="card p-4">
            <div className="mb-2 ">
              <h1>Certificado Nacional de Protección del Buque</h1>
              <div className="mb-2">
                <label htmlFor="inputCertificado" className="form-label">
                  N° del Certificado anterior si lo tiene
                </label>
                <input
                  type="number"
                  id="inputnrocertiAnterior"
                  className="form-control"
                  placeholder="N° certificado anterior"
                  name="nrocertiAnterior"
                  value={nrocertiAnterior}
                  onChange={onInputChange}
                  onWheel={(e) => e.target.blur()}
                />
              </div>
              <div className="mb-4">
                <NavLink
                  className={`btn btn-info btn-sm ${
                    !nrocertiAnterior ? "disabled" : ""
                  }`}
                  to={
                    nrocertiAnterior
                      ? `/documentos/cargar/inspecciones/${nrocertiAnterior}`
                      : "#"
                  }
                >
                  Cargar convalidaciones existentes
                </NavLink>
              </div>
              <label htmlFor="inputCertificado" className="form-label">
                N° del nuevoCertificado
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
              <label htmlFor="inputExpte" className="form-label">
                N° del Expte.
              </label>
              <input
                type="text"
                id="inputExpte"
                className="form-control"
                placeholder="N° de Expte. vinculado al presente certificado"
                name="expte"
                value={expte}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>
            <div className="mb-2 ">
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
                <label className="form-check-label" htmlFor="flexRadioDefault1">
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
                      target: { name: "puntoConformidad", value: "9.4" },
                    })
                  }
                  required
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  9.4
                </label>
              </div>
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
              <label htmlFor="inputNat" className="form-label">
                N.A.T
              </label>
              <input
                type="number"
                id="inputNat"
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
              <label htmlFor="inputNroImo" className="form-label">
                Nro Omi
              </label>
              <input
                type="text"
                id="inputNroImo"
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
              <label htmlFor="inputIdCompania" className="form-label">
                Nro identificacion de la compania
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
            <div className="mb-2">
              <label htmlFor="planProteccion" className="form-label">
                Plan de protección del Buque
              </label>
              <select
                id="planProteccion"
                autoComplete="planProteccion"
                name="planProteccionBuque"
                value={planProteccionBuque}
                onChange={onInputChange}
                className="form-select"
                required
              >
                <option>Plan de protección del Buque</option>
                <option value="aprobado">aprobado</option>
                <option value="revisado">revisado</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="verificacionFecha" className="form-label">
                Fecha de la verificación
              </label>
              <input
                type="date"
                className="form-control"
                id="verificacionFecha"
                name="verificacionFecha"
                value={verificacionFecha}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="verificacion" className="form-label">
                verificacion
              </label>
              <select
                id="verificacion"
                autoComplete="verificacion"
                name="verificacion"
                value={verificacion}
                onChange={onInputChange}
                className="form-select"
                required
              >
                <option>Verificacion...</option>
                <option value="Inicial">Inicial</option>
                <option value="De renovación">De renovación</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="inputValidez" className="form-label">
                Validez
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
            <h5>Convalidaciones</h5>

            <div className="mb-2">
              <CampoConvalidacion
                etiqueta="VERIFICACIÓN INTERMEDIA"
                valorInicial={{
                  fechaInicio: inicioVeriUno,
                  fechaFin: FinVeriUno,
                }}
                onCambiar={({ fechaInicio, fechaFin }) =>
                  setUserForm({
                    ...userForm,
                    convalidaciones: {
                      ...userForm.convalidaciones,
                      1: { fechaInicio, fechaFin },
                    },
                  })
                }
              />
            </div>
            <div className="mb-2">
              <h6>VERIFICACION ADICIONAL</h6>
              <label htmlFor="veriAdicionalUno" className="form-label">
                Antes del :
              </label>
              <input
                type="date"
                className="form-control"
                id="veriAdicionalUno"
                name="veriAdicionalUno"
                value={veriAdicionalUno}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-2">
              <h6>VERIFICACION ADICIONAL</h6>
              <label htmlFor="veriAdicionalDos" className="form-label">
                Antes del :
              </label>
              <input
                type="date"
                className="form-control"
                id="veriAdicionalDos"
                name="veriAdicionalDos"
                value={veriAdicionalDos}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-2">
              <h6>VERIFICACION ADICIONAL</h6>
              <label htmlFor="veriAdicionalTres" className="form-label">
                Antes del :
              </label>
              <input
                type="date"
                className="form-control"
                id="veriAdicionalTres"
                name="veriAdicionalTres"
                value={veriAdicionalTres}
                onChange={onInputChange}
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
