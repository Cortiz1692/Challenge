import { useReducer } from 'react';
import { saveDocumentEmail, sendDocumentToApi } from '../services/emailService';
import { emailReducer } from '../reducers/emailReducer';

const initialState = {
    email: [],
};

export const useEmail = () => {
    const [email, dispatch] = useReducer(emailReducer, initialState);

    const saveEmail = async (document) => {
        try {
            const result = await saveDocumentEmail(document);
            dispatch({
                type: 'saveEmails',
                payload: result.data,
            });
        } catch (error) {
            if (error.response?.status === 401) {
                handlerLogout();
            }
        }
    };

    const sendDocument = async (document) => {

        try {
            const result = await sendDocumentToApi(document);
            dispatch({
                type: 'sendEmails',
                payload: result.data,
            });
        } catch (error) {
            if (error.response?.status === 401) {
                handlerLogout();
            }
        }
    };

    return {
        email,
        saveEmail,
        sendDocument
    };
};
