import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PortalRoutes } from './portalInmobiliario/router/PortalRoutes';

export const PoisApp = () => {
  return (
    <Routes>
      <Route path="/*" element={<PortalRoutes />} />
    </Routes>
  );
};
