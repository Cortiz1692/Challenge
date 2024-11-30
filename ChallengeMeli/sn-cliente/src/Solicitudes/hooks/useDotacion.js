import { useContext, useReducer, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import {dotationReducer} from "../reducers/dotationReducer";
import { findAllPagesPendingDotation } from "../services/solServices";
import {updateDotacion} from "../services/dotaService";
import Swal from "sweetalert2";
const initialState = {
    docs: [],
    paginator: {},

};


export const useDotacion = () => {
    const [dotacion, dispatch] = useReducer(dotationReducer, initialState);
    const [paginatorDotacion, setPaginatorDotacion] = useState({});
   

    const {login, handlerLogout} = useContext(AuthContext);
    

    const getDotacion = async ()=>{
        try{
            const result =await findAllPagesPendingDotation();
            dispatch({
                type:'loadingDotation',
                payload: result.data,
            });
            setPaginatorDotacion(result.data);
        }catch(error){
            if (error.response?.status == 401) {
                handlerLogout();
            }
        }
    }

    const removeSignedDocumentDota = (idCertificado) => {
        dispatch({ type: "removeSignedDocument", payload: idCertificado });
      };
    const handleDevolverDotacion = async ({idCertificado, observacion}) => {
        try {
            const response = await updateDotacion({ idCertificado, observacion });
            console.log('response de actualizacion :', response);
            console.log("Documento devuelto exitosamente");
            Swal.fire(
              "Archivo Devuelto",
              "El archivo se ha devuelto para su corrección.",
              "success"
            );
            dispatch({
              type: 'devolverDocumento',
              payload: { idCertificado, observacion }
            });
          } catch (error) {
            console.error("Error al devolver el documento:", error);
          }
        };
        
    return {
        dotacion,
        getDotacion,
        paginatorDotacion,
        handleDevolverDotacion,
        removeSignedDocumentDota

  }
}
