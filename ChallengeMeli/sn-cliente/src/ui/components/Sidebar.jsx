import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import { EstadisticPage } from "../../reports/pages/EstadisticPage";
import { IoAppsSharp, IoHome, IoNotificationsSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";

export const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Menu
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dashboard of navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="m-4">
            <ul className="mb-4 list-unstyled">
              <li>
                <NavLink to="/users/profile"
                 className="text-decoration-none"
                 onClick={handleClose}>
                  <Button
                    variant="secondary"
                    className="d-flex align-items-center gap-3 text-white rounded-lg w-100 mb-2"
                  >
                    <ImProfile />
                    <p className="mb-0">Profile</p>
                  </Button>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="users/reports"
                  onClick={handleClose}
                  className="text-decoration-none"
                >
                  <Button
                    variant="primary"
                    className="d-flex align-items-center gap-3 text-white rounded-lg w-100 mb-2"
                  >
                    <IoHome />
                    <p className="mb-0">Dashboard</p>
                  </Button>
                </NavLink>
              </li>

              <li>
                <NavLink to="users/notifications" className="text-decoration-none"
                onClick={handleClose}>
                  <Button
                    variant="info"
                    className="d-flex align-items-center gap-3 text-white rounded-lg w-100 mb-2"
                  >
                    <IoNotificationsSharp />
                    <p className="mb-0">Notifications</p>
                  </Button>
                </NavLink>
              </li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
