// Simplified User interface for these specific types
interface SimpleUser {
	id: number
	name: string
	email: string
}

// Basic achievement interfaces
export interface Achievement {
	id: number
	title: string
	description: string
	icon: string
	isActive: boolean
}

export interface UserAchievement {
	id: number
	userId: number
	achievementId: number
	progress: number
	isUnlocked: boolean
	rewardClaimed: boolean
}

export interface AchievementWithDetails extends Achievement {
	userAchievements?: UserAchievementWithUser[]
}

export interface UserAchievementWithUser extends UserAchievement {
	user: SimpleUser
} 