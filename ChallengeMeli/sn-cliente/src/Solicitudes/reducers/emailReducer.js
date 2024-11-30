const initialState = {
    email: [],
    saveEmail: null,
    sendEmail: null,
};

export const emailReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'saveEmails':
            return {
                ...state,
                saveEmail: action.payload,
            };
        case 'sendEmails':
            return {
                ...state,
                sendEmail: action.payload,
            };
        default:
            return state;
    }
};
