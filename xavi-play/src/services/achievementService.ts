import api from './api';
import {
  Achievement,
  UserAchievement,
  ClaimAchievementResponse,
  AchievementStats
} from '@/types/achievement';

class AchievementService {
  /**
   * Obtener todos los logros disponibles
   */
  async getAllAchievements(): Promise<Achievement[]> {
    try {
      const response = await api.get('/achievements');
      return response.data.data || response.data;
    } catch (error) {
      console.error('AchievementService: Error obteniendo logros:', error);
      this.handleError(error, 'Error al obtener los logros');
    }
  }

  /**
   * Obtener logros de un usuario específico con su progreso
   */
  async getUserAchievements(userId: number): Promise<UserAchievement[]> {
    try {
      const response = await api.get('/achievements/user', {
        params: { userId }
      });
      return response.data.data?.userAchievements || response.data.userAchievements || response.data;
    } catch (error) {
      console.error('AchievementService: Error obteniendo logros del usuario:', error);
      this.handleError(error, 'Error al obtener tus logros');
    }
  }

  /**
   * Obtener progreso detallado de logros de un usuario (nuevo endpoint)
   */
  async getAchievementProgress(userId: number): Promise<UserAchievement[]> {
    try {
      const response = await api.get(`/achievements/progress/debug/${userId}`);
      return response.data.data?.userAchievements || response.data.userAchievements || [];
    } catch (error) {
      console.error('AchievementService: Error obteniendo progreso detallado de logros:', error);
      this.handleError(error, 'Error al obtener el progreso de logros');
    }
  }

  /**
   * Reclamar recompensa de un logro
   */
  async claimAchievementReward(userId: number, achievementId: number): Promise<ClaimAchievementResponse> {
    try {
      const response = await api.post(`/achievements/${achievementId}/claim`, {
        userId
      });
      return response.data;
    } catch (error) {
      console.error('AchievementService: Error reclamando recompensa:', error);
      this.handleError(error, 'Error al reclamar la recompensa');
    }
  }

  /**
   * Verificar y actualizar logros de un usuario (manual)
   */
  async checkAndUpdateAchievements(userId: number, activityData?: any): Promise<UserAchievement[]> {
    try {
      const response = await api.post('/achievements/check', {
        userId,
        activityData
      });
      return response.data.data?.newlyUnlocked || response.data.newlyUnlocked || [];
    } catch (error) {
      console.error('AchievementService: Error verificando logros:', error);
      this.handleError(error, 'Error al verificar logros');
    }
  }

  /**
   * Asignar todos los logros a un usuario automáticamente
   */
  async assignAllAchievements(userId: number): Promise<any> {
    try {
      const response = await api.post(`/achievements/assign/${userId}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('AchievementService: Error asignando logros:', error);
      this.handleError(error, 'Error al asignar los logros');
    }
  }

  /**
   * Actualizar progreso de logros después de una acción (nuevo endpoint)
   */
  async updateAchievementProgress(userId: number, activityData?: any): Promise<UserAchievement[]> {
    try {
      const response = await api.post(`/achievements/progress/action/${userId}`, activityData);
      return response.data.data?.unlockedAchievements || response.data.unlockedAchievements || [];
    } catch (error) {
      console.error('AchievementService: Error actualizando progreso:', error);
      this.handleError(error, 'Error al actualizar el progreso de logros');
    }
  }

  /**
   * Forzar actualización de todos los logros de un usuario (debugging)
   */
  async forceUpdateAllUserAchievements(userId: number): Promise<any> {
    try {
      const response = await api.post(`/achievements/progress/force-update/${userId}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error('AchievementService: Error en actualización forzada:', error);
      this.handleError(error, 'Error al forzar la actualización de logros');
    }
  }

  /**
   * Actualizar progreso por actividad completada
   */
  async updateProgressFromActivity(userId: number, activityData: any): Promise<UserAchievement[]> {
    try {
      const response = await api.post(`/achievements/progress/activity/${userId}`, activityData);
      return response.data.data?.unlockedAchievements || response.data.unlockedAchievements || [];
    } catch (error) {
      console.error('AchievementService: Error actualizando progreso por actividad:', error);
      this.handleError(error, 'Error al actualizar progreso por actividad');
    }
  }

  /**
   * Actualizar progreso por subida de nivel
   */
  async updateProgressFromLevelUp(userId: number, newLevel: number): Promise<UserAchievement[]> {
    try {
      const response = await api.post(`/achievements/progress/level/${userId}`, { newLevel });
      return response.data.data?.unlockedAchievements || response.data.unlockedAchievements || [];
    } catch (error) {
      console.error('AchievementService: Error actualizando progreso por subida de nivel:', error);
      this.handleError(error, 'Error al actualizar progreso por subida de nivel');
    }
  }

  /**
   * Actualizar progreso por racha de días
   */
  async updateProgressFromStreak(userId: number, streakDays: number): Promise<UserAchievement[]> {
    try {
      const response = await api.post(`/achievements/progress/streak/${userId}`, { streakDays });
      return response.data.data?.unlockedAchievements || response.data.unlockedAchievements || [];
    } catch (error) {
      console.error('AchievementService: Error actualizando progreso por racha:', error);
      this.handleError(error, 'Error al actualizar progreso por racha');
    }
  }

  /**
   * Actualizar progreso por XaviCoins ganadas
   */
  async updateProgressFromCoins(userId: number, totalCoins: number): Promise<UserAchievement[]> {
    try {
      const response = await api.post(`/achievements/progress/coins/${userId}`, { totalCoins });
      return response.data.data?.unlockedAchievements || response.data.unlockedAchievements || [];
    } catch (error) {
      console.error('AchievementService: Error actualizando progreso por XaviCoins:', error);
      this.handleError(error, 'Error al actualizar progreso por XaviCoins');
    }
  }

  /**
   * Generar estadísticas de logros para un usuario
   */
  async getAchievementStats(userId: number): Promise<AchievementStats> {
    try {

      // Obtener logros del usuario
      const userAchievements = await this.getUserAchievements(userId);

      // Calcular estadísticas
      const total = userAchievements.length;
      const unlocked = userAchievements.filter(ua => ua.isUnlocked).length;
      const claimed = userAchievements.filter(ua => ua.rewardClaimed).length;
      const pendingClaim = userAchievements.filter(ua => ua.isUnlocked && !ua.rewardClaimed).length;

      // Estadísticas por categoría
      const categoryMap = new Map<string, { total: number; unlocked: number }>();

      userAchievements.forEach(ua => {
        const category = ua.achievement.category;
        if (!categoryMap.has(category)) {
          categoryMap.set(category, { total: 0, unlocked: 0 });
        }

        const stats = categoryMap.get(category)!;
        stats.total += 1;
        if (ua.isUnlocked) {
          stats.unlocked += 1;
        }
      });

      const byCategory = Array.from(categoryMap.entries()).map(([category, stats]) => ({
        category,
        ...stats
      }));

      return {
        total,
        unlocked,
        claimed,
        pendingClaim,
        byCategory
      };
    } catch (error) {
      console.error('AchievementService: Error calculando estadísticas:', error);
      this.handleError(error, 'Error al calcular estadísticas de logros');
    }
  }

  /**
   * Manejo de errores centralizado
   */
  private handleError(error: any, defaultMessage: string): never {
    if (error.response) {
      // Error de respuesta del servidor
      const message = error.response.data?.message || error.response.data?.error || defaultMessage;
      throw new Error(message);
    } else if (error.request) {
      // Error de red/conexión
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
    } else {
      // Error de configuración
      throw new Error(error.message || defaultMessage);
    }
  }
}

export default new AchievementService();