import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base API configuration
const api = axios.create({
  baseURL: 'http://192.168.18.159:3000/', // IP local para React Native
  //baseURL: 'http://localhost:3000/', // para web
  //baseURL: "https://academia-nho8.onrender.com/"  // produccion
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    // Add auth token if available
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Error getting token from AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const message = error.response.data?.message || 'Error en la solicitud';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      return Promise.reject(new Error('No se recibió respuesta del servidor'));
    } else {
      // Algo sucedió al configurar la solicitud
      return Promise.reject(new Error('Error al configurar la solicitud'));
    }
  }
);

export default api; 