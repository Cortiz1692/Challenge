import { usersApi, loadApi } from "../../apis/usersApi";

const BASE_URL_DEVOLVER_DOCUMENTACION = 'gateway/solicitudes/documentacion'


export const updateDocu = async ({ idCertificado, observacion}) => {

    try {
        return await usersApi.put(`${BASE_URL_DEVOLVER_DOCUMENTACION}/${idCertificado}`, {
            observacion,
        });
    } catch (error) {
        throw error;
    }
}