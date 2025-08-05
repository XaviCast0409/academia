import type { User, UserFilters } from './index'

// Re-exportar tipos relacionados con usuarios desde el archivo principal
export type { 
  User, 
  UserRole,
  CreateUserRequest,
  UpdateUserRequest,
  UserFilters,
  UserStats,
  Role
} from './index'

// Tipos específicos para el contexto de usuarios
export interface UserProfile extends User {
  // Campos adicionales específicos para el perfil
  avatar?: string
  bio?: string
  preferences?: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: 'es' | 'en'
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    showProfile: boolean
    showProgress: boolean
    showAchievements: boolean
  }
}

export interface UserSession {
  user: User
  token: string
  refreshToken?: string
  expiresAt: Date
}

export interface UserActivity {
  id: number
  userId: number
  type: 'login' | 'logout' | 'activity_completed' | 'achievement_unlocked' | 'mission_completed'
  description: string
  metadata?: Record<string, any>
  createdAt: Date
}

// Tipos para gestión de usuarios en el admin
export interface UserManagementData {
  users: User[]
  total: number
  page: number
  limit: number
  filters: UserFilters
}

export interface UserBulkAction {
  userIds: number[]
  action: 'activate' | 'deactivate' | 'delete' | 'changeRole' | 'resetPassword'
  data?: Record<string, any>
}

export interface UserImportData {
  name: string
  email: string
  roleId: number
  section?: string
  pokemonId?: number
}

export interface UserExportOptions {
  format: 'csv' | 'excel' | 'pdf'
  includeFields: (keyof User)[]
  filters?: UserFilters
}
