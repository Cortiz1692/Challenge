import React, { useContext, useState } from "react";
import { DocumentsContext } from "../context/DocumentsContext";
import { VIEW_DOC_URL_DPC } from "./index.js";
import { DocumentActions } from "../components/DocumentActions.jsx";
import { TipoBuqueSelect } from "../components/TipoBuqueSelect.jsx";
import { CheckboxList } from "../components/CheckboxList.jsx";
import Swal from "sweetalert2";

export const DPC = () => {
  const { initDPCForm, handlerDocSelectedForm, handlerAddDoc } =
    useContext(DocumentsContext);

  const [userForm, setUserForm] = useState(initDPCForm);
  // Crear objeto de datos
  const {
    certificado,
    nombreCompania,
    direccionCompania,
    nroOMICompania,
    tipoBuque,
    validez,
    lugarExpedicion,
    fechaExpedicion,
    //nroMatricula,
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
    const VIEW_DOC = `${VIEW_DOC_URL_DPC}${certificado}`;
    window.open(VIEW_DOC, "_blank");
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };
  return (
    <div className="container mt-5">
      <form id="myForm" onSubmit={(e) => e.preventDefault()}>
        <div className="container d-flex justify-content-center align-items-center ">
          <div className="card p-4">
            <div className="mb-2 ">
              <h1 className="col-12 mb-4">
                Documento Provisional de Cumplimiento
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
              <label htmlFor="inputNombreCompania" className="form-label">
                Nombre Compañia
              </label>
              <input
                type="text"
                id="inputNombreCompania"
                className="form-control"
                placeholder="Nombre de la compañia"
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
                name="nroOMICompania"
                value={nroOMICompania}
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
