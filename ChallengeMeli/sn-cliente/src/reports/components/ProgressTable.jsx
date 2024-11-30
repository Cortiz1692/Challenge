export const ProgressTable = ({ documents }) => {
  const getRowClass = (startDate) => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const timeDiff = Math.floor((currentDate - start) / (1000 * 60 * 60 * 24)); // Calculate difference in days

    if (timeDiff >= 6) {
      return "table-danger"; // Red
    } else if (timeDiff <= 3) {
      return "table-success"; // Green
    } else if (timeDiff >= 4 && timeDiff <= 5) {
      return "table-warning"; // Yellow
    } else {
      return ""; // Default color (no class)
    }
  };

  const calculateTimeProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const timeDiff = Math.floor((end - start) / (1000 * 60 * 60 * 24)); // Difference in days

    return `${timeDiff} días`;
  };

  return (
    <>
      <div className="alert alert-info">
        <strong>Colores de la tabla:</strong>
        <ul>
          <li className="text-success">
            Verde: Tiempo de tramitación no ha superado los 3 días, el tramite se inició recientemente
          </li>
          <li className="text-warning">
            Amarillo: Tiempo de tramitación supero los 3 dias, la tabla se pondrá en precaución
          </li>
          <li className="text-danger">
            Rojo: El tiempo de tramitación supero los 5 días, se pondrá en alerta 
          </li>
        </ul>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Documento</th>
              <th scope="col">Matrícula</th>
              <th scope="col">Nombre del buque</th>
              <th scope="col">Operador</th>
              <th scope="col">Fecha de inicio</th>
              <th scope="col">Tiempo de tramitación</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index} className={getRowClass(doc.fechaGenerado)}>
                <th scope="row">{index + 1}</th>
                <td>{doc.detalleDocumento.tipoDocumento}</td>
                <td>{doc.matricula}</td>
                <td>{doc.nombreBuque}</td>
                <td>{doc.usuario}</td>
                <td>{doc.fechaGenerado}</td>
                <td>{calculateTimeProgress(doc.fechaGenerado, doc.endDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
