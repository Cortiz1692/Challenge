import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { Sidebar } from "../components/Sidebar";

const roleLinks = {
  admin: [
    { to: "/users", label: "Usuarios" },
    { to: "/documentos", label: "División Control de Gestión" },
    {
      to: "/cargarDocumentos/cargarDocumentacion",
      label: "División Documentación",
    },
    { to: "/cargarDocumentos/cargarDotacion", label: "División Navegación" },
    { to: "/solicitudesPending", label: "Pendientes" },
    { to: "/solicitudesSigned", label: "Firmadas" },
    
    // { to: "/cargarDocumentos/estadisticas", label: "Estadisticas" },
    
  ],
  firmante: [
    { to: "/users", label: "Usuarios" },
    { to: "/solicitudesPending", label: "Pendientes" },
    { to: "/solicitudesSigned", label: "Firmadas" },
  ],
  controlGestionEmpresas: [
    { to: "/users", label: "Usuarios" },
    { to: "/documentos", label: "División Control de Gestión" },
    { to: "/solicitudesSigned", label: "Firmadas" },
  ],
  documentacion: [
    { to: "/users", label: "Usuarios" },
    {
      to: "/cargarDocumentos/cargarDocumentacion",
      label: "División Documentación",
    },
    { to: "/solicitudesSigned", label: "Firmadas" },
  ],
  dotacion: [
    { to: "/users", label: "Usuarios" },
    { to: "/cargarDocumentos/cargarDotacion", label: "División Navegación" },
    { to: "/solicitudesSigned", label: "Firmadas" },
  ],
  default: [
    { to: "/users", label: "Usuarios" },
    { to: "/solicitudesPending", label: "Pendientes" },
    { to: "/solicitudesSigned", label: "Firmadas" },
  ],
};

const getLinksForRole = (login) => {
  if (login.isAdmin) return roleLinks.admin;
  if (login.isControlGestionEmpresas) return roleLinks.controlGestionEmpresas;
  if (login.isDocumentacion) return roleLinks.documentacion;
  if (login.isDotacion) return roleLinks.dotacion;
  if (login.isFirmanteDivision) return roleLinks.firmante;

  return roleLinks.default;
};

export const Navbar = () => {
  const { login, handlerLogout } = useContext(AuthContext);

  const links = getLinksForRole(login);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <Sidebar />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {links.map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink className="nav-link" to={to}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavLogout"
        >
          <span className="nav-item nav-link text-primary mx-3">
            {login.user?.username}
          </span>
          <button onClick={handlerLogout} className="btn btn-outline-success">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
