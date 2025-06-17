import { api } from '../utils/api';

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

  async login(email: string, password: string) {
    try {
      const response = await api.post(`/users/login`, {
        email,
        password,
      });
      
      if (!response.data || !response.data.token) {
        throw new Error('No se recibió un token válido del servidor');
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error al intentar iniciar sesión');
    }
  },
};