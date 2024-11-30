import React, { useContext, useEffect, useState } from "react";
import { DocumentsContext } from "../context/DocumentsContext";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { TipoCertificatesSelect } from "./TipoCertificatesSelect";

export const LoadInspectionForm = () => {
  const { nrocertiAnterior } = useParams();
  const navigate = useNavigate();

  const { handlerAddInspection } = useContext(DocumentsContext);
  const { login } = useContext(AuthContext);

  const [inspectionForm, setInspectionForm] = useState({
    dni: login.user?.username || "",
    fechaConvalidacion: "",
    lugarConvalidacion: "",
    inspector: "",
    idTipoDocumento: "",
    idCertificado: "",
    oldNroCertificado: nrocertiAnterior || "",
    nroConvalidacion: "",
    tipoConvalidacion: "",
    expedienteGde: "",
  });

  const {
    dni,
    fechaConvalidacion,
    lugarConvalidacion,
    inspector,
    idTipoDocumento,
    idCertificado,
    oldNroCertificado,
    nroConvalidacion,
    tipoConvalidacion,
    expedienteGde,
  } = inspectionForm;
  console.log('inspectionForm :', inspectionForm);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setInspectionForm({
      ...inspectionForm,
      [name]: value,
    });
  };

  const submitInspection = async () => {
    const form = document.getElementById("inspectionForm");
  
    // Verificar si el formulario es válido
    if (form.checkValidity()) {
      try {
        // Llamar a la función que envía los datos
        await handlerAddInspection(inspectionForm);
      } catch (error) {
        // El hook ya maneja los errores, así que no necesitas hacer nada aquí.
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Formulario inválido!",
        text: "Revisa si completaste todos los campos del formulario.",
        footer: '<a href="#">Volver al formulario?</a>',
      });
    }
  };


  const handleGoBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <div className="container mt-5">
      <form id="inspectionForm" onSubmit={(e) => e.preventDefault()}>
        <div className="container d-flex justify-content-center align-items-center">
          <div className="card p-4">
            <h1 className="col-12 mb-4">Formulario de Inspección</h1>
            <div className="mb-2">
              <label htmlFor="inputDniUsuario" className="form-label">
                DNI Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="inputDniUsuario"
                name="dni"
                value={dni}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputIdCertificado" className="form-label">
                Nvo. Nº Certificado
              </label>
              <input
                type="text"
                className="form-control"
                id="inputIdCertificado"
                name="idCertificado"
                value={idCertificado}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputIdCertificadoNvo" className="form-label">
               Nº Certificado anterior
              </label>
              <input
                type="text"
                className="form-control"
                id="inputIdCertificadoOld"
                name="oldNroCertificado"
                value={oldNroCertificado}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputFechaConvalidacion" className="form-label">
                Fecha de Convalidación
              </label>
              <input
                type="date"
                className="form-control"
                id="inputFechaConvalidacion"
                name="fechaConvalidacion"
                value={fechaConvalidacion}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputLugarConv" className="form-label">
                Lugar de Convalidación
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLugarConv"
                name="lugarConvalidacion"
                value={lugarConvalidacion}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="inputInspector" className="form-label">
                Inspector
              </label>
              <input
                type="text"
                className="form-control"
                id="inputInspector"
                name="inspector"
                value={inspector}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <div className="mb-2">
                <TipoCertificatesSelect
                  name="idTipoDocumento"
                  value={idTipoDocumento} // Este valor debe estar en el estado del formulario
                  onChange={onInputChange} // Manejador de cambios
                  required
                />
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="inputTipoConvalidacion" className="form-label">
                Tipo de Convalidación
              </label>
              <select
                className="form-select"
                id="inputTipoConvalidacion"
                name="tipoConvalidacion"
                value={tipoConvalidacion} // El valor seleccionado será el número correspondiente
                onChange={onInputChange}
                required
              >
                <option value="">Seleccionar Tipo de Convalidación</option>
                <option value="1">VERIFICACION ANUAL</option>
                <option value="2">VERIFICACION ADICIONAL</option>
                <option value="3">VERIFICACION INTERMEDIA</option>
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="inputNroConvalidacion" className="form-label">
                N° Convalidación
              </label>
              <select
                className="form-select"
                id="inputNroConvalidacion"
                name="nroConvalidacion"
                value={nroConvalidacion} // El valor seleccionado será el número correspondiente
                onChange={onInputChange}
                required
              >
                <option value="">Seleccionar N° Convalidación</option>
                <option value="1">Convalidación 1</option>
                <option value="2">Convalidación 2</option>
                <option value="3">Convalidación 3</option>
                <option value="4">Convalidación 4</option>
                <option value="5">Convalidación 5</option>
                <option value="6">Convalidación 6</option>
                <option value="7">Convalidación 7</option>
                <option value="8">Convalidación 8</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="inputExpedienteGde" className="form-label">
                Expediente GDE
              </label>
              <input
                type="text"
                className="form-control"
                id="inputExpedienteGde"
                name="expedienteGde"
                value={expedienteGde}
                onChange={onInputChange}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitInspection}
              >
                Enviar Inspección
              </button>

              <button
                type="button"
                className="btn btn-success "
                onClick={handleGoBack}
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
