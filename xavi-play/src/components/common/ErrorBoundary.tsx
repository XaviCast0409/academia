/**
 * Error Boundary para capturar y manejar errores de React de forma elegante
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { designTokens } from '@/styles/designTokens';
import { createTextStyle, createButtonStyle, createButtonTextStyle } from '@/styles/styleUtils';
import { logger } from '@/utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Actualizar el estado para que el siguiente renderizado muestre la UI de error
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log del error
    logger.error('Error boundary capturó un error:', error);
    logger.error('Error info:', errorInfo);
    
    // Actualizar estado con información del error
    this.setState({
      error,
      errorInfo,
    });

    // Llamar callback personalizado si existe
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleReportError = () => {
    const { error, errorInfo } = this.state;
    
    // Aquí podrías enviar el error a un servicio de reporte como Sentry
    logger.error('Reportando error:', { error, errorInfo });
    
    // Por ahora solo loggeamos
    alert('Error reportado. Gracias por ayudarnos a mejorar la app.');
  };

  public render() {
    if (this.state.hasError) {
      // Usar fallback personalizado si se proporciona
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // UI de error por defecto
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>⚠️</Text>
            </View>
            
            <Text style={styles.title}>¡Oops! Algo salió mal</Text>
            
            <Text style={styles.message}>
              Lo sentimos, ocurrió un error inesperado. Por favor, intenta nuevamente.
            </Text>

            {__DEV__ && this.state.error && (
              <View style={styles.errorDetails}>
                <Text style={styles.errorTitle}>Detalles del error (solo en desarrollo):</Text>
                <Text style={styles.errorText}>
                  {this.state.error.toString()}
                </Text>
                {this.state.errorInfo && (
                  <Text style={styles.errorStack}>
                    {this.state.errorInfo.componentStack}
                  </Text>
                )}
              </View>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={this.handleRetry}
                activeOpacity={0.8}
              >
                <Text style={styles.retryButtonText}>Reintentar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.reportButton}
                onPress={this.handleReportError}
                activeOpacity={0.8}
              >
                <Text style={styles.reportButtonText}>Reportar Error</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: designTokens.colors.surface,
  },
  content: {
    flex: 1,
    padding: designTokens.spacing.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  iconContainer: {
    marginBottom: designTokens.spacing.xl,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    ...createTextStyle('title'),
    textAlign: 'center' as const,
    marginBottom: designTokens.spacing.lg,
  },
  message: {
    ...createTextStyle('body', designTokens.colors.text.secondary),
    textAlign: 'center' as const,
    marginBottom: designTokens.spacing.xl,
    lineHeight: 24,
  },
  errorDetails: {
    backgroundColor: designTokens.colors.gray[100],
    padding: designTokens.spacing.md,
    borderRadius: designTokens.borderRadius.md,
    marginBottom: designTokens.spacing.xl,
    width: '100%',
  },
  errorTitle: {
    ...createTextStyle('label'),
    marginBottom: designTokens.spacing.sm,
  },
  errorText: {
    ...createTextStyle('caption'),
    fontFamily: 'monospace',
    marginBottom: designTokens.spacing.sm,
  },
  errorStack: {
    ...createTextStyle('caption'),
    fontFamily: 'monospace',
    color: designTokens.colors.text.tertiary,
  },
  buttonContainer: {
    width: '100%',
    gap: designTokens.spacing.md,
  },
  retryButton: {
    ...createButtonStyle('primary', 'lg'),
  },
  retryButtonText: {
    ...createButtonTextStyle('primary', 'lg'),
  },
  reportButton: {
    ...createButtonStyle('outline', 'md'),
  },
  reportButtonText: {
    ...createButtonTextStyle('outline', 'md'),
  },
};

export default ErrorBoundary;
