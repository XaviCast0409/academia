import { create } from 'zustand';
import {
  Achievement,
  UserAchievement,
  AchievementStats,
  AchievementFilters,
} from '@/types/achievement';
import achievementService from '@/services/achievementService';

interface AchievementState {
  // Estado de datos
  allAchievements: Achievement[];
  userAchievements: UserAchievement[];
  achievementStats: AchievementStats | null;
  
  // Estado de UI
  loading: boolean;
  loadingStats: boolean;
  error: string | null;
  lastRefresh: Date | null;
  
  // Filtros y ordenamiento
  filters: AchievementFilters;
  
  // Acciones principales
  loadAllAchievements: () => Promise<void>;
  loadUserAchievements: (userId: number) => Promise<void>;
  refreshUserAchievements: (userId: number) => Promise<void>;
  loadAchievementStats: (userId: number) => Promise<void>;
  claimAchievementReward: (userId: number, achievementId: number) => Promise<void>;
  checkAndUpdateAchievements: (userId: number, activityData?: any) => Promise<UserAchievement[]>;
  assignAllAchievements: (userId: number) => Promise<void>;
  updateAchievementProgress: (userId: number, activityData?: any) => Promise<void>;
  forceUpdateAllUserAchievements: (userId: number) => Promise<void>;
  updateProgressFromActivity: (userId: number, activityData: any) => Promise<void>;
  updateProgressFromLevelUp: (userId: number, newLevel: number) => Promise<void>;
  updateProgressFromStreak: (userId: number, streakDays: number) => Promise<void>;
  updateProgressFromCoins: (userId: number, totalCoins: number) => Promise<void>;
  forceUpdateAndRefresh: (userId: number) => Promise<void>;
  
  // Filtros y búsqueda
  setFilters: (filters: Partial<AchievementFilters>) => void;
  getFilteredAchievements: () => UserAchievement[];
  
  // Utilidades
  getAchievementsByCategory: (category: string) => UserAchievement[];
  getUnlockedAchievements: () => UserAchievement[];
  getPendingClaimAchievements: () => UserAchievement[];
  getAchievementProgress: (achievementId: number) => UserAchievement | null;
  
  // Estado
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  // Estado inicial
  allAchievements: [],
  userAchievements: [],
  achievementStats: null,
  loading: false,
  loadingStats: false,
  error: null,
  lastRefresh: null,
  
  // Filtros por defecto
  filters: {
    category: 'all',
    status: 'all',
    sortBy: 'category',
    ascending: true
  },

  // ====== ACCIONES PRINCIPALES ======

  loadAllAchievements: async () => {
    try {
      set({ loading: true, error: null });
      
      const achievements = await achievementService.getAllAchievements();
      
      set({ 
        allAchievements: achievements,
        loading: false,
        lastRefresh: new Date()
      });
    } catch (error: any) {
      console.error('AchievementStore: Error cargando logros:', error);
      set({ 
        error: error.message || 'Error al cargar los logros',
        loading: false 
      });
    }
  },

  loadUserAchievements: async (userId: number) => {
    try {
      set({ loading: true, error: null });
      const userAchievements = await achievementService.getAchievementProgress(userId);
      set({ 
        userAchievements,
        loading: false,
        lastRefresh: new Date()
      });
    } catch (error: any) {
      console.error('AchievementStore: Error cargando logros del usuario:', error);
      set({ 
        error: error.message || 'Error al cargar tus logros',
        loading: false 
      });
    }
  },

  refreshUserAchievements: async (userId: number) => {
    try {
      // Cargar logros y estadísticas en paralelo
      await Promise.all([
        get().loadUserAchievements(userId),
        get().loadAchievementStats(userId)
      ]);
    } catch (error: any) {
      console.error('AchievementStore: Error refrescando logros:', error);
      set({ error: error.message || 'Error al refrescar los logros' });
    }
  },

  loadAchievementStats: async (userId: number) => {
    try {
      set({ loadingStats: true });
      
      const stats = await achievementService.getAchievementStats(userId);
      
      set({ 
        achievementStats: stats,
        loadingStats: false
      });
    } catch (error: any) {
      console.error('AchievementStore: Error cargando estadísticas:', error);
      set({ 
        loadingStats: false,
        error: error.message || 'Error al cargar estadísticas'
      });
    }
  },

  claimAchievementReward: async (userId: number, achievementId: number) => {
    try {
      const response = await achievementService.claimAchievementReward(userId, achievementId);
      
      // Actualizar el estado local
      const { userAchievements } = get();
      const updatedAchievements = userAchievements.map(ua => 
        ua.achievementId === achievementId 
          ? { ...ua, rewardClaimed: true, claimedAt: new Date().toISOString() }
          : ua
      );
      
      set({ userAchievements: updatedAchievements });

      // Recargar estadísticas
      await get().loadAchievementStats(userId);
    } catch (error: any) {
      console.error('AchievementStore: Error reclamando recompensa:', error);
      set({ error: error.message || 'Error al reclamar la recompensa' });
      throw error;
    }
  },

  checkAndUpdateAchievements: async (userId: number, activityData?: any) => {
    try {
      const newlyUnlocked = await achievementService.checkAndUpdateAchievements(userId, activityData);
      
      if (newlyUnlocked.length > 0) {
        // Recargar logros del usuario para reflejar los cambios
        await get().loadUserAchievements(userId);
      }

      return newlyUnlocked;
    } catch (error: any) {
      console.error('AchievementStore: Error verificando logros:', error);
      throw error;
    }
  },

  assignAllAchievements: async (userId: number) => {
    try {
      set({ loading: true, error: null });
      await achievementService.assignAllAchievements(userId);
      // Recargar logros del usuario para obtener el estado actualizado
      await get().loadUserAchievements(userId);
      
      set({ loading: false });
    } catch (error) {
      console.error('AchievementStore: Error asignando logros:', error);
      set({ loading: false, error: (error as Error).message });
    }
  },

  updateAchievementProgress: async (userId: number, activityData?: any) => {
    try {
      
      await achievementService.updateAchievementProgress(userId, activityData);
      
      // Recargar logros del usuario para obtener el estado actualizado
      await get().loadUserAchievements(userId);
    } catch (error) {
      console.error('AchievementStore: Error actualizando progreso:', error);
      set({ error: (error as Error).message });
    }
  },

  forceUpdateAllUserAchievements: async (userId: number) => {
    try {
      await achievementService.forceUpdateAllUserAchievements(userId);
      
      // Recargar logros del usuario para obtener el estado actualizado
      await get().loadUserAchievements(userId);
    } catch (error) {
      console.error('AchievementStore: Error en actualización forzada:', error);
      set({ error: (error as Error).message });
    }
  },

  updateProgressFromActivity: async (userId: number, activityData: any) => {
    try {
      const unlockedAchievements = await achievementService.updateProgressFromActivity(userId, activityData);
      
      if (unlockedAchievements.length > 0) {
        // Recargar logros del usuario para obtener el estado actualizado
        await get().loadUserAchievements(userId);
      }
    } catch (error) {
      console.error('AchievementStore: Error actualizando progreso por actividad:', error);
      set({ error: (error as Error).message });
    }
  },

  updateProgressFromLevelUp: async (userId: number, newLevel: number) => {
    try {
      const unlockedAchievements = await achievementService.updateProgressFromLevelUp(userId, newLevel);
      
      if (unlockedAchievements.length > 0) {
        // Recargar logros del usuario para obtener el estado actualizado
        await get().loadUserAchievements(userId);
      }
    } catch (error) {
      console.error('AchievementStore: Error actualizando progreso por subida de nivel:', error);
      set({ error: (error as Error).message });
    }
  },

  updateProgressFromStreak: async (userId: number, streakDays: number) => {
    try {
      const unlockedAchievements = await achievementService.updateProgressFromStreak(userId, streakDays);
      
      if (unlockedAchievements.length > 0) {
        // Recargar logros del usuario para obtener el estado actualizado
        await get().loadUserAchievements(userId);
      }
    } catch (error) {
      console.error('AchievementStore: Error actualizando progreso por racha:', error);
      set({ error: (error as Error).message });
    }
  },

  updateProgressFromCoins: async (userId: number, totalCoins: number) => {
    try {
      const unlockedAchievements = await achievementService.updateProgressFromCoins(userId, totalCoins);
      
      if (unlockedAchievements.length > 0) {
        // Recargar logros del usuario para obtener el estado actualizado
        await get().loadUserAchievements(userId);
      }
    } catch (error) {
      console.error('AchievementStore: Error actualizando progreso por XaviCoins:', error);
      set({ error: (error as Error).message });
    }
  },

  // Nueva función para forzar actualización y mostrar progreso
  forceUpdateAndRefresh: async (userId: number) => {
    try {
      // Forzar actualización en el backend
      await achievementService.forceUpdateAllUserAchievements(userId);
      
      // Recargar logros y estadísticas
      await Promise.all([
        get().loadUserAchievements(userId),
        get().loadAchievementStats(userId)
      ]);
      
    } catch (error: any) {
      console.error('AchievementStore: Error en actualización forzada y refrescado:', error);
      set({ error: error.message || 'Error al forzar actualización de logros' });
    }
  },

  // ====== FILTROS Y BÚSQUEDA ======

  setFilters: (newFilters: Partial<AchievementFilters>) => {
    const { filters } = get();
    set({ 
      filters: { ...filters, ...newFilters }
    });
  },

  getFilteredAchievements: () => {
    const { userAchievements, filters } = get();
    
    let filtered = [...userAchievements];
    
    // Filtrar por categoría
    if (filters.category !== 'all') {
      filtered = filtered.filter(ua => ua.achievement.category === filters.category);
    }
    
    // Filtrar por estado
    if (filters.status !== 'all') {
      switch (filters.status) {
        case 'locked':
          filtered = filtered.filter(ua => !ua.isUnlocked);
          break;
        case 'unlocked':
          filtered = filtered.filter(ua => ua.isUnlocked && !ua.rewardClaimed);
          break;
        case 'claimed':
          filtered = filtered.filter(ua => ua.rewardClaimed);
          break;
      }
    }
    
    // Ordenar
    filtered.sort((a, b) => {
      let comparison = 0;
      
             switch (filters.sortBy) {
         case 'category':
           comparison = a.achievement.category.localeCompare(b.achievement.category);
           break;
         case 'progress':
           const progressA = a.isUnlocked ? 100 : (a.progress / a.achievement.requirementValue) * 100;
           const progressB = b.isUnlocked ? 100 : (b.progress / b.achievement.requirementValue) * 100;
           comparison = progressA - progressB;
           break;
         case 'rewardValue':
           comparison = Number(a.achievement.rewardValue) - Number(b.achievement.rewardValue);
           break;
         case 'unlockedAt':
           const dateA = a.unlockedAt ? new Date(a.unlockedAt).getTime() : 0;
           const dateB = b.unlockedAt ? new Date(b.unlockedAt).getTime() : 0;
           comparison = dateA - dateB;
           break;
         case 'title':
           comparison = a.achievement.title.localeCompare(b.achievement.title);
           break;
       }
      
      return filters.ascending ? comparison : -comparison;
    });
    
    return filtered;
  },

  // ====== UTILIDADES ======

  getAchievementsByCategory: (category: string) => {
    const { userAchievements } = get();
    return userAchievements.filter(ua => ua.achievement.category === category);
  },

  getUnlockedAchievements: () => {
    const { userAchievements } = get();
    return userAchievements.filter(ua => ua.isUnlocked);
  },

  getPendingClaimAchievements: () => {
    const { userAchievements } = get();
    return userAchievements.filter(ua => ua.isUnlocked && !ua.rewardClaimed);
  },

  getAchievementProgress: (achievementId: number) => {
    const { userAchievements } = get();
    return userAchievements.find(ua => ua.achievementId === achievementId) || null;
  },

  // ====== ESTADO ======

  clearError: () => set({ error: null }),

  setLoading: (loading: boolean) => set({ loading }),
}));