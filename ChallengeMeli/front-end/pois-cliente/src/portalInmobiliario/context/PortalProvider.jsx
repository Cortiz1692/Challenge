import React, { createContext } from 'react';
import { usePortal } from '../hooks/usePortal';

export const PortalContext = createContext();

export const PortalProvider = ({ children }) => {
  const { properties, pois, selectedProperty, getProperties, dispatch } = usePortal();

  return (
    <PortalContext.Provider value={{ properties, pois, selectedProperty, getProperties, dispatch }}>
      {children}
    </PortalContext.Provider>
  );
};
