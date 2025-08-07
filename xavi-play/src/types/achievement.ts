// Tipos para el sistema de logros (achievements)

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'math' | 'gamification' | 'competition' | 'special';
  requirementType: 'activities_completed' | 'level_reached' | 'streak_days' | 'coins_earned' | 'perfect_scores' | 'math_topic' | 'ranking_position';
  requirementValue: number;
  requirementCondition?: 'consecutive' | 'total' | 'unique';
  mathTopic?: 'aritmetica' | 'algebra' | 'geometria' | 'trigonometria' | 'razonamiento_matematico';
  rewardType: 'coins' | 'badge' | 'title' | 'avatar_frame';
  rewardValue: number | string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserAchievement {
  id: number;
  userId: number;
  achievementId: number;
  progress: number;
  isUnlocked: boolean;
  rewardClaimed: boolean;
  unlockedAt?: string;
  claimedAt?: string;
  createdAt: string;
  updatedAt: string;
  achievement: Achievement;
}

// Respuestas de la API
export interface AchievementResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface UserAchievementsResponse {
  userAchievements: UserAchievement[];
}

export interface AchievementProgressResponse {
  progress: UserAchievement[];
}

export interface ClaimAchievementRequest {
  userId: number;
}

export interface ClaimAchievementResponse {
  success: boolean;
  message: string;
  data?: UserAchievement;
}

// Interfaces para estadísticas y resúmenes
export interface AchievementStats {
  total: number;
  unlocked: number;
  claimed: number;
  pendingClaim: number;
  byCategory: Array<{
    category: string;
    total: number;
    unlocked: number;
  }>;
}

// Interfaces para filtros y ordenamiento
export type AchievementCategory = 'all' | 'progress' | 'math' | 'gamification' | 'competition' | 'special';
export type AchievementStatus = 'all' | 'locked' | 'unlocked' | 'claimed' | 'in_progress' | 'not_started';
export type AchievementSortBy = 'category' | 'progress' | 'rewardValue' | 'unlockedAt' | 'title';

export interface AchievementFilters {
  category: AchievementCategory;
  status: AchievementStatus;
  sortBy: AchievementSortBy;
  ascending: boolean;
}