import { Chart } from "./Chart";
import { CardInfoDivDoc } from "./CardInfoDivDoc";
import { DocumentSigningOverview } from "./DocumentSigningOverview";
import { BarChart } from "./BarChart";
import { ProgressTable } from "./ProgressTable";

export const EstadisticScreen = ({ state }) => {
  console.log("state:", state);

  if (!state) {
    return <p>No se encontraron datos.</p>;
  }

  const data = state.processedByMonth || [];
  const signedCount = 1234; // Puedes ajustar esto según tus datos
  const pendingCount = 567; // Puedes ajustar esto según tus datos
  const inProcessCount = 89; // Puedes ajustar esto según tus datos
  const completedOnTimePercentage = "85%";
  const averageSigningTime = "2.5 days";

  const registroDocsSigned = state.signedDocuments ? state.signedDocuments.length : 0;
  const registroDocsPending = state.pendingDocuments ? state.pendingDocuments.length : 0;
  const tramiteDocs = state.pendingDocuments || [];

  const formatDate = (dateString) => {
    const [date] = dateString.split("T");
    return date;
  };

  return (
    <>
      <div className="row my-4 ">
        <div className="row justify-content-center">
          <CardInfoDivDoc
            title="Pendientes"
            value={`Total: ${registroDocsPending}`}
            footerText="Documentos a firmar"
            iconBgClass="bg-success"
          />
          <CardInfoDivDoc
            title="Firmadas"
            value={`Total: ${registroDocsSigned}`}
            footerText="Documentos firmados"
            iconBgClass="bg-primary"
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-10 mb-4">
          <h2>Progreso de Tramitación de documento</h2>
          <ProgressTable
            documents={tramiteDocs.map((doc) => ({
              ...doc,
              fechaGenerado: formatDate(doc.fechaGenerado),
            }))}
          />
        </div>
      </div>
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6 mb-4">
            <Chart
              signedCount={signedCount}
              pendingCount={pendingCount}
              inProcessCount={inProcessCount}
            />
          </div>
          <div className="col-md-6 mb-4">
            <DocumentSigningOverview
              signedCount={signedCount}
              pendingCount={pendingCount}
              inProcessCount={inProcessCount}
              completedOnTimePercentage={completedOnTimePercentage}
              averageSigningTime={averageSigningTime}
            />
          </div>
        </div>
      </div>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-7 mb-4">
            <h2>Documentos procesados por mes</h2>
            <BarChart data={data} />
          </div>
        </div>
      </div>
    </>
  );
};
