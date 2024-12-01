import { poisApi } from "../../api/poisApi";

const BASE_URL_POIS = '/geospatial/pois-near-property';
const BASE_URL_PROPERTIES = '/geospatial/properties';
const BASE_URL_CATEGORIES = '/geospatial/categories';
const BASE_URL_NEW_POIS = '/create/newPois';

export const findAllProperties = async () => {
  try {
    const response = await poisApi.get(BASE_URL_PROPERTIES);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las propiedades:', error);
    throw error;
  }
};

export const getPoisNearProperty = async (latitude, longitude) => {
  try {
    // Asegúrate de que los parámetros se pasan correctamente
    const response = await poisApi.get(`${BASE_URL_POIS}?latitude=${latitude}&longitude=${longitude}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los POIs:', error);
    throw error;
  }
};
  export const getCategories = async () => {
  try {
    const response = await poisApi.get(BASE_URL_CATEGORIES);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    throw error;
  }
};

export const createNewPois = async (poiData) => {
  try {
    const response = await poisApi.post(BASE_URL_NEW_POIS, poiData);
    return response.data;
  } catch (error) {
    console.error('Error al crear nuevo POI:', error);
    throw error;
  }
};


