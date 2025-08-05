import type { 
  Achievement, 
  UserAchievement, 
  AchievementCategory, 
  RequirementType, 
  RequirementCondition, 
  MathTopic, 
  AchievementRewardType, 
  CreateAchievementRequest, 
  UpdateAchievementRequest, 
  AchievementFilters 
} from './index'

// Tipos específicos para logros
export interface AchievementWithDetails extends Achievement {
  userAchievements?: UserAchievementWithUser[]
  unlockRate: number
  averageProgress: number
  totalParticipants: number
}

export interface UserAchievementWithUser extends UserAchievement {
  user: {
    id: number
    name: string
    email: string
  }
  achievement: {
    id: number
    title: string
    category: AchievementCategory
    icon: string
  }
}

export interface AchievementFormData {
  title: string
  description: string
  icon: string
  category: AchievementCategory
  requirementType: RequirementType
  requirementValue: number
  requirementCondition?: RequirementCondition
  mathTopic?: MathTopic
  rewardType: AchievementRewardType
  rewardValue: number | string
  isActive: boolean
}

export interface AchievementPreview {
  id: number
  title: string
  description: string
  icon: string
  category: AchievementCategory
  requirementType: RequirementType
  requirementValue: number
  rewardType: AchievementRewardType
  rewardValue: number | string
  isActive: boolean
  unlockRate: number
  participantsCount: number
}

export interface AchievementAnalytics {
  totalAchievements: number
  activeAchievements: number
  achievementsByCategory: Record<AchievementCategory, number>
  averageUnlockRate: number
  topAchievements: Array<{
    achievementId: number
    achievementTitle: string
    unlockRate: number
    participantsCount: number
  }>
  recentAchievements: Achievement[]
  userProgress: Array<{
    userId: number
    userName: string
    unlockedAchievements: number
    totalProgress: number
  }>
}

export interface AchievementSearchParams {
  category?: AchievementCategory
  isActive?: boolean
  search?: string
  requirementType?: RequirementType
  mathTopic?: MathTopic
}

export interface AchievementBulkAction {
  achievementIds: number[]
  action: 'activate' | 'deactivate' | 'delete' | 'duplicate'
  data?: Record<string, any>
}

export interface AchievementProgress {
  achievementId: number
  userId: number
  progress: number
  isUnlocked: boolean
  unlockedAt?: Date
  rewardClaimed: boolean
  claimedAt?: Date
  timeToUnlock?: number
}

export interface AchievementReward {
  type: AchievementRewardType
  value: number | string
  description: string
  claimed: boolean
  claimedAt?: Date
}

export interface AchievementBadge {
  id: number
  title: string
  icon: string
  description: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: Date
}

export interface AchievementCollection {
  id: number
  name: string
  description: string
  achievements: Achievement[]
  completionRate: number
  rewards: AchievementReward[]
}

export interface AchievementLeaderboard {
  userId: number
  userName: string
  unlockedAchievements: number
  totalProgress: number
  rank: number
  lastUnlocked?: Date
}

// Re-exportar tipos principales
export type {
  Achievement,
  UserAchievement,
  AchievementCategory,
  RequirementType,
  RequirementCondition,
  MathTopic,
  AchievementRewardType,
  CreateAchievementRequest,
  UpdateAchievementRequest,
  AchievementFilters
} 