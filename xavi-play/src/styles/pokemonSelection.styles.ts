import { StyleSheet } from 'react-native';

export const pokemonSelectionStyles = StyleSheet.create({
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
    marginBottom: 20,
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  pokemonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: -180,
  },
  pokemonCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0', // gray-200
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pokemonCardSelected: {
    borderColor: '#3b82f6', // blue-500
    backgroundColor: '#dbeafe', // blue-100
    borderWidth: 3,
  },
  pokemonImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  pokemonName: {
    fontSize: 12,
    color: '#1f2937', // gray-800
    textTransform: 'capitalize',
    textAlign: 'center',
    fontWeight: '600',
  },
  pokemonNameSelected: {
    color: '#1e40af', // blue-800
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  paginationButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#3b82f6', // blue-500
    borderRadius: 6,
    marginHorizontal: 4,
  },
  paginationButtonDisabled: {
    backgroundColor: '#d1d5db', // gray-300
  },
  paginationButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  paginationButtonTextDisabled: {
    color: '#6b7280', // gray-500
  },
  paginationInfo: {
    fontSize: 12,
    color: '#6b7280', // gray-500
    marginHorizontal: 8,
  },
  loadMoreButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f3f4f6', // gray-100
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  loadMoreText: {
    fontSize: 12,
    color: '#3b82f6', // blue-500
    fontWeight: '600',
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
  createButton: {
    backgroundColor: '#fbbf24', // yellow-400
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3b82f6', // blue-500
  },
  createButtonDisabled: {
    backgroundColor: '#d1d5db', // gray-300
    borderColor: '#9ca3af', // gray-400
  },
  createButtonText: {
    color: '#1e40af', // blue-800
    fontSize: 16,
    fontWeight: 'bold',
  },
  createButtonTextDisabled: {
    color: '#6b7280', // gray-500
  },
}); 