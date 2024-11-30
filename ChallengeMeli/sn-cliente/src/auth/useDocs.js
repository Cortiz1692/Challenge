import { useContext, useReducer, useState } from "react";
import { docsReducer } from "../reducers/docsReducer";
import { addTipeShip, findAllDocumentsRejected, findAllTipeCertificate, findAllTipeShip, save, saveConvalidationOld } from "../services/docService";
import { AuthContext } from "../../auth/context/AuthContext";
import Swal from "sweetalert2";


const initCCForm = {
    docType: 'CONSTANCIA_CUMPLIMIENTO',
    certificado: '',
    nombreBuque: '',
    senalDistintiva: '',
    tipoBuque: '',
    nroMatricula: '',
    nat: '',
    nombreCompania: '',
    direccionCompania: '',
    validez: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
}
const initCDCForm = {
    docType: 'CERTIFICADO_DEMOSTRATIVO_CUMPLIMIENTO',
    certificado: '',
    nombreCompania: '',
    direccionCompania: '',
    nroOMI: '',
    tipoBuque: '',
    validez: '',
    fechaVerificacion: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
    nrocertiAnterior: '',
    expte: '',
   // nroMatricula: '',
    convalidaciones: {
        1: {
            fechaInicio: '',
            fechaFin: ''
        },
        2: {
            fechaInicio: '',
            fechaFin: ''
        },
        3: {
            fechaInicio: '',
            fechaFin: ''
        },
        4: {
            fechaInicio: '',
            fechaFin: ''
        },
    },
    veriAdicionalUno: '',
}

