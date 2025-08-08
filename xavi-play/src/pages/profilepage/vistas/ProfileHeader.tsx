import React from 'react'
import { View, Text, Image } from 'react-native'
import PokemonHeader from '@/components/common/PokemonHeader'
import { profileStyles } from '@/styles/profile.styles'
import type { User } from '@/types/user'

interface Props {
  user: User
  levelUpInfo: {
    experienceProgress: number
    experienceInCurrentLevel: number
    experienceNeededForNextLevel: number
    experienceRemaining: number
  }
}

export const ProfileHeader: React.FC<Props> = ({ user, levelUpInfo }) => {
  const { experienceProgress, experienceInCurrentLevel, experienceNeededForNextLevel, experienceRemaining } = levelUpInfo
  return (
    <>
      <View style={profileStyles.content}>
        <View style={profileStyles.avatarSection}>
          <View style={profileStyles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={profileStyles.avatar} />
          </View>
          <Text style={profileStyles.username}>{user.username}</Text>
          <Text style={profileStyles.level}>Nivel {user.level}</Text>

          <View style={profileStyles.progressContainer}>
            <View style={profileStyles.progressBar}>
              <View style={[profileStyles.progressFill, { width: `${experienceProgress}%` }]} />
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
      </View>
    </>
  )
}


