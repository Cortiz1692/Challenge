import { useReports } from "../hook/useReports";
import { ReportContext } from "./ReportContext";


export const ReportProvider = ({ children }) => {
  const {
    state,
    getDocSigned,
    getDocsPending,
    getDocumentProcesByMonth
  } = useReports();

  return (
    <ReportContext.Provider
      value={{
        state,
        getDocSigned,
        getDocsPending,
        getDocumentProcesByMonth
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
