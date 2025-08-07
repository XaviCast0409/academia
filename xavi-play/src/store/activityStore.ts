import { create } from 'zustand';
import { Activity } from '@/types/activity';
import activityService from '@/services/activityService';

interface ActivityState {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalActivities: number;
  loadActivities: (studentId: number, page?: number) => Promise<void>;
  clearActivities: () => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalActivities: 0,

  loadActivities: async (studentId: number, page: number = 1) => {
    try {
      set({ loading: true, error: null });
      const response = await activityService.getAvailableActivities(studentId, page);
      
      set({
        activities: response.activities,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalActivities: response.total,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Error al cargar actividades',
        loading: false,
      });
      throw error;
    }
  },

  clearActivities: () => {
    set({
      activities: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      totalActivities: 0,
    });
  },
})); 