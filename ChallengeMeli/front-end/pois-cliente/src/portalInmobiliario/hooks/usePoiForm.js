import { useState } from 'react';
import axios from 'axios';
import { createNewPois } from '../services/service';

const initialState = {
  name: '',
  category: '',
  address: '',
  latitude: '',
  longitude: ''
};

export const usePOIForm = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleGetCoordinates = async () => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: formData.address,
          format: 'json',
          limit: 1
        }
      });
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setFormData((prevData) => ({
          ...prevData,
          latitude: lat,
          longitude: lon
        }));
      } else {
        alert('No se encontraron coordenadas para la dirección ingresada.');
      }
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
      alert('Hubo un problema al obtener las coordenadas. Por favor, intenta nuevamente.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const poiData = {
      name: formData.name,
      category: formData.category,
      address: formData.address,
      location: {
        type: 'Point',
        coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)]
      }
    };

    try {
      const response = await createNewPois(poiData);
      console.log('POI creado:', response);
      // Resetear el formulario
      setFormData(initialState);
    } catch (error) {
      console.error('Error al crear POI:', error);
    }
  };

  return {
    formData,
    handleChange,
    handleGetCoordinates,
    handleSubmit
  };
};
