import { StyleSheet } from 'react-native';

export const createUserStyles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#f3f4f6', // gray-100
  },
  formContainer: {
    backgroundColor: 'white',
    margin: 16,
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
    borderColor: '#3b82f6', // blue-500
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#1e40af', // blue-800
  },
  infoContainer: {
    backgroundColor: '#dbeafe', // blue-100
    borderWidth: 1,
    borderColor: '#3b82f6', // blue-500
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#1e40af', // blue-800
    textAlign: 'center',
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151', // gray-700
    marginBottom: 8,
  },
  input: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#d1d5db', // gray-300
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#1f2937', // gray-800
  },
  inputError: {
    borderColor: '#ef4444', // red-500
  },
  errorText: {
    color: '#ef4444', // red-500
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  selector: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#d1d5db', // gray-300
    borderRadius: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorText: {
    fontSize: 16,
    color: '#1f2937', // gray-800
    flex: 1,
  },
  selectorDropdown: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#3b82f6', // blue-500
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectorOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // gray-200
  },
  selectorOptionText: {
    fontSize: 16,
    color: '#1f2937', // gray-800
  },
  pokemonSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pokemonImage: {
    width: 32,
    height: 32,
    marginRight: 12,
    borderRadius: 16,
  },
  pokemonGrid: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#3b82f6', // blue-500
    borderRadius: 8,
    marginTop: 4,
    padding: 8,
    maxHeight: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pokemonGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  pokemonOption: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#f8fafc', // gray-50
    borderRadius: 8,
    marginBottom: 6,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0', // gray-200
  },
  pokemonOptionSelected: {
    borderColor: '#3b82f6', // blue-500
    backgroundColor: '#dbeafe', // blue-100
    borderWidth: 2,
  },
  pokemonOptionImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 2,
  },
  pokemonOptionText: {
    fontSize: 10,
    color: '#1f2937', // gray-800
    textTransform: 'capitalize',
    textAlign: 'center',
    fontWeight: '600',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 6,
  },
  paginationButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#3b82f6', // blue-500
    borderRadius: 4,
    marginHorizontal: 3,
  },
  paginationButtonDisabled: {
    backgroundColor: '#d1d5db', // gray-300
  },
  paginationButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  paginationButtonTextDisabled: {
    color: '#6b7280', // gray-500
  },
  paginationInfo: {
    fontSize: 11,
    color: '#6b7280', // gray-500
    marginHorizontal: 6,
  },
  loadMoreButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f3f4f6', // gray-100
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  loadMoreText: {
    fontSize: 12,
    color: '#3b82f6', // blue-500
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#fbbf24', // yellow-400
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#3b82f6', // blue-500
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db', // gray-300
    borderColor: '#9ca3af', // gray-400
  },
  buttonText: {
    color: '#1e40af', // blue-800
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 