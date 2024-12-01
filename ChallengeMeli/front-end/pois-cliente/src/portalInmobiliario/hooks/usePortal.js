import { useReducer } from 'react';
import portalReducer from '../reducers/portalReducer';
import { findAllProperties, getPoisNearProperty } from '../services/service';

const initialState = {
  properties: [],
  pois: [],
  selectedProperty: null,
};

export const usePortal = () => {
  const [state, dispatch] = useReducer(portalReducer, initialState);

  const getProperties = async () => {
    try {
      const result = await findAllProperties();
      dispatch({
        type: 'loadingProperties',
        payload: result,
      });

      if (result.length > 0) {
        const selectedProperty = result[0];
        dispatch({
          type: 'setSelectedProperty',
          payload: selectedProperty
        });
        const pois = await getPoisNearProperty(selectedProperty.location.coordinates[1], selectedProperty.location.coordinates[0]);
        dispatch({
          type: 'loadingPois',
          payload: pois
        });
      }
    } catch (error) {
      console.error('Error al obtener las propiedades:', error);
      throw error;
    }
  };

  return {
    ...state,
    getProperties,
    dispatch, // Asegúrate de incluir dispatch aquí
  };
};
