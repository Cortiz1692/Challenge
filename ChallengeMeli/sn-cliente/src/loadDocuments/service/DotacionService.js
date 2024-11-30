import { usersApi, loadApi } from "../../apis/usersApi";

const BASE_URL = "/gateway/solicitudes";
const BASE_URL_LOAD= "/api";



// Documentos devueltos para Rehacer

export const findAllDotaRejected = async () => {
    try {
        return await usersApi.get(`${BASE_URL}/dota/rejected`)
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const uploadFileDota = async (requestData) => {
    try {
      return await loadApi.post(`${BASE_URL_LOAD}/load/dotation`,
        requestData
      );
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      throw error;
    }
  };
   



