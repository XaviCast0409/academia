import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useAchievementStore } from '@/store/achievementStore';
import { AppState } from 'react-native';
import authService from '@/services/authService';

/**
 * Hook para actualizar automáticamente la racha de conexión
 * Se ejecuta cuando la app se abre o cuando vuelve del background
 */
export const useStreakUpdate = () => {
  const { user, isAuthenticated, refreshUserData } = useAuthStore();
  const { updateProgressFromStreak } = useAchievementStore();
  const lastUpdateRef = useRef<string | null>(null);
  const isUpdatingRef = useRef(false);

  const updateStreak = async () => {
    if (!user) return;
    
    try {
      // 1. Actualizar racha en el backend
      await authService.updateStreak(parseInt(user.id));
      
      // 2. Refrescar datos del usuario para obtener la nueva racha
      await refreshUserData();
      
      // 3. Obtener la racha actualizada
      const updatedUser = useAuthStore.getState().user;
      const currentStreak = updatedUser?.currentStreak || 0;
      
      // 4. Actualizar progreso de logros basados en racha
      if (currentStreak > 0) {
        await updateProgressFromStreak(parseInt(user.id), currentStreak);
      }
      
      console.log(`Streak updated successfully: ${currentStreak} days`);
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user && !isUpdatingRef.current) {
      const today = new Date().toDateString();
      
      // Solo actualizar una vez por día por usuario
      const updateKey = `${user.id}-${today}`;
      if (lastUpdateRef.current === updateKey) {
        return;
      }

      isUpdatingRef.current = true;
      
      // Actualizar racha inmediatamente al cargar
      updateStreak().finally(() => {
        lastUpdateRef.current = updateKey;
        isUpdatingRef.current = false;
      });

      // Escuchar cambios de estado de la app
      const handleAppStateChange = (nextAppState: string) => {
        if (nextAppState === 'active' && !isUpdatingRef.current) {
          const currentToday = new Date().toDateString();
          const currentUpdateKey = `${user.id}-${currentToday}`;
          
          if (lastUpdateRef.current !== currentUpdateKey) {
            isUpdatingRef.current = true;
            updateStreak().finally(() => {
              lastUpdateRef.current = currentUpdateKey;
              isUpdatingRef.current = false;
            });
          }
        }
      };

      const subscription = AppState.addEventListener('change', handleAppStateChange); 

      return () => {
        subscription?.remove();
      };
    }
    
    // Retornar función de limpieza vacía cuando no se cumple la condición
    return () => {};
  }, [isAuthenticated, user?.id]);

  return {
    user,
    isAuthenticated
  };
};

export default useStreakUpdate;