import { useLoadDocs } from "../hook/useLoadDocs";
import { useLoadDota } from "../hook/useLoadDota";
import { LoadDotaContext } from "./LoadDotaContext";

export const LoadDotaProvider = ({ children }) => {
  const {
    initLoadDota,
    getDotaRejected,
    rejectDota,
    handlerUploadFilDota,
    uploadFileDota,
  } = useLoadDota();

  return (
    <LoadDotaContext.Provider
      value={{
        initLoadDota,
        getDotaRejected,
        rejectDota,
        handlerUploadFilDota,
        uploadFileDota,
      }}
    >
      {children}
    </LoadDotaContext.Provider>
  );
};
