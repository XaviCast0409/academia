import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // gray-100
  },
  content: {
    flex: 1,
    padding: 16,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#dbeafe', // blue-100
    borderWidth: 4,
    borderColor: '#fbbf24', // yellow-400
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af', // blue-800
    marginBottom: 4,
  },
  level: {
    fontSize: 14,
    color: '#6b7280', // gray-600
    marginBottom: 12,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 16,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#e5e7eb', // gray-200
    borderRadius: 6,
    marginBottom: 4,
  },
  progressFill: {
    height: 12,
    backgroundColor: '#3b82f6', // blue-500
    borderRadius: 6,
  },
  progressText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    color: '#6b7280', // gray-600
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af', // blue-800
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#dbeafe', // blue-200
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginVertical: 4,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280', // gray-600
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af', // blue-800
  },
  
  // XaviCoins Section Styles
  xavicoinsSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  xavicoinsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#fbbf24', // yellow-400 (marco dorado)
  },
  // Achievements Section Styles
  achievementsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllButton: {
    backgroundColor: '#3b82f6', // blue-500
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewAllText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 14,
    color: '#6b7280', // gray-600
  },
  achievementsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  achievementCard: {
    flex: 1,
    backgroundColor: '#f0f9ff', // blue-50
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  achievementLabel: {
    fontSize: 10,
    color: '#6b7280', // gray-600
    textAlign: 'center',
    marginBottom: 2,
  },
  achievementValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af', // blue-800
  },
  recentAchievements: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151', // gray-700
    marginBottom: 8,
  },
  recentAchievementCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recentAchievementIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  recentAchievementTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#374151', // gray-700
    textAlign: 'center',
    marginBottom: 2,
  },
  recentAchievementProgress: {
    fontSize: 8,
    color: '#6b7280', // gray-600
    textAlign: 'center',
  },
  // Actions Section Styles
  actionsSection: {
    marginBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f3f4f6', // gray-100
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb', // gray-200
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151', // gray-700
    textAlign: 'center',
  },
  badgesSection: {
    marginBottom: 20,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  badgeItem: {
    alignItems: 'center',
  },
  badgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fbbf24', // yellow-400
    borderWidth: 2,
    borderColor: '#f59e0b', // yellow-600
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgeLocked: {
    backgroundColor: '#d1d5db', // gray-300
    borderColor: '#9ca3af', // gray-400
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#92400e', // yellow-800
  },
  badgeName: {
    fontSize: 10,
    color: '#6b7280', // gray-600
    textAlign: 'center',
  },
  // Logout section styles
  logoutSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb', // gray-200
  },
  logoutButton: {
    backgroundColor: '#dc2626', // red-600
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#991b1b', // red-800
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 