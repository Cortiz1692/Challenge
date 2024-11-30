
export const docuReducer = (state = [], action) => {
    switch (action.type) {

        case 'loadingDocuRejected':
            return action.payload;
        case 'loadingBC':
            return action.payload;

        default:
            return state;
    }
}
