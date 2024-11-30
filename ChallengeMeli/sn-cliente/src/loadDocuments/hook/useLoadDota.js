
import { useReducer, useState } from "react";
import { dotaReducer } from "../reducer/dotaReducer";
import { findAllDotaRejected, uploadFileDota } from "../service/DotacionService";
import Swal from "sweetalert2";

const initLoadDota = {
    idCertificado: '',
    matricula: '',
    nombreBuque:'',
    user: '',
    division: '',
    tipoDoc: '',
    data: '',
}

export const useLoadDota = () => {
    const [dota, dispatchDota] = useReducer(dotaReducer, []);
    const [rejectDota, setRejectDota] = useState([]);
    const [uploadStatus, setUploadStatus] = useState("");



    const getDotaRejected = async () => {
        try {
            const result = await findAllDotaRejected();
            dispatchDota({
                type: 'loadingDotaRejected',
                payload: result.data,
            });
            setRejectDota(result.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handlerUploadFilDota = async (requestData) => {
        try {
            const response = await uploadFileDota(requestData);
            setUploadStatus("Archivo subido exitosamente.");
            Swal.fire("Archivo Subido", "El archivo se ha subido exitosamente.", "success");
            console.log("Respuesta del microservicio:", response.data);
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            setUploadStatus("Error al subir el archivo. Por favor, inténtalo de nuevo.");
        }
    };

    return {
        initLoadDota,
        getDotaRejected,
        rejectDota,
        handlerUploadFilDota,
        uploadFileDota,

    }
}
