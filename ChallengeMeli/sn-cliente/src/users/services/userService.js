import { usersApi, loadApi } from "../../apis/usersApi";

const BASE_URL = '/users';
const BASE_URL_DOCS = '/api/documentos'
const BASE_URL_PROFILE = '/api/profile'

export const findAll = async () => {
    try {
        const response = await usersApi.get(BASE_URL);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const findAllPages = async (page = 0) => {
    try {
        const response = await usersApi.get(`${BASE_URL}/page/${page}`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



export const save = async (user) => {
    const userToSave = { ...user };
    if (userToSave.id === 0 || userToSave.id === undefined) {
        delete userToSave.id;
    }

    try {
        const response = await usersApi.post(BASE_URL, userToSave);
        console.log('Response from save:', response); // Debería mostrar la respuesta del servidor
        return response;
    } catch (error) {
        console.error('Error in save:', error);
        throw error; // Lanza el error si ocurre alguno para que el handler lo capture
    }
};


export const update = async ({ id, username, password, dni, nombre, email, cargo, pna, admin, divDocumentacion, divDotacion, divRegistro, firmanteDivision }) => {
    try {
        return await usersApi.put(`${BASE_URL}/${id}`, {
            username,
            password,
            dni,
            nombre,
            email,
            cargo,
            pna,
            admin,
            divDocumentacion,
            divDotacion,
            divRegistro,
            firmanteDivision

        });
    } catch (error) {
        throw error;
    }
}

export const remove = async (id) => {
    try {
        await usersApi.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw error;
    }
}

