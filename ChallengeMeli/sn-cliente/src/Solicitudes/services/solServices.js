import { usersApi, loadApi } from "../../apis/usersApi";

const BASE_URL_DOCS_PENDING = 'gateway/solicitudes/pending'
const BASE_URL_DOCS_PENDING_DOCUMENTATION = 'gateway/solicitudes/doc/pending'
const BASE_URL_DOC_PENDING_CERT_SEG_NAV = 'http://localhost:8080/api/pending'

const BASE_URL_DOCS_PENDING_DOTATION = 'gateway/solicitudes/dotacion/pending'
const BASE_URL_DOCS_SIGNED = 'gateway/solicitudes/signed'
const BASE_URL_DOC_SIGNED_BY_ID = 'gateway/solicitudes/gw/signed';
const BASE_URL__DEVOLVER_DOCS = 'gateway/solicitudes/registro'


export const findAllPagesRequestPending = async () => {
    try {
        const response = await usersApi.get(`${BASE_URL_DOCS_PENDING}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const findAllPagesPendingDocumentation = async () => {
    try {
        const response = await usersApi.get(`${BASE_URL_DOCS_PENDING_DOCUMENTATION}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const findAllPagesPendingCertiSegNavDocumentation = async (page = 0) => {
    try {
        const response = await usersApi.get(`${BASE_URL_DOC_PENDING_CERT_SEG_NAV}/${page}`);
        console.log('responseDota:', response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const findAllPagesPendingDotation = async () => {
    try {
        const response = await usersApi.get(`${BASE_URL_DOCS_PENDING_DOTATION}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



// export const findAllSolicitudesSigned = async () => {
//     try {
//         const response = await usersApi.get(BASE_URL_DOCS_SIGNED);
//         return response;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }
export const findByIdSolSigned = async ({idCertificado, type}) => {
    try {
        const response = await usersApi.get(`${BASE_URL_DOC_SIGNED_BY_ID}/${idCertificado}/${type}`)
       console.log('response :', response);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateDocs = async ({ idCertificado, observacion }) => {
    try {
        return await usersApi.put(`${BASE_URL__DEVOLVER_DOCS}/${idCertificado}`, {
            observacion,
        });
    } catch (error) {
        throw error;
    }
}





