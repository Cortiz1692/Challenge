import { useContext, useReducer, useState } from "react";
import { documentationReducer } from "../reducers/documentationReducer";
import { AuthContext } from "../../auth/context/AuthContext";
import { findAllPagesPendingDocumentation } from "../services/solServices";
import Swal from "sweetalert2";
import { updateDocu } from "../services/docuService";

const initialState = {
  docs: [],

};


export const useDocumentation = () => {
  const [documentation, dispatch] = useReducer(documentationReducer, initialState);
  const [paginatorDocumentation, setPaginatorDocumentation] = useState({});
  const { login, handlerLogout } = useContext(AuthContext);

  const getDocumentation = async () => {

    try {
      const result = await findAllPagesPendingDocumentation();
      dispatch({
        type: 'loadingDocumentation',
        payload: result.data,
      });
      setPaginatorDocumentation(result.data);
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  }

  const removeSignedDocument = (idCertificado) => {
    dispatch({ type: "removeSignedDocument", payload: idCertificado });
  };

  const handleDevolverDocu = async ({ idCertificado, observacion }) => {
    try {
      const response = await updateDocu({ idCertificado, observacion });
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


  const handleOpenPdfInNewTab = (documento) => {
    try {
      const byteCharacters = atob(documento);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error al abrir el PDF:', error);
    }
  };


  return {
    documentation,
    getDocumentation,
    paginatorDocumentation,
    handleDevolverDocu,
    handleOpenPdfInNewTab,
    removeSignedDocument
  }
}
