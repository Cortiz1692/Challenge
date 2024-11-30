import { useEffect, useState } from 'react';
import { findAllDocumentsWithAditional } from './api'; // Asegúrate de importar correctamente esta función
import { updateStateAditional } from './api';

export const useAditionalDocs = () => {
  const [aditionalDocs, setAditionalDocs] = useState([]);
  
  const getDocAditionals = async () => {
    try {
      const result = await findAllDocumentsWithAditional();
      setAditionalDocs(result);
    } catch (error) {
      if (error.response?.status === 401) {
        handlerLogout();
      }
    }
  };

  const updateDocumentState = async (id, estado) => {
    try {
      await updateStateAditional({ id, estado });
      await getDocAditionals(); // Refresca los documentos después de actualizar el estado
    } catch (error) {
      console.error('Error al actualizar estado del documento:', error);
    }
  };

  useEffect(() => {
    getDocAditionals();
  }, []);

  return { aditionalDocs, updateDocumentState };
};
