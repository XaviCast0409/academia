import { useEffect, useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { missionsStyles } from '@/styles/missions.styles';
import { useMissionStore } from '@/store/missionStore';
import { useAuthStore } from '@/store/authStore';
import { UserMission } from '@/types/mission';

type TabType = 'active' | 'completed';

const MissionsPage = () => {
  console.log('MissionsPage: Component rendered');
  const { user } = useAuthStore();
  const { 
    activeMissions, 
    completedMissions,
    loading, 
    error, 
    loadActiveMissions, 
    loadCompletedMissions,
    claimReward,
    clearError 
  } = useMissionStore();

  const [activeTab, setActiveTab] = useState<TabType>('active');

  useEffect(() => {
    if (user) {
      console.log('MissionsPage: Initial load for user:', user.id);
      loadActiveMissions(parseInt(user.id)).catch((error) => {
        Alert.alert('Error', 'No se pudieron cargar las misiones activas');
        console.error('Error loading active missions:', error);
      });
    }
  }, [user, loadActiveMissions]);

  // Refrescar misiones cuando la pantalla obtiene el foco
  useFocusEffect(
    useCallback(() => {
      if (user) {
        console.log('MissionsPage: Refreshing missions on focus');
        loadActiveMissions(parseInt(user.id)).catch((error) => {
          console.error('Error refreshing active missions:', error);
        });
        loadCompletedMissions(parseInt(user.id)).catch((error) => {
          console.error('Error refreshing completed missions:', error);
        });
      }
    }, [user, loadActiveMissions, loadCompletedMissions])
  );

  const handleTabPress = (tab: TabType) => {
    setActiveTab(tab);
    if (user) {
      if (tab === 'active') {
        loadActiveMissions(parseInt(user.id)).catch((error) => {
          Alert.alert('Error', 'No se pudieron cargar las misiones activas');
          console.error('Error loading active missions:', error);
        });
      } else {
        loadCompletedMissions(parseInt(user.id)).catch((error) => {
          Alert.alert('Error', 'No se pudieron cargar las misiones completadas');
          console.error('Error loading completed missions:', error);
        });
      }
    }
  };

  const handleClaimReward = async (missionId: number) => {
    if (!user) return;

    Alert.alert(
      'Reclamar Recompensa',
      '¿Estás seguro de que quieres reclamar esta recompensa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reclamar',
          style: 'default',
          onPress: async () => {
            try {
              await claimReward(parseInt(user.id), missionId);
              Alert.alert('¡Éxito!', 'Recompensa reclamada correctamente');
            } catch (error: any) {
              Alert.alert('Error', error.message || 'No se pudo reclamar la recompensa');
            }
          },
        },
      ]
    );
  };

  const getMissionTypeText = (type: string) => {
    switch (type) {
      case 'DAILY':
        return 'Diaria';
      case 'WEEKLY':
        return 'Semanal';
      case 'SPECIAL':
        return 'Especial';
      case 'GROUP':
        return 'Grupo';
      default:
        return type;
    }
  };

  const getMissionTypeColor = (type: string) => {
    switch (type) {
      case 'DAILY':
        return { backgroundColor: '#fef3c7', color: '#d97706' };
      case 'WEEKLY':
        return { backgroundColor: '#dbeafe', color: '#2563eb' };
      case 'SPECIAL':
        return { backgroundColor: '#fce7f3', color: '#be185d' };
      case 'GROUP':
        return { backgroundColor: '#dcfce7', color: '#16a34a' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#6b7280' };
    }
  };

  const getRewardIcon = (rewardType: string) => {
    switch (rewardType) {
      case 'COINS':
        return '🪙';
      case 'BADGE':
        return '🏆';
      case 'ITEM':
        return '🎁';
      default:
        return '🎁';
    }
  };

  const renderMissionCard = (userMission: UserMission) => {
    const mission = userMission.mission;
    if (!mission) return null;

    const typeStyles = getMissionTypeColor(mission.type);
    const progressPercentage = Math.min((userMission.progress / mission.requiredCount) * 100, 100);
    const isCompleted = userMission.isCompleted;
    const canClaimReward = isCompleted && !userMission.rewardClaimed;

    return (
      <View key={userMission.id} style={missionsStyles.missionCard}>
        <View style={missionsStyles.missionHeader}>
          <Text style={missionsStyles.missionTitle}>{mission.title}</Text>
          <View style={[missionsStyles.missionType, { backgroundColor: typeStyles.backgroundColor }]}>
            <Text style={[missionsStyles.missionTypeText, { color: typeStyles.color }]}>
              {getMissionTypeText(mission.type)}
            </Text>
          </View>
        </View>

        <Text style={missionsStyles.missionDescription}>{mission.description}</Text>

        <View style={missionsStyles.progressContainer}>
          <View style={missionsStyles.progressHeader}>
            <Text style={missionsStyles.progressText}>
              Progreso: {userMission.progress} / {mission.requiredCount}
            </Text>
            {isCompleted && (
              <View style={missionsStyles.completedBadge}>
                <Text style={missionsStyles.completedBadgeText}>Completada</Text>
              </View>
            )}
          </View>
          <View style={missionsStyles.progressBar}>
            <View 
              style={[
                missionsStyles.progressFill, 
                { width: `${progressPercentage}%` }
              ]} 
            />
          </View>
        </View>

        <View style={missionsStyles.rewardContainer}>
          <View style={missionsStyles.rewardInfo}>
            <Text style={missionsStyles.rewardIcon}>
              {getRewardIcon(mission.rewardType)}
            </Text>
            <Text style={missionsStyles.rewardText}>
              {mission.rewardAmount} {mission.rewardType === 'COINS' ? 'XaviCoins' : 'Recompensa'}
            </Text>
          </View>

          {canClaimReward && (
            <TouchableOpacity
              style={missionsStyles.claimButton}
              onPress={() => handleClaimReward(mission.id)}
              activeOpacity={0.7}
            >
              <Text style={missionsStyles.claimButtonText}>Reclamar</Text>
            </TouchableOpacity>
          )}

          {userMission.rewardClaimed && (
            <View style={[missionsStyles.claimButton, missionsStyles.claimButtonDisabled]}>
              <Text style={missionsStyles.claimButtonText}>Reclamada</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderTabs = () => (
    <View style={missionsStyles.tabContainer}>
      <TouchableOpacity
        style={[
          missionsStyles.tabButton,
          activeTab === 'active' && missionsStyles.tabButtonActive
        ]}
        onPress={() => handleTabPress('active')}
        activeOpacity={0.7}
      >
        <Text style={[
          missionsStyles.tabButtonText,
          activeTab === 'active' && missionsStyles.tabButtonTextActive
        ]}>
          Misiones Activas
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          missionsStyles.tabButton,
          activeTab === 'completed' && missionsStyles.tabButtonActive
        ]}
        onPress={() => handleTabPress('completed')}
        activeOpacity={0.7}
      >
        <Text style={[
          missionsStyles.tabButtonText,
          activeTab === 'completed' && missionsStyles.tabButtonTextActive
        ]}>
          Completadas
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => {
    const isActiveTab = activeTab === 'active';
    return (
      <View style={missionsStyles.emptyContainer}>
        <Text style={missionsStyles.emptyIcon}>🎯</Text>
        <Text style={missionsStyles.emptyTitle}>
          {isActiveTab ? 'No hay misiones activas' : 'No hay misiones completadas'}
        </Text>
        <Text style={missionsStyles.emptyText}>
          {isActiveTab 
            ? 'Completa actividades para desbloquear nuevas misiones.'
            : 'Completa misiones activas para verlas aquí.'
          }
        </Text>
      </View>
    );
  };

  const getCurrentMissions = () => {
    return activeTab === 'active' ? activeMissions : completedMissions;
  };

  return (
    <ScreenWrapper>
      <PokemonHeader title="Misiones" />
      <ScrollView 
        style={missionsStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {renderTabs()}
        
        {loading ? (
          <View style={missionsStyles.loadingContainer}>
            <Text style={missionsStyles.loadingText}>Cargando misiones...</Text>
          </View>
        ) : error ? (
          <View style={missionsStyles.errorContainer}>
            <Text style={missionsStyles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={missionsStyles.retryButton} 
              onPress={() => {
                clearError();
                if (user) {
                  if (activeTab === 'active') {
                    loadActiveMissions(parseInt(user.id));
                  } else {
                    loadCompletedMissions(parseInt(user.id));
                  }
                }
              }}
            >
              <Text style={missionsStyles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : getCurrentMissions().length === 0 ? (
          renderEmptyState()
        ) : (
          <View style={missionsStyles.missionsContainer}>
            {getCurrentMissions().map(renderMissionCard)}
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default MissionsPage; 