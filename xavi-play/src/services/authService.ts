import api from './api';
import { User } from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para decodificar el token JWT y obtener el ID del usuario
const decodeToken = (token: string): { id: number } | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

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
      console.log('AuthService: Iniciando login...');
      const response = await api.post('/users/login', credentials);
      console.log('AuthService: Response recibida:', response.data);
      const { token, user: backendUser } = response.data;
      
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
      console.log('AuthService: Token guardado en AsyncStorage');
      
      const result = { token, user };
      console.log('AuthService: Retornando resultado:', result);
      return result;
    } catch (error: any) {
      console.log('AuthService: Error en login:', error);
      console.log('AuthService: Error response:', error.response);
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      // Remove token
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) return null;

      // Decodificar el token para obtener el ID del usuario
      const decodedToken = decodeToken(token);
      if (!decodedToken || !decodedToken.id) {
        console.error('No se pudo obtener el ID del usuario del token');
        return null;
      }

      const response = await api.get(`/users/byId/${decodedToken.id}`);
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
      
      return user;
    } catch (error) {
      return null;
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return !!token;
    } catch (error) {
      return false;
    }
  }

  // Update user streak
  async updateStreak(userId: number): Promise<void> {
    try {
      await api.post(`/users/streak/${userId}`);
    } catch (error: any) {
      console.error('Error updating streak:', error);
      throw new Error(error.response?.data?.message || 'Error al actualizar racha');
    }
  }
}

export default new AuthService(); 