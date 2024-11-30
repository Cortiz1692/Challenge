import {usersApi, loadApi} from "../../apis/usersApi";

const BASE_URL = "/gateway/solicitudes";
const BASE_URL_LOAD= "/api";


// Documentos devueltos para Rehacer

export const findAllDocuRejected = async () => {
    try {
        return await usersApi.get(`${BASE_URL}/doc/rejected`)
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const uploadFile = async (requestData) => {
  console.log('requestData desde el service:',requestData);
    try {
      return await loadApi.post(`${BASE_URL_LOAD}/load/documentaion`,
        requestData
      );
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      throw error;
    }
  };
   

