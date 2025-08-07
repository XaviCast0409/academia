import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useAchievementStore } from '@/store/achievementStore';

/**
 * Hook para refrescar automáticamente los logros del usuario
 * Se ejecuta cuando el usuario está autenticado
 */
export const useAchievementRefresh = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { loadAllAchievements, loadUserAchievements, assignAllAchievements } = useAchievementStore();

  useEffect(() => {
    if (isAuthenticated && user) {
  
      
      const initializeAchievements = async () => {
        try {
          // 1. Cargar todos los logros del sistema
          await loadAllAchievements();
          
          // 2. Cargar logros específicos del usuario
          await loadUserAchievements(parseInt(user.id));
          
          // 3. Asignar logros si el usuario no tiene ninguno (usuario nuevo o primera vez)
          // Solo hacerlo si realmente no hay ningún logro para evitar bucles
          const userAchievements = useAchievementStore.getState().userAchievements;
          if (userAchievements.length === 0) {
    
            // Usar timeout para evitar que interfiera con otras actualizaciones
            setTimeout(() => {
              assignAllAchievements(parseInt(user.id)).catch(() => {});
            }, 1000);
          }
          
            } catch (error) {
      
    }
      };
      
      initializeAchievements();
    }
  }, [isAuthenticated, user, loadAllAchievements, loadUserAchievements, assignAllAchievements]);

  return {
    user,
    isAuthenticated
  };
};

export default useAchievementRefresh;