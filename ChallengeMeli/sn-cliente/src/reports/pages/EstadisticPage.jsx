import { useContext, useEffect, useState } from "react";
import { EstadisticScreen } from "../components/EstadisticScreen";
import { ReportContext } from "../context/ReportContext";

export const EstadisticPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { state, getDocSigned, getDocsPending, getDocumentProcesByMonth } = useContext(ReportContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getDocSigned(),
          getDocsPending(),
          getDocumentProcesByMonth(),
        ]);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getDocSigned, getDocsPending, getDocumentProcesByMonth]);

  if (error) return <p>Error al cargar los datos.</p>;

  return (
    <>
      <h2 className="row justify-content-center">
        Estadísticas de documentos tramitados por División Documentación
      </h2>

      {loading ? <p>Loading...</p> : <EstadisticScreen state={state} />}
    </>
  );
};
