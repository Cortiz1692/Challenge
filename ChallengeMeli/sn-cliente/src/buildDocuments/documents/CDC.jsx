//Certificado Demostrativo de Cumnplimiento
import React, { useContext, useState } from "react";
import { DocumentsContext } from "../context/DocumentsContext";
import { VIEW_DOC_URL_CDC } from "./index.js";
import { DocumentActions } from "../components/DocumentActions";
import { TipoBuqueSelect } from "../components/TipoBuqueSelect.jsx";
import { CampoConvalidacion } from "../components/CampoConvalidacion.jsx";
import { CheckboxList } from "../components/CheckboxList.jsx";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

export const CDC = () => {
  const { initCDCForm, handlerDocSelectedForm, handlerAddDoc } =
    useContext(DocumentsContext);

  const [userForm, setUserForm] = useState(initCDCForm);
  const [certiAnterior, setcertiAnterior] = useState("");

  console.log("userForm :", userForm);
  // Crear objeto de datos
  const {
    certificado,
    nombreCompania,
    direccionCompania,
    nroOMI,
    tipoBuque,
    validez,
    fechaVerificacion,
    lugarExpedicion,
    fechaExpedicion,
    nrocertiAnterior,
    expte,
    //nroMatricula,
    convalidaciones: {
      1: { fechaInicio: inicioVeriUno, fechaFin: FinVeriUno },
      2: { fechaInicio: inicioVeriDos, fechaFin: FinVeriDos },
      3: { fechaInicio: inicioVeriTres, fechaFin: FinVeriTres },
      4: { fechaInicio: inicioVeriCuatro, fechaFin: FinVeriCuatro },
    },
    veriAdicionalUno,
  } = userForm;

  const handleTipoBuqueChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setUserForm({
        ...userForm,
        tipoBuque: [...userForm.tipoBuque, parseInt(name)], // Convertir el nombre a número
      });
    } else {
      setUserForm({
        ...userForm,
        tipoBuque: userForm.tipoBuque.filter(
          (tipoBuqueId) => tipoBuqueId !== parseInt(name) // Convertir el nombre a número
        ),
      });
    }
  };

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
    const VIEW_DOC = `${VIEW_DOC_URL_CDC}${certificado}`;
    window.open(VIEW_DOC, "_blank");
  };

  return (
    <div className="container mt-5">
      <form id="myForm" onSubmit={(e) => e.preventDefault()}>
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="card p-4">
            <div className="mb-2 ">
              <h1 className="col-12 mb-4">
                Certificado Demostrativo de Cumplimiento
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
                placeholder="N° Certificado"
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
            {/* <div className="mb-2">
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
            </div> */}
            <div className="mb-2">
              <label htmlFor="inputnombreCompania" className="form-label">
                Nombre de compañia
              </label>
              <input
                type="text"
                className="form-control"
                id="inputnombreCompania"
                placeholder="Nombre de compañia"
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
                className="form-control"
                id="inputNroOmi"
                placeholder="12345"
                name="nroOMI"
                value={nroOMI}
                onChange={onInputChange}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>
            {/* <div className="mb-2">
              <TipoBuqueSelect
                tipoBuque="tipoBuque"
                name="tipoBuque"
                value={tipoBuque}
                onChange={onInputChange}
                required
              />
            </div> */}

            <CheckboxList
              tipoBuqueOptions={[
                { id: 1, name: "BUQUE DE PASAJE" },
                { id: 2, name: "NAVE DE PASAJE DE GRAN VELOCIDAD" },
                { id: 3, name: "GRANELERO" },
                { id: 4, name: "PETROLERO" },
                { id: 5, name: "QUIMIQUERO" },
                { id: 6, name: "GASERO" },
                { id: 7, name: "UNIDAD MOVIL DE PERFORACION MAR ADENTRO" },
                { id: 8, name: "BUQUE DE CARGA DISTINTO A LOS ANTERIORES" },
                { id: 9, name: "PESQUERO" },
              ]}
              selectedTipoBuques={userForm.tipoBuque}
              onTipoBuqueChange={handleTipoBuqueChange}
            />

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
            <div className="mb-2">
              <label htmlFor="inputLugarExpedicion" className="form-label">
                Expedido en...
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLugarExpedicion"
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
            <h5>Convalidaciones</h5>

            <div className="mb-2">
              <CampoConvalidacion
                etiqueta="1 VERIFICACION ANUAL"
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
              <CampoConvalidacion
                etiqueta="2 VERIFICACION ANUAL"
                valorInicial={{
                  fechaInicio: inicioVeriDos,
                  fechaFin: FinVeriDos,
                }}
                onCambiar={({ fechaInicio, fechaFin }) =>
                  setUserForm({
                    ...userForm,
                    convalidaciones: {
                      ...userForm.convalidaciones,
                      2: { fechaInicio, fechaFin },
                    },
                  })
                }
              />
            </div>
            <div className="mb-2">
              <CampoConvalidacion
                etiqueta="3 VERIFICACION ANUAL"
                valorInicial={{
                  fechaInicio: inicioVeriTres,
                  fechaFin: FinVeriTres,
                }}
                onCambiar={({ fechaInicio, fechaFin }) =>
                  setUserForm({
                    ...userForm,
                    convalidaciones: {
                      ...userForm.convalidaciones,
                      3: { fechaInicio, fechaFin },
                    },
                  })
                }
              />
            </div>
            <div className="mb-2">
              <CampoConvalidacion
                etiqueta="4 VERIFICACION ANUAL"
                valorInicial={{
                  fechaInicio: inicioVeriCuatro,
                  fechaFin: FinVeriCuatro,
                }}
                onCambiar={({ fechaInicio, fechaFin }) =>
                  setUserForm({
                    ...userForm,
                    convalidaciones: {
                      ...userForm.convalidaciones,
                      4: { fechaInicio, fechaFin },
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
