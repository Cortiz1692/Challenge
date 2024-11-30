import React, {useEffect, useContext } from "react";
import { RejectListDocumentation } from "../components/RejectListDocumentation";
import { LoadDocContext } from "../context/LoadDocContext";

export const RejectedDocumentation = () => {
  const { getDocuRejected, rejectDocs } = useContext(LoadDocContext);

  useEffect(() => {
    getDocuRejected();
  }, []);

  return (
    <>
      <div className="container my-4">
        <h2>Documentos para corregir</h2>
        <div className="row">
          <div className="col">
            {rejectDocs.length === 0 ? (
              <div className="alert alert-warning">
                No hay documentos para corregir.
              </div>
            ) : (
              <>
                <RejectListDocumentation documents={rejectDocs} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
