/**
 * Utilidades para el sistema de estilos
 * Funciones helper para crear estilos consistentes usando design tokens
 */

import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { designTokens } from './designTokens';

// Función para crear estilos de botón consistentes
export const createButtonStyle = (
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md'
): ViewStyle => {
  const baseStyle: ViewStyle = {
    borderRadius: designTokens.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: designTokens.spacing.lg,
    height: designTokens.dimensions.button[size],
  };

  switch (variant) {
    case 'primary':
      return {
        ...baseStyle,
        backgroundColor: designTokens.colors.primary,
        borderWidth: 2,
        borderColor: designTokens.colors.secondary,
      };
    case 'secondary':
      return {
        ...baseStyle,
        backgroundColor: designTokens.colors.secondary,
        borderWidth: 2,
        borderColor: designTokens.colors.primary,
      };
    case 'outline':
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: designTokens.colors.primary,
      };
    case 'ghost':
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderWidth: 0,
      };
    default:
      return baseStyle;
  }
};

// Función para crear estilos de texto de botón
export const createButtonTextStyle = (
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md'
): TextStyle => {
  const baseStyle: TextStyle = {
    fontWeight: designTokens.typography.fontWeight.semibold,
    fontSize: size === 'sm' ? designTokens.typography.fontSize.sm : 
              size === 'lg' ? designTokens.typography.fontSize.lg : 
              designTokens.typography.fontSize.md,
  };

  switch (variant) {
    case 'primary':
      return {
        ...baseStyle,
        color: designTokens.colors.secondaryDark,
      };
    case 'secondary':
      return {
        ...baseStyle,
        color: designTokens.colors.text.inverse,
      };
    case 'outline':
      return {
        ...baseStyle,
        color: designTokens.colors.primary,
      };
    case 'ghost':
      return {
        ...baseStyle,
        color: designTokens.colors.text.primary,
      };
    default:
      return baseStyle;
  }
};

// Función para crear estilos de input consistentes
export const createInputStyle = (
  variant: 'default' | 'focused' | 'error' = 'default'
): ViewStyle => {
  const baseStyle: ViewStyle = {
    width: '100%',
    paddingHorizontal: designTokens.spacing.md,
    paddingVertical: designTokens.spacing.sm,
    borderRadius: designTokens.borderRadius.md,
    fontSize: designTokens.typography.fontSize.md,
    backgroundColor: designTokens.colors.surface,
    borderWidth: 1,
    height: designTokens.dimensions.input.md,
  };

  switch (variant) {
    case 'focused':
      return {
        ...baseStyle,
        borderColor: designTokens.colors.border.focus,
        borderWidth: 2,
      };
    case 'error':
      return {
        ...baseStyle,
        borderColor: designTokens.colors.error,
        borderWidth: 2,
      };
    default:
      return {
        ...baseStyle,
        borderColor: designTokens.colors.border.default,
      };
  }
};

// Función para crear estilos de card consistentes
export const createCardStyle = (
  variant: 'default' | 'elevated' | 'outlined' = 'default'
): ViewStyle => {
  const baseStyle: ViewStyle = {
    backgroundColor: designTokens.colors.surface,
    borderRadius: designTokens.borderRadius.xl,
    padding: designTokens.spacing.lg,
  };

  switch (variant) {
    case 'elevated':
      return {
        ...baseStyle,
        ...designTokens.shadows.lg,
      };
    case 'outlined':
      return {
        ...baseStyle,
        borderWidth: 1,
        borderColor: designTokens.colors.border.default,
      };
    default:
      return baseStyle;
  }
};

// Función para crear estilos de contenedor
export const createContainerStyle = (
  padding: keyof typeof designTokens.spacing = 'md',
  backgroundColor?: string
): ViewStyle => ({
  flex: 1,
  padding: designTokens.spacing[padding],
  backgroundColor: backgroundColor || designTokens.colors.background,
});

// Función para crear estilos de texto consistentes
export const createTextStyle = (
  variant: 'heading' | 'title' | 'body' | 'caption' | 'label' = 'body',
  color?: string
): TextStyle => {
  const colorValue = color || designTokens.colors.text.primary;

  switch (variant) {
    case 'heading':
      return {
        fontSize: designTokens.typography.fontSize.xxxl,
        fontWeight: designTokens.typography.fontWeight.bold,
        color: colorValue,
        lineHeight: designTokens.typography.lineHeight.tight,
      };
    case 'title':
      return {
        fontSize: designTokens.typography.fontSize.xxl,
        fontWeight: designTokens.typography.fontWeight.semibold,
        color: colorValue,
        lineHeight: designTokens.typography.lineHeight.normal,
      };
    case 'body':
      return {
        fontSize: designTokens.typography.fontSize.md,
        fontWeight: designTokens.typography.fontWeight.normal,
        color: colorValue,
        lineHeight: designTokens.typography.lineHeight.normal,
      };
    case 'caption':
      return {
        fontSize: designTokens.typography.fontSize.sm,
        fontWeight: designTokens.typography.fontWeight.normal,
        color: designTokens.colors.text.secondary,
        lineHeight: designTokens.typography.lineHeight.normal,
      };
    case 'label':
      return {
        fontSize: designTokens.typography.fontSize.sm,
        fontWeight: designTokens.typography.fontWeight.medium,
        color: colorValue,
        lineHeight: designTokens.typography.lineHeight.normal,
      };
    default:
      return {
        fontSize: designTokens.typography.fontSize.md,
        fontWeight: designTokens.typography.fontWeight.normal,
        color: colorValue,
        lineHeight: designTokens.typography.lineHeight.normal,
      };
  }
};

// Estilos comunes pre-definidos
export const commonStyles = StyleSheet.create({
  // Contenedores
  container: createContainerStyle(),
  containerWithPadding: createContainerStyle('lg'),
  
  // Cards
  card: createCardStyle('elevated'),
  cardOutlined: createCardStyle('outlined'),
  
  // Botones
  primaryButton: createButtonStyle('primary', 'md'),
  secondaryButton: createButtonStyle('secondary', 'md'),
  outlineButton: createButtonStyle('outline', 'md'),
  
  // Texto
  heading: createTextStyle('heading'),
  title: createTextStyle('title'),
  body: createTextStyle('body'),
  caption: createTextStyle('caption'),
  label: createTextStyle('label'),
  
  // Inputs
  input: createInputStyle('default'),
  inputFocused: createInputStyle('focused'),
  inputError: createInputStyle('error'),
  
  // Flexbox utilities
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Spacing utilities
  marginXS: { margin: designTokens.spacing.xs },
  marginSM: { margin: designTokens.spacing.sm },
  marginMD: { margin: designTokens.spacing.md },
  marginLG: { margin: designTokens.spacing.lg },
  
  paddingXS: { padding: designTokens.spacing.xs },
  paddingSM: { padding: designTokens.spacing.sm },
  paddingMD: { padding: designTokens.spacing.md },
  paddingLG: { padding: designTokens.spacing.lg },
});
