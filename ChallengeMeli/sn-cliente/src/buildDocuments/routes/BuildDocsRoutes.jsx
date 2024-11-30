import { Navigate, Route, Routes } from "react-router-dom";
import { BuildDocuments } from "../pages/BuildDocuments";
import { SelectDocument } from "../pages/SelectDocument";
import { DocumentsProvider } from "../context/DocumentsProvider";
import { RejectedDocsPage } from "../pages/RejectedDocsPage ";
import { LoadInspection } from "../pages/LoadInspection";
import { LoadInspectAditional } from "../pages/LoadInspectAditional";

export const BuildDocsRoutes = () => {
  return (
    <DocumentsProvider>
    <Routes>
        <Route path="/" element={<BuildDocuments />} />

        <Route path="/documentos/select/:type" element={<SelectDocument/>}/> 

        <Route path="/cargar/inspecciones/:nrocertiAnterior" element={<LoadInspection/>}/> 

        <Route path="/documentos/rejected" element={<RejectedDocsPage />} />

        <Route path="/documentos/adicionales" element={<LoadInspectAditional />} />
       
        <Route path="/" element={<Navigate to="/documentos" />} />
      </Routes>
    </DocumentsProvider>
  );
};
