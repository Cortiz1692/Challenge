import { useLoadDocs } from "../hook/useLoadDocs";
import { LoadDocContext } from "./LoadDocContext";

export const LoadDocsProvider = ({ children }) => {
  const {
    initLoadDoc,
    getDocuRejected,
    rejectDocs,
    handlerUploadFile,
    uploadFile,
    
    initLoadDota,
    getDotaRejected,
    rejectDota,
    handlerUploadFilDota,
    uploadFileDota,
  } = useLoadDocs();

  return (
    <LoadDocContext.Provider
      value={{
        initLoadDoc,
        getDocuRejected,
        rejectDocs,
        handlerUploadFile,
        uploadFile,
    
        initLoadDota,
        getDotaRejected,
        rejectDota,
        handlerUploadFilDota,
        uploadFileDota,
      }}
    >
      {children}
    </LoadDocContext.Provider>
  );
};
