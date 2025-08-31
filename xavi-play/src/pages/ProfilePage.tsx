import { useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import PokemonHeader from '@/components/common/PokemonHeader'
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications'
import { usePushNotifications } from '@/hooks/usePushNotifications'
import { useNavigation } from '@react-navigation/native'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import { profileStyles } from '@/styles/profile.styles'
import { useAuthStore } from '@/store/authStore'
import { useAchievementStore } from '@/store/achievementStore'
import { useFocusRefresh } from '@/hooks/useFocusRefresh'
import { useUserStateListener } from '@/hooks/useUserStateListener'
import { useProfileData } from '@/pages/profilepage/funcionalidades/useProfileData'
import { ProfileHeader } from '@/pages/profilepage/vistas/ProfileHeader'
import { TreasureAndStats } from '@/pages/profilepage/vistas/TreasureAndStats'
import { AchievementsSection } from '@/pages/profilepage/vistas/AchievementsSection'
import { QuickActions } from '@/pages/profilepage/vistas/QuickActions'

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore()
  useRealtimeNotifications()
  usePushNotifications()
  const navigation = useNavigation()
  const { userAchievements, loadUserAchievements, loading } = useAchievementStore()
  
  // Refrescar datos cuando el usuario navega al perfil
  useFocusRefresh();
  
  // Escuchar cambios en el estado del usuario para actualizar la vista
  const { user: currentUser } = useUserStateListener()

  useEffect(() => {
    if (user) {
      loadUserAchievements(parseInt(user.id));
    }
  }, [user, loadUserAchievements]);

  // Siempre llamar hooks en el mismo orden; useProfileData maneja user nulo con fallback
  const profileData = useProfileData(user, currentUser, userAchievements)

  return (
    <ScreenWrapper>
      <PokemonHeader title="Mi Perfil" />
      <ScrollView style={profileStyles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <ProfileHeader
          user={profileData.displayUser}
          levelUpInfo={{
            experienceProgress: profileData.experienceProgress,
            experienceInCurrentLevel: profileData.experienceInCurrentLevel,
            experienceNeededForNextLevel: profileData.experienceNeededForNextLevel,
            experienceRemaining: profileData.experienceRemaining,
          }}
        />
        <View>
          <TreasureAndStats user={profileData.displayUser} />
          <AchievementsSection
            loading={loading}
            unlockedAchievements={profileData.unlockedAchievements}
            claimedAchievements={profileData.claimedAchievements}
            pendingClaimAchievements={profileData.pendingClaimAchievements}
            onPressViewAll={() => (navigation as any).navigate('Achievements')}
          />
          <QuickActions />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ProfilePage; 