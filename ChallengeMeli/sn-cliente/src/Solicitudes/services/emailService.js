import axios from "axios";
import { usersApi } from "../../apis/usersApi";

const BASE_URL_EMAIL = 'api/saveEmail';
const BASE_URL_API_EMAIL = 'https://intranet2.prefecturanaval.gob.ar/DPSN/reporte_gestion/apiMail.php?';


export const saveDocumentEmail = async ({ id, type, username, email }) => {
    try {
        const response = await usersApi.post(BASE_URL_EMAIL, {
            id,
            type,
            username,
            email
        });
        console.log('response:', response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const sendDocumentToApi = async ({ id, type }) => {
    
    console.log(id);
    console.log(type);
    try {
        const response = await axios.get(`${BASE_URL_API_EMAIL}ID_CERTIFICADO=${id}&ID_TIPO_CERTIFICADO=${type}`);
        console.log('response:', response);
        return response;
    } catch (error) {
        console.error('Error sending document:', error);
        throw error;
    }
};