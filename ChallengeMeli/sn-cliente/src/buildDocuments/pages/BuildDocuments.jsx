import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SimpleWidget } from "../components/SimpleWidgew";
import { IoDocumentText } from "react-icons/io5";
import { DocumentsContext } from "../context/DocumentsContext";

export const BuildDocuments = () => {
  const { getDocsRejected, rejectDocs, getDocAditionals, aditionalDoc } =
    useContext(DocumentsContext);
  const [rejectedDocsCount, setRejectedDocsCount] = useState(0);
  const [aditionalDocsCount, setAditionalDocsCount] = useState(0);
  
  
  // console.log('aditionalDocsCount :', aditionalDocsCount);

  useEffect(() => {
    getDocsRejected();
  }, []);

  useEffect(() => {
    getDocAditionals();
  }, []);

  useEffect(() => {
    if (rejectDocs.length) {
      setRejectedDocsCount(rejectDocs.length);
    }
  }, [rejectDocs]);

  useEffect(() => {
    if (aditionalDoc.length) {
      setAditionalDocsCount(aditionalDoc.length);
    }
  }, [aditionalDoc]);

  const dashboardDocuments = [
    {
      type: "1",
      icon: <IoDocumentText size={40} />,
      title: "Documento Provisional de Cumplimiento",
    },
    {
      type: "2",
      icon: <IoDocumentText size={40} />,
      title: "Documento de Cumplimiento",
    },
    {
      type: "3",
      icon: <IoDocumentText size={40} />,
      title: "Constancia de Cumplimiento",
    },
    {
      type: "4",
      icon: <IoDocumentText size={40} />,
      title: "Certificado de Gestión de la Seguridad",
    },
    {
      type: "5",
      icon: <IoDocumentText size={40} />,
      title: "Certificado Provisional de Gestión de la Seguridad",
    },
    {
      type: "6",
      icon: <IoDocumentText size={40} />,
      title: "Certificado Demostrativo de Cumplimiento",
    },
    {
      type: "7",
      icon: <IoDocumentText size={40} />,
      title: "Certificado Nacional de Protección del Buque",
    },
    {
      type: "8",
      icon: <IoDocumentText size={40} />,
      title: "Certificado Nacional de Protección del Buque Provisional",
    },
    {
      type: "9",
      icon: <IoDocumentText size={40} />,
      title: "Certificado Internacional de Protección del Buque",
    },
    {
      type: "10",
      icon: <IoDocumentText size={40} />,
      title: "Certificado Internacional de Protección del Buque Provisional",
    },
    {
      type: "11",
      icon: <IoDocumentText size={40} />,
      title:
        "Certificado Internacional Provisional  de Gestión de la Seguridad",
    },
    {
      type: "12",
      icon: <IoDocumentText size={40} />,
      title: "Documento de Cumplimiento Internacional",
    },
    {
      type: "13",
      icon: <IoDocumentText size={40} />,
      title: "Certificado Provisional Demostrativo de Cumplimiento",
    },
    {
      type: "14",
      icon: <IoDocumentText size={40} />,
      title: "Certificado Internacional de Gestion de la Seguridad",
    },
  ];
  return (
    <div>
      {rejectedDocsCount > 0 && (
        <div className="alert alert-danger" role="alert">
          Usted tiene {rejectedDocsCount} documentos para corregir.
          <div>
            <NavLink
              className={"btn btn-light btn-sm"}
              to={"documentos/rejected"}
            >
              Ver Documentos
            </NavLink>
          </div>
        </div>
      )}
      <div>
        {aditionalDocsCount > 0 && (
          <div className="alert alert-primary" role="alert">
            Usted tiene {aditionalDocsCount} solicitudes de inspecciones
            adicionales para ser aprobads.
            <div>
              <NavLink
                className={"btn btn-light btn-sm"}
                to={"documentos/adicionales"}
              >
                Ver Solicitudes
              </NavLink>
            </div>
          </div>
        )}
      </div>
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="text-4xl mt-8">Seleccione Documento</h1>
        </div>
        <div className="row">
          {dashboardDocuments.map((doc) => (
            <SimpleWidget key={doc.type} {...doc} />
          ))}
        </div>
      </div>
    </div>
  );
};
