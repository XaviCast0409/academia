import { StyleSheet } from 'react-native';

export const activitiesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // gray-100
  },
  content: {
    flex: 1,
    padding: 16,
  },
  activitiesContainer: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#dbeafe', // blue-200
  },
  activityHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  activityIcon: {
    fontSize: 32,
    marginRight: 12,
    alignSelf: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af', // blue-800
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#6b7280', // gray-500
    marginBottom: 8,
  },
  activityMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  difficulty: {
    fontSize: 12,
    color: '#059669', // green-600
    backgroundColor: '#d1fae5', // green-100
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  category: {
    fontSize: 12,
    color: '#7c3aed', // purple-600
    backgroundColor: '#ede9fe', // purple-100
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardContainer: {
    backgroundColor: '#fef3c7', // yellow-100
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fbbf24', // yellow-400
  },
  rewardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400e', // yellow-800
  },
  actionButton: {
    backgroundColor: '#3b82f6', // blue-500
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1e40af', // blue-800
  },
  completedButton: {
    backgroundColor: '#10b981', // green-500
    borderColor: '#059669', // green-600
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  completedButtonText: {
    color: '#ffffff',
  },
  // Nuevos estilos para las actividades reales
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280', // gray-500
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626', // red-600
    fontWeight: '500',
    textAlign: 'center',
  },
  activityImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    alignSelf: 'center',
  },
  professorName: {
    fontSize: 12,
    color: '#9ca3af', // gray-400
    marginTop: 4,
    fontStyle: 'italic',
  },
}); 