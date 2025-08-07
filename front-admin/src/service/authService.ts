import { api } from './api';

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    roleId: number;
    role: {
      id: number;
      name: string;
    };
  };
}

export interface DecodedToken {
  id: number;
  roleId: number;
  idRole: number;
  iat: number;
  exp: number;
}

export const authService = {
  // Login
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  },

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Guardar token y usuario en localStorage
  setAuth(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Obtener token del localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  },

  // Obtener usuario del localStorage
  getUser(): any | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decodificar el token JWT (solo la parte del payload)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      // Verificar si el token no ha expirado
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  },

  // Obtener el ID del usuario del token
  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (error) {
      console.error('Error getting user ID from token:', error);
      return null;
    }
  },

  // Obtener el roleId del usuario del token
  getUserRoleId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roleId;
    } catch (error) {
      console.error('Error getting role ID from token:', error);
      return null;
    }
  }
};
