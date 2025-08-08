import { useMemo } from 'react'
import type { User } from '@/types/user'
import type { UserAchievement } from '@/types/achievement'
import {
  getExperienceProgress,
  getExperienceForNextLevel,
  getExperienceInCurrentLevel,
  getExperienceRemaining,
  getExperienceForCurrentLevel
} from '@/utils/experience'

interface UseProfileDataResult {
  displayUser: User
  // Experience metrics
  experienceProgress: number
  experienceForNextLevel: number
  experienceInCurrentLevel: number
  experienceRemaining: number
  experienceForCurrentLevel: number
  experienceNeededForNextLevel: number
  // Achievements metrics
  unlockedAchievements: UserAchievement[]
  claimedAchievements: UserAchievement[]
  pendingClaimAchievements: UserAchievement[]
}

export const useProfileData = (
  user: User | null,
  currentUser: User | null,
  userAchievements: UserAchievement[]
): UseProfileDataResult => {
  const displayUser = useMemo(() => {
    const u = currentUser || user
    if (u) return u
    // Fallback user to keep hooks stable when unauthenticated
    return {
      id: '0',
      username: '',
      level: 1,
      experience: 0,
      xaviCoins: 0,
      completedActivities: 0,
      totalXaviCoins: 0,
      currentStreak: 0,
      purchasedItems: 0,
      avatar: '',
      section: '',
      roleId: 0,
      pokemonId: 0,
    } as unknown as User
  }, [currentUser, user])

  const experienceForNextLevel = useMemo(() => getExperienceForNextLevel(displayUser.level), [displayUser.level])
  const experienceForCurrentLevel = useMemo(() => getExperienceForCurrentLevel(displayUser.level), [displayUser.level])
  const experienceInCurrentLevel = useMemo(
    () => getExperienceInCurrentLevel(displayUser.level, displayUser.experience),
    [displayUser.level, displayUser.experience]
  )
  const experienceRemaining = useMemo(
    () => getExperienceRemaining(displayUser.level, displayUser.experience),
    [displayUser.level, displayUser.experience]
  )
  const experienceProgress = useMemo(
    () => getExperienceProgress(displayUser.level, displayUser.experience),
    [displayUser.level, displayUser.experience]
  )
  const experienceNeededForNextLevel = useMemo(
    () => experienceForNextLevel - experienceForCurrentLevel,
    [experienceForNextLevel, experienceForCurrentLevel]
  )

  const unlockedAchievements = useMemo(() => userAchievements.filter((ua) => ua.isUnlocked), [userAchievements])
  const claimedAchievements = useMemo(() => userAchievements.filter((ua) => ua.rewardClaimed), [userAchievements])
  const pendingClaimAchievements = useMemo(() => userAchievements.filter((ua) => ua.isUnlocked && !ua.rewardClaimed), [userAchievements])

  return {
    displayUser,
    experienceProgress,
    experienceForNextLevel,
    experienceInCurrentLevel,
    experienceRemaining,
    experienceForCurrentLevel,
    experienceNeededForNextLevel,
    unlockedAchievements,
    claimedAchievements,
    pendingClaimAchievements,
  }
}


