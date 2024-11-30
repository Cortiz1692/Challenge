import React, {useEffect, useContext } from "react";
import { RejectedListDotation } from "../components/RejectedListDotation";
import { LoadDotaContext } from "../context/LoadDotaContext";

export const RejectedDotation = () => {

  const { getDotaRejected, rejectDota } = useContext(LoadDotaContext);

  useEffect(() => {
    getDotaRejected();
  }, []);

  return (
    <>
      <div className="container my-4">
        <h2>Documentos para corregir</h2>
        <div className="row">
          <div className="col">
            {rejectDota.length === 0 ? (
              <div className="alert alert-warning">
                No hay documentos para corregir.
              </div>
            ) : (
              <>
                <RejectedListDotation documents={rejectDota} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};