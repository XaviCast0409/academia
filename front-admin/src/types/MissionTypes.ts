import type { Mission, UserMission } from './index'

// Simplified User interface for these specific types
interface SimpleUser {
	id: number
	name: string
	email: string
}

export interface MissionWithDetails extends Mission {
	userMissions?: UserMissionWithUser[]
}

export interface UserMissionWithUser extends UserMission {
	user: SimpleUser
}

export interface MissionFormData {
  title: string
  description: string
  type: MissionType
  groupId?: number
  requiredCount: number
  rewardType: RewardType
  rewardAmount: number
  isActive: boolean
  startDate?: Date
  endDate?: Date
}

export interface MissionPreview {
  id: number
  title: string
  description: string
  type: MissionType
  requiredCount: number
  rewardType: RewardType
  rewardAmount: number
  isActive: boolean
  startDate?: Date
  endDate?: Date
  participantsCount: number
  completionRate: number
}

export interface MissionAnalytics {
  totalMissions: number
  activeMissions: number
  missionsByType: Record<MissionType, number>
  averageCompletionRate: number
  topPerformingMissions: Array<{
    missionId: number
    missionTitle: string
    completionRate: number
    participantsCount: number
  }>
  recentMissions: Mission[]
  userProgress: Array<{
    userId: number
    userName: string
    completedMissions: number
    totalProgress: number
  }>
}

export interface MissionSearchParams {
  type?: MissionType
  isActive?: boolean
  search?: string
  dateFrom?: Date
  dateTo?: Date
  groupId?: number
}

export interface MissionBulkAction {
  missionIds: number[]
  action: 'activate' | 'deactivate' | 'delete' | 'duplicate'
  data?: Record<string, any>
}

export interface MissionProgress {
  missionId: number
  userId: number
  progress: number
  isCompleted: boolean
  completedAt?: Date
  rewardClaimed: boolean
  claimedAt?: Date
  timeRemaining?: number
}

export interface MissionReward {
  type: RewardType
  amount: number
  description: string
  claimed: boolean
  claimedAt?: Date
}

export interface MissionGroup {
  id: number
  name: string
  description?: string
  missions: Mission[]
  participantsCount: number
  averageProgress: number
}

export interface MissionCalendar {
  date: Date
  missions: Array<{
    id: number
    title: string
    type: MissionType
    isCompleted: boolean
    progress: number
  }>
}

// Re-exportar tipos principales
export type {
  Mission,
  UserMission,
  MissionType,
  RewardType,
  CreateMissionRequest,
  UpdateMissionRequest,
  MissionFilters
} 