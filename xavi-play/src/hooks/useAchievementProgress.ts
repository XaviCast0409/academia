import { useCallback } from 'react';
import { useAchievementStore } from '@/store/achievementStore';
import { useAuthStore } from '@/store/authStore';

/**
 * Hook para manejar las actualizaciones automáticas de progreso de logros
 * Este hook proporciona funciones para actualizar el progreso de logros
 * cuando el usuario realiza diferentes acciones
 */
export const useAchievementProgress = () => {
  const { user } = useAuthStore();
  const {
    updateProgressFromActivity,
    updateProgressFromLevelUp,
    updateProgressFromStreak,
    updateProgressFromCoins,
    forceUpdateAllUserAchievements
  } = useAchievementStore();

  const userId = user?.id ? parseInt(user.id) : null;

  /**
   * Actualizar progreso por actividad completada
   */
  const updateActivityProgress = useCallback(async (activityData: {
    activityType: string;
    mathTopic?: string;
    perfectScore?: boolean;
    xavicoinsEarned?: number;
  }) => {
    if (!userId) {
      return;
    }

    try {
      await updateProgressFromActivity(userId, activityData);
    } catch (error) {
      
    }
  }, [userId, updateProgressFromActivity]);

  /**
   * Actualizar progreso por subida de nivel
   */
  const updateLevelProgress = useCallback(async (newLevel: number) => {
    if (!userId) {
      return;
    }

    try {
      await updateProgressFromLevelUp(userId, newLevel);
    } catch (error) {
      
    }
  }, [userId, updateProgressFromLevelUp]);

  /**
   * Actualizar progreso por racha de días
   */
  const updateStreakProgress = useCallback(async (streakDays: number) => {
    if (!userId) {
      return;
    }

    try {
      await updateProgressFromStreak(userId, streakDays);
    } catch (error) {
      
    }
  }, [userId, updateProgressFromStreak]);

  /**
   * Actualizar progreso por XaviCoins ganadas
   */
  const updateCoinsProgress = useCallback(async (totalCoins: number) => {
    if (!userId) {
      return;
    }

    try {
      await updateProgressFromCoins(userId, totalCoins);
    } catch (error) {
      
    }
  }, [userId, updateProgressFromCoins]);

  /**
   * Forzar actualización de todos los logros (para debugging)
   */
  const forceUpdateAllAchievements = useCallback(async () => {
    if (!userId) {
      return;
    }

    try {
      await forceUpdateAllUserAchievements(userId);
    } catch (error) {
      
    }
  }, [userId, forceUpdateAllUserAchievements]);

  return {
    updateActivityProgress,
    updateLevelProgress,
    updateStreakProgress,
    updateCoinsProgress,
    forceUpdateAllAchievements,
    userId
  };
}; 