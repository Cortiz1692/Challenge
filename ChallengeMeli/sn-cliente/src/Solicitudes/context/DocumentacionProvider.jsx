import { useDocumentation } from "../hooks/useDocumentation";
import { DocumentacionContext } from "./DocumentacionContext ";

export const DocumentacionProvider = ({ children }) => {
  const {
    documentation,
    getDocumentation,
    paginatorDocumentation,
    handleDevolverDocu,
    getCertificadoSN,
    handleOpenPdfInNewTab,
    removeSignedDocument
  } = useDocumentation();

  return (
    <DocumentacionContext.Provider
      value={{
        documentation,
        getDocumentation,
        paginatorDocumentation,
        handleDevolverDocu,
        getCertificadoSN,
        handleOpenPdfInNewTab,
        removeSignedDocument
      }}
    >
      {children}
    </DocumentacionContext.Provider>
  );
};
