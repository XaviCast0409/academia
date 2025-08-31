import { StyleSheet } from 'react-native';
import { designTokens } from './designTokens';
import { createContainerStyle, createCardStyle, createButtonStyle, createButtonTextStyle, createInputStyle } from './styleUtils';

export const loginStyles = StyleSheet.create({
  container: createContainerStyle('md', designTokens.colors.background),
  contentContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: designTokens.spacing.lg,
  },
  logo: {
    height: designTokens.dimensions.avatar.xl,
    width: 200,
    resizeMode: 'contain',
  },
  formContainer: {
    ...createCardStyle('elevated'),
    borderWidth: 4,
    borderColor: designTokens.colors.secondary,
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
    ...createButtonStyle('primary', 'md'),
    marginTop: designTokens.spacing.sm,
    borderRadius: designTokens.borderRadius.xxl,
  },
  buttonDisabled: {
    backgroundColor: designTokens.colors.gray[300],
    borderColor: designTokens.colors.gray[400],
  },
  buttonText: createButtonTextStyle('primary', 'md'),
  buttonTextDisabled: {
    color: designTokens.colors.text.disabled,
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