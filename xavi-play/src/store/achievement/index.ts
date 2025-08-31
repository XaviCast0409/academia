/**
 * Store principal de logros que combina todos los stores especializados
 * Proporciona una interfaz unificada para interactuar con el sistema de logros
 */

import { useAchievementDataStore } from './achievementDataStore';
import { useAchievementActionsStore } from './achievementActionsStore';
import { useAchievementFiltersStore } from './achievementFiltersStore';

// Hook principal que combina todos los stores de logros
export const useAchievementStore = () => {
  // Data store
  const {
    allAchievements,
    userAchievements,
    achievementStats,
    loading,
    loadingStats,
    error,
    lastRefresh,
    loadAllAchievements,
    loadUserAchievements,
    refreshUserAchievements,
    loadAchievementStats,
    clearError,
    setLoading,
    getAchievementsByCategory: getAchievementsByCategoryData,
    getUnlockedAchievements,
    getPendingClaimAchievements,
    getAchievementProgress,
  } = useAchievementDataStore();

  // Actions store
  const {
    claiming,
    updating,
    claimAchievementReward,
    checkAndUpdateAchievements,
    assignAllAchievements,
    updateAchievementProgress,
    forceUpdateAllUserAchievements,
    updateProgressFromActivity,
    updateProgressFromLevelUp,
    updateProgressFromStreak,
    updateProgressFromCoins,
    forceUpdateAndRefresh,
  } = useAchievementActionsStore();

  // Filters store
  const {
    filters,
    searchText,
    setFilters,
    setSearchText,
    resetFilters,
    getFilteredAchievements,
    searchAchievements,
    getAchievementsByStatus,
    getAchievementsByCategory: getAchievementsByCategoryFilter,
    getFilteredStats,
  } = useAchievementFiltersStore();

  return {
    // ====== ESTADO ======
    // Data
    allAchievements,
    userAchievements,
    achievementStats,
    loading,
    loadingStats,
    error,
    lastRefresh,
    
    // Actions
    claiming,
    updating,
    
    // Filters
    filters,
    searchText,
    
    // ====== ACCIONES DE DATOS ======
    loadAllAchievements,
    loadUserAchievements,
    refreshUserAchievements,
    loadAchievementStats,
    clearError,
    setLoading,
    
    // ====== ACCIONES DE OPERACIONES ======
    claimAchievementReward,
    checkAndUpdateAchievements,
    assignAllAchievements,
    updateAchievementProgress,
    forceUpdateAllUserAchievements,
    updateProgressFromActivity,
    updateProgressFromLevelUp,
    updateProgressFromStreak,
    updateProgressFromCoins,
    forceUpdateAndRefresh,
    
    // ====== ACCIONES DE FILTROS ======
    setFilters,
    setSearchText,
    resetFilters,
    
    // ====== GETTERS Y UTILIDADES ======
    getFilteredAchievements,
    searchAchievements,
    getAchievementsByStatus,
    getAchievementsByCategory: getAchievementsByCategoryFilter, // Usar el del filtro por defecto
    getAchievementsByCategoryData, // Disponible si se necesita el del data store
    getUnlockedAchievements,
    getPendingClaimAchievements,
    getAchievementProgress,
    getFilteredStats,
    
    // ====== COMPUTED PROPERTIES ======
    get hasError() {
      return !!error;
    },
    
    get isLoading() {
      return loading || claiming || updating;
    },
    
    get totalAchievements() {
      return userAchievements.length;
    },
    
    get completedAchievements() {
      return getUnlockedAchievements().length;
    },
    
    get progressPercentage() {
      return userAchievements.length > 0 
        ? Math.round((getUnlockedAchievements().length / userAchievements.length) * 100)
        : 0;
    },
    
    get pendingClaimCount() {
      return getPendingClaimAchievements().length;
    },
  };
};

// Exportar stores individuales para casos específicos
export { useAchievementDataStore } from './achievementDataStore';
export { useAchievementActionsStore } from './achievementActionsStore';
export { useAchievementFiltersStore } from './achievementFiltersStore';

// Tipos
export type AchievementStore = ReturnType<typeof useAchievementStore>;
