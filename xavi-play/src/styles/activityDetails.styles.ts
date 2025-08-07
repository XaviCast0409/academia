import { StyleSheet } from 'react-native';

export const activityDetailsStyles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
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
  // Loading y Error states
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
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#dc2626', // red-600
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#991b1b', // red-800
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Header section
  headerSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  mainImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 16,
  },
  mainImageContainer: {
    position: 'relative',
  },
  mainImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af', // blue-800
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    gap: 8,
  },
  difficulty: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontWeight: 'bold',
  },
  section: {
    fontSize: 12,
    color: '#7c3aed', // purple-600
    backgroundColor: '#ede9fe', // purple-100
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontWeight: 'bold',
  },
  // Description section
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af', // blue-800
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#374151', // gray-700
    lineHeight: 24,
  },
  // Gallery section
  gallerySection: {
    marginBottom: 20,
  },
  galleryContainer: {
    marginTop: 8,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  galleryImageContainer: {
    position: 'relative',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  // Professor section
  professorSection: {
    marginBottom: 20,
  },
  professorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc', // slate-50
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0', // slate-200
  },
  professorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3b82f6', // blue-500
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  professorInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  professorInfo: {
    flex: 1,
  },
  professorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af', // blue-800
    marginBottom: 4,
  },
  professorEmail: {
    fontSize: 14,
    color: '#6b7280', // gray-500
  },
  // Reward section
  rewardSection: {
    marginBottom: 20,
  },
  rewardCard: {
    backgroundColor: '#fef3c7', // yellow-100
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fbbf24', // yellow-400
    alignItems: 'center',
  },
  rewardAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#92400e', // yellow-800
    marginBottom: 4,
  },
  rewardLabel: {
    fontSize: 14,
    color: '#92400e', // yellow-800
    fontWeight: '500',
  },
  // Additional info section
  additionalInfoSection: {
    marginBottom: 20,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    backgroundColor: '#f9fafb', // gray-50
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb', // gray-200
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280', // gray-500
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151', // gray-700
  },
  // Action section
  actionSection: {
    marginTop: 20,
  },
  startButton: {
    backgroundColor: '#3b82f6', // blue-500
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1e40af', // blue-800
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 