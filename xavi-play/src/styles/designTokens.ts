/**
 * Sistema de tokens de diseño centralizados
 * Siguiendo el tema de Star Wars y Pokemon para mantener coherencia visual
 */

export const designTokens = {
  // Colores principales
  colors: {
    // Primarios (Pokemon theme)
    primary: '#fbbf24', // yellow-400 (Pikachu)
    primaryDark: '#f59e0b', // yellow-500
    primaryLight: '#fef3c7', // yellow-100
    
    // Secundarios (Star Wars theme)
    secondary: '#3b82f6', // blue-500 (Jedi)
    secondaryDark: '#2563eb', // blue-600
    secondaryLight: '#dbeafe', // blue-100
    
    // Fondo principal (Pokeball red)
    background: '#dc2626', // red-600
    backgroundDark: '#b91c1c', // red-700
    backgroundLight: '#fecaca', // red-200
    
    // Superficie y contenedores
    surface: '#ffffff',
    surfaceSecondary: '#f9fafb', // gray-50
    surfaceTertiary: '#f3f4f6', // gray-100
    
    // Estados
    success: '#10b981', // emerald-500
    successLight: '#d1fae5', // emerald-100
    warning: '#f59e0b', // amber-500
    warningLight: '#fef3c7', // amber-100
    error: '#ef4444', // red-500
    errorLight: '#fee2e2', // red-100
    info: '#3b82f6', // blue-500
    infoLight: '#dbeafe', // blue-100
    
    // Grises
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    
    // Texto
    text: {
      primary: '#111827', // gray-900
      secondary: '#4b5563', // gray-600
      tertiary: '#9ca3af', // gray-400
      disabled: '#d1d5db', // gray-300
      inverse: '#ffffff',
    },
    
    // Bordes
    border: {
      light: '#f3f4f6', // gray-100
      default: '#e5e7eb', // gray-200
      dark: '#d1d5db', // gray-300
      focus: '#fbbf24', // yellow-400
    },
  },
  
  // Espaciado (basado en múltiplos de 4px)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  // Tipografía
  typography: {
    // Tamaños de fuente
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
      display: 48,
    },
    
    // Pesos de fuente
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    
    // Altura de línea
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  // Bordes redondeados
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
  },
  
  // Sombras
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 12,
    },
  },
  
  // Dimensiones estándar
  dimensions: {
    // Altura de botones
    button: {
      sm: 32,
      md: 44,
      lg: 56,
    },
    
    // Altura de inputs
    input: {
      sm: 36,
      md: 44,
      lg: 52,
    },
    
    // Tamaños de iconos
    icon: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 48,
    },
    
    // Tamaños de avatar
    avatar: {
      sm: 32,
      md: 48,
      lg: 64,
      xl: 96,
    },
  },
  
  // Duraciones de animación
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  // Z-indices
  zIndex: {
    base: 0,
    dropdown: 10,
    modal: 20,
    overlay: 30,
    tooltip: 40,
  },
} as const;

// Tipos para TypeScript
export type DesignTokens = typeof designTokens;
export type ColorTokens = keyof typeof designTokens.colors;
export type SpacingTokens = keyof typeof designTokens.spacing;
export type TypographyTokens = keyof typeof designTokens.typography;
