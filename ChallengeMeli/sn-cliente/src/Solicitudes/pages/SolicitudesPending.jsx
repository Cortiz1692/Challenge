import { useContext, useState, useEffect } from "react";
import { RegisterList } from "../components/registroEmpresas/RegisterList";
import { DocsContext } from "../context/DocsContext";
import { AuthContext } from "../../auth/context/AuthContext";
import { DocsSearch } from "../components/DocsSearch";
import { useParams } from "react-router-dom";
//import { Paginator } from "../components/Paginator";
import { DocuList } from "../components/divDocumentacion/DocuList";
import { DotaList } from "../components/dotacionMinima/DotaList";
import { DocumentacionContext } from "../context/DocumentacionContext ";
import { DotacionContext } from "../context/DotacionContext";
import { CardInfo } from "../components/CardInfo";
import { IoBarChartSharp, IoDocumentText } from "react-icons/io5";
import { IoIosBoat } from "react-icons/io";

export const SolicitudesPending = () => {
  const { page } = useParams();

  const {
    docs,
    getDocs,
    paginatorPending,
  } = useContext(DocsContext);

  const { documentation, getDocumentation} =
    useContext(DocumentacionContext);

  const { dotacion, getDotacion } =
    useContext(DotacionContext);

  const { login } = useContext(AuthContext);
  //console.log('login',login);
  const [filterCert, setFilterCert] = useState([]);
  const [search, setSearch] = useState("");

  const [filterCertDocu, setFilterCertDocu] = useState([]);
  const [searchDocu, setSearchDocu] = useState("");

  const [filterCertDota, setFilterCertDota] = useState([]);
  const [searchDota, setSearchDota] = useState("");

  useEffect(() => {
    getDocs();
  }, []);

  useEffect(() => {
    getDocumentation();
  }, []);

  useEffect(() => {
    getDotacion();
  }, []);

  useEffect(() => {
    handlerFilter(search);
  }, [search, docs]);

  useEffect(() => {
    handlerFilterDocu(searchDocu);
  }, [searchDocu, documentation]);

  useEffect(() => {
    handlerFilterDota(searchDota);
  }, [searchDota, dotacion]);

  const handlerSearch = (e) => {
    const searchCert = e.target.value;
    setSearch(searchCert);
  };
  const handlerSearchDocu = (e) => {
    const searchCertDocu = e.target.value;
    setSearchDocu(searchCertDocu);
  };
  const handlerSearchDota = (e) => {
    const searchCertDota = e.target.value;
    setSearchDota(searchCertDota);
  };

  const handlerFilter = (terminoBusqueda) => {
    const searchCertWithoutSpaces = terminoBusqueda.replace(/\s/g, "");
    const resultFilter = docs.docs.filter((element) => {
      const { idCertificado } = element;

      return idCertificado
        .toString()
        .toLowerCase()
        .includes(searchCertWithoutSpaces);
    });
    setFilterCert(resultFilter);
  };

  const handlerFilterDocu = (terminoBusqueda) => {
    const searchCertWithoutSpaces = terminoBusqueda.replace(/\s/g, "");
    const resultFilter = documentation.docs.filter((element) => {
      const { idCertificado } = element;

      return idCertificado
        .toString()
        .toLowerCase()
        .includes(searchCertWithoutSpaces);
    });
    setFilterCertDocu(resultFilter);
  };

  const handlerFilterDota = (terminoBusqueda) => {
    const searchCertWithoutSpaces = terminoBusqueda.replace(/\s/g, "");
    const resultFilter = dotacion.docs.filter((element) => {
      const { idCertificado } = element;

      return idCertificado
        .toString()
        .toLowerCase()
        .includes(searchCertWithoutSpaces);
    });
    setFilterCertDota(resultFilter);
  };

  const countDocuments = (docs, estado) =>
    docs.filter((doc) => doc.estado === estado).length;

  const dotationDocs = login.isFirmanteDivision
    ? countDocuments(dotacion.docs, 0)
    : countDocuments(dotacion.docs, 1);
  const registroDocs = docs.docs.length;
  const documentationDocs = documentation.docs.length;

  return (
    <div className="container my-4">
      <h2 id="list-item-1">Documentos pendientes de firma</h2>


      <div className="row">
        {(login.isFirmanteDivision || login.isAdmin || login.user   ) && (
          <CardInfo
            iconComponent={<IoIosBoat size={40} />}
            title="Navegación"
            value={`Pendientes: ${dotationDocs}`}
            footerText="Documentos a firmar"
            iconBgClass="bg-primary"
            linkText="ir a Navegación"
            linkHref="#list-item-1"
          />
        )}
        {!login.isFirmanteDivision && (
          <>
            <CardInfo
              iconComponent={<IoBarChartSharp size={40} />}
              title="Control de Gestión"
              value={`Pendientes: ${registroDocs}`}
              footerText="Documentos a firmar"
              iconBgClass="bg-success"
              linkText="ir a Control de Gestión"
              linkHref="#list-item-2"
            />
            <CardInfo
              iconComponent={<IoDocumentText size={40} />}
              title="Documentación"
              value={`Pendientes: ${documentationDocs}`}
              footerText="Documentos a firmar"
              iconBgClass="bg-danger"
              linkText="ir a Documentación"
              linkHref="#list-item-3"
            />
          </>
        )}
        <div className="col-12">
          <div
            data-bs-spy="scroll"
            data-bs-target="#list-example"
            data-bs-smooth-scroll="true"
            className="scrollspy-example"
            tabIndex="0"
          >
            {(login.isFirmanteDivision || login.isAdmin || login.user) && (
              <>
                <h4 className="text-center">División Navegación</h4>
                <DocsSearch
                  search={searchDota}
                  handlerSearch={handlerSearchDota}
                />
                <div className="row">
                  <div className="col">
                  {dotacion.docs.length === 0 ? (
                      <div className="alert alert-primary" role="alert">
                        No hay documentos para la firma
                      </div>
                    ) : filterCertDota.length === 0 && searchDota !== "" ? (
                      <div className="alert alert-warning">
                        No hay documentos en el sistema!
                      </div>
                    ) : (
                      <>
                        <DotaList
                          documents={
                            searchDota ? filterCertDota : dotacion.docs
                          }
                        />
                        {/* <Paginator
                          url="/solicitudesPending/page"
                          paginatorPending={paginatorDotacion}
                        /> */}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
            {!login.isFirmanteDivision && (
              <>
                <h4 id="list-item-2" className="text-center">
                  División Control de Gestión
                </h4>
                <DocsSearch search={search} handlerSearch={handlerSearch} />
                <div className="row">
                  <div className="col">
                  {docs.docs.length === 0 ? (
                      <div className="alert alert-primary" role="alert">
                        No hay documentos para la firma
                      </div>
                    ) : filterCert.length === 0 && search !== "" ? (
                      <div className="alert alert-warning">
                        No hay documentos en el sistema!
                      </div>
                    ) : (
                      <>
                        <RegisterList
                          documents={search ? filterCert : docs.docs}
                        />
                        {/* <Paginator
                          url="/solicitudesPending/page"
                          paginatorPending={paginatorPending}
                        /> */}
                      </>
                    )}
                  </div>
                </div>
                <h4 id="list-item-3" className="text-center">
                  División Documentación
                </h4>
                <DocsSearch
                  search={searchDocu}
                  handlerSearch={handlerSearchDocu}
                />
                <div className="row">
                  <div className="col">
                  {documentation.docs.length === 0 ? (
                      <div className="alert alert-primary" role="alert">
                        No hay documentos para la firma
                      </div>
                    ) : filterCertDocu.length === 0 && searchDocu !== "" ? (
                      <div className="alert alert-warning">
                        No hay documentos en el sistema!
                      </div>
                    ) : (
                      <>
                        <DocuList
                          documents={
                            searchDocu ? filterCertDocu : documentation.docs
                          }
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
