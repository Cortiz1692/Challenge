import { useDotacion } from "../hooks/useDotacion";
import { DotacionContext } from "./DotacionContext";

export const DotacionProvider = ({ children }) => {
  const { dotacion, getDotacion, paginatorDotacion,  
    handleDevolverDotacion,
    removeSignedDocumentDota
} = useDotacion();

  return (
    <DotacionContext.Provider
      value={{
        dotacion,
        getDotacion,
        paginatorDotacion,
        handleDevolverDotacion,
        removeSignedDocumentDota

      }}
    >
      {children}
    </DotacionContext.Provider>
  );
};
