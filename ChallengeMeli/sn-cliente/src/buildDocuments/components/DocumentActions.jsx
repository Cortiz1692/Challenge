export const DocumentActions = ({
  certificado,
  generateDocument,
  viewDocument,
}) => {
  const handleGenerateDocument = () => {
    generateDocument();
  };

  const handleViewDocument = () => {
    viewDocument();
  };

  return (
    <>
        <button
          type="button"
          onClick={handleGenerateDocument}
          className="btn btn-primary"
        >
          Guardar Datos
        </button>
        <button
          type="button"
          onClick={handleViewDocument}
          className="btn btn-success my-2"
        >
          Visualizar Documento
        </button>
    </>
  );
};
