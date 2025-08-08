import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { profileStyles } from '@/styles/profile.styles'
import type { UserAchievement } from '@/types/achievement'

interface Props {
  loading: boolean
  unlockedAchievements: UserAchievement[]
  claimedAchievements: UserAchievement[]
  pendingClaimAchievements: UserAchievement[]
  onPressViewAll: () => void
}

export const AchievementsSection: React.FC<Props> = ({ loading, unlockedAchievements, claimedAchievements, pendingClaimAchievements, onPressViewAll }) => {
  return (
    <View style={profileStyles.achievementsSection}>
      <View style={profileStyles.sectionHeader}>
        <Text style={profileStyles.sectionTitle}>Logros</Text>
        <TouchableOpacity style={profileStyles.viewAllButton} onPress={onPressViewAll}>
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

      {unlockedAchievements.length > 0 && (
        <View style={profileStyles.recentAchievements}>
          <Text style={profileStyles.subsectionTitle}>Logros Recientes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {unlockedAchievements.slice(0, 5).map((ua) => (
              <View key={ua.id} style={profileStyles.recentAchievementCard}>
                <Text style={profileStyles.recentAchievementIcon}>{ua.achievement.icon}</Text>
                <Text style={profileStyles.recentAchievementTitle} numberOfLines={2}>
                  {ua.achievement.title}
                </Text>
                <Text style={profileStyles.recentAchievementProgress}>
                  {ua.progress}/{ua.achievement.requirementValue}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}


