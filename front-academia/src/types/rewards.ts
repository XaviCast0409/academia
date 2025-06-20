export interface UserLevel {
  id: number;
  userId: number;
  currentLevel: number;
  experience: number;
  experienceToNextLevel: number;
  createdAt: string;
  updatedAt: string;
}

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
  createdAt: string;
  updatedAt: string;
}

export interface Reward {
  id: number;
  type: 'XAVICOINS' | 'EXPERIENCE' | 'BADGE' | 'SPECIAL_ITEM';
  amount: number;
  description: string;
  imageUrl?: string;
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
  mission: Mission;
  createdAt: string;
  updatedAt: string;
}

export interface UserReward {
  id: number;
  userId: number;
  rewardId: number;
  isClaimed: boolean;
  claimedAt?: string;
  reward: Reward;
  createdAt: string;
  updatedAt: string;
} 