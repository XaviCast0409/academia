import { create } from 'zustand';
import { UserMission } from '@/types/mission';
import missionService from '@/services/missionService';

interface MissionState {
  activeMissions: UserMission[];
  completedMissions: UserMission[];
  loading: boolean;
  error: string | null;
  loadActiveMissions: (userId: number) => Promise<void>;
  loadCompletedMissions: (userId: number) => Promise<void>;
  claimReward: (userId: number, missionId: number) => Promise<void>;
  clearError: () => void;
}

export const useMissionStore = create<MissionState>((set, get) => ({
  activeMissions: [],
  completedMissions: [],
  loading: false,
  error: null,

  loadActiveMissions: async (userId: number) => {
    try {
      set({ loading: true, error: null });
      
      const missions = await missionService.getActiveMissions(userId);
          
      set({
        activeMissions: missions,
        loading: false,
      });
    } catch (error: any) {
      console.error('MissionStore: Error loading active missions:', error);
      set({
        error: error.message || 'Error al cargar las misiones activas',
        loading: false,
      });
      throw error;
    }
  },

  loadCompletedMissions: async (userId: number) => {
    try {
      set({ loading: true, error: null });
      
      const missions = await missionService.getMissionHistory(userId);
      
      console.log('MissionStore: Completed missions loaded successfully:', missions);
      
      set({
        completedMissions: missions,
        loading: false,
      });
    } catch (error: any) {
      console.error('MissionStore: Error loading completed missions:', error);
      set({
        error: error.message || 'Error al cargar el historial de misiones',
        loading: false,
      });
      throw error;
    }
  },

  claimReward: async (userId: number, missionId: number) => {
    try {
      console.log('MissionStore: Claiming reward for user:', userId, 'mission:', missionId);
      set({ loading: true, error: null });
      
      const result = await missionService.claimMissionReward(userId, missionId);
      
      console.log('MissionStore: Reward claimed successfully:', result);
      
      // Recargar las misiones activas para actualizar el estado
      await get().loadActiveMissions(userId);
      
      set({ loading: false });
    } catch (error: any) {
      console.error('MissionStore: Error claiming reward:', error);
      set({
        error: error.message || 'Error al reclamar la recompensa',
        loading: false,
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },
})); 