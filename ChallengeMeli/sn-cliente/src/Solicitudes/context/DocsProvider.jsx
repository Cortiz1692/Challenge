import { useDocs } from "../hooks/useDocs";
import { DocsContext } from "./DocsContext";

export const DocsProvider = ({ children }) => {
  const {
    docs,
    getDocs,
    docSigned,
    getDocSigned,
    paginatorPending,
    paginatorSigned,
    handleDevolverDocumento,
    handlerOpenForm,
    handlerCloseForm,
    showForm,
    removeSignedDocument,

  } = useDocs();

  return (
    <DocsContext.Provider
      value={{
        docs,
        getDocs,
        docSigned,
        getDocSigned,
        paginatorPending,
        paginatorSigned,
        handleDevolverDocumento,
        handlerOpenForm,
        handlerCloseForm,
        showForm,
        removeSignedDocument,

     
      }}
    >
      {children}
    </DocsContext.Provider>
  );
};
