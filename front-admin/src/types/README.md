# Tipos TypeScript para Frontend

Esta carpeta contiene todos los tipos TypeScript necesarios para el frontend de la aplicación, basados en los modelos del backend.

## Estructura de Archivos

### 📁 `index.ts`
Archivo principal que contiene todos los tipos base y enums comunes.

### 📁 `UserType.ts`
Tipos específicos para gestión de usuarios y perfiles.

### 📁 `ActivityTypes.ts`
Tipos específicos para actividades y su gestión.

### 📁 `EvidenceTypes.ts`
Tipos específicos para evidencias y su revisión.

### 📁 `ProductTypes.ts`
Tipos específicos para productos y tienda.

### 📁 `TransactionTypes.ts`
Tipos específicos para transacciones y reportes.

### 📁 `MissionTypes.ts`
Tipos específicos para misiones y gamificación.

### 📁 `AchievementTypes.ts`
Tipos específicos para logros y recompensas.

## Tipos Principales

### BaseEntity
Interfaz base para todas las entidades:
```typescript
interface BaseEntity {
  id: number
  createdAt: Date
  updatedAt: Date
}
```

### Enums y Tipos Comunes
```typescript
type UserRole = 'admin' | 'professor' | 'student'
type ActivityDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert'
type EvidenceStatus = 'pending' | 'approved' | 'rejected'
type TransactionType = 'purchase' | 'assignment'
type MissionType = 'DAILY' | 'WEEKLY' | 'GROUP' | 'SPECIAL'
type RewardType = 'COINS' | 'BADGE' | 'ITEM'
```

## Entidades Principales

### User
```typescript
interface User extends BaseEntity {
  name: string
  email: string
  password?: string // Opcional en frontend
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
  
  // Relaciones opcionales
  role?: Role
  pokemon?: Pokemon
  products?: Product[]
  activities?: Activity[]
  evidences?: Evidence[]
  transactions?: Transaction[]
  userAchievements?: UserAchievement[]
  userMissions?: UserMission[]
}
```

### Activity
```typescript
interface Activity extends BaseEntity {
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
```

### Evidence
```typescript
interface Evidence extends BaseEntity {
  studentId: number
  activityId: number
  filePath: string[]
  status: EvidenceStatus
  
  // Relaciones
  student?: User
  activity?: Activity
}
```

## Tipos para Formularios

### CreateUserRequest
```typescript
interface CreateUserRequest {
  name: string
  email: string
  password: string
  roleId: number
  pokemonId?: number
  section?: string
}
```

### UpdateUserRequest
```typescript
interface UpdateUserRequest {
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
```

## Tipos para Respuestas de API

### ApiResponse
```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
```

### PaginatedResponse
```typescript
interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
```

## Tipos para Filtros

### UserFilters
```typescript
interface UserFilters {
  roleId?: number
  isActive?: boolean
  isVerified?: boolean
  section?: string
  search?: string
}
```

### ActivityFilters
```typescript
interface ActivityFilters {
  professorId?: number
  difficulty?: ActivityDifficulty
  section?: string
  mathTopic?: string
  search?: string
}
```

## Tipos para Estadísticas

### UserStats
```typescript
interface UserStats {
  totalUsers: number
  activeUsers: number
  verifiedUsers: number
  usersByRole: { role: string; count: number }[]
  usersBySection: { section: string; count: number }[]
}
```

### ActivityStats
```typescript
interface ActivityStats {
  totalActivities: number
  activitiesByDifficulty: { difficulty: string; count: number }[]
  activitiesBySection: { section: string; count: number }[]
  totalXavicoints: number
}
```

## Tipos para Autenticación

### LoginRequest
```typescript
interface LoginRequest {
  email: string
  password: string
}
```

### LoginResponse
```typescript
interface LoginResponse {
  user: User
  token: string
  refreshToken?: string
}
```

## Tipos Específicos por Módulo

### ActivityTypes
- `ActivityWithDetails`: Actividad con información detallada del profesor
- `ActivityFormData`: Datos para formularios de actividades
- `ActivityPreview`: Vista previa de actividad para listas
- `ActivityAnalytics`: Estadísticas de actividades
- `ActivitySearchParams`: Parámetros de búsqueda
- `ActivityBulkAction`: Acciones masivas

### EvidenceTypes
- `EvidenceWithDetails`: Evidencia con información detallada
- `EvidenceFile`: Archivo de evidencia
- `EvidenceFormData`: Datos para formularios de evidencias
- `EvidenceReviewData`: Datos para revisión de evidencias
- `EvidencePreview`: Vista previa de evidencia
- `EvidenceAnalytics`: Estadísticas de evidencias

### ProductTypes
- `ProductWithDetails`: Producto con información detallada
- `ProductFormData`: Datos para formularios de productos
- `ProductPreview`: Vista previa de producto
- `ProductAnalytics`: Estadísticas de productos
- `ProductReview`: Reseña de producto
- `ProductCategory`: Categoría de producto

### TransactionTypes
- `TransactionWithDetails`: Transacción con información detallada
- `TransactionFormData`: Datos para formularios de transacciones
- `TransactionPreview`: Vista previa de transacción
- `TransactionAnalytics`: Estadísticas de transacciones
- `TransactionReport`: Reporte de transacciones
- `TransactionExport`: Exportación de transacciones

### MissionTypes
- `MissionWithDetails`: Misión con información detallada
- `MissionFormData`: Datos para formularios de misiones
- `MissionPreview`: Vista previa de misión
- `MissionAnalytics`: Estadísticas de misiones
- `MissionProgress`: Progreso de misión
- `MissionReward`: Recompensa de misión
- `MissionGroup`: Grupo de misiones
- `MissionCalendar`: Calendario de misiones

### AchievementTypes
- `AchievementWithDetails`: Logro con información detallada
- `AchievementFormData`: Datos para formularios de logros
- `AchievementPreview`: Vista previa de logro
- `AchievementAnalytics`: Estadísticas de logros
- `AchievementProgress`: Progreso de logro
- `AchievementReward`: Recompensa de logro
- `AchievementBadge`: Insignia de logro
- `AchievementCollection`: Colección de logros
- `AchievementLeaderboard`: Tabla de clasificación

## Uso en Componentes

### Ejemplo de uso en un componente de usuario:
```typescript
import { User, UserFilters, CreateUserRequest } from '@/types'

interface UserListProps {
  users: User[]
  filters: UserFilters
  onFilterChange: (filters: UserFilters) => void
  onCreateUser: (user: CreateUserRequest) => void
}
```

### Ejemplo de uso en un servicio:
```typescript
import { ApiResponse, PaginatedResponse, User } from '@/types'

class UserService {
  async getUsers(filters: UserFilters): Promise<PaginatedResponse<User>> {
    // Implementación
  }
  
  async createUser(user: CreateUserRequest): Promise<ApiResponse<User>> {
    // Implementación
  }
}
```

### Ejemplo de uso en un hook:
```typescript
import { useState } from 'react'
import { User, UserFilters } from '@/types'

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [filters, setFilters] = useState<UserFilters>({})
  
  // Lógica del hook
}
```

## Mejores Prácticas

1. **Importar solo lo necesario**: Importa solo los tipos que necesites en cada archivo
2. **Usar tipos específicos**: Usa los tipos específicos de cada módulo cuando sea posible
3. **Extender interfaces**: Extiende las interfaces base para crear tipos más específicos
4. **Validación**: Usa los tipos para validar datos en tiempo de compilación
5. **Documentación**: Documenta los tipos complejos con comentarios

## Migración desde el Backend

Los tipos están diseñados para ser compatibles con los modelos del backend:

- Los campos opcionales en el backend son opcionales en el frontend
- Las relaciones se representan como propiedades opcionales
- Los enums se mantienen consistentes entre frontend y backend
- Los tipos de fecha se manejan como `Date` en el frontend

## Extensibilidad

Los tipos están diseñados para ser extensibles:

- Puedes agregar nuevos campos a las interfaces existentes
- Puedes crear nuevos tipos específicos para casos de uso especiales
- Puedes combinar tipos para crear tipos más complejos
- Puedes usar utility types de TypeScript para transformar tipos existentes 