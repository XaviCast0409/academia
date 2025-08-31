/**
 * Store especializado para filtros y búsqueda de logros
 * Maneja el estado de filtros y funciones de búsqueda
 */

import { create } from 'zustand';
import { UserAchievement, AchievementFilters } from '@/types/achievement';
import { useAchievementDataStore } from './achievementDataStore';
import { logger } from '@/utils/logger';

interface AchievementFiltersState {
  // Estado de filtros
  filters: AchievementFilters;
  searchText: string;
  
  // Acciones de filtros
  setFilters: (filters: Partial<AchievementFilters>) => void;
  setSearchText: (text: string) => void;
  resetFilters: () => void;
  
  // Funciones de búsqueda y filtrado
  getFilteredAchievements: () => UserAchievement[];
  searchAchievements: (searchTerm: string) => UserAchievement[];
  getAchievementsByStatus: (status: 'completed' | 'in_progress' | 'locked' | 'pending_claim') => UserAchievement[];
  getAchievementsByCategory: (category: string) => UserAchievement[];
  
  // Estadísticas de filtros
  getFilteredStats: () => {
    total: number;
    completed: number;
    inProgress: number;
    locked: number;
    pendingClaim: number;
  };
}

const defaultFilters: AchievementFilters = {
  category: 'all',
  status: 'all',
  sortBy: 'category',
  ascending: true
};

export const useAchievementFiltersStore = create<AchievementFiltersState>((set, get) => ({
  // Estado inicial
  filters: defaultFilters,
  searchText: '',

  // ====== ACCIONES DE FILTROS ======

  setFilters: (newFilters: Partial<AchievementFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
    logger.debug('Filtros de logros actualizados:', newFilters);
  },

  setSearchText: (text: string) => {
    set({ searchText: text });
    logger.debug('Texto de búsqueda actualizado:', text);
  },

  resetFilters: () => {
    set({ 
      filters: defaultFilters,
      searchText: ''
    });
    logger.debug('Filtros de logros restablecidos');
  },

  // ====== FUNCIONES DE BÚSQUEDA Y FILTRADO ======

  getFilteredAchievements: () => {
    const { filters, searchText } = get();
    const { userAchievements } = useAchievementDataStore.getState();
    
    let filtered = [...userAchievements];

    // Aplicar filtro de búsqueda por texto
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(achievement =>
        achievement.achievement.title.toLowerCase().includes(searchLower) ||
        achievement.achievement.description.toLowerCase().includes(searchLower) ||
        achievement.achievement.category.toLowerCase().includes(searchLower)
      );
    }

    // Aplicar filtro de categoría
    if (filters.category !== 'all') {
      filtered = filtered.filter(achievement =>
        achievement.achievement.category === filters.category
      );
    }

    // Aplicar filtro de estado
    if (filters.status !== 'all') {
      switch (filters.status) {
        case 'completed':
          filtered = filtered.filter(achievement =>
            achievement.isUnlocked && achievement.status === 'completed'
          );
          break;
        case 'in_progress':
          filtered = filtered.filter(achievement =>
            !achievement.isUnlocked && achievement.currentValue > 0
          );
          break;
        case 'locked':
          filtered = filtered.filter(achievement =>
            !achievement.isUnlocked && achievement.currentValue === 0
          );
          break;
        case 'pending_claim':
          filtered = filtered.filter(achievement =>
            achievement.isUnlocked && achievement.status === 'pending_claim'
          );
          break;
      }
    }

    // Aplicar ordenamiento
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'title':
          comparison = a.achievement.title.localeCompare(b.achievement.title);
          break;
        case 'category':
          comparison = a.achievement.category.localeCompare(b.achievement.category);
          break;
        case 'progress':
          const progressA = a.achievement.targetValue > 0 ? (a.currentValue / a.achievement.targetValue) : 0;
          const progressB = b.achievement.targetValue > 0 ? (b.currentValue / b.achievement.targetValue) : 0;
          comparison = progressA - progressB;
          break;
        case 'reward':
          comparison = a.achievement.rewardAmount - b.achievement.rewardAmount;
          break;
        case 'difficulty':
          const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
          const diffA = difficultyOrder[a.achievement.difficulty as keyof typeof difficultyOrder] || 0;
          const diffB = difficultyOrder[b.achievement.difficulty as keyof typeof difficultyOrder] || 0;
          comparison = diffA - diffB;
          break;
        default:
          comparison = a.achievement.category.localeCompare(b.achievement.category);
      }

      return filters.ascending ? comparison : -comparison;
    });

    return filtered;
  },

  searchAchievements: (searchTerm: string) => {
    const { userAchievements } = useAchievementDataStore.getState();
    
    if (!searchTerm.trim()) {
      return userAchievements;
    }

    const searchLower = searchTerm.toLowerCase();
    return userAchievements.filter(achievement =>
      achievement.achievement.title.toLowerCase().includes(searchLower) ||
      achievement.achievement.description.toLowerCase().includes(searchLower) ||
      achievement.achievement.category.toLowerCase().includes(searchLower)
    );
  },

  getAchievementsByStatus: (status: 'completed' | 'in_progress' | 'locked' | 'pending_claim') => {
    const { userAchievements } = useAchievementDataStore.getState();
    
    switch (status) {
      case 'completed':
        return userAchievements.filter(achievement =>
          achievement.isUnlocked && achievement.status === 'completed'
        );
      case 'in_progress':
        return userAchievements.filter(achievement =>
          !achievement.isUnlocked && achievement.currentValue > 0
        );
      case 'locked':
        return userAchievements.filter(achievement =>
          !achievement.isUnlocked && achievement.currentValue === 0
        );
      case 'pending_claim':
        return userAchievements.filter(achievement =>
          achievement.isUnlocked && achievement.status === 'pending_claim'
        );
      default:
        return userAchievements;
    }
  },

  getAchievementsByCategory: (category: string) => {
    const { userAchievements } = useAchievementDataStore.getState();
    return userAchievements.filter(achievement =>
      achievement.achievement.category === category
    );
  },

  // ====== ESTADÍSTICAS DE FILTROS ======

  getFilteredStats: () => {
    const filtered = get().getFilteredAchievements();
    
    const stats = {
      total: filtered.length,
      completed: 0,
      inProgress: 0,
      locked: 0,
      pendingClaim: 0
    };

    filtered.forEach(achievement => {
      if (achievement.isUnlocked && achievement.status === 'completed') {
        stats.completed++;
      } else if (achievement.isUnlocked && achievement.status === 'pending_claim') {
        stats.pendingClaim++;
      } else if (!achievement.isUnlocked && achievement.currentValue > 0) {
        stats.inProgress++;
      } else {
        stats.locked++;
      }
    });

    return stats;
  },
}));
