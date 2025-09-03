import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiLogger } from '@/utils/logger';

// Configuración de entornos
const API_CONFIG = {
  development: 'http://192.168.18.159:3000', // Tu IP local que ya funcionaba
  staging: 'https://staging.academia.com',
  production: 'https://academia-nho8.onrender.com'
};

// Determinar entorno actual
const getEnvironment = (): keyof typeof API_CONFIG => {
  // Configuración para desarrollo local
  // if (__DEV__) return 'development';
  return 'production';
};

// Configuración base de la API
const api = axios.create({
  baseURL: API_CONFIG[getEnvironment()],
  timeout: 30000, // 30 segundos timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contador para retry logic
const retryConfig = new Map<string, number>();
const MAX_RETRIES = 3;

// Request interceptor for adding auth token and logging
api.interceptors.request.use(
  async (config) => {
    try {
      // Add auth token if available and valid
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        // Verificar si el token está expirado antes de usarlo
        try {
          const { isTokenExpired } = require('@/utils/tokenUtils');
          if (!isTokenExpired(token)) {
            config.headers.Authorization = `Bearer ${token}`;
          } else {
            // Token expirado, removemos del storage
            await AsyncStorage.removeItem('authToken');
            apiLogger.error('REQUEST', 'token-expired', 'Token expirado removido del storage');
          }
        } catch (tokenError) {
          // Si hay error verificando token, intentamos usarlo de todas formas
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      
      // Log request
      apiLogger.request(config.method?.toUpperCase() || 'GET', config.url || '', config.data);
      
      return config;
    } catch (error) {
      apiLogger.error(config.method?.toUpperCase() || 'GET', config.url || '', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    apiLogger.error('REQUEST', 'interceptor', error);
    return Promise.reject(error);
  }
);

// Response interceptor con retry logic y logging mejorado
api.interceptors.response.use(
  (response) => {
    // Log successful response
    apiLogger.response(
      response.config.method?.toUpperCase() || 'GET',
      response.config.url || '',
      response.status,
      response.data
    );
    
    // Reset retry count on success
    const requestKey = `${response.config.method}-${response.config.url}`;
    retryConfig.delete(requestKey);
    
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const requestKey = `${originalRequest?.method}-${originalRequest?.url}`;
    
    // Log error
    apiLogger.error(
      originalRequest?.method?.toUpperCase() || 'GET',
      originalRequest?.url || '',
      error
    );
    
    // Retry logic para errores de red o 5xx
    if (
      originalRequest && 
      !originalRequest._retry &&
      (error.code === 'NETWORK_ERROR' || 
       error.code === 'TIMEOUT' ||
       (error.response?.status && error.response.status >= 500))
    ) {
      const retryCount = retryConfig.get(requestKey) || 0;
      
      if (retryCount < MAX_RETRIES) {
        retryConfig.set(requestKey, retryCount + 1);
        originalRequest._retry = true;
        
        // Delay progresivo: 1s, 2s, 4s
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return api(originalRequest);
      }
    }
    
    // Manejo de errores específicos compatible con backend
    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data as any;
      
      // El backend puede retornar errores en diferentes formatos:
      // { error: "mensaje" } - formato principal del errorHelper
      // { message: "mensaje" } - formato alternativo
      // { errors: [...] } - formato de validación
      let message = 'Error en la solicitud';
      
      if (responseData) {
        if (typeof responseData === 'string') {
          message = responseData;
        } else if (responseData.error) {
          message = responseData.error;
        } else if (responseData.message) {
          message = responseData.message;
        } else if (responseData.errors && Array.isArray(responseData.errors)) {
          // Errores de validación de express-validator
          message = responseData.errors.map((err: any) => err.msg || err.message).join(', ');
        }
      }
      
      switch (status) {
        case 401:
          // Token expirado o inválido - limpiar todos los datos de auth
          await AsyncStorage.multiRemove(['authToken', 'auth-storage']);
          return Promise.reject(new Error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente para continuar.'));
        case 403:
          return Promise.reject(new Error('No tienes permisos para realizar esta acción.'));
        case 404:
          return Promise.reject(new Error('Recurso no encontrado.'));
        case 429:
          return Promise.reject(new Error('Demasiadas solicitudes. Intenta más tarde.'));
        case 500:
          return Promise.reject(new Error('Error interno del servidor.'));
        default:
          return Promise.reject(new Error(message));
      }
    } else if (error.request) {
      return Promise.reject(new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.'));
    } else {
      return Promise.reject(new Error('Error al configurar la solicitud.'));
    }
  }
);

export default api; 