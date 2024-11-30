import { useContext, useReducer } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { findAllSolicitudesPendingForDashboard, findAllSolicitudesProcessedByMonth, findAllSolicitudesSignedForDashboard } from "../services/reportService";
import { reportsReducer } from "../reducer/reportsReducer";

const initialState = {
  signedDocuments: [],
  pendingDocuments: [],
  loading: false,
};

export const useReports = () => {
  const [state, dispatch] = useReducer(reportsReducer, initialState);

  const { login, handlerLogout } = useContext(AuthContext);

  const getDocSigned = async () => {
    try {
      const result = await findAllSolicitudesSignedForDashboard();
      dispatch({
        type: 'loadingDashboardSigned',
        payload: result.data,
      });
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  }
  const getDocsPending = async () => {
    try {
      const result = await findAllSolicitudesPendingForDashboard();
      dispatch({
        type: 'loadingDashboardPending',
        payload: result.data,
      });
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  }


  const getDocumentProcesByMonth = async () =>{
    try {
      const result = await findAllSolicitudesProcessedByMonth();
      dispatch({
        type:'loadingDocumentProcessedByMonth',
        payload: result.data,
      });
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  }



  return {
    state,
    getDocSigned,
    getDocsPending,
    getDocumentProcesByMonth
  }
}
