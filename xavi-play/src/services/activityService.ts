import api from './api';
import { ActivitiesResponse, Activity } from '@/types/activity';

class ActivityService {
  // Obtener actividades disponibles para un estudiante
  async getAvailableActivities(studentId: number, page: number = 1, limit: number = 10): Promise<ActivitiesResponse> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const response = await api.get(`/activities/available/${studentId}?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener actividades');
    }
  }

  // Obtener detalles de una actividad específica
  async getActivityDetails(activityId: number): Promise<Activity> {
    try {
      const response = await api.get(`/activities/${activityId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener detalles de la actividad');
    }
  }
}

export default new ActivityService(); 