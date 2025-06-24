import axios from 'axios';

export const api = axios.create({
  //baseURL: 'http://localhost:3000/', // ajusta a tu backend
  baseURL: "https://academia-nho8.onrender.com/"  // produccion
});

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