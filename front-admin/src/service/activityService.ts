import { api } from './api'
import type { Activity, ActivityWithDetails } from '../types/ActivityTypes'

export const activityService = {
	// Obtener todas las actividades
	getActivities: async (): Promise<ActivityWithDetails[]> => {
		const response = await api.get('/activities')
		return response.data
	},

	// Obtener una actividad por ID
	getActivity: async (id: number): Promise<ActivityWithDetails> => {
		const response = await api.get(`/activities/${id}`)
		return response.data
	},

	// Crear una nueva actividad
	createActivity: async (activity: Omit<Activity, 'id'>): Promise<ActivityWithDetails> => {
		console.log('Creating activity:', activity)
		const response = await api.post('/activities/create', activity)
		return response.data
	},

	// Actualizar una actividad
	updateActivity: async (id: number, activity: Partial<Activity>): Promise<ActivityWithDetails> => {
		const response = await api.put(`/activities/${id}`, activity)
		return response.data
	},

	// Eliminar una actividad
	deleteActivity: async (id: number): Promise<void> => {
		await api.delete(`/activities/${id}`)
	},

	// Obtener actividades por profesor
	getActivitiesByProfessor: async (
		professorId: number,
		page: number = 1,
		pageSize: number = 10,
		section?: string
	): Promise<{
		activities: ActivityWithDetails[]
		total: number
		currentPage: number
		totalPages: number
		pageSize: number
	}> => {
		const params = new URLSearchParams({
			page: page.toString(),
			pageSize: pageSize.toString(),
			...(section && { section })
		})
		const response = await api.get(`/activities/professor/${professorId}?${params}`)
		return response.data
	}
}
