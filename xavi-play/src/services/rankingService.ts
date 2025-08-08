import api from './api';
import { RankingResponse, RankingFilters, RankingUser } from '@/types/ranking';

class RankingService {
  // Obtener ranking de usuarios
  async getRanking(filters?: RankingFilters): Promise<RankingResponse> {
    try {
      const params: any = { page: 1, limit: 100 };
      if (filters?.section) params.section = filters.section;

      const response = await api.get('/users', { params });
      const payload = response.data?.data;

      const usersRaw: any[] = payload?.users || [];
      const users: RankingUser[] = usersRaw.map((u: any) => ({
        id: u.id,
        name: u.username || u.name || '',
        level: u.level ?? 0,
        experience: u.experience ?? 0,
        section: u.section || '',
        xavicoints: u.xaviCoins ?? u.xavicoints ?? 0,
        pokemon: u.pokemon
          ? {
              id: u.pokemon.id,
              name: u.pokemon.name,
              imageUrl: u.pokemon.imageUrl,
              highResImageUrl: u.pokemon.highResImageUrl,
            }
          : undefined,
      }));

      return {
        users,
        total: payload?.total ?? users.length,
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