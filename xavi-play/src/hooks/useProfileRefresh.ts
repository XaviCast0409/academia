import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export const useProfileRefresh = () => {
  const { refreshUserData } = useAuthStore();

  useEffect(() => {
    // Refrescar datos del usuario cuando se monta el componente
    refreshUserData();
  }, [refreshUserData]);

  return { refreshUserData };
}; 