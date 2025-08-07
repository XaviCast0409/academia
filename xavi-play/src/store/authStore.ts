import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user';
import authService from '@/services/authService';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  updateUserXaviCoins: (newXaviCoins: number) => void;
  refreshUserData: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      
      login: async (email: string, password: string) => {
        try {
          console.log('Store: Iniciando login...');
          const response = await authService.login({ email, password });
          console.log("Store: response", response);
          console.log('Store: Login exitoso, actualizando estado...');
          console.log('Store: User data:', response.user);
          console.log('Store: Token:', response.token);
          set({ 
            isAuthenticated: true, 
            user: response.user, 
            token: response.token 
          });
          console.log('Store: Estado actualizado correctamente');
        } catch (error) {
          console.log('Store: Error en login:', error);
          throw error;
        }
      },

      logout: async () => {
        try {
          await authService.logout();
          set({ isAuthenticated: false, user: null, token: null });
        } catch (error) {
          console.error('Logout error:', error);
        }
      },

      updateUser: (userData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      updateUserXaviCoins: (newXaviCoins: number) =>
        set((state) => ({
          user: state.user ? { ...state.user, xaviCoins: newXaviCoins } : null,
        })),

      refreshUserData: async () => {
        try {
          const user = await authService.getCurrentUser();
          if (user) {
            set((state) => ({
              user: { ...state.user, ...user },
            }));
          }
        } catch (error) {
          console.error('Error refreshing user data:', error);
        }
      },

      initializeAuth: async () => {
        try {
          const user = await authService.getCurrentUser();
          if (user) {
            set({ isAuthenticated: true, user });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated, 
        user: state.user, 
        token: state.token 
      }),
    }
  )
); 