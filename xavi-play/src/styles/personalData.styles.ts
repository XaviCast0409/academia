import { StyleSheet } from 'react-native';

export const personalDataStyles = StyleSheet.create({
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
  formContainer: {
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
    borderColor: '#3b82f6', // blue-500
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151', // gray-700
    marginBottom: 8,
  },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: '#d1d5db', // gray-300
    borderRadius: 12,
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
  buttonContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  nextButton: {
    backgroundColor: '#3b82f6', // blue-500
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonDisabled: {
    backgroundColor: '#d1d5db', // gray-300
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButtonTextDisabled: {
    color: '#6b7280', // gray-500
  },
}); 