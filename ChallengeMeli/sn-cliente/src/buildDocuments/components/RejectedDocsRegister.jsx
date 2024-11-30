// RejectedDocsRegister.js
import React, { useState, useEffect, useContext } from "react";
import { DocumentsContext } from "../context/DocumentsContext";
import { RejectList } from "./RejectList";

export const RejectedDocsRegister = () => {
  const { getDocsRejected, rejectDocs } = useContext(DocumentsContext);


  useEffect(() => {
    getDocsRejected();
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
                <RejectList documents={rejectDocs} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
