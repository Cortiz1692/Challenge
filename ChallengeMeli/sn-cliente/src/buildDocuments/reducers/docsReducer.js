export const docsReducer = (state = [], action) => {

    switch (action.type) {
        case 'addDoc':

            return [

                ...state,
                {
                    ...action.payload,
                }
            ];
        case 'loadingTipesShips':
            return action.payload;
        case 'loadingDocsRejected':
            return action.payload;
        case 'loadingTipesCertificates':
            return action.payload;
        case 'loadingDocsAditionals':
            return action.payload;

        default:
            return state;
    }
}