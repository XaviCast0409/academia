import { api } from '../utils/api';
import type { User } from '../types/user';

interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  async register(userData: {
    name: string;
    email: string;
    password: string;
    roleId: number;
    section: string;
  }) {
    const response = await api.post(`/users/create`, userData);
    return response.data;
  },

  async verifyCode(email: string, code: string) {
    const response = await api.post(`/users/verify-code`, {
      email,
      code,
    });
    return response.data;
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(`/users/login`, {
        email,
        password,
      });
      
      if (!response.data || !response.data.token || !response.data.user) {
        throw new Error('No se recibió una respuesta válida del servidor');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en authService.login:', error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error al intentar iniciar sesión');
    }
  },
};