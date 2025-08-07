import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAuthStore } from '@/store/authStore';

export const useAppStateRefresh = () => {
  const { refreshUserData } = useAuthStore();

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        // Refrescar datos cuando la app vuelve a estar activa
        refreshUserData();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
    };
  }, [refreshUserData]);
}; 