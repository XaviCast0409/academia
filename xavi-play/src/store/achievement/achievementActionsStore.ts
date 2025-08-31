/**
 * Store especializado para acciones de logros
 * Maneja operaciones complejas como reclamar recompensas y actualizar progreso
 */

import { create } from 'zustand';
import { UserAchievement } from '@/types/achievement';
import achievementService from '@/services/achievementService';
import { logger, stateLogger } from '@/utils/logger';
import { useAchievementDataStore } from './achievementDataStore';

interface AchievementActionsState {
  // Estado de operaciones
  claiming: boolean;
  updating: boolean;
  
  // Acciones principales
  claimAchievementReward: (userId: number, achievementId: number) => Promise<void>;
  checkAndUpdateAchievements: (userId: number, activityData?: any) => Promise<UserAchievement[]>;
  assignAllAchievements: (userId: number) => Promise<void>;
  updateAchievementProgress: (userId: number, activityData?: any) => Promise<void>;
  forceUpdateAllUserAchievements: (userId: number) => Promise<void>;
  
  // Actualizaciones específicas
  updateProgressFromActivity: (userId: number, activityData: any) => Promise<void>;
  updateProgressFromLevelUp: (userId: number, newLevel: number) => Promise<void>;
  updateProgressFromStreak: (userId: number, streakDays: number) => Promise<void>;
  updateProgressFromCoins: (userId: number, totalCoins: number) => Promise<void>;
  forceUpdateAndRefresh: (userId: number) => Promise<void>;
}

