/**
 * Utilidades para manejo seguro de tokens JWT
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from './logger';

export interface DecodedToken {
  id: number;
  email: string;
  roleId: number;
  exp: number;
  iat: number;
}

/**
 * Decodifica un token JWT de forma segura
 */
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    if (!token || typeof token !== 'string') {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      logger.error('Token JWT malformado: no tiene 3 partes');
      return null;
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Añadir padding si es necesario
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
    
    const jsonPayload = decodeURIComponent(
      atob(padded)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const decoded = JSON.parse(jsonPayload) as DecodedToken;
    
    // Validar que tiene los campos requeridos
    if (!decoded.id || !decoded.exp) {
      logger.error('Token JWT no contiene campos requeridos (id, exp)');
      return null;
    }

    return decoded;
  } catch (error) {
    logger.error('Error decodificando token JWT:', error);
    return null;
  }
};

/**
 * Verifica si un token ha expirado
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  
  const now = Math.floor(Date.now() / 1000);
  const bufferTime = 60; // 1 minuto de buffer
  
  return decoded.exp <= (now + bufferTime);
};

/**
 * Obtiene el token actual del storage y verifica su validez
 */
export const getCurrentValidToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    
    if (!token) {
      return null;
    }
    
    if (isTokenExpired(token)) {
      logger.warn('Token expirado, removiendo del storage');
      await AsyncStorage.removeItem('authToken');
      return null;
    }
    
    return token;
  } catch (error) {
    logger.error('Error obteniendo token válido:', error);
    return null;
  }
};

/**
 * Calcula el tiempo restante antes de que expire el token (en minutos)
 */
export const getTokenTimeRemaining = (token: string): number => {
  const decoded = decodeToken(token);
  if (!decoded) return 0;
  
  const now = Math.floor(Date.now() / 1000);
  const remaining = decoded.exp - now;
  
  return Math.max(0, Math.floor(remaining / 60)); // Convertir a minutos
};

/**
 * Verifica si el token necesita ser renovado pronto (menos de 5 minutos)
 */
export const shouldRefreshToken = (token: string): boolean => {
  const timeRemaining = getTokenTimeRemaining(token);
  return timeRemaining <= 5 && timeRemaining > 0;
};

/**
 * Limpia todos los datos de autenticación del storage
 */
export const clearAuthData = async (): Promise<void> => {
  try {
    await Promise.all([
      AsyncStorage.removeItem('authToken'),
      AsyncStorage.removeItem('auth-storage') // Zustand persist storage
    ]);
    logger.info('Datos de autenticación limpiados');
  } catch (error) {
    logger.error('Error limpiando datos de autenticación:', error);
  }
};
