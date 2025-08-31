/**
 * Store especializado para datos de logros
 * Maneja la carga y estado básico de achievements
 */

import { create } from 'zustand';
import { Achievement, UserAchievement, AchievementStats } from '@/types/achievement';
import achievementService from '@/services/achievementService';
import { logger, stateLogger } from '@/utils/logger';

interface AchievementDataState {
  // Estado de datos
  allAchievements: Achievement[];
  userAchievements: UserAchievement[];
  achievementStats: AchievementStats | null;
  
  // Estado de UI
  loading: boolean;
  loadingStats: boolean;
  error: string | null;
  lastRefresh: Date | null;
  
  // Acciones de datos básicos
  loadAllAchievements: () => Promise<void>;
  loadUserAchievements: (userId: number) => Promise<void>;
  refreshUserAchievements: (userId: number) => Promise<void>;
  loadAchievementStats: (userId: number) => Promise<void>;
  
  // Utilidades
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  
  // Getters
  getAchievementsByCategory: (category: string) => UserAchievement[];
  getUnlockedAchievements: () => UserAchievement[];
  getPendingClaimAchievements: () => UserAchievement[];
  getAchievementProgress: (achievementId: number) => UserAchievement | null;
}

export const useAchievementDataStore = create<AchievementDataState>((set, get) => ({
  // Estado inicial
  allAchievements: [],
  userAchievements: [],
  achievementStats: null,
  loading: false,
  loadingStats: false,
  error: null,
  lastRefresh: null,

  // ====== ACCIONES DE DATOS ======

  loadAllAchievements: async () => {
    try {
      stateLogger.storeUpdate('achievementDataStore', 'loadAllAchievements:start');
      set({ loading: true, error: null });
      
      const achievements = await achievementService.getAllAchievements();
      
      set({ 
        allAchievements: achievements,
        loading: false,
        lastRefresh: new Date()
      });
      
      stateLogger.storeUpdate('achievementDataStore', 'loadAllAchievements:success', { count: achievements.length });
    } catch (error: any) {
      stateLogger.storeError('achievementDataStore', 'loadAllAchievements', error);
      set({ 
        error: error.message || 'Error al cargar los logros',
        loading: false 
      });
    }
  },

  loadUserAchievements: async (userId: number) => {
    try {
      stateLogger.storeUpdate('achievementDataStore', 'loadUserAchievements:start', { userId });
      set({ loading: true, error: null });
      
      const userAchievements = await achievementService.getAchievementProgress(userId);
      
      set({ 
        userAchievements,
        loading: false,
        lastRefresh: new Date()
      });
      
      stateLogger.storeUpdate('achievementDataStore', 'loadUserAchievements:success', { 
        userId, 
        count: userAchievements.length 
      });
    } catch (error: any) {
      stateLogger.storeError('achievementDataStore', 'loadUserAchievements', error);
      set({ 
        error: error.message || 'Error al cargar el progreso de logros',
        loading: false 
      });
    }
  },

  refreshUserAchievements: async (userId: number) => {
    try {
      stateLogger.storeUpdate('achievementDataStore', 'refreshUserAchievements:start', { userId });
      const userAchievements = await achievementService.getAchievementProgress(userId);
      
      set({ 
        userAchievements,
        lastRefresh: new Date()
      });
      
      stateLogger.storeUpdate('achievementDataStore', 'refreshUserAchievements:success', { userId });
    } catch (error: any) {
      stateLogger.storeError('achievementDataStore', 'refreshUserAchievements', error);
      logger.error('Error refrescando logros del usuario:', error);
    }
  },

  loadAchievementStats: async (userId: number) => {
    try {
      stateLogger.storeUpdate('achievementDataStore', 'loadAchievementStats:start', { userId });
      set({ loadingStats: true, error: null });
      
      const stats = await achievementService.getAchievementStats(userId);
      
      set({ 
        achievementStats: stats,
        loadingStats: false
      });
      
      stateLogger.storeUpdate('achievementDataStore', 'loadAchievementStats:success', { userId });
    } catch (error: any) {
      stateLogger.storeError('achievementDataStore', 'loadAchievementStats', error);
      set({ 
        error: error.message || 'Error al cargar estadísticas de logros',
        loadingStats: false 
      });
    }
  },

  // ====== UTILIDADES ======

  clearError: () => {
    set({ error: null });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  // ====== GETTERS ======

  getAchievementsByCategory: (category: string) => {
    const { userAchievements } = get();
    return userAchievements.filter(achievement => 
      achievement.achievement.category === category
    );
  },

  getUnlockedAchievements: () => {
    const { userAchievements } = get();
    return userAchievements.filter(achievement => 
      achievement.isUnlocked && achievement.status === 'completed'
    );
  },

  getPendingClaimAchievements: () => {
    const { userAchievements } = get();
    return userAchievements.filter(achievement => 
      achievement.isUnlocked && achievement.status === 'pending_claim'
    );
  },

  getAchievementProgress: (achievementId: number) => {
    const { userAchievements } = get();
    return userAchievements.find(achievement => 
      achievement.achievementId === achievementId
    ) || null;
  },
}));
