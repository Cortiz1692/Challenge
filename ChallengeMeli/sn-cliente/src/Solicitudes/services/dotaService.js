import { usersApi, loadApi } from "../../apis/usersApi";


const BASE_URL__DEVOLVER_DOTACION = 'gateway/solicitudes/dotacion'


export const updateDotacion = async ({ idCertificado, observacion}) => {
    try {
        return await usersApi.put(`${BASE_URL__DEVOLVER_DOTACION}/${idCertificado}`, {
            observacion,
        });
    } catch (error) {
        throw error;
    }
}