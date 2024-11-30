export const documentationReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'loadingDocumentation':
            return {
                ...state,
                docs: action.payload
            };

        case 'devolverDocumento':
            return {
                ...state,
                docs: state.docs.filter(doc => doc.idCertificado !== action.payload.idCertificado)
            };

        case "removeSignedDocument":
            return {
                ...state,
                docs: state.docs.filter((doc) => doc.idCertificado !== action.payload),
            };

        default:
            return state;
    }

}


