// src/store/authStore.ts
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import type { AuthUser } from '../types/user';
import { getUserById } from '../services/userService';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: async (token: string) => {
    const decoded = jwtDecode<AuthUser>(token);
    localStorage.setItem('token', token);
    
    const userData = await getUserById(decoded.id);
    
    set({ token, user:{ ...decoded, ...userData }});
  },

  logout: () => {
    set({ token: null, user: null });
  },

  initAuth:async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<AuthUser>(token);
        localStorage.setItem('token', token);
    
       const userData = await getUserById(decoded.id);
        set({ token, user:{ ...decoded, ...userData } });
      } catch (error) {
        localStorage.removeItem('token');
        set({ token: null, user: null });
      }
    }
  }
}));
