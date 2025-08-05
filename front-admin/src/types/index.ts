// Tipos base para todas las entidades
export interface BaseEntity {
  id: number
  createdAt: Date
  updatedAt: Date
}

// Tipos para enums y constantes
export type UserRole = 'admin' | 'professor' | 'student'
export type ActivityDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert'
export type EvidenceStatus = 'pending' | 'approved' | 'rejected'
export type TransactionType = 'purchase' | 'assignment'
export type MissionType = 'DAILY' | 'WEEKLY' | 'GROUP' | 'SPECIAL'
export type RewardType = 'COINS' | 'BADGE' | 'ITEM'
export type AchievementCategory = 'progress' | 'math' | 'gamification' | 'competition' | 'special'
export type RequirementType = 'activities_completed' | 'level_reached' | 'streak_days' | 'coins_earned' | 'ranking_position' | 'perfect_scores' | 'math_topic'
export type RequirementCondition = 'consecutive' | 'total' | 'unique'
export type MathTopic = 'aritmetica' | 'algebra' | 'geometria' | 'trigonometria' | 'razonamiento_matematico'
export type AchievementRewardType = 'coins' | 'badge' | 'title' | 'avatar_frame'

// Tipos principales
export interface User extends BaseEntity {
  name: string
  email: string
  password?: string // Opcional en el frontend por seguridad
  roleId: number
  pokemonId?: number
  xavicoints: number
  section: string
  level: number
  experience: number
  isActive: boolean
  currentStreak: number
  lastLogin?: Date
  completedActivities: number
  isVerified: boolean
  verificationCode?: string
  verificationCodeExpires?: Date
  
  // Relaciones (opcionales para consultas)
  role?: Role
  pokemon?: Pokemon
  products?: Product[]
  activities?: Activity[]
  evidences?: Evidence[]
  transactions?: Transaction[]
  userAchievements?: UserAchievement[]
  userMissions?: UserMission[]
}

export interface Role extends BaseEntity {
  name: string
  users?: User[]
}

export interface Pokemon extends BaseEntity {
  name: string
  imageUrl: string
  highResImageUrl?: string
  users?: User[]
}

export interface Activity extends BaseEntity {
  title: string
  description: string
  images: string[]
  xavicoints: number
  professorId: number
  difficulty?: ActivityDifficulty
  section?: string
  mathTopic?: string
  
  // Relaciones
  professor?: User
  evidences?: Evidence[]
}

export interface Evidence extends BaseEntity {
  studentId: number
  activityId: number
  filePath: string[]
  status: EvidenceStatus
  
  // Relaciones
  student?: User
  activity?: Activity
}

export interface Product extends BaseEntity {
  name: string
  description: string
  price: number
  professorId: number
  
  // Relaciones
  professor?: User
  transactions?: Transaction[]
}

export interface Transaction extends BaseEntity {
  userId: number
  productId?: number | null
  type: TransactionType
  amount: number
  description: string
  
  // Relaciones
  user?: User
  product?: Product
}

export interface Mission extends BaseEntity {
  title: string
  description: string
  type: MissionType
  groupId?: number | null
  requiredCount: number
  rewardType: RewardType
  rewardAmount: number
  isActive: boolean
  startDate?: Date | null
  endDate?: Date | null
  
  // Relaciones
  userMissions?: UserMission[]
}

export interface UserMission extends BaseEntity {
  userId: number
  missionId: number
  progress: number
  isCompleted: boolean
  completedAt?: Date | null
  rewardClaimed: boolean
  claimedAt?: Date | null
  
  // Relaciones
  user?: User
  mission?: Mission
}

export interface Achievement extends BaseEntity {
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
  
  // Relaciones
  userAchievements?: UserAchievement[]
}

export interface UserAchievement extends BaseEntity {
  userId: number
  achievementId: number
  progress: number
  isUnlocked: boolean
  unlockedAt?: Date
  rewardClaimed: boolean
  claimedAt?: Date
  
  // Relaciones
  user?: User
  achievement?: Achievement
}

export interface VerificationCode extends BaseEntity {
  email: string
  code: string
  expiresAt: Date
  isUsed: boolean
}

// Tipos para formularios y creación/edición
export interface CreateUserRequest {
  name: string
  email: string
  password: string
  roleId: number
  pokemonId?: number
  section?: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  roleId?: number
  pokemonId?: number
  section?: string
  level?: number
  experience?: number
  isActive?: boolean
  xavicoints?: number
}

export interface CreateActivityRequest {
  title: string
  description: string
  images?: string[]
  xavicoints: number
  professorId: number
  difficulty?: ActivityDifficulty
  section?: string
  mathTopic?: string
}

export interface UpdateActivityRequest {
  title?: string
  description?: string
  images?: string[]
  xavicoints?: number
  difficulty?: ActivityDifficulty
  section?: string
  mathTopic?: string
}

export interface CreateEvidenceRequest {
  studentId: number
  activityId: number
  filePath: string[]
}

export interface UpdateEvidenceRequest {
  status?: EvidenceStatus
}

export interface CreateProductRequest {
  name: string
  description: string
  price: number
  professorId: number
}

export interface UpdateProductRequest {
  name?: string
  description?: string
  price?: number
}

export interface CreateTransactionRequest {
  userId: number
  productId?: number
  type: TransactionType
  amount: number
  description: string
}

export interface CreateMissionRequest {
  title: string
  description: string
  type: MissionType
  groupId?: number
  requiredCount: number
  rewardType: RewardType
  rewardAmount: number
  isActive?: boolean
  startDate?: Date
  endDate?: Date
}

export interface UpdateMissionRequest {
  title?: string
  description?: string
  type?: MissionType
  groupId?: number
  requiredCount?: number
  rewardType?: RewardType
  rewardAmount?: number
  isActive?: boolean
  startDate?: Date
  endDate?: Date
}

export interface CreateAchievementRequest {
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
  isActive?: boolean
}

export interface UpdateAchievementRequest {
  title?: string
  description?: string
  icon?: string
  category?: AchievementCategory
  requirementType?: RequirementType
  requirementValue?: number
  requirementCondition?: RequirementCondition
  mathTopic?: MathTopic
  rewardType?: AchievementRewardType
  rewardValue?: number | string
  isActive?: boolean
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Tipos para filtros y búsquedas
export interface UserFilters {
  roleId?: number
  isActive?: boolean
  isVerified?: boolean
  section?: string
  search?: string
}

export interface ActivityFilters {
  professorId?: number
  difficulty?: ActivityDifficulty
  section?: string
  mathTopic?: string
  search?: string
}

export interface EvidenceFilters {
  studentId?: number
  activityId?: number
  status?: EvidenceStatus
}

export interface ProductFilters {
  professorId?: number
  search?: string
}

export interface TransactionFilters {
  userId?: number
  productId?: number
  type?: TransactionType
  dateFrom?: Date
  dateTo?: Date
}

export interface MissionFilters {
  type?: MissionType
  isActive?: boolean
  search?: string
}

export interface AchievementFilters {
  category?: AchievementCategory
  isActive?: boolean
  search?: string
}

// Tipos para estadísticas y dashboard
export interface UserStats {
  totalUsers: number
  activeUsers: number
  verifiedUsers: number
  usersByRole: { role: string; count: number }[]
  usersBySection: { section: string; count: number }[]
}

export interface ActivityStats {
  totalActivities: number
  activitiesByDifficulty: { difficulty: string; count: number }[]
  activitiesBySection: { section: string; count: number }[]
  totalXavicoints: number
}

export interface EvidenceStats {
  totalEvidences: number
  evidencesByStatus: { status: string; count: number }[]
  pendingEvidences: number
  approvedEvidences: number
  rejectedEvidences: number
}

export interface TransactionStats {
  totalTransactions: number
  totalAmount: number
  transactionsByType: { type: string; count: number; amount: number }[]
  recentTransactions: Transaction[]
}

// Tipos para autenticación
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
  refreshToken?: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  roleId: number
  section?: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  email: string
  code: string
  newPassword: string
}

export interface VerifyEmailRequest {
  email: string
  code: string
}

// Tipos para notificaciones
export interface Notification {
  id: number
  userId: number
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  isRead: boolean
  createdAt: Date
}

// Tipos para archivos
export interface FileUpload {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: Date
}

// Tipos para configuración
export interface AppConfig {
  maxFileSize: number
  allowedFileTypes: string[]
  maxImagesPerActivity: number
  defaultXavicoints: number
  verificationCodeExpiry: number // en minutos
}

// Tipos para errores
export interface ApiError {
  code: string
  message: string
  details?: any
}

// Tipos para validación
export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
} 