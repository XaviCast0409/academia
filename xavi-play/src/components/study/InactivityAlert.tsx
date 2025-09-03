
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { designTokens } from '@/styles/designTokens';

interface InactivityAlertProps {
  isVisible: boolean;
  onDismiss: () => void;
  onRestartSession: () => void;
}

export const InactivityAlert: React.FC<InactivityAlertProps> = ({
  isVisible,
  onDismiss,
  onRestartSession
}) => {
  if (!isVisible) return null;

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <View style={{
        backgroundColor: designTokens.colors.surface,
        borderRadius: designTokens.borderRadius.lg,
        padding: designTokens.spacing.xl,
        margin: designTokens.spacing.lg,
        alignItems: 'center',
        maxWidth: 300,
        ...designTokens.shadows.xl,
      }}>
        {/* Icono de advertencia */}
        <View style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#fef3c7',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: designTokens.spacing.lg,
        }}>
          <Text style={{ fontSize: 24 }}>⚠️</Text>
        </View>

        {/* Título */}
        <Text style={{
          fontSize: designTokens.typography.fontSize.xl,
          fontWeight: designTokens.typography.fontWeight.bold,
          color: designTokens.colors.text.primary,
          textAlign: 'center',
          marginBottom: designTokens.spacing.md,
        }}>
          Sesión Interrumpida
        </Text>

        {/* Mensaje */}
        <Text style={{
          fontSize: designTokens.typography.fontSize.md,
          color: designTokens.colors.text.secondary,
          textAlign: 'center',
          lineHeight: designTokens.typography.lineHeight.relaxed * designTokens.typography.fontSize.md,
          marginBottom: designTokens.spacing.lg,
        }}>
          Saliste de la app durante el estudio. Para ganar XaviCoins, debes mantener la app activa mientras estudias.
        </Text>

        {/* Botones */}
        <View style={{ flexDirection: 'row', gap: designTokens.spacing.md }}>
          <TouchableOpacity
            style={{
              backgroundColor: designTokens.colors.primary,
              borderRadius: designTokens.borderRadius.md,
              paddingVertical: designTokens.spacing.md,
              paddingHorizontal: designTokens.spacing.lg,
              minWidth: 120,
            }}
            onPress={onRestartSession}
            activeOpacity={0.8}
          >
            <Text style={{
              color: designTokens.colors.text.inverse,
              fontSize: designTokens.typography.fontSize.md,
              fontWeight: designTokens.typography.fontWeight.semibold,
              textAlign: 'center',
            }}>
              Reiniciar Sesión
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: designTokens.colors.border.default,
              borderRadius: designTokens.borderRadius.md,
              paddingVertical: designTokens.spacing.md,
              paddingHorizontal: designTokens.spacing.lg,
              minWidth: 120,
            }}
            onPress={onDismiss}
            activeOpacity={0.8}
          >
            <Text style={{
              color: designTokens.colors.text.secondary,
              fontSize: designTokens.typography.fontSize.md,
              fontWeight: designTokens.typography.fontWeight.semibold,
              textAlign: 'center',
            }}>
              Cerrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
