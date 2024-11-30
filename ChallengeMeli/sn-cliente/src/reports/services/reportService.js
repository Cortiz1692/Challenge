import axios from "axios";
import { usersApi } from "../../apis/usersApi";

const BASE_SIGNED ='/dashboard';


export const findAllSolicitudesSignedForDashboard = async () => {
    try {
        const response = await usersApi.get(`${BASE_SIGNED}/signed`);
       console.log('response:', response)
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const findAllSolicitudesPendingForDashboard = async () => {
    try {
        const response = await usersApi.get(`${BASE_SIGNED}/pending`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const findAllSolicitudesProcessedByMonth = async () => {
    try {
        const response = await usersApi.get(`${BASE_SIGNED}/processedByMonth`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }


}