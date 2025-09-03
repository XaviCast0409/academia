import api from './api';
import { User } from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logger } from '@/utils/logger';
import { 
  decodeToken, 
  getCurrentValidToken, 
  clearAuthData,
  isTokenExpired 
} from '@/utils/tokenUtils';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface BackendUser {
  id: number;
  name: string;
  email: string;
  roleId: number;
  pokemonId: number;
  xavicoints: number;
  section: string;
  level: number;
  experience: number;
  currentStreak: number;
  completedActivities: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  role?: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  pokemon?: {
    id: number;
    name: string;
    imageUrl: string;
    highResImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
}

class AuthService {
  // Login user
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      logger.info('Iniciando proceso de login para:', credentials.email);
      
      const response = await api.post('/users/login', credentials);
      const { token, user: backendUser } = response.data;
      
      // Validar token recibido
      if (!token || isTokenExpired(token)) {
        throw new Error('Token inválido recibido del servidor');
      }
      
      // Transform backend user to app user format
      const user: User = {
        id: backendUser.id.toString(),
        username: backendUser.name,
        level: backendUser.level || 1,
        experience: backendUser.experience || 0,
        xaviCoins: backendUser.xavicoints || 0,
        completedActivities: backendUser.completedActivities || 0,
        totalXaviCoins: backendUser.xavicoints || 0,
        currentStreak: backendUser.currentStreak || 0,
        purchasedItems: 0, // Will be fetched separately
        avatar: backendUser.pokemon?.highResImageUrl || backendUser.pokemon?.imageUrl || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        section: backendUser.section,
        roleId: backendUser.roleId,
        pokemonId: backendUser.pokemonId,
      };
      
      // Store token
      await AsyncStorage.setItem('authToken', token);
      
      logger.info('Login exitoso para usuario:', user.username);
      return { token, user };
    } catch (error: any) {
      logger.error('Error en login:', error);
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      logger.info('Iniciando proceso de logout');
      await clearAuthData();
      logger.info('Logout completado exitosamente');
    } catch (error) {
      logger.error('Error en logout:', error);
      // Aún si falla, intentar limpiar datos básicos
      try {
        await AsyncStorage.removeItem('authToken');
      } catch (fallbackError) {
        logger.error('Error en fallback de logout:', fallbackError);
      }
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      // Usar el método seguro para obtener token válido
      const token = await getCurrentValidToken();
      if (!token) {
        logger.info('No hay token válido disponible');
        return null;
      }

      // Decodificar el token para obtener el ID del usuario
      const decodedToken = decodeToken(token);
      if (!decodedToken || !decodedToken.id) {
        logger.error('No se pudo obtener el ID del usuario del token');
        await clearAuthData(); // Limpiar token inválido
        return null;
      }

      logger.info('Obteniendo datos del usuario:', decodedToken.id);
      const response = await api.get(`/users/${decodedToken.id}`);
      const backendUser = response.data;
            
      // Transform backend user to app user format
      const user: User = {
        id: backendUser.id.toString(),
        username: backendUser.name,
        level: backendUser.level || 1,
        experience: backendUser.experience || 0,
        xaviCoins: backendUser.xavicoints || 0,
        completedActivities: backendUser.completedActivities || 0,
        totalXaviCoins: backendUser.xavicoints || 0,
        currentStreak: backendUser.currentStreak || 0,
        purchasedItems: 0, // Will be fetched separately
        avatar: backendUser.pokemon?.highResImageUrl || backendUser.pokemon?.imageUrl || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        section: backendUser.section,
        roleId: backendUser.roleId,
        pokemonId: backendUser.pokemonId,
      };
      
      logger.info('Datos de usuario obtenidos exitosamente');
      return user;
    } catch (error) {
      logger.error('Error obteniendo usuario actual:', error);
      // Si hay error de autenticación, limpiar datos
      if (error instanceof Error && error.message.includes('Sesión expirada')) {
        await clearAuthData();
      }
      return null;
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await getCurrentValidToken();
      return !!token;
    } catch (error) {
      logger.error('Error verificando autenticación:', error);
      return false;
    }
  }

  // Refresh token if needed
  async refreshTokenIfNeeded(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        logger.info('No hay token para refrescar');
        return null;
      }

      // Si el token está expirado, intentar renovarlo
      if (isTokenExpired(token)) {
        logger.info('Token expirado, necesita renovación');
        await clearAuthData();
        return null;
      }

      return token;
    } catch (error) {
      logger.error('Error refrescando token:', error);
      await clearAuthData();
      return null;
    }
  }

  // Update user streak
  async updateStreak(userId: number): Promise<void> {
    try {
      logger.info('Actualizando racha del usuario:', userId);
      await api.patch(`/users/${userId}/streak`);
      logger.info('Racha actualizada exitosamente');
    } catch (error: any) {
      logger.error('Error actualizando racha:', error);
      throw new Error(error.response?.data?.message || 'Error al actualizar racha');
    }
  }
}

export default new AuthService(); 