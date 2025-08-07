import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#fbbf24', // yellow-400
    secondary: '#3b82f6', // blue-500
    error: '#dc2626', // red-600
    background: '#dc2626', // red-600
    surface: '#ffffff',
    onPrimary: '#1e40af', // blue-800
    onSecondary: '#ffffff',
    onError: '#ffffff',
    onBackground: '#ffffff',
    onSurface: '#374151', // gray-700
  },
}; 