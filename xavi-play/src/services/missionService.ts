import api from './api';
import { 
  UserMission, 
  ClaimRewardRequest, 
  ClaimRewardResponse 
} from '@/types/mission';

class MissionService {
  // Obtener misiones activas del usuario
  async getActiveMissions(userId: number): Promise<UserMission[]> {
    try {
      const response = await api.get('/missions/active', {
        params: { userId }
      });
      return response.data;
    } catch (error: any) {
      console.error('MissionService: Error getting active missions:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al obtener las misiones activas';
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error('Error inesperado al obtener las misiones activas');
      }
    }
  }

  // Obtener historial de misiones del usuario
  async getMissionHistory(userId: number): Promise<UserMission[]> {
    try {
      const response = await api.get('/missions/history', {
        params: { userId }
      });
      return response.data;
    } catch (error: any) {
      console.error('MissionService: Error getting mission history:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al obtener el historial de misiones';
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error('Error inesperado al obtener el historial de misiones');
      }
    }
  }

  // Reclamar recompensa de misión
  async claimMissionReward(userId: number, missionId: number): Promise<ClaimRewardResponse> {
    try {
      const requestData: ClaimRewardRequest = { userId };
      
      const response = await api.post(`/missions/${missionId}/claim`, requestData);
      return response.data;
    } catch (error: any) {
      console.error('MissionService: Error claiming reward:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al reclamar la recompensa';
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error('Error inesperado al reclamar la recompensa');
      }
    }
  }

  // Actualizar progreso de misión
  async updateMissionProgress(userId: number, missionId: number, increment: number = 1): Promise<UserMission> {
    try {
      const response = await api.post(`/missions/${missionId}/progress`, {
        userId,
        increment
      });
      return response.data;
    } catch (error: any) {
      console.error('MissionService: Error updating mission progress:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al actualizar el progreso de la misión';
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error('Error inesperado al actualizar el progreso de la misión');
      }
    }
  }
}

export default new MissionService(); 