import { Navigate, Route, Routes } from "react-router-dom";
import { DocsProvider } from "../context/DocsProvider";
import { DocsViewPdf } from "../components/view/DocsViewPdf";
import { SolicitudesPending } from "../pages/SolicitudesPending";
import { DocumentacionProvider } from "../context/DocumentacionProvider";
import { DotacionProvider } from "../context/DotacionProvider";
import { SolicitudesSigned } from "../pages/SolicitudesSigned";
import { EmailProvider } from "../context/EmailProvider";

export const SolicitudesRoutes = () => {
  return (
    <EmailProvider>
      <DocsProvider>
        <DocumentacionProvider>
          <DotacionProvider>
            <Routes>
              <Route
                path="/solicitudesPending"
                element={<SolicitudesPending />}
              />
              {/* <Route
                path="/solicitudesPending/page/:page"
                element={<SolicitudesPending />}
              /> */}
              <Route
                path="/solicitudesSigned"
                element={<SolicitudesSigned />}
              />

              <Route path="/ver-pdf" element={<DocsViewPdf />} />
              <Route path="/" element={<Navigate to="/solicitudes" />} />
            </Routes>
          </DotacionProvider>
        </DocumentacionProvider>
      </DocsProvider>
    </EmailProvider>
  );
};
