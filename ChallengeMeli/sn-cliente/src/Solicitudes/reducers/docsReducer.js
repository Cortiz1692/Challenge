export const docsReducer = (state = initialState, action) => {
    //console.log(state);


    switch (action.type) {

        case 'loadingUsers':
            return {
                ...state,
                docs: action.payload,
            };
        case 'loadingDocSigned':
            return action.payload;

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
