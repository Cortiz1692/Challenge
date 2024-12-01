import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PortalPage } from '../pages/PortalPage';
import { Navbar } from '../../ui/layout/Navbar';
import { PortalProvider } from '../context/PortalProvider';


export const PortalRoutes = () => {
  return (
    <>
      <PortalProvider>
        <Navbar />
        <Routes>
          <Route path="portal" element={<PortalPage />} />
          <Route path="/" element={<Navigate to="/portal" />} />
        </Routes>
      </PortalProvider>
    </>
  );
};
