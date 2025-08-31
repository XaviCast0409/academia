import { MD3LightTheme } from 'react-native-paper';
import { designTokens } from '@/styles/designTokens';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: designTokens.colors.primary,
    secondary: designTokens.colors.secondary,
    error: designTokens.colors.error,
    background: designTokens.colors.background,
    surface: designTokens.colors.surface,
    onPrimary: designTokens.colors.secondaryDark,
    onSecondary: designTokens.colors.text.inverse,
    onError: designTokens.colors.text.inverse,
    onBackground: designTokens.colors.text.inverse,
    onSurface: designTokens.colors.text.primary,
  },
};

// Exportar también los tokens directamente para uso en StyleSheet
export { designTokens }; 