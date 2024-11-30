
export const loginReducer = (state = {}, action) => {

    switch (action.type) {
        case 'login':
            return {
                isAuth: true,
                isAdmin: action.payload.isAdmin,
                isControlGestionEmpresas: action.payload.isControlGestionEmpresas,
                isDocumentacion: action.payload.isDocumentacion,
                isDotacion: action.payload.isDotacion,
                isFirmanteDivision:action.payload.isFirmanteDivision,
                user: action.payload.user,
            };
        case 'logout':
            return {
                isAuth: false,
                isAdmin: false,
                isControlGestionEmpresas: false,
                isDocumentacion: false,
                isDotacion: false,
                isFirmanteDivision:false,
                 user: undefined,
            };
        default:
            return state;
    }

}