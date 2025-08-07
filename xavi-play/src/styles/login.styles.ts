import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dc2626', // red-600
  },
  contentContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    height: 96,
    width: 200,
    resizeMode: 'contain',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    padding: 24,
    borderWidth: 4,
    borderColor: '#3b82f6', // blue-500
  },
  pokeballContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pokeball: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokeballCenter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dc2626', // red-600
    borderWidth: 2,
    borderColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#2563eb', // blue-600
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
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d1d5db', // gray-300
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputFocused: {
    borderColor: '#fbbf24', // yellow-400
    borderWidth: 2,
  },
  button: {
    backgroundColor: '#fbbf24', // yellow-400
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#3b82f6', // blue-500
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db', // gray-300
    borderColor: '#9ca3af', // gray-400
  },
  buttonText: {
    color: '#1e40af', // blue-800
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#6b7280', // gray-500
  },
  pikachuContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  pikachu: {
    height: 96,
    width: 96,
    resizeMode: 'contain',
  },
  createUserContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb', // gray-200
  },
  createUserText: {
    fontSize: 14,
    color: '#6b7280', // gray-500
    marginBottom: 8,
  },
  createUserButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3b82f6', // blue-500
    borderRadius: 20,
  },
  createUserButtonText: {
    color: '#3b82f6', // blue-500
    fontSize: 14,
    fontWeight: '600',
  },
}); 