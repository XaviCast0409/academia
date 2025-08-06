// Core types
export interface User {
	id: number
	name: string
	email: string
	section: string
	level: number
	experience: number
	xavicoints: number
	currentStreak: number
	completedActivities: number
	isActive: boolean
	isVerified: boolean
	lastLogin: string | null
	createdAt: string
	updatedAt: string
	role?: Role
	pokemon?: Pokemon
}

export interface Role {
	id: number
	name: string
	description?: string
}

export interface Pokemon {
	id: number
	name: string
	image?: string
}

export interface UserFilters {
	page: number
	limit: number
	section?: string
	isActive?: boolean
	search?: string
}

export interface UsersResponse {
	success: boolean
	data: {
		users: User[]
		total: number
		totalPages: number
		currentPage: number
	}
}

export interface UserStats {
	user: User
	achievements: {
		total: number
		unlocked: number
		claimed: number
		pendingClaim: number
	}
	missions: {
		total: number
		completed: number
		active: number
	}
}

export interface UserFormData {
	name: string
	email: string
	password?: string
	section: string
	roleId: number
	pokemonId: number
	isActive: boolean
}

export interface Section {
	value: string
	label: string
}

export const SECTIONS: Section[] = [
	{ value: 'A', label: 'Sección A' },
	{ value: 'B', label: 'Sección B' },
	{ value: 'C', label: 'Sección C' },
	{ value: 'D', label: 'Sección D' },
	{ value: 'E', label: 'Sección E' },
	{ value: 'F', label: 'Sección F' },
	{ value: 'G', label: 'Sección G' },
	{ value: 'H', label: 'Sección H' }
] 