import { create } from 'zustand';
import type { UserLevel, Mission, UserMission, UserReward } from '../types/rewards';
import {
  getUserLevel,
  getMissions,
  getUserMissions,
  getUserRewards,
  claimReward,
  updateMissionProgress,
} from '../services/rewardsService';

interface RewardsState {
  userLevel: UserLevel | null;
  missions: Mission[];
  userMissions: UserMission[];
  userRewards: UserReward[];
  loading: boolean;
  error: string | null;
  
  // Acciones
  fetchUserLevel: (userId: number) => Promise<void>;
  fetchMissions: (userId: number) => Promise<void>;
  fetchUserMissions: (userId: number) => Promise<void>;
  fetchUserRewards: (userId: number) => Promise<void>;
  claimUserReward: (rewardId: number) => Promise<void>;
  updateMissionProgress: (missionId: number, progress: number) => Promise<void>;
}

export const useRewardsStore = create<RewardsState>((set, get) => ({
  userLevel: null,
  missions: [],
  userMissions: [],
  userRewards: [],
  loading: false,
  error: null,

  fetchUserLevel: async (userId: number) => {
    try {
      set({ loading: true, error: null });
      const level = await getUserLevel(userId);
      set({ userLevel: level, loading: false });
    } catch (error) {
      set({ error: 'Error al cargar el nivel del usuario', loading: false });
    }
  },

  fetchMissions: async (userId: number) => {
    try {
      set({ loading: true, error: null });
      const missions = await getMissions(userId);
      set({ missions, loading: false });
    } catch (error) {
      set({ error: 'Error al cargar las misiones', loading: false });
    }
  },

  fetchUserMissions: async (userId: number) => {
    try {
      set({ loading: true, error: null });
      const userMissions = await getUserMissions(userId);
      set({ userMissions, loading: false });
    } catch (error) {
      set({ error: 'Error al cargar las misiones del usuario', loading: false });
    }
  },

  fetchUserRewards: async (userId: number) => {
    try {
      set({ loading: true, error: null });
      const userRewards = await getUserRewards(userId);
      set({ userRewards, loading: false });
    } catch (error) {
      set({ error: 'Error al cargar las recompensas del usuario', loading: false });
    }
  },

  claimUserReward: async (rewardId: number) => {
    try {
      set({ loading: true, error: null });
      await claimReward(rewardId);
      const { userRewards } = get();
      const updatedRewards = userRewards.map(reward =>
        reward.id === rewardId ? { ...reward, isClaimed: true, claimedAt: new Date().toISOString() } : reward
      );
      set({ userRewards: updatedRewards, loading: false });
    } catch (error) {
      set({ error: 'Error al reclamar la recompensa', loading: false });
    }
  },

  updateMissionProgress: async (missionId: number, progress: number) => {
    try {
      set({ loading: true, error: null });
      await updateMissionProgress(missionId, progress);
      const { userMissions } = get();
      const updatedMissions = userMissions.map(mission =>
        mission.missionId === missionId ? { ...mission, progress } : mission
      );
      set({ userMissions: updatedMissions, loading: false });
    } catch (error) {
      set({ error: 'Error al actualizar el progreso de la misión', loading: false });
    }
  },
})); 