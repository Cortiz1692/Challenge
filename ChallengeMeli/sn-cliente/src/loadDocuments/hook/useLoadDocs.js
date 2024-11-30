import { useReducer, useState } from "react";
import { docuReducer } from "../reducer/docuReducer";
import { findAllDocuRejected, uploadFile } from "../service/DocumentacionService";
import Swal from "sweetalert2";

const initLoadDoc = {
    idCertificado: '',
    matricula: '',
    nombreBuque: '',
    user: '',
    division: '',
    tipoDoc: '',
    data: '',
};


export const useLoadDocs = () => {
    const [docu, dispatch] = useReducer(docuReducer, initLoadDoc);
    const [rejectDocs, setRejectDocs] = useState([]);
    const [uploadStatus, setUploadStatus] = useState("");



    const getDocuRejected = async () => {
        try {
            const result = await findAllDocuRejected();
            dispatch({
                type: 'loadingDocuRejected',
                payload: result.data,
            })
            setRejectDocs(result.data);
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
            }
        }
    }


    const handlerUploadFile = async (requestData) => {
        try {
            const response = await uploadFile(requestData);

            setUploadStatus("Archivo subido exitosamente.");
            Swal.fire(
                "Archivo Subido",
                "El archivo se ha subido exitosamente.",
                "success"
            );

            console.log("Respuesta del microservicio:", response.data);
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            setUploadStatus(
                "Error al subir el archivo. Por favor, inténtalo de nuevo."
            );
        }
    };





    return {
        initLoadDoc,
        getDocuRejected,
        rejectDocs,
        handlerUploadFile,
        uploadFile
    }
}

