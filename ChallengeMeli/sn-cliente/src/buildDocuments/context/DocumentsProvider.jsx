import { useDocs } from "../hooks/useDocs";
import { DocumentsContext } from "./DocumentsContext";

export const DocumentsProvider = ({ children }) => {
  const {
    handlerDocSelectedForm,
    handlerAddInspection,
    handlerAddDoc,
    getTiposBuques,
    tipoBuque,
    tipoCertificado,
    getTiposCertificados,
    getDocsRejected,
    rejectDocs,
    getDocAditionals,
    aditionalDoc,
    updateAditionalStatus,
    submitInspectionDate,
    initCCForm,
    initCDCForm,
    initCGSForm,
    initCIPBForm,
    initCIPBPForm,
    initCIPGSForm,
    initCNPBForm,
    initCNPBPForm,
    initCPGSForm,
    initDCForm,
    initDPCForm,
    initDCIForm,
    initCPDCForm,
    initCIGSForm,
    addTipoBuque,
  } = useDocs();

  return (
    <DocumentsContext.Provider
      value={{
        handlerDocSelectedForm,
        handlerAddDoc,
        handlerAddInspection,
        getTiposBuques,
        tipoBuque,
        tipoCertificado,
        getTiposCertificados,
        getDocsRejected,
        rejectDocs,
        getDocAditionals,
        aditionalDoc,
        updateAditionalStatus,
        submitInspectionDate,
        initCCForm,
        initCDCForm,
        initCGSForm,
        initCIPBForm,
        initCIPBPForm,
        initCIPGSForm,
        initCNPBForm,
        initCNPBPForm,
        initCPGSForm,
        initDCForm,
        initDPCForm,
        initDCIForm,
        initCPDCForm,
        initCIGSForm,
        addTipoBuque,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};
