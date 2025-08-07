import { create } from 'zustand';
import { RankingUser, RankingResponse, RankingFilters } from '@/types/ranking';
import rankingService from '@/services/rankingService';

interface RankingState {
  users: RankingUser[];
  loading: boolean;
  error: string | null;
  selectedSection: string | null;
  loadRanking: (filters?: RankingFilters) => Promise<void>;
  setSelectedSection: (section: string | null) => void;
  clearError: () => void;
}

export const useRankingStore = create<RankingState>((set) => ({
  users: [],
  loading: false,
  error: null,
  selectedSection: null,

  loadRanking: async (filters?: RankingFilters) => {
    try {
      console.log('RankingStore: Loading ranking with filters:', filters);
      console.log('RankingStore: Filters type:', typeof filters);
      console.log('RankingStore: Filters section:', filters?.section);
      set({ loading: true, error: null });
      
      const response: RankingResponse = await rankingService.getRanking(filters);
      
      console.log('RankingStore: Ranking loaded successfully:', response);
      console.log('RankingStore: Number of users in response:', response.users.length);
      
      set({
        users: response.users,
        loading: false,
      });
    } catch (error: any) {
      console.error('RankingStore: Error loading ranking:', error);
      set({
        error: error.message || 'Error al cargar el ranking',
        loading: false,
      });
      throw error;
    }
  },

  setSelectedSection: (section: string | null) => {
    set({ selectedSection: section });
  },

  clearError: () => {
    set({ error: null });
  },
})); 