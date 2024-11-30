import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDocs } from "../hooks/useDocs";
import { CC, CDC, CGS, CIPB, CIPBP, CIPGS, CNPB, CNPBP, CPGS, DC, DPC,DCI, CPDC, CIGS   } from "../documents/index"


export const SelectDocument = () => {

    const {type} = useParams();
    const { setDocType } = useDocs();

    useEffect(()=> {
      setDocType(type);
    }, [type, setDocType]);
    
    switch (type) {
      case '1':
          return <DPC />;
          case '2':
            return <DC />;
      case '3':
        return <CC />;
        case '4':
          return <CGS />;
          case '5':
            return <CPGS/>;
            case '6':
              return <CDC/>;
              case '7':
                return <CNPB/>;
                case '8':
                  return <CNPBP/>;
                  case '9':
                    return <CIPB/>;
                    case '10':
                      return <CIPBP/>;
                      case '11':
                        return <CIPGS/>;
                      case '12':
                        return <DCI/>;
                      case '13':
                        return <CPDC/>;
                      case '14':
                        return <CIGS/>;
      default:
        return console.log('Formulario no encontrado')
    }
  }
  
