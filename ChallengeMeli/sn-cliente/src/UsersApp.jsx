import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./auth/context/AuthContext";
import { LoginPage } from "./auth/pages/LoginPage";
import { UserRoutes } from "./router/UserRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const UsersApp = () => {
  const { login } = useContext(AuthContext);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {login.isAuth ? (
          <Route path="/*" element={<UserRoutes />} />
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </QueryClientProvider>
  );
};
