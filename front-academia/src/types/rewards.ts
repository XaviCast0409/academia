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
  type: 'DAILY' | 'WEEKLY' | 'SPECIAL' | 'ACHIEVEMENT';
  requiredCount: number;
  currentCount: number;
  reward: Reward;
  isCompleted: boolean;
  expiresAt?: string;
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
  completedAt?: string;
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