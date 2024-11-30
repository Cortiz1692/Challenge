import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../ui/layout/Navbar";
import { UserProvider } from "../users/context/UserProvider";
import { UsersPage } from "../users/pages/UsersPage";
import { AuthContext } from "../auth/context/AuthContext";
import { useContext } from "react";
import { SolicitudesRoutes } from "../Solicitudes/routes/SolicitudesRoutes";
import { BuildDocsRoutes } from "../buildDocuments/routes/BuildDocsRoutes";
import { LoadRoutes } from "../loadDocuments/routes/LoadRoutes";
import { ProfilePage } from "../users/pages/ProfilePage";
import { UserNotification } from "../users/pages/UserNotification";
import { EstadisticPage } from "../reports/pages/EstadisticPage";
import { ReportProvider } from "../reports/context/ReportProvider";

export const UserRoutes = () => {
  const { login } = useContext(AuthContext);
  return (
    <>
      <UserProvider>
        <ReportProvider>
          <Navbar />
          <Routes>
            <Route path="users" element={<UsersPage />} />
            <Route path="users/page/:page" element={<UsersPage />} />
            <Route path="users/profile" element={<ProfilePage />} />
            <Route path="users/notifications" element={<UserNotification />} />
            <Route path="users/reports" element={<EstadisticPage />} />

            <Route path="/*" element={<SolicitudesRoutes />} />
            <Route path="/documentos/*" element={<BuildDocsRoutes />} />
            <Route path="/cargarDocumentos/*" element={<LoadRoutes />} />

            <Route path="/" element={<Navigate to="/users" />} />
          </Routes>
        </ReportProvider>
      </UserProvider>
    </>
  );
};
