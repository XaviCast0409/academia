export interface User {
  id: string;
  username: string;
  level: number;
  experience: number;
  xaviCoins: number;
  completedActivities: number;
  totalXaviCoins: number;
  currentStreak: number;
  purchasedItems: number;
  avatar?: string;
  section?: string;
  roleId?: number;
  pokemonId?: number;
}

export interface UserStats {
  completedActivities: number;
  totalXaviCoins: number;
  currentStreak: number;
  purchasedItems: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  category: string;
} 