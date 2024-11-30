import axios from "axios";

export const usersApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`
});

usersApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});


export const loadApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL_LOAD}`
});


export const loadAditional = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL_LOAD_ADITIONAL}`
});
