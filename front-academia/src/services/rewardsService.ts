import { api } from '../utils/api';
import type { UserLevel, Mission, UserMission, UserReward } from '../types/rewards';

export const getUserLevel = async (userId: number): Promise<UserLevel> => {
  const response = await api.get(`/users/${userId}/level`);
  return response.data;
};

export const getMissions = async (userId: number): Promise<Mission[]> => {
  const response = await api.get(`/users/${userId}/missions`);
  return response.data;
};

export const getUserMissions = async (userId: number): Promise<UserMission[]> => {
  const response = await api.get(`/users/${userId}/user-missions`);
  return response.data;
};

export const getUserRewards = async (userId: number): Promise<UserReward[]> => {
  const response = await api.get(`/users/${userId}/rewards`);
  return response.data;
};

export const claimReward = async (rewardId: number): Promise<void> => {
  await api.post(`/rewards/${rewardId}/claim`);
};

export const updateMissionProgress = async (missionId: number, progress: number): Promise<void> => {
  await api.put(`/missions/${missionId}/progress`, { progress });
};

// Funciones de utilidad para el sistema de recompensas
export const calculateLevelUp = (currentExperience: number, experienceToNextLevel: number): boolean => {
  return currentExperience >= experienceToNextLevel;
};

export const calculateNewExperienceToNextLevel = (currentLevel: number): number => {
  // Fórmula: 100 * (nivel actual ^ 1.5)
  return Math.floor(100 * Math.pow(currentLevel, 1.5));
};

export const getExperienceForActivity = (activityType: string): number => {
  const experienceValues: Record<string, number> = {
    'COMPLETE_ACTIVITY': 50,
    'PURCHASE_PRODUCT': 30,
    'COMPLETE_MISSION': 100,
    'LEVEL_UP': 200,
  };
  return experienceValues[activityType] || 0;
}; 