import React, { useContext, useState } from "react";
import { DocumentsContext } from "../context/DocumentsContext";
import { VIEW_DOC_URL_CIPB } from "./index.js";
import { DocumentActions } from "../components/DocumentActions";
import { TipoBuqueSelect } from "../components/TipoBuqueSelect.jsx";
import { CampoConvalidacion } from "../components/CampoConvalidacion.jsx";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

export const CIPB = () => {
  const { initCIPBForm, handlerDocSelectedForm, handlerAddDoc } =
    useContext(DocumentsContext);

  const [userForm, setUserForm] = useState(initCIPBForm);

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
    nroOMICompania,
    tipoVerificacion,
    fechaVerificacion,
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
    veriAdicionalCuatro,
    veriAdicionalCinco,
    veriAdicionalSeis,
    veriAdicionalSiete,
    veriAdicionalOcho,
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
    const VIEW_DOC = `${VIEW_DOC_URL_CIPB}${certificado}`;
    window.open(VIEW_DOC, "_blank");
  };

  return (
    <div className="container">
      <form id="myForm" onSubmit={(e) => e.preventDefault()}>
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="card p-4">
            <div className="mb-2 ">
              <h1 className="col-12 mb-4">
                Certificado Internacional de Protección del Buque
              </h1>
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
                className="form-control"
                id="inputCertificado"
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
            <div className="mb-2 ">
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
              <label htmlFor="inputNroOmi" className="form-label">
                Nro Omi
              </label>
              <input
                type="text"
                id="inputNroOmi"
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
                Nro identificacion de la compania
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="12345"
                id="inputIdCompania"
                name="nroOMICompania"
                value={nroOMICompania}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>
            <label htmlFor="vetidicacion" className="my-2">
              Tipo verificación
            </label>
            <div className="row">
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="verificacionInicial"
                    name="tipoVerificacion"
                    value="inicial"
                    checked={tipoVerificacion === "inicial"}
                    onChange={onInputChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="verificacionInicial"
                  >
                    Inicial
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tipoVerificacion"
                    id="verificacionRenovacion"
                    value="renovacion"
                    checked={tipoVerificacion === "renovacion"}
                    onChange={onInputChange}
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor="verificacionRenovacion"
                  >
                    De renovación
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-2 ">
              <label htmlFor="inputFechaVerificacion" className="form-label">
                Fecha de la verificación
              </label>
              <input
                type="date"
                className="form-control"
                id="inputFechaVerificacion"
                placeholder="fecha de verificación"
                name="fechaVerificacion"
                value={fechaVerificacion}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2 ">
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
            <div className="mb-2 ">
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
                etiqueta="VERIFICACION INTERMEDIA"
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
            <div className="mb-2">
              <h6>VERIFICACION ADICIONAL</h6>
              <label htmlFor="veriAdicionalCuatro" className="form-label">
                Antes del :
              </label>
              <input
                type="date"
                className="form-control"
                id="veriAdicionalCuatro"
                name="veriAdicionalCuatro"
                value={veriAdicionalCuatro}
                onChange={onInputChange}
                
              />
            </div>

            <div className="mb-2">
              <h6>VERIFICACION ADICIONAL</h6>
              <label htmlFor="veriAdicionalCinco" className="form-label">
                Antes del :
              </label>
              <input
                type="date"
                className="form-control"
                id="veriAdicionalCinco"
                name="veriAdicionalCinco"
                value={veriAdicionalCinco}
                onChange={onInputChange}
                
              />
            </div>
            <div className="mb-2">
              <h6>VERIFICACION ADICIONAL</h6>
              <label htmlFor="veriAdicionalSeis" className="form-label">
                Antes del :
              </label>
              <input
                type="date"
                className="form-control"
                id="veriAdicionalSeis"
                name="veriAdicionalSeis"
                value={veriAdicionalSeis}
                onChange={onInputChange}
                
              />
            </div>
            <div className="mb-2">
              <h6>VERIFICACION ADICIONAL</h6>
              <label htmlFor="veriAdicionalSiete" className="form-label">
                Antes del :
              </label>
              <input
                type="date"
                className="form-control"
                id="veriAdicionalSiete"
                name="veriAdicionalSiete"
                value={veriAdicionalSiete}
                onChange={onInputChange}
                
              />
            </div>

            <div className="mb-2">
              <h6>VERIFICACION ADICIONAL</h6>
              <label htmlFor="veriAdicionalOcho" className="form-label">
                Antes del :
              </label>
              <input
                type="date"
                className="form-control"
                id="veriAdicionalOcho"
                name="veriAdicionalOcho"
                value={veriAdicionalOcho}
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
