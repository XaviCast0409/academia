import api from './api';
import { RankingResponse, RankingFilters } from '@/types/ranking';

class RankingService {
  // Obtener ranking de usuarios
  async getRanking(filters?: RankingFilters): Promise<RankingResponse> {
    try {
      console.log('RankingService: Getting ranking with filters-------------------------------------------:', filters);
      
      const params = filters?.section ? { section: filters.section } : {};
      console.log('RankingService: Request params:', params);
      
      const response = await api.get('/users', { params });
      
      console.log('RankingService: Ranking retrieved successfully:', response.data);
      console.log('RankingService: Number of users returned:', response.data.length);
      
      return {
        users: response.data,
        total: response.data.length
      };
    } catch (error: any) {
      console.error('RankingService: Error getting ranking:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al obtener el ranking';
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error('Error inesperado al obtener el ranking');
      }
    }
  }
}

export default new RankingService(); 