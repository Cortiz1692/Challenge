import React from "react";
import { NavLink } from "react-router-dom";

export const SimpleWidget = ({ type, title, icon }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{icon}</p>
          <NavLink className={"btn btn-primary"}
          to={'documentos/select/' + type}>
            Build
          </NavLink>
        </div>
      </div>
    </div>
  );
};
