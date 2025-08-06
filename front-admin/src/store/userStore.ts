import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { User, UserFilters } from '../types/UserType'
import { userService } from '../service/userService'

interface UserState {
	// State
	users: User[]
	loading: boolean
	error: string | null
	filters: UserFilters
	pagination: {
		total: number
		totalPages: number
		currentPage: number
	}
	selectedUser: User | null

	// Actions
	fetchUsers: () => Promise<void>
	setFilters: (filters: Partial<UserFilters>) => void
	setPage: (page: number) => void
	setSearch: (search: string) => void
	setSection: (section: string | undefined) => void
	setActiveFilter: (isActive: boolean | undefined) => void
	clearFilters: () => void
	setSelectedUser: (user: User | null) => void
	updateUserStatus: (id: number, isActive: boolean) => Promise<void>
	deleteUser: (id: number) => Promise<void>
}

const initialFilters: UserFilters = {
	page: 1,
	limit: 20,
	section: undefined,
	isActive: undefined,
	search: undefined
}

export const useUserStore = create<UserState>()(
	devtools(
		(set, get) => ({
			// Initial state
			users: [],
			loading: false,
			error: null,
			filters: initialFilters,
			pagination: {
				total: 0,
				totalPages: 0,
				currentPage: 1
			},
			selectedUser: null,

			// Actions
			fetchUsers: async () => {
				set({ loading: true, error: null })
				try {
					const response = await userService.getUsers(get().filters)
					
					// Handle the response structure from backend
					if (response.success && response.data) {
						set({
							users: response.data.users || [],
							pagination: {
								total: response.data.total || 0,
								totalPages: response.data.totalPages || 0,
								currentPage: response.data.currentPage || 1
							},
							loading: false
						})
					} else {
						throw new Error('Invalid response format')
					}
				} catch (error) {
					set({
						error: error instanceof Error ? error.message : 'Error fetching users',
						loading: false
					})
				}
			},

			setFilters: (newFilters: Partial<UserFilters>) => {
				const currentFilters = get().filters
				const updatedFilters = { ...currentFilters, ...newFilters, page: 1 }
				set({ filters: updatedFilters })
				get().fetchUsers()
			},

			setPage: (page: number) => {
				const currentFilters = get().filters
				const updatedFilters = { ...currentFilters, page }
				set({ filters: updatedFilters })
				get().fetchUsers()
			},

			setSearch: (search: string) => {
				get().setFilters({ search: search || undefined })
			},

			setSection: (section: string | undefined) => {
				get().setFilters({ section })
			},

			setActiveFilter: (isActive: boolean | undefined) => {
				get().setFilters({ isActive })
			},

			clearFilters: () => {
				set({ filters: initialFilters })
				get().fetchUsers()
			},

			setSelectedUser: (user: User | null) => {
				set({ selectedUser: user })
			},

			updateUserStatus: async (id: number, isActive: boolean) => {
				try {
					await userService.updateUserStatus(id, isActive)
					// Refresh users list
					await get().fetchUsers()
				} catch (error) {
					set({
						error: error instanceof Error ? error.message : 'Error updating user status'
					})
				}
			},

			deleteUser: async (id: number) => {
				try {
					await userService.deleteUser(id)
					// Refresh users list
					await get().fetchUsers()
				} catch (error) {
					set({
						error: error instanceof Error ? error.message : 'Error deleting user'
					})
				}
			}
		}),
		{
			name: 'user-store'
		}
	)
)