import { create } from 'zustand';
import { getActiveMissionsForUser, getMissionHistory } from '../services/missionService';
import type { UserMission } from '../types/rewards';

interface MissionState {
  activeMissions: UserMission[];
  completedMissions: UserMission[];
  loading: boolean;
  error: string | null;
  loadMissions: (userId: number) => Promise<void>;
  clearError: () => void;
}

export const useMissionStore = create<MissionState>((set, _get) => ({
  activeMissions: [],
  completedMissions: [],
  loading: false,
  error: null,

  loadMissions: async (userId: number) => {
    try {
      set({ loading: true, error: null });
      
      const [activeData, completedData] = await Promise.all([
        getActiveMissionsForUser(userId),
        getMissionHistory(userId)
      ]);
      
      set({
        activeMissions: activeData,
        completedMissions: completedData,
        loading: false,
      });
    } catch (error) {
      set({
        error: 'Error al cargar las misiones. Por favor, intenta de nuevo.',
        loading: false,
      });
      console.error('Error loading missions:', error);
    }
  },

  clearError: () => {
    set({ error: null });
  },
})); 