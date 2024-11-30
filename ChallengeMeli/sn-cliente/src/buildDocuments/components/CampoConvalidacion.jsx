import React, { useState } from 'react';

export const CampoConvalidacion = ({ etiqueta, valorInicial, onCambiar }) => {
  const [fechaInicio, setFechaInicio] = useState(valorInicial.fechaInicio);
  const [fechaFin, setFechaFin] = useState(valorInicial.fechaFin);

  const manejarFechaInicioCambio = (event) => {
    const nuevaFechaInicio = event.target.value;
    setFechaInicio(nuevaFechaInicio);
    onCambiar({ fechaInicio: nuevaFechaInicio, fechaFin });
  };

  const manejarFechaFinCambio = (event) => {
    const nuevaFechaFin = event.target.value;
    setFechaFin(nuevaFechaFin);
    onCambiar({ fechaInicio, fechaFin: nuevaFechaFin });
  };

  return (
    <div className="mb-2">
      <h6 className="form-label">{etiqueta}:</h6>
      <div className='mb-2'>
      <label className="form-label">Ingrese dentro de que fechas se podra hacer la verificación</label>
      </div>
      <div className="d-flex align-items-center">
        <input
          type="date"
          value={fechaInicio}
          onChange={manejarFechaInicioCambio}
          className="form-control mx-1"
        />
        <input
          type="date"
          value={fechaFin}
          onChange={manejarFechaFinCambio}
          className="form-control mx-1"
        />
      </div>
    </div>
  );
};