const initCGSForm = {
    docType: 'CERTIFICADO_GESTION_SEGURIDAD',
    certificado: '',
    nombreBuque: '',
    numeroIMO: '',
    senalDistintiva: '',
    tipoBuque: '',
    nroMatricula: '',
    nat: '',
    nombreCompania: '',
    direccionCompania: '',
    nroOMI: '',
    validez: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
    nrocertiAnterior: '',
    expte: '',
    convalidaciones: {
        1: {
            fechaInicio: '',
            fechaFin: ''
        },
    },
    veriAdicionalUno: '',
    veriAdicionalDos: '',

}
const initCIGSForm = {
    docType: 'CERTIFICADO_INT_GESTION_SEGURIDAD',
    certificado: '',
    nombreBuque: '',
    senalDistintiva: '',
    ptoMatricula: '',
    tipoBuque: '',
    arqueoBruto: '',
    nroOMI: '',
    nombreCompania: '',
    direccionCompania: '',
    nroOMICompania: '',
    validez: '',
    fechaTerminacion: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
    nrocertiAnterior: '',
    expte: '',
    nroMatricula: '',
    convalidaciones: {
        1: {
            fechaInicio: '',
            fechaFin: ''
        }
    },
    veriAdicionalUno: '',
    veriAdicionalDos: '',
    veriAdicionalTres: '',
    veriAdicionalCuatro: '',
}
const initCIPBForm = {
    docType: 'CERTIFICADO_INTERNACIONAL_PROTECCION_BUQUE',
    certificado: '',
    nombreBuque: '',
    senalDistintiva: '',
    puertoMatricula: '',
    tipoBuque: '',
    arqueoBruto: '',
    numeroOMI: '',
    nombreCompania: '',
    direccionCompania: '',
    nroOMICompania: '',
    tipoVerificacion: '',
    fechaVerificacion: '',
    validez: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
    nrocertiAnterior: '',
    expte: '',
    nroMatricula: '',
    convalidaciones: {
        1: {
            fechaInicio: '',
            fechaFin: ''
        }
    },
    veriAdicionalUno: '',
    veriAdicionalDos: '',
    veriAdicionalTres: '',
    veriAdicionalCuatro: '',
    veriAdicionalCinco: '',
    veriAdicionalSeis: '',
    veriAdicionalSiete: '',
    veriAdicionalOcho: '',
}
const initCIPBPForm = {
    docType: 'CERTIFICADO_INTERNACIONAL_PROTECCION_BUQUE_PROVISIONAL',
    certificado: '',
    nombreBuque: '',
    senalDistintiva: '',
    puertoMatricula: '',
    tipoBuque: '',
    arqueoBruto: '',
    numeroIMO: '',
    nombreCompania: '',
    direccionCompania: '',
    numeroOMICompania: '',
    segundoCertificado: '',
    fechaExpedicionInicial: '',
    validez: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
    nroMatricula: '',

}
const initCIPGSForm = {
    docType: 'CERTIFICADO_INT_PROVISIONAL_GESTION_SEGURIDAD',
    certificado: '',
    nombreBuque: '',
    senalDistintiva: '',
    puertoMatricula: '',
    tipoBuque: '',
    arqueoBruto: '',
    numeroOMI: '',
    nombreCompania: '',
    direccionCompania: '',
    numeroOMICompania: '',
    validez: '',
    fechaVerificacion: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
    nroMatricula: '',
}
const initCNPBForm = {
    docType: 'CERTIFICADO_NACIONAL_PROTECCION_BUQUE',
    certificado: '',
    puntoConformidad: '',
    nombreBuque: '',
    senalDistintiva: '',
    puertoMatricula: '',
    tipoBuque: '',
    nat: '',
    nroOMI: '',
    nombreCompania: '',
    direccionCompania: '',
    numeroOMICompania: '',
    planProteccionBuque: '',
    verificacionFecha: '',
    verificacion: '',
    validez: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
    nrocertiAnterior: '',
    expte: '',
    nroMatricula: '',
    convalidaciones: {
        1: {
            fechaInicio: '',
            fechaFin: ''
        }
    },
    veriAdicionalUno: '',
    veriAdicionalDos: '',
    veriAdicionalTres: '',

}
const initCNPBPForm = {
    docType: 'CERTIFICADO_NACIONAL_PROTECCION_BUQUE_PROVISIONAL',
    certificado: '',
    nombreBuque: '',
    senalDistintiva: '',
    puertoMatricula: '',
    tipoBuque: '',
    nat: '',
    nroOMI: '',
    nombreCompania: '',
    direccionCompania: '',
    nroOMICompania: '',
    segundoCertificado: '',
    fechaExpedicionProvInicial: '',
    validez: '',
    puntoConformidad: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
    nroMatricula: '',
}
const initCPGSForm = {
    docType: 'CERTIFICADO_PROVISIONAL_GESTION_SEGURIDAD',
    certificado: '',
    nombreBuque: '',
    numeroIMO: '',
    senalDistintiva: '',
    tipoBuque: '',
    nroMatricula: '',
    nat: '',
    nombreCompania: '',
    direccionCompania: '',
    nroOMI: '',
    validez: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
}
const initCPDCForm = {
    docType: 'CERTIFICADO_PROVISIONAL_DEMOSTRATIVO_CUMPLIMIENTO',
    certificado: '',
    nombreCompania: '',
    direccionCompania: '',
    nroOMICompania: '',
    tipoBuque: '',
    validez: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
    //nroMatricula: '',

}
const initDCForm = {
    docType: 'DOCUMENTO_CUMPLIMIENTO',
    certificado: '',
    nombreCompania: '',
    direccionCompania: '',
    validez: '',
    fechaTerminacion: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
    nrocertiAnterior: '',
    expte: '',
    //nroMatricula: '',
    convalidaciones: {
        1: {
            fechaInicio: '',
            fechaFin: ''
        },
        2: {
            fechaInicio: '',
            fechaFin: ''
        },
        3: {
            fechaInicio: '',
            fechaFin: ''
        },
        4: {
            fechaInicio: '',
            fechaFin: ''
        },
    },
    veriAdicionalUno: '',
}
const initDCIForm = {
    docType: 'DOCUMENTO_CUMPLIMIENTO_INT',
    usuario: '',
    certificado: '',
    nombreCompania: '',
    direccionCompania: '',
    nroOMICompania: '',
    tipoBuque: '',
    validez: '',
    fechaTerminacion: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
    nrocertiAnterior: '',
    expte: '',
    //nroMatricula: '',
    convalidaciones: {
        1: {
            fechaInicio: '',
            fechaFin: ''
        },
        2: {
            fechaInicio: '',
            fechaFin: ''
        },
        3: {
            fechaInicio: '',
            fechaFin: ''
        },
        4: {
            fechaInicio: '',
            fechaFin: ''
        },
    },
    veriAdicionalUno: '',
};

const initDPCForm = {
    docType: 'DOCUMENTO_PROVISIONAL_CUMPLIMIENTO',
    certificado: '',
    nombreCompania: '',
    direccionCompania: '',
    nroOMICompania: '',
    tipoBuque: '',
    validez: '',
    lugarExpedicion: '',
    fechaExpedicion: '',
    //nroMatricula: '',
}

const initialDocs = [];

const initialErrors = {
    certificado: '',

}




export const useDocs = () => {
    const [docType, setDocType] = useState('');

    const getInitialForm = () => {
        switch (docType) {
            case '1':
                return initDPCForm;
            case '2':
                return initDCForm;
            case '3':
                return initCCForm;
            case '4':
                return initCGSForm;
            case '5':
                return initCPGSForm;
            case '6':
                return initCDCForm;
            case '7':
                return initCNPBForm;
            case '8':
                return initCNPBPForm;
            case '9':
                return initCIPBForm;
            case '10':
                return initCIPBPForm;
            case '11':
                return initCIPGSForm;
            case '12':
                return initDCIForm;
            case '13':
                return initCPDCForm;
            case '14':
                return initCIGSForm;
            default:
                return {};

        }
    }

    const [docs, dispatch] = useReducer(docsReducer, initialDocs);
    const [docSelected, setDocSelected] = useState('');
    const [tipoBuque, setTipoBuque] = useState([]);
    const [tipoCertificado, setTipoCertificado] = useState([]);
    const [rejectDocs, setRejectDocs] = useState([]);
    const [errors, setErrors] = useState(initialErrors)
    const { login, handlerLogout } = useContext(AuthContext);

    const handlerAddInspection = async (inspectionData) => {
        try {
            const response = await saveConvalidationOld(inspectionData);
            console.log('response :', response);

            if (response.status >= 200 && response.status < 300) {
                dispatch({
                    type: 'addDoc',
                    payload: response.data, 
                });

                Swal.fire('Datos Guardados', 'La inspección se ha guardado exitosamente', 'success');
            } else {
                // Si no es exitosa, manejar el error
                Swal.fire('Error', response.data || 'Hubo un problema al guardar la inspección', 'error');
            }
        } catch (error) {
            console.error('Error al guardar la inspección:', error);

            // Manejar el error cuando ya existe la convalidación
            if (error.response && error.response.status === 400) {
                Swal.fire('Error', error.response.data || 'La convalidación ya existe y no puede ser modificada.', 'error');
            } else {
                // Para otros errores, mostrar mensaje genérico
                Swal.fire('Error', 'Hubo un problema al guardar la inspección', 'error');
            }

            // Si el error es 401, cerrar la sesión del usuario
            if (error.response?.status === 401) {
                handlerLogout();
            }
        }
    };



    const getTiposBuques = async () => {

        try {
            const result = await findAllTipeShip();
            dispatch({
                type: 'loadingTipesShips',
                payload: result.data,
            });
            setTipoBuque(result.data);
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
            }
        }
    }

    const getTiposCertificados = async () => {

        try {
            const result = await findAllTipeCertificate();
            dispatch({
                type: 'loadingTipesCertificates',
                payload: result.data,
            });
            setTipoCertificado(result.data);
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
            }
        }
    }

    const getDocsRejected = async () => {
        try {
            const result = await findAllDocumentsRejected();
            dispatch({
                type: 'loadingDocsRejected',
                payload: result.data,
            })
            setRejectDocs(result.data);
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
            }
        }
    }

    const handlerAddDoc = async (doc) => {

        console.log('docs', doc);
        //if (!login.isAdmin) return;
        let response;
        try {
            response = await save(doc);
            console.log('status :',response.status);
            dispatch({
                type: 'addDoc',
                payload: response.data,
            });
            Swal.fire(
                'Datos Guardados',
                'Los datos han sido guardados exitosamente!',
                'success'
            );
        } catch (error) {
            console.error('Error al guardar documento:', error);
            if (error.response && error.response.status == 400) {
                setErrors(error.response.data);
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el formulario',
                    text: 'Revisa los campos. Hay datos incorrectos o faltantes.',
                });
            } else if (error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error del servidor',
                        text: 'Ocurrió un problema al guardar los datos. Posible violación de restricción en la base de datos.',
                    });
            } else if (error.response?.status == 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'No autorizado',
                    text: 'No tienes los permisos necesarios para realizar esta acción.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error inesperado',
                    text: 'Ocurrió un error inesperado. Intenta nuevamente.',
                });
                throw error;
            }
        }
    }

    const handlerDocSelectedForm = (docs) => {
        setDocSelected({ ...docs });
    }

    // context.js
const addTipoBuque = async (newTipoBuque) => {
    try {
      console.log('newTipoBuque:', newTipoBuque);
      
      // Llama a la función del servicio para agregar el nuevo tipo de buque
      const response = await addTipeShip(newTipoBuque);
  
      if (response.status === 200) {
        // Asumiendo que la respuesta contiene el nuevo tipo de buque
        const addedTipoBuque = response.data; 
        tipoBuque.push(addedTipoBuque); // Actualiza el estado local
        getTiposBuques(); // Opcional: Vuelve a cargar la lista de tipos de buques
      }
    } catch (error) {
      console.error("Error agregando tipo de buque", error);
    }
  };
  
    return {
        handlerAddInspection,
        handlerDocSelectedForm,
        handlerAddDoc,
        getTiposBuques,
        tipoBuque,
        tipoCertificado,
        getTiposCertificados,
        getDocsRejected,
        rejectDocs,
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
        docType,
        setDocType,
        addTipoBuque

    };
}
