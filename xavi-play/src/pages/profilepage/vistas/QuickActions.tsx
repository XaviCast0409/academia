import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { profileStyles } from '@/styles/profile.styles'
import { useNavigation } from '@react-navigation/native'

export const QuickActions: React.FC = () => {
  const navigation = useNavigation()
  return (
    <View style={profileStyles.actionsSection}>
      <Text style={profileStyles.sectionTitle}>Acciones Rápidas</Text>
      <View style={profileStyles.actionsGrid}>
        <TouchableOpacity style={profileStyles.actionButton} onPress={() => navigation.navigate('Activities' as never)}>
          <Text style={profileStyles.actionIcon}>📚</Text>
          <Text style={profileStyles.actionLabel}>Actividades</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileStyles.actionButton} onPress={() => navigation.navigate('Missions' as never)}>
          <Text style={profileStyles.actionIcon}>🎯</Text>
          <Text style={profileStyles.actionLabel}>Misiones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileStyles.actionButton} onPress={() => navigation.navigate('Store' as never)}>
          <Text style={profileStyles.actionIcon}>🛒</Text>
          <Text style={profileStyles.actionLabel}>Tienda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileStyles.actionButton} onPress={() => navigation.navigate('Ranking' as never)}>
          <Text style={profileStyles.actionIcon}>🏆</Text>
          <Text style={profileStyles.actionLabel}>Ranking</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


