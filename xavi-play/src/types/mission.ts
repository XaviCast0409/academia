export interface Mission {
  id: number;
  title: string;
  description: string;
  type: 'DAILY' | 'WEEKLY' | 'GROUP' | 'SPECIAL';
  groupId?: number | null;
  requiredCount: number;
  rewardType: 'COINS' | 'BADGE' | 'ITEM';
  rewardAmount: number;
  isActive: boolean;
  startDate?: string | null;
  endDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserMission {
  id: number;
  userId: number;
  missionId: number;
  progress: number;
  isCompleted: boolean;
  completedAt?: string | null;
  rewardClaimed?: boolean;
  claimedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  mission?: Mission;
}

export interface ActiveMissionsResponse {
  userMissions: UserMission[];
}

export interface MissionHistoryResponse {
  userMissions: UserMission[];
}

export interface ClaimRewardRequest {
  userId: number;
}

export interface ClaimRewardResponse {
  success: boolean;
  message: string;
  userMission?: UserMission;
} 