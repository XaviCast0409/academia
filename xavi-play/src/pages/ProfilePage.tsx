import { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import XavicoinDisplay from '@/components/common/XavicoinDisplay';
import { profileStyles } from '@/styles/profile.styles';
import { useAuthStore } from '@/store/authStore';
import { useAchievementStore } from '@/store/achievementStore';
import { useFocusRefresh } from '@/hooks/useFocusRefresh';
import { useUserStateListener } from '@/hooks/useUserStateListener';
import { 
  getExperienceProgress, 
  getExperienceForNextLevel, 
  getExperienceInCurrentLevel,
  getExperienceRemaining,
  getExperienceForCurrentLevel
} from '@/utils/experience';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const navigation = useNavigation();
  const { userAchievements, loadUserAchievements, loading } = useAchievementStore();
  
  // Refrescar datos cuando el usuario navega al perfil
  useFocusRefresh();
  
  // Escuchar cambios en el estado del usuario para actualizar la vista
  const { user: currentUser, forceUpdate } = useUserStateListener();

  useEffect(() => {
    if (user) {
      loadUserAchievements(parseInt(user.id));
    }
  }, [user, loadUserAchievements]);

  if (!user) {
    return null; // Should not happen when authenticated
  }

  // Usar el usuario actual que puede haber sido actualizado
  const displayUser = currentUser || user;

  // Calcular progreso de experiencia usando las utilidades
  const experienceProgress = getExperienceProgress(displayUser.level, displayUser.experience);
  const experienceForNextLevel = getExperienceForNextLevel(displayUser.level);
  const experienceInCurrentLevel = getExperienceInCurrentLevel(displayUser.level, displayUser.experience);
  const experienceRemaining = getExperienceRemaining(displayUser.level, displayUser.experience);
  const experienceForCurrentLevel = getExperienceForCurrentLevel(displayUser.level);
  const experienceNeededForNextLevel = experienceForNextLevel - experienceForCurrentLevel;

  // Calcular estadísticas de logros
  const unlockedAchievements = userAchievements.filter(ua => ua.isUnlocked);
  const claimedAchievements = userAchievements.filter(ua => ua.rewardClaimed);
  const pendingClaimAchievements = userAchievements.filter(ua => ua.isUnlocked && !ua.rewardClaimed);

  const handleNavigateToAchievements = () => {
    navigation.navigate('Achievements' as never);
  };

  return (
    <ScreenWrapper>
      <PokemonHeader title="Mi Perfil" />
      <ScrollView 
        style={profileStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={profileStyles.profileCard}>
          {/* Avatar and basic info */}
          <View style={profileStyles.avatarSection}>
            <View style={profileStyles.avatarContainer}>
              <Image source={{ uri: displayUser.avatar }} style={profileStyles.avatar} />
            </View>
            <Text style={profileStyles.username}>{displayUser.username}</Text>
            <Text style={profileStyles.level}>Nivel {displayUser.level}</Text>
            
            {/* Progress bar */}
            <View style={profileStyles.progressContainer}>
              <View style={profileStyles.progressBar}>
                <View
                  style={[
                    profileStyles.progressFill,
                    { width: `${experienceProgress}%` },
                  ]}
                />
              </View>
              <View style={profileStyles.progressText}>
                <Text style={profileStyles.progressLabel}>
                  {experienceInCurrentLevel} XP / {experienceNeededForNextLevel} XP
                </Text>
                <Text style={profileStyles.progressLabel}>
                  Nivel {user.level + 1} ({experienceRemaining} XP restantes)
                </Text>
              </View>
            </View>
          </View>

          {/* XaviCoins Display */}
          <View style={profileStyles.xavicoinsSection}>
            <Text style={profileStyles.sectionTitle}>Tu Tesoro</Text>
            <View style={profileStyles.xavicoinsContainer}>
              <XavicoinDisplay amount={displayUser.xaviCoins || 0} size="large" />
            </View>
          </View>

          {/* Statistics */}
          <View style={profileStyles.statsSection}>
            <Text style={profileStyles.sectionTitle}>Estadísticas de Aventura</Text>
            <View style={profileStyles.statsGrid}>
              <View style={profileStyles.statCard}>
                <Text style={profileStyles.statIcon}>📚</Text>
                <Text style={profileStyles.statLabel}>Actividades Completadas</Text>
                <Text style={profileStyles.statValue}>{displayUser.completedActivities || 0}</Text>
              </View>
              <View style={profileStyles.statCard}>
                <Text style={profileStyles.statIcon}>🔥</Text>
                <Text style={profileStyles.statLabel}>Racha de Conexión</Text>
                <Text style={profileStyles.statValue}>{displayUser.currentStreak || 0} días</Text>
              </View>
              <View style={profileStyles.statCard}>
                <Text style={profileStyles.statIcon}>⭐</Text>
                <Text style={profileStyles.statLabel}>Nivel Actual</Text>
                <Text style={profileStyles.statValue}>{displayUser.level || 1}</Text>
              </View>
              <View style={profileStyles.statCard}>
                <Text style={profileStyles.statIcon}>⚡</Text>
                <Text style={profileStyles.statLabel}>Experiencia</Text>
                <Text style={profileStyles.statValue}>{displayUser.experience || 0} XP</Text>
              </View>
            </View>
          </View>

          {/* Achievements Section */}
          <View style={profileStyles.achievementsSection}>
            <View style={profileStyles.sectionHeader}>
              <Text style={profileStyles.sectionTitle}>Logros</Text>
              <TouchableOpacity 
                style={profileStyles.viewAllButton}
                onPress={handleNavigateToAchievements}
              >
                <Text style={profileStyles.viewAllText}>Ver todos</Text>
              </TouchableOpacity>
            </View>
            
            {loading ? (
              <View style={profileStyles.loadingContainer}>
                <Text style={profileStyles.loadingText}>Cargando logros...</Text>
              </View>
            ) : (
              <View style={profileStyles.achievementsGrid}>
                <View style={profileStyles.achievementCard}>
                  <Text style={profileStyles.achievementIcon}>🏆</Text>
                  <Text style={profileStyles.achievementLabel}>Desbloqueados</Text>
                  <Text style={profileStyles.achievementValue}>{unlockedAchievements.length}</Text>
                </View>
                <View style={profileStyles.achievementCard}>
                  <Text style={profileStyles.achievementIcon}>💰</Text>
                  <Text style={profileStyles.achievementLabel}>Reclamados</Text>
                  <Text style={profileStyles.achievementValue}>{claimedAchievements.length}</Text>
                </View>
                <View style={profileStyles.achievementCard}>
                  <Text style={profileStyles.achievementIcon}>⏳</Text>
                  <Text style={profileStyles.achievementLabel}>Pendientes</Text>
                  <Text style={profileStyles.achievementValue}>{pendingClaimAchievements.length}</Text>
                </View>
              </View>
            )}

            {/* Recent Achievements */}
            {unlockedAchievements.length > 0 && (
              <View style={profileStyles.recentAchievements}>
                <Text style={profileStyles.subsectionTitle}>Logros Recientes</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {unlockedAchievements.slice(0, 5).map((userAchievement) => (
                    <View key={userAchievement.id} style={profileStyles.recentAchievementCard}>
                      <Text style={profileStyles.recentAchievementIcon}>
                        {userAchievement.achievement.icon}
                      </Text>
                      <Text style={profileStyles.recentAchievementTitle} numberOfLines={2}>
                        {userAchievement.achievement.title}
                      </Text>
                      <Text style={profileStyles.recentAchievementProgress}>
                        {userAchievement.progress}/{userAchievement.achievement.requirementValue}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Quick Actions */}
          <View style={profileStyles.actionsSection}>
            <Text style={profileStyles.sectionTitle}>Acciones Rápidas</Text>
            <View style={profileStyles.actionsGrid}>
              <TouchableOpacity 
                style={profileStyles.actionButton}
                onPress={() => navigation.navigate('Activities' as never)}
              >
                <Text style={profileStyles.actionIcon}>📚</Text>
                <Text style={profileStyles.actionLabel}>Actividades</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={profileStyles.actionButton}
                onPress={() => navigation.navigate('Missions' as never)}
              >
                <Text style={profileStyles.actionIcon}>🎯</Text>
                <Text style={profileStyles.actionLabel}>Misiones</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={profileStyles.actionButton}
                onPress={() => navigation.navigate('Store' as never)}
              >
                <Text style={profileStyles.actionIcon}>🛒</Text>
                <Text style={profileStyles.actionLabel}>Tienda</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={profileStyles.actionButton}
                onPress={() => navigation.navigate('Ranking' as never)}
              >
                <Text style={profileStyles.actionIcon}>🏆</Text>
                <Text style={profileStyles.actionLabel}>Ranking</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ProfilePage; 