import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { achievementsStyles } from '@/styles/achievements.styles';
import { useAchievementStore } from '@/store/achievementStore';
import { useAuthStore } from '@/store/authStore';
import { 
  UserAchievement, 
  AchievementStatus,
} from '@/types/achievement';

const AchievementsPage: React.FC = () => {

  
  const { user } = useAuthStore();
  const {
    allAchievements,
    userAchievements,
    loading,
    error,
    lastRefresh,
    filters,
    loadAllAchievements,
    loadAchievementStats,
    refreshUserAchievements,
    claimAchievementReward,
    forceUpdateAndRefresh,
    setFilters,
    getPendingClaimAchievements,
    clearError
  } = useAchievementStore();

  const [refreshing, setRefreshing] = useState(false);

  // Auto-refresh cuando la pantalla obtiene el foco
  useFocusEffect(
    useCallback(() => {
      if (user) {
    
        
        // Cargar TODOS los logros del sistema
        loadAllAchievements();
        
        // Cargar progreso específico del usuario
        refreshUserAchievements(parseInt(user.id));
        
        // Cargar estadísticas
        loadAchievementStats(parseInt(user.id));
      }
    }, [user, loadAllAchievements, refreshUserAchievements, loadAchievementStats])
  );

  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    if (!user) return;
    
    setRefreshing(true);
    try {
  
      
      // Cargar TODOS los logros del sistema
      await loadAllAchievements();
      
      // Cargar progreso específico del usuario
      await refreshUserAchievements(parseInt(user.id));
      
      // Cargar estadísticas
      await loadAchievementStats(parseInt(user.id));
    } catch (error) {
      console.error('AchievementsPage: Error during manual refresh:', error);
      Alert.alert('Error', 'No se pudieron actualizar los logros');
    } finally {
      setRefreshing(false);
    }
  }, [user, refreshUserAchievements]);

  // Handle claim reward
  const handleClaimReward = async (achievementId: number, achievementTitle: string) => {
    if (!user) return;

    Alert.alert(
      '🏆 Reclamar Recompensa',
      `¿Quieres reclamar la recompensa del logro "${achievementTitle}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reclamar',
          style: 'default',
          onPress: async () => {
            try {
              await claimAchievementReward(parseInt(user.id), achievementId);
              Alert.alert('¡Éxito!', 'Recompensa reclamada correctamente');
            } catch (error: any) {
              Alert.alert('Error', error.message || 'No se pudo reclamar la recompensa');
            }
          },
        },
      ]
    );
  };

  // Handle force update achievements
  const handleForceUpdate = async () => {
    if (!user) return;

    Alert.alert(
      '🔄 Forzar Actualización',
      '¿Quieres forzar la actualización de todos los logros? Esto puede tomar unos segundos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Actualizar',
          style: 'default',
          onPress: async () => {
            try {
              await forceUpdateAndRefresh(parseInt(user.id));
              Alert.alert('¡Éxito!', 'Logros actualizados correctamente');
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Error al actualizar los logros');
            }
          },
        },
      ]
    );
  };

  // Category helpers
  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'progress': return '📈';
      case 'levels': return '⭐';
      case 'math_topics': return '🧮';
      case 'gamification': return '🎮';
      case 'perfection': return '💯';
      case 'constancy': return '📅';
      case 'special': return '👑';
      default: return '🏆';
    }
  };

  const getCategoryName = (category: string): string => {
    switch (category) {
      case 'progress': return 'Progreso';
      case 'levels': return 'Niveles';
      case 'math_topics': return 'Matemáticas';
      case 'gamification': return 'Gamificación';
      case 'perfection': return 'Perfección';
      case 'constancy': return 'Constancia';
      case 'special': return 'Especiales';
      default: return category;
    }
  };

  // Reward helpers
  const getRewardIcon = (rewardType: string): string => {
    switch (rewardType) {
      case 'coins': return '🪙';
      case 'badge': return '🏅';
      case 'title': return '🏷️';
      case 'avatar_frame': return '🖼️';
      default: return '🎁';
    }
  };

  const getRewardText = (rewardType: string, rewardValue: number | string): string => {
    switch (rewardType) {
      case 'coins': return `${rewardValue} XaviCoins`;
      case 'badge': return 'Insignia';
      case 'title': return 'Título';
      case 'avatar_frame': return 'Marco';
      default: return 'Recompensa';
    }
  };

  // Calcular estadísticas localmente con TODOS los logros
  const calculateStats = () => {
    const total = allAchievements.length; // Total de logros en el sistema
    const claimed = userAchievements.filter(ua => ua.rewardClaimed).length;
    const unlocked = userAchievements.filter(ua => ua.isUnlocked && !ua.rewardClaimed).length;
    const inProgress = userAchievements.filter(ua => !ua.isUnlocked && ua.progress > 0).length;
    const notStarted = total - userAchievements.length;
    
    return {
      total,
      claimed,
      unlocked,
      inProgress,
      notStarted,
      pendingClaim: unlocked // Los desbloqueados son los pendientes de reclamar
    };
  };

  // Render statistics
  const renderStatistics = () => {
    const stats = calculateStats();

    return (
      <View style={achievementsStyles.statsContainer}>
        <Text style={achievementsStyles.statsTitle}>📊 Estadísticas de Logros</Text>
        <View style={achievementsStyles.statsGrid}>
          <View style={achievementsStyles.statItem}>
            <Text style={achievementsStyles.statNumber}>{stats.total}</Text>
            <Text style={achievementsStyles.statLabel}>Total</Text>
          </View>
          <View style={achievementsStyles.statItem}>
            <Text style={achievementsStyles.statNumber}>{stats.unlocked}</Text>
            <Text style={achievementsStyles.statLabel}>Desbloqueados</Text>
          </View>
          <View style={achievementsStyles.statItem}>
            <Text style={achievementsStyles.statNumber}>{stats.claimed}</Text>
            <Text style={achievementsStyles.statLabel}>Reclamados</Text>
          </View>
          <View style={achievementsStyles.statItem}>
            <Text style={achievementsStyles.statNumber}>{stats.pendingClaim}</Text>
            <Text style={achievementsStyles.statLabel}>Pendientes</Text>
          </View>
        </View>
      </View>
    );
  };

  // Render filters
  const renderFilters = () => {

    const statuses: { key: AchievementStatus; label: string }[] = [
      { key: 'all', label: 'Todos' },
      { key: 'claimed', label: 'Reclamados' },
      { key: 'unlocked', label: 'Desbloqueados' },
      { key: 'in_progress', label: 'Progreso' },
      { key: 'not_started', label: 'Disponibles' },
    ];

    return (
      <View style={achievementsStyles.filtersContainer}>
        {/* Status filter */}
        <View style={achievementsStyles.filtersRow}>
          <Text style={achievementsStyles.filterLabel}>Estado:</Text>
          <View style={achievementsStyles.filterButtons}>
            {statuses.map(status => (
              <TouchableOpacity
                key={status.key}
                style={[
                  achievementsStyles.filterButton,
                  filters.status === status.key && achievementsStyles.filterButtonActive
                ]}
                onPress={() => setFilters({ status: status.key })}
              >
                <Text style={[
                  achievementsStyles.filterButtonText,
                  filters.status === status.key && achievementsStyles.filterButtonTextActive
                ]}>
                  {status.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Force update button */}
        <View style={achievementsStyles.filtersRow}>
          <TouchableOpacity
            style={[achievementsStyles.filterButton, achievementsStyles.filterButtonActive]}
            onPress={handleForceUpdate}
          >
            <Text style={[achievementsStyles.filterButtonText, achievementsStyles.filterButtonTextActive]}>
              🔄 Forzar Actualización
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Render achievement card
  const renderAchievementCard = (userAchievement: UserAchievement) => {
    const { achievement } = userAchievement;
    const progressPercentage = userAchievement.isUnlocked 
      ? 100 
      : Math.min((userAchievement.progress / achievement.requirementValue) * 100, 100);
    
    const canClaimReward = userAchievement.isUnlocked && !userAchievement.rewardClaimed;
    
    let cardStyle = {
      ...achievementsStyles.achievementCard,
      ...(userAchievement.rewardClaimed
        ? achievementsStyles.achievementCardClaimed
        : userAchievement.isUnlocked
          ? achievementsStyles.achievementCardUnlocked
          : {})
    };

    return (
      <View key={userAchievement.id} style={cardStyle}>
        {/* Header */}
        <View style={achievementsStyles.achievementHeader}>
          <View style={achievementsStyles.achievementMainInfo}>
            <Text style={[
              achievementsStyles.achievementTitle,
              userAchievement.isUnlocked && achievementsStyles.achievementTitleUnlocked
            ]}>
              {getCategoryIcon(achievement.category)} {achievement.title}
            </Text>
            <Text style={achievementsStyles.achievementDescription}>
              {achievement.description}
            </Text>
          </View>
          
          <View style={achievementsStyles.achievementBadges}>
            <View style={achievementsStyles.categoryBadge}>
              <Text style={achievementsStyles.categoryBadgeText}>
                {getCategoryName(achievement.category)}
              </Text>
            </View>
            
            <View style={[
              achievementsStyles.statusBadge,
              userAchievement.rewardClaimed 
                ? achievementsStyles.statusBadgeClaimed
                : userAchievement.isUnlocked 
                  ? achievementsStyles.statusBadgeUnlocked
                  : achievementsStyles.statusBadgeLocked
            ]}>
              <Text style={[
                achievementsStyles.statusBadgeText,
                userAchievement.rewardClaimed 
                  ? achievementsStyles.statusBadgeTextClaimed
                  : userAchievement.isUnlocked 
                    ? achievementsStyles.statusBadgeTextUnlocked
                    : achievementsStyles.statusBadgeTextLocked
              ]}>
                {userAchievement.rewardClaimed 
                  ? 'Reclamado'
                  : userAchievement.isUnlocked 
                    ? 'Desbloqueado'
                    : 'Bloqueado'}
              </Text>
            </View>
          </View>
        </View>

        {/* Progress */}
        {!userAchievement.isUnlocked && (
          <View style={achievementsStyles.progressContainer}>
            <View style={achievementsStyles.progressHeader}>
              <Text style={achievementsStyles.progressText}>
                Progreso: {userAchievement.progress}/{achievement.requirementValue}
              </Text>
              <Text style={achievementsStyles.progressPercentage}>
                {Math.round(progressPercentage)}%
              </Text>
            </View>
            <View style={achievementsStyles.progressBar}>
              <View style={[
                achievementsStyles.progressFill,
                userAchievement.isUnlocked 
                  ? achievementsStyles.progressFillUnlocked
                  : achievementsStyles.progressFillLocked,
                { width: `${progressPercentage}%` }
              ]} />
            </View>
          </View>
        )}

        {/* Reward */}
        <View style={achievementsStyles.rewardContainer}>
          <View style={achievementsStyles.rewardInfo}>
            <Text style={achievementsStyles.rewardIcon}>
              {getRewardIcon(achievement.rewardType)}
            </Text>
            <Text style={achievementsStyles.rewardText}>
              {getRewardText(achievement.rewardType, achievement.rewardValue)}
            </Text>
          </View>

          {canClaimReward && (
            <TouchableOpacity
              style={achievementsStyles.claimButton}
              onPress={() => handleClaimReward(achievement.id, achievement.title)}
              activeOpacity={0.7}
            >
              <Text style={achievementsStyles.claimButtonText}>Reclamar</Text>
            </TouchableOpacity>
          )}

          {userAchievement.rewardClaimed && (
            <View style={achievementsStyles.claimedButton}>
              <Text style={achievementsStyles.claimedButtonText}>✓ Reclamado</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  // Render empty state
  const renderEmptyState = () => (
    <View style={achievementsStyles.emptyContainer}>
      <Text style={achievementsStyles.emptyIcon}>🏆</Text>
      <Text style={achievementsStyles.emptyTitle}>No hay logros para mostrar</Text>
      <Text style={achievementsStyles.emptyText}>
        Completa actividades y desafíos para desbloquear nuevos logros y ganar recompensas.
      </Text>
    </View>
  );

  // Combinar todos los logros del sistema con el progreso del usuario
  const getAllAchievementsWithUserProgress = () => {
    // Crear un mapa de logros del usuario para acceso rápido
    const userAchievementMap = new Map();
    userAchievements.forEach(ua => {
      userAchievementMap.set(ua.achievement.id, ua);
    });

    // Procesar TODOS los logros del sistema con estado del usuario
    return allAchievements.map(achievement => {
      const userAchievement = userAchievementMap.get(achievement.id);
      
      if (userAchievement) {
        // Usuario tiene este logro asignado - usar datos reales
        return userAchievement;
      } else {
        // Usuario NO tiene este logro - crear estructura similar
        return {
          id: `${achievement.id}-not-started`,
          achievement: achievement,
          userId: user ? parseInt(user.id) : 0,
          progress: 0,
          isUnlocked: false,
          rewardClaimed: false,
          claimedAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      }
    });
  };

  // Aplicar filtros a TODOS los logros
  const applyFilters = (achievements: any[]) => {
    let filtered = achievements;

    // Filtrar por categoría
    if (filters.category !== 'all') {
      filtered = filtered.filter(ua => ua.achievement.category === filters.category);
    }

    // Filtrar por estado
    if (filters.status !== 'all') {
      switch (filters.status) {
        case 'unlocked':
          filtered = filtered.filter(ua => ua.isUnlocked && !ua.rewardClaimed);
          break;
        case 'claimed':
          filtered = filtered.filter(ua => ua.rewardClaimed);
          break;
        case 'in_progress':
          filtered = filtered.filter(ua => !ua.isUnlocked && ua.progress > 0);
          break;
        case 'not_started':
          filtered = filtered.filter(ua => ua.progress === 0 && !ua.isUnlocked);
          break;
      }
    }

    // Ordenar
    filtered.sort((a, b) => {
      const getValue = (ua: any) => {
        switch (filters.sortBy) {
          case 'progress':
            return ua.progress / ua.achievement.requirementValue;
          case 'category':
            return ua.achievement.category;
          case 'title':
            return ua.achievement.title;
          default:
            return ua.achievement.category;
        }
      };

      const aVal = getValue(a);
      const bVal = getValue(b);
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return filters.ascending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      
      return filters.ascending ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  };

  const allAchievementsWithProgress = getAllAchievementsWithUserProgress();
  const filteredAchievements = applyFilters(allAchievementsWithProgress);
  const pendingClaims = getPendingClaimAchievements();

  return (
    <ScreenWrapper>
      <PokemonHeader 
        title={`Logros ${pendingClaims.length > 0 ? `(${pendingClaims.length})` : ''}`} 
      />
      
      <ScrollView 
        style={achievementsStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3B82F6']}
            tintColor="#3B82F6"
            title="Actualizando logros..."
            titleColor="#6B7280"
          />
        }
      >
        {/* Statistics */}
        {renderStatistics()}

        {/* Filters */}
        {renderFilters()}
        
        {/* Last refresh info */}
        {lastRefresh && !loading && (
          <View style={achievementsStyles.refreshInfo}>
            <Text style={achievementsStyles.refreshText}>
              Última actualización: {new Date(lastRefresh).toLocaleTimeString()}
            </Text>
          </View>
        )}
        
        {/* Content */}
        {loading ? (
          <View style={achievementsStyles.loadingContainer}>
            <Text style={achievementsStyles.loadingText}>Cargando logros...</Text>
          </View>
        ) : error ? (
          <View style={achievementsStyles.errorContainer}>
            <Text style={achievementsStyles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={achievementsStyles.retryButton} 
              onPress={() => {
                clearError();
                if (user) {
                  refreshUserAchievements(parseInt(user.id));
                }
              }}
            >
              <Text style={achievementsStyles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : filteredAchievements.length === 0 ? (
          renderEmptyState()
        ) : (
          <View style={achievementsStyles.achievementsContainer}>
            {filteredAchievements.map(renderAchievementCard)}
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AchievementsPage;