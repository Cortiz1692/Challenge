import axios from "axios";
import { usersApi, loadAditional } from "../../apis/usersApi";

const BASE_URL = "/gateway/solicitudes";
const BASE_URL_ADICIONALES = "/convalidacion"

const CONVALIDATION_URL = "https://sistemafirmadigitaldpsn.prefecturanaval.gob.ar:8091/convalidacion";


//Guardado de formularios 
export const save = async (doc) => {
    console.log('envioDoc :', doc);
    try {
        return await usersApi.post(`${BASE_URL}/create`, { doc });
    } catch (error) {
        throw error;
    }
}

//Tipos de buque 

export const findAllTipeShip = async () => {
    try {
        return await usersApi.get(`${BASE_URL}/components/tipoBuque`)

    } catch (error) {
        throw error;
    }
}
export const addTipeShip = async (newTipoBuque) => {
    try {
        return await usersApi.post(`${BASE_URL}/components/addShip`, {
            tipoBuque: newTipoBuque,
        });
    } catch (error) {
        throw error;
    }
}
export const findAllTipeCertificate = async () => {
    try {
        return await usersApi.get(`${BASE_URL}/components/tipoCertificado`)

    } catch (error) {
        throw error;
    }
}

// Documentos devueltos para Rehacer

export const findAllDocumentsRejected = async () => {
    try {
        return await usersApi.get(`${BASE_URL}/rejected`)
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const findAllDocumentsWithAditional = async () => {
    try {
        const response = await loadAditional.get(`${BASE_URL_ADICIONALES}/adicional`);
        return response.data;  // Devuelve directamente los datos de la respuesta
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateStateAditional = async ({idConvalidacion, estado}) =>{
    try{
        return await loadAditional.put(`${BASE_URL_ADICIONALES}/${idConvalidacion}`,{
            estado
        });
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const addFinalInspectionDate = async ({ idCertificado, tipoDocumento, fechaInspeccionAdicional }) => {
    console.log('idCertificado service:', idCertificado);
    console.log('tipoDocumento service:', tipoDocumento);
    console.log('fechaInspeccionAdicional service:', fechaInspeccionAdicional);

    try {
        // Formateo de la fecha en caso de que sea necesario
        const formattedDate = new Date(fechaInspeccionAdicional).toISOString().split('T')[0];

        return await usersApi.put(`${BASE_URL}/addAditional`, {
            idCertificado,
            tipoDocumento,
            fechaInspeccionAdicional: formattedDate,
        });
    } catch (error) {
        console.error("Error al cargar la fecha de inspección adicional:", error);
        throw new Error("Error al cargar la fecha de inspección adicional");
    }
};



export const saveConvalidationOld = async ({
    dni,
    fechaConvalidacion,
    lugarConvalidacion,
    inspector,
    idTipoDocumento,
    idCertificado,
    oldNroCertificado,
    nroConvalidacion,
    tipoConvalidacion,
    expedienteGde }) => {
    try {
        return await axios.post(`${CONVALIDATION_URL}/cargarConvalidacion`, {
            dni,
            fechaConvalidacion,
            lugarConvalidacion,
            inspector,
            idTipoDocumento,
            idCertificado,
            oldNroCertificado,
            nroConvalidacion,
            tipoConvalidacion,
            expedienteGde
        });
    } catch (error) {
        console.error("Error al guardar convalidación:", error);
        throw error;
    }
};


