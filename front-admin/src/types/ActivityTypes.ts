import type { 
  Activity, 
  ActivityDifficulty, 
  CreateActivityRequest, 
  UpdateActivityRequest, 
  ActivityFilters, 
  ActivityStats 
} from './index'

// Tipos específicos para actividades
export interface ActivityWithDetails extends Activity {
  professor: {
    id: number
    name: string
    email: string
  }
  evidencesCount: number
  completedCount: number
  averageScore?: number
}

export interface ActivityFormData {
  title: string
  description: string
  images: File[]
  xavicoints: number
  difficulty: ActivityDifficulty
  section: string
  mathTopic?: string
}

export interface ActivityPreview {
  id: number
  title: string
  description: string
  images: string[]
  xavicoints: number
  difficulty: ActivityDifficulty
  section: string
  mathTopic?: string
  professorName: string
  createdAt: Date
}

export interface ActivityAnalytics {
  totalActivities: number
  activitiesByDifficulty: Record<ActivityDifficulty, number>
  activitiesBySection: Record<string, number>
  averageXavicoints: number
  mostPopularTopics: Array<{
    topic: string
    count: number
  }>
  recentActivities: Activity[]
}

export interface ActivitySearchParams {
  search?: string
  difficulty?: ActivityDifficulty
  section?: string
  mathTopic?: string
  professorId?: number
  minXavicoints?: number
  maxXavicoints?: number
  dateFrom?: Date
  dateTo?: Date
}

export interface ActivityBulkAction {
  activityIds: number[]
  action: 'publish' | 'unpublish' | 'delete' | 'duplicate'
  data?: Record<string, any>
}

// Re-exportar tipos principales
export type {
  Activity,
  ActivityDifficulty,
  CreateActivityRequest,
  UpdateActivityRequest,
  ActivityFilters,
  ActivityStats
} 