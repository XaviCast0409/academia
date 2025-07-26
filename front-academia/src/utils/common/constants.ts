// Secciones disponibles
export const SECTIONS = [
  { value: '', label: 'Todas las secciones' },
  { value: '1ro Secundaria', label: '1ro Secundaria' },
  { value: '2do Secundaria', label: '2do Secundaria' },
  { value: '3ro Secundaria', label: '3ro Secundaria' },
  { value: '4to Secundaria', label: '4to Secundaria' },
  { value: '5to Secundaria', label: '5to Secundaria' },
] as const;

// Tipos de dificultad
export const DIFFICULTY_LEVELS = {
  beginner: { label: 'Principiante', color: '#4caf50' },
  intermediate: { label: 'Intermedio', color: '#1976d2' },
  advanced: { label: 'Avanzado', color: '#e07f3f' },
  expert: { label: 'Experto', color: '#84341c' },
} as const;

// Tipos de misión
export const MISSION_TYPES = {
  daily: { label: 'Diaria', color: '#2196f3' },
  weekly: { label: 'Semanal', color: '#ff9800' },
  monthly: { label: 'Mensual', color: '#9c27b0' },
  special: { label: 'Especial', color: '#e91e63' },
} as const;

// Tipos de recompensa
export const REWARD_TYPES = {
  xavicoints: { label: 'Xavicoints', color: '#E07F3F' },
  experience: { label: 'Experiencia', color: '#4caf50' },
  item: { label: 'Objeto', color: '#ff9800' },
} as const;

// Estados de transacciones
export const TRANSACTION_STATUS = {
  pending: { label: 'Pendiente', color: '#ff9800' },
  completed: { label: 'Completada', color: '#4caf50' },
  failed: { label: 'Fallida', color: '#f44336' },
} as const;

// Estados de evidencias
export const EVIDENCE_STATUS = {
  pending: { label: 'Pendiente', color: '#ff9800' },
  approved: { label: 'Aprobada', color: '#4caf50' },
  rejected: { label: 'Rechazada', color: '#f44336' },
} as const;

// Configuración de paginación
export const PAGINATION_CONFIG = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
} as const;

// Límites de archivos
export const FILE_LIMITS = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
} as const;
