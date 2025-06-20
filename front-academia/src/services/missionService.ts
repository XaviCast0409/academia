import { api } from '../utils/api';
import type { UserMission } from '../types/rewards';

export const getActiveMissionsForUser = async (userId: number): Promise<UserMission[]> => {
  const response = await api.get(`/missions/active?userId=${userId}`);
  return response.data;
};

export const updateMissionProgress = async (userId: number, missionId: number, increment: number = 1): Promise<UserMission> => {
  const response = await api.post(`/missions/${missionId}/progress`, { userId, increment });
  return response.data;
};

export const claimMissionReward = async (userId: number, missionId: number): Promise<UserMission> => {
  const response = await api.post(`/missions/${missionId}/claim`, { userId });
  return response.data;
};

export const getMissionHistory = async (userId: number): Promise<UserMission[]> => {
  const response = await api.get(`/missions/history?userId=${userId}`);
  return response.data;
}; 