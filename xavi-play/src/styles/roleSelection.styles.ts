import { StyleSheet } from 'react-native';

export const roleSelectionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // gray-100
    padding: 20,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e40af', // blue-800
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280', // gray-500
    textAlign: 'center',
  },
  rolesContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  roleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#e5e7eb', // gray-200
    alignItems: 'center',
  },
  roleCardSelected: {
    borderColor: '#3b82f6', // blue-500
    backgroundColor: '#dbeafe', // blue-100
  },
  roleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6', // gray-100
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  roleIconText: {
    fontSize: 40,
  },
  roleName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937', // gray-800
    marginBottom: 8,
    textAlign: 'center',
  },
  roleNameSelected: {
    color: '#1e40af', // blue-800
  },
  roleDescription: {
    fontSize: 14,
    color: '#6b7280', // gray-500
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#d1d5db', // gray-300
    backgroundColor: 'white',
  },
  backButtonText: {
    color: '#6b7280', // gray-500
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#3b82f6', // blue-500
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#d1d5db', // gray-300
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButtonTextDisabled: {
    color: '#6b7280', // gray-500
  },
}); 