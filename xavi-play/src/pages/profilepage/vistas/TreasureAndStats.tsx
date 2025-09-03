import React from 'react'
import { View, Text } from 'react-native'
import XavicoinDisplay from '@/components/common/XavicoinDisplay'
import StreakDisplay from '@/components/common/StreakDisplay'
import { profileStyles } from '@/styles/profile.styles'
import type { User } from '@/types/user'

interface Props {
  user: User
}

export const TreasureAndStats: React.FC<Props> = ({ user }) => {
  return (
    <>
      <View style={profileStyles.xavicoinsSection}>
        <Text style={profileStyles.sectionTitle}>Tu Tesoro</Text>
        <View style={profileStyles.xavicoinsContainer}>
          <XavicoinDisplay amount={user.xaviCoins || 0} size="large" />
        </View>
      </View>

      <View style={profileStyles.statsSection}>
        <Text style={profileStyles.sectionTitle}>Estadísticas de Aventura</Text>
        <View style={profileStyles.statsGrid}>
          <View style={profileStyles.statCard}>
            <Text style={profileStyles.statIcon}>📚</Text>
            <Text style={profileStyles.statLabel}>Actividades Completadas</Text>
            <Text style={profileStyles.statValue}>{user.completedActivities || 0}</Text>
          </View>
          <View style={profileStyles.statCard}>
            <Text style={profileStyles.statIcon}>🔥</Text>
            <Text style={profileStyles.statLabel}>Racha de Conexión</Text>
            <Text style={profileStyles.statValue}>{user.currentStreak || 0} días</Text>
          </View>
          <View style={profileStyles.statCard}>
            <Text style={profileStyles.statIcon}>⭐</Text>
            <Text style={profileStyles.statLabel}>Nivel Actual</Text>
            <Text style={profileStyles.statValue}>{user.level || 1}</Text>
          </View>
          <View style={profileStyles.statCard}>
            <Text style={profileStyles.statIcon}>⚡</Text>
            <Text style={profileStyles.statLabel}>Experiencia</Text>
            <Text style={profileStyles.statValue}>{user.experience || 0} XP</Text>
          </View>
        </View>
      </View>
    </>
  )
}


