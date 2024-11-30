import { useContext, useReducer, useState } from "react";
import { docsReducer } from "../reducers/docsReducer";
import { AuthContext } from "../../auth/context/AuthContext";
import { findAllPagesRequestPending, findByIdSolSigned, updateDocs } from "../services/solServices";
import Swal from "sweetalert2";

const initialState = {
    docs: [],

};
const initialUsers = [];

export const useDocs = () => {
    const [docs, dispatch] = useReducer(docsReducer, initialState);
    const [docSigned, dispatchSigned] = useReducer(docsReducer, initialUsers);
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [paginatorPending, setPaginatorPending] = useState({});  // Agregar estado para documentos seleccionados
    const [paginatorSigned, setPaginatorSigned] = useState({});  // Agregar estado para documentos seleccionados

    const [idCertificado, setIdCertificado] = useState(null);
    const [showForm, setShowForm] = useState(false);


    const { login, handlerLogout } = useContext(AuthContext);



    const getDocs = async () => {

        try {
            const result = await findAllPagesRequestPending();
            dispatch({
                type: 'loadingUsers',
                payload: result.data,
            });
            setPaginatorPending(result.data);
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
            }
        }
    }
    const getDocSigned = async ({ idCertificado, type }) => {
        try {
            const result = await findByIdSolSigned({ idCertificado, type });
            dispatchSigned({
                type: 'loadingDocSigned',
                payload: result.data,
            });
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
            }
            if (error.response && error.response.status === 400) {
                Swal.fire(
                    'No se encontro el documento solicitado',
                    'Es posible que el documento no exista en el sistema!',
                    'warning'
                );
            }

        }
    }
    const removeSignedDocument = (idCertificado) => {
        dispatch({ type: "removeSignedDocument", payload: idCertificado });
    };
    const handleDevolverDocumento = async ({ idCertificado, observacion }) => {
        try {
            const response = await updateDocs({ idCertificado, observacion });
            console.log('response de actualizacion :', response);
            console.log("Documento devuelto exitosamente");
            Swal.fire(
                "Archivo Devuelto",
                "El archivo se ha devuelto para su corrección.",
                "success"
            );
            // Despachar la acción para actualizar el estado local
            dispatch({
                type: 'devolverDocumento',
                payload: { idCertificado, observacion }
            });
        } catch (error) {
            console.error("Error al devolver el documento:", error);
        }
    };



    const handlerOpenForm = (id) => {
        setIdCertificado(id);
        setShowForm(true);
    };

    const handlerCloseForm = () => {
        setShowForm(false);
        setIdCertificado(null);
    };







    return {
        docs,
        getDocs,
        docSigned,
        getDocSigned,
        selectedDocuments,
        paginatorPending,
        paginatorSigned,

        handleDevolverDocumento,
        handlerOpenForm,
        handlerCloseForm,
        showForm,
        removeSignedDocument

    };
}
