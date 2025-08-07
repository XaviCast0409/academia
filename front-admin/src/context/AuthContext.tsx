import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '../service/authService';
import type { LoginResponse } from '../service/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token válido al cargar la aplicación
    const checkAuth = () => {
      const token = authService.getToken();
      const userData = authService.getUser();
      
      if (token && authService.isAuthenticated() && userData) {
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        // Limpiar datos inválidos
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response: LoginResponse = await authService.login(email, password);
      
      // Guardar en localStorage
      authService.setAuth(response.token, response.user);
      
      // Actualizar estado
      setIsAuthenticated(true);
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
