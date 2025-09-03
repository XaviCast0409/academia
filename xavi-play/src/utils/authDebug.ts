import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeToken, isTokenExpired } from './tokenUtils';
import { logger } from './logger';

/**
 * Función para debuggear el estado de autenticación
 */
export const debugAuthState = async () => {
  try {
    logger.info('🔍 Debuggeando estado de autenticación...');
    
    // 1. Verificar token en AsyncStorage
    const storedToken = await AsyncStorage.getItem('authToken');
    logger.info('📱 Token en storage:', storedToken ? 'Existe' : 'No existe');
    
    if (storedToken) {
      // 2. Decodificar token
      const decoded = decodeToken(storedToken);
      if (decoded) {
        logger.info('🔓 Token decodificado:', {
          userId: decoded.id,
          email: decoded.email,
          roleId: decoded.roleId,
          expiresAt: new Date(decoded.exp * 1000).toISOString(),
          isExpired: isTokenExpired(storedToken)
        });
      } else {
        logger.error('❌ Token no se pudo decodificar');
      }
      
      // 3. Verificar expiración
      const expired = isTokenExpired(storedToken);
      logger.info('⏰ Estado de expiración:', expired ? 'EXPIRADO' : 'VÁLIDO');
    }
    
    // 4. Verificar datos de Zustand
    const authStorageData = await AsyncStorage.getItem('auth-storage');
    if (authStorageData) {
      try {
        const parsedData = JSON.parse(authStorageData);
        logger.info('🏪 Datos en Zustand store:', {
          isAuthenticated: parsedData.state?.isAuthenticated,
          hasUser: !!parsedData.state?.user,
          username: parsedData.state?.user?.username
        });
      } catch (parseError) {
        logger.error('❌ Error parseando datos de store:', parseError);
      }
    } else {
      logger.info('🏪 No hay datos en Zustand store');
    }
    
  } catch (error) {
    logger.error('💥 Error en debug de autenticación:', error);
  }
};

/**
 * Función para limpiar completamente el estado de auth
 */
export const clearAllAuthData = async () => {
  try {
    logger.info('🧹 Limpiando todos los datos de autenticación...');
    
    await AsyncStorage.multiRemove([
      'authToken',
      'auth-storage'
    ]);
    
    logger.info('✅ Datos de autenticación limpiados');
  } catch (error) {
    logger.error('❌ Error limpiando datos de auth:', error);
  }
};