export const useAchievementActionsStore = create<AchievementActionsState>((set, get) => ({
  // Estado inicial
  claiming: false,
  updating: false,

  // ====== ACCIONES PRINCIPALES ======

  claimAchievementReward: async (userId: number, achievementId: number) => {
    try {
      stateLogger.storeUpdate('achievementActionsStore', 'claimReward:start', { userId, achievementId });
      set({ claiming: true });
      
      const result = await achievementService.claimAchievementReward(userId, achievementId);
      
      // Refrescar datos después de reclamar
      await useAchievementDataStore.getState().refreshUserAchievements(userId);
      
      set({ claiming: false });
      stateLogger.storeUpdate('achievementActionsStore', 'claimReward:success', { userId, achievementId });
      
      return result;
    } catch (error: any) {
      stateLogger.storeError('achievementActionsStore', 'claimReward', error);
      set({ claiming: false });
      throw new Error(error.message || 'Error al reclamar la recompensa del logro');
    }
  },

  checkAndUpdateAchievements: async (userId: number, activityData?: any) => {
    try {
      stateLogger.storeUpdate('achievementActionsStore', 'checkAndUpdate:start', { userId });
      set({ updating: true });
      
      const updatedAchievements = await achievementService.checkAndUpdateAchievements(userId, activityData);
      
      // Refrescar datos después de actualizar
      await useAchievementDataStore.getState().refreshUserAchievements(userId);
      
      set({ updating: false });
      stateLogger.storeUpdate('achievementActionsStore', 'checkAndUpdate:success', { 
        userId, 
        updatedCount: updatedAchievements.length 
      });
      
      return updatedAchievements;
    } catch (error: any) {
      stateLogger.storeError('achievementActionsStore', 'checkAndUpdate', error);
      set({ updating: false });
      throw new Error(error.message || 'Error al verificar y actualizar logros');
    }
  },

  assignAllAchievements: async (userId: number) => {
    try {
      stateLogger.storeUpdate('achievementActionsStore', 'assignAll:start', { userId });
      set({ updating: true });
      
      await achievementService.assignAllAchievements(userId);
      
      // Refrescar datos después de asignar
      await useAchievementDataStore.getState().refreshUserAchievements(userId);
      
      set({ updating: false });
      stateLogger.storeUpdate('achievementActionsStore', 'assignAll:success', { userId });
    } catch (error: any) {
      stateLogger.storeError('achievementActionsStore', 'assignAll', error);
      set({ updating: false });
      throw new Error(error.message || 'Error al asignar todos los logros');
    }
  },

  updateAchievementProgress: async (userId: number, activityData?: any) => {
    try {
      stateLogger.storeUpdate('achievementActionsStore', 'updateProgress:start', { userId });
      set({ updating: true });
      
      await achievementService.updateAchievementProgress(userId, activityData);
      
      // Refrescar datos después de actualizar progreso
      await useAchievementDataStore.getState().refreshUserAchievements(userId);
      
      set({ updating: false });
      stateLogger.storeUpdate('achievementActionsStore', 'updateProgress:success', { userId });
    } catch (error: any) {
      stateLogger.storeError('achievementActionsStore', 'updateProgress', error);
      set({ updating: false });
      logger.error('Error actualizando progreso de logros:', error);
    }
  },

  forceUpdateAllUserAchievements: async (userId: number) => {
    try {
      stateLogger.storeUpdate('achievementActionsStore', 'forceUpdateAll:start', { userId });
      set({ updating: true });
      
      await achievementService.forceUpdateAllUserAchievements(userId);
      
      // Refrescar datos después de forzar actualización
      await useAchievementDataStore.getState().refreshUserAchievements(userId);
      
      set({ updating: false });
      stateLogger.storeUpdate('achievementActionsStore', 'forceUpdateAll:success', { userId });
    } catch (error: any) {
      stateLogger.storeError('achievementActionsStore', 'forceUpdateAll', error);
      set({ updating: false });
      throw new Error(error.message || 'Error al forzar actualización de todos los logros');
    }
  },

  // ====== ACTUALIZACIONES ESPECÍFICAS ======

  updateProgressFromActivity: async (userId: number, activityData: any) => {
    try {
      stateLogger.storeUpdate('achievementActionsStore', 'updateFromActivity:start', { userId });
      set({ updating: true });
      
      await achievementService.updateProgressFromActivity?.(userId, activityData);
      
      // Refrescar datos después de actualizar
      await useAchievementDataStore.getState().refreshUserAchievements(userId);
      
      set({ updating: false });
      stateLogger.storeUpdate('achievementActionsStore', 'updateFromActivity:success', { userId });
    } catch (error: any) {
      stateLogger.storeError('achievementActionsStore', 'updateFromActivity', error);
      set({ updating: false });
      logger.error('Error actualizando progreso desde actividad:', error);
    }
  },

  updateProgressFromLevelUp: async (userId: number, newLevel: number) => {
    try {
      stateLogger.storeUpdate('achievementActionsStore', 'updateFromLevelUp:start', { userId, newLevel });
      set({ updating: true });
      
      await achievementService.updateProgressFromLevelUp?.(userId, newLevel);
      
      // Refrescar datos después de actualizar
      await useAchievementDataStore.getState().refreshUserAchievements(userId);
      
      set({ updating: false });
      stateLogger.storeUpdate('achievementActionsStore', 'updateFromLevelUp:success', { userId, newLevel });
    } catch (error: any) {
      stateLogger.storeError('achievementActionsStore', 'updateFromLevelUp', error);
      set({ updating: false });
      logger.error('Error actualizando progreso desde nivel:', error);
    }
  },

  updateProgressFromStreak: async (userId: number, streakDays: number) => {
    try {
      stateLogger.storeUpdate('achievementActionsStore', 'updateFromStreak:start', { userId, streakDays });
      set({ updating: true });
      
      await achievementService.updateProgressFromStreak?.(userId, streakDays);
      
      // Refrescar datos después de actualizar
      await useAchievementDataStore.getState().refreshUserAchievements(userId);
      
      set({ updating: false });
      stateLogger.storeUpdate('achievementActionsStore', 'updateFromStreak:success', { userId, streakDays });
    } catch (error: any) {
      stateLogger.storeError('achievementActionsStore', 'updateFromStreak', error);
      set({ updating: false });
      logger.error('Error actualizando progreso desde racha:', error);
    }
  },

  updateProgressFromCoins: async (userId: number, totalCoins: number) => {
    try {
      stateLogger.storeUpdate('achievementActionsStore', 'updateFromCoins:start', { userId, totalCoins });
      set({ updating: true });
      
      await achievementService.updateProgressFromCoins?.(userId, totalCoins);
      
      // Refrescar datos después de actualizar
      await useAchievementDataStore.getState().refreshUserAchievements(userId);
      
      set({ updating: false });
      stateLogger.storeUpdate('achievementActionsStore', 'updateFromCoins:success', { userId, totalCoins });
    } catch (error: any) {
      stateLogger.storeError('achievementActionsStore', 'updateFromCoins', error);
      set({ updating: false });
      logger.error('Error actualizando progreso desde monedas:', error);
    }
  },

  forceUpdateAndRefresh: async (userId: number) => {
    try {
      stateLogger.storeUpdate('achievementActionsStore', 'forceUpdateAndRefresh:start', { userId });
      
      // Ejecutar forzar actualización y luego refrescar
      await get().forceUpdateAllUserAchievements(userId);
      await useAchievementDataStore.getState().refreshUserAchievements(userId);
      
      stateLogger.storeUpdate('achievementActionsStore', 'forceUpdateAndRefresh:success', { userId });
    } catch (error: any) {
      stateLogger.storeError('achievementActionsStore', 'forceUpdateAndRefresh', error);
      throw error;
    }
  },
}));
