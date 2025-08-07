import { api } from "./api"
import type { User, UserFilters, UsersResponse, UserFormData, UserStats } from '../types/UserType'

// User Service for Admin Interface
// Comprehensive service for user management operations

export const userService = {
	// Get users with pagination and filters
	getUsers: async (filters: UserFilters): Promise<UsersResponse> => {
		try {
			const params = new URLSearchParams()
			
			params.append('page', filters.page.toString())
			params.append('limit', filters.limit.toString())
			
			if (filters.section) {
				params.append('section', filters.section)
			}
			
			if (filters.isActive !== undefined) {
				params.append('isActive', filters.isActive.toString())
			}
			
			if (filters.search) {
				params.append('search', filters.search)
			}

			const response = await api.get(`/users?${params.toString()}`)
			return response.data
		} catch (error) {
			console.error('Error fetching users:', error)
			throw error
		}
	},

	// Get single user by ID
	getUser: async (id: number): Promise<User> => {
		try {
			const response = await api.get(`/users/${id}`)
			return response.data
		} catch (error) {
			console.error('Error fetching user:', error)
			throw error
		}
	},

	// Create new user
	createUser: async (userData: UserFormData): Promise<User> => {
		try {
			const response = await api.post('/users', userData)
			return response.data
		} catch (error) {
			console.error('Error creating user:', error)
			throw error
		}
	},

	// Update user
	updateUser: async (id: number, userData: Partial<UserFormData>): Promise<User> => {
		try {
			const response = await api.put(`/users/${id}`, userData)
			return response.data
		} catch (error) {
			console.error('Error updating user:', error)
			throw error
		}
	},

	// Delete user
	deleteUser: async (id: number): Promise<void> => {
		try {
			await api.delete(`/users/${id}`)
		} catch (error) {
			console.error('Error deleting user:', error)
			throw error
		}
	},

	// Get user stats
	getUserStats: async (id: number): Promise<UserStats> => {
		try {
			const response = await api.get(`/users/${id}/stats`)
			return response.data
		} catch (error) {
			console.error('Error fetching user stats:', error)
			throw error
		}
	},

	// Update user status (activate/deactivate)
	updateUserStatus: async (id: number, isActive: boolean): Promise<User> => {
		try {
			const response = await api.patch(`/users/${id}/status`, { isActive })
			return response.data
		} catch (error) {
			console.error('Error updating user status:', error)
			throw error
		}
	},

	// Update user XaviCoins
	updateUserXaviCoins: async (id: number, amount: number, operation: 'add' | 'subtract' = 'add'): Promise<any> => {
		try {
			const response = await api.patch(`/users/${id}/xavicoins`, { amount, operation })
			return response.data
		} catch (error) {
			console.error('Error updating user XaviCoins:', error)
			throw error
		}
	},

	// Update user streak
	updateUserStreak: async (id: number): Promise<any> => {
		try {
			const response = await api.patch(`/users/${id}/streak`)
			return response.data
		} catch (error) {
			console.error('Error updating user streak:', error)
			throw error
		}
	},

	// Assign missions to user
	assignMissionsToUser: async (id: number): Promise<any> => {
		try {
			const response = await api.post(`/users/${id}/missions`)
			return response.data
		} catch (error) {
			console.error('Error assigning missions to user:', error)
			throw error
		}
	},

    login: async (email: string, password: string): Promise<any> => {
        try {
            const response = await api.post('/users/login', { email, password })
            return response.data
        } catch (error) {
            console.error('Error logging in:', error)
            throw error
        }
    }
}
