import { useContext, useEffect } from "react";
import { DocumentsContext } from "../context/DocumentsContext";
import { AditionalList } from "../components/AditionalList";

export const LoadInspectAditional = () => {
  const { getDocAditionals, aditionalDoc } = useContext(DocumentsContext);

  useEffect(() => {
    getDocAditionals();
  }, []);

  return (
    <div className="container my-4">
      <h2>Solicitudes de Inspección Adicional</h2>
      <div className="row">
        <div className="col">
          {aditionalDoc.length === 0 ? (
            <div className="alert alert-warning">
              No hay documentos para corregir.
            </div>
          ) : (
            <AditionalList aditionalDocs={aditionalDoc} />
          )}
        </div>
      </div>
    </div>
  );
};
