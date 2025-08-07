// Simplified User interface for these specific types
interface SimpleUser {
	id: number
	name: string
	email: string
}

// Basic activity interface
export interface Activity {
	id: number
	title: string
	description: string
	images: string[]
	xavicoints: number
	professorId: number
	difficulty?: string
	section?: string
	mathTopic?: string
	createdAt?: Date
	updatedAt?: Date
}

export interface ActivityWithDetails extends Activity {
	professor: SimpleUser
} 