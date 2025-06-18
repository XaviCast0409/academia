import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const useTokenExpiration = () => {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!token) return;

      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = tokenData.exp * 1000; // Convertir a milisegundos
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          logout();
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Error checking token expiration:', error);
        logout();
        navigate('/', { replace: true });
      }
    };

    // Verificar cada minuto
    const interval = setInterval(checkTokenExpiration, 60000);
    checkTokenExpiration(); // Verificar inmediatamente

    return () => clearInterval(interval);
  }, [token, logout, navigate]);
}; 