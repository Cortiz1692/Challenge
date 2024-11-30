import { Navigate, Route, Routes } from "react-router-dom";
import { LoadDocuments } from "../page/LoadDocuments";
import { LoadDocsProvider } from "../context/LoadDocsProvider";
import { LoadDocumentsDotacion } from "../page/LoadDocumentsDotacion";
import { RejectedDocumentation } from "../page/RejectedDocumentation";
import { RejectedDotation } from "../page/RejectedDotation";
import { LoadDotaProvider } from "../context/LoadDotaProvider";


export const LoadRoutes = () => {
  return (
    <LoadDocsProvider>
      <LoadDotaProvider>
        <Routes>
          {/* <Route path="/" element={<LoadDocuments />} /> */}
          <Route path="/cargarDocumentacion" element={<LoadDocuments />} />
          <Route
            path="cargarDocumentacion/rejected"
            element={<RejectedDocumentation />}
          />

          <Route path="/cargarDotacion" element={<LoadDocumentsDotacion />} />
          <Route
            path="cargarDotacion/rejected"
            element={<RejectedDotation />}
          />


          <Route path="/" element={<Navigate to="/cargarDocumentos" />} />
        </Routes>
      </LoadDotaProvider>
    </LoadDocsProvider>
  );
};
