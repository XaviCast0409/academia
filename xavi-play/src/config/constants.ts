// App configuration
export const APP_CONFIG = {
  name: 'Xavi Play',
  version: '1.0.0',
  theme: {
    colors: {
      primary: '#dc2626', // red-600
      secondary: '#fbbf24', // yellow-400
      accent: '#3b82f6', // blue-500
      background: '#f3f4f6', // gray-100
      surface: '#ffffff',
      text: '#1e40af', // blue-800
      textSecondary: '#6b7280', // gray-500
    },
  },
};

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  activities: {
    list: '/activities',
    complete: '/activities/:id/complete',
  },
  store: {
    items: '/store/items',
    purchase: '/store/purchase',
  },
  user: {
    profile: '/user/profile',
    stats: '/user/stats',
  },
};

// Navigation routes
export const ROUTES = {
  LOGIN: 'Login',
  STORE: 'Store',
  ACTIVITIES: 'Activities',
  PROFILE: 'Profile',
} as const;

// Store categories
export const STORE_CATEGORIES = {
  POKEBALLS: 'pokeballs',
  POTIONS: 'potions',
  ITEMS: 'items',
} as const;

// Activity difficulties
export const ACTIVITY_DIFFICULTIES = {
  EASY: 'Fácil',
  MEDIUM: 'Medio',
  HARD: 'Difícil',
} as const;

// Activity categories
export const ACTIVITY_CATEGORIES = {
  MATH: 'Matemáticas',
  SCIENCE: 'Ciencias',
  HISTORY: 'Historia',
  LANGUAGE: 'Lenguaje',
} as const; 