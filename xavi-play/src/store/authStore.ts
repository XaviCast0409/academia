import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user';
import authService from '@/services/authService';
import { logger, stateLogger } from '@/utils/logger';

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
  checkAuthStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      
      login: async (email: string, password: string) => {
        try {
          stateLogger.storeUpdate('authStore', 'login', { email });
          const response = await authService.login({ email, password });
          
          set({ 
            isAuthenticated: true, 
            user: response.user, 
            token: response.token 
          });
          
          stateLogger.storeUpdate('authStore', 'login:success', { 
            userId: response.user.id, 
            username: response.user.username 
          });
        } catch (error) {
          stateLogger.storeError('authStore', 'login', error);
          throw error;
        }
      },

      logout: async () => {
        try {
          // limpiar token y storage persistente
          await authService.logout();
          await AsyncStorage.removeItem('auth-storage');
          set({ isAuthenticated: false, user: null, token: null });
        } catch (error) {
          // aun si falla, forzar estado limpio
          set({ isAuthenticated: false, user: null, token: null });
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
          stateLogger.storeUpdate('authStore', 'refreshUserData:start');
          const user = await authService.getCurrentUser();
          if (user) {
            set((state) => ({
              user: { ...state.user, ...user },
            }));
            stateLogger.storeUpdate('authStore', 'refreshUserData:success', { userId: user.id });
          }
        } catch (error) {
          stateLogger.storeError('authStore', 'refreshUserData', error);
        }
      },

      initializeAuth: async () => {
        try {
          stateLogger.storeUpdate('authStore', 'initializeAuth:start');
          const user = await authService.getCurrentUser();
          set({ isAuthenticated: !!user, user: user || null, token: null });
          stateLogger.storeUpdate('authStore', 'initializeAuth:success', { authenticated: !!user });
        } catch (error) {
          stateLogger.storeError('authStore', 'initializeAuth', error);
          set({ isAuthenticated: false, user: null, token: null });
        }
      },

      checkAuthStatus: async () => {
        try {
          stateLogger.storeUpdate('authStore', 'checkAuthStatus:start');
          const token = await authService.refreshTokenIfNeeded();
          const isValid = !!token;
          
          if (!isValid) {
            set({ isAuthenticated: false, user: null, token: null });
            stateLogger.storeUpdate('authStore', 'checkAuthStatus:invalid');
            return false;
          }

          // Si hay token válido pero no hay usuario cargado, intentar cargar
          const currentState = useAuthStore.getState();
          if (!currentState.user) {
            const user = await authService.getCurrentUser();
            set({ isAuthenticated: !!user, user: user || null, token });
          }

          stateLogger.storeUpdate('authStore', 'checkAuthStatus:valid');
          return true;
        } catch (error) {
          stateLogger.storeError('authStore', 'checkAuthStatus', error);
          set({ isAuthenticated: false, user: null, token: null });
          return false;
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