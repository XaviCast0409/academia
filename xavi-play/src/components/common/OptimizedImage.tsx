/**
 * Componente de imagen optimizada con lazy loading y fallbacks
 */

import React, { useState, useEffect } from 'react';
import { Image, View, ActivityIndicator, Text, ImageProps, ViewStyle } from 'react-native';
import { designTokens } from '@/styles/designTokens';
import { getOptimizedImage, imagePresets, ImageOptimizationOptions } from '@/utils/imageOptimization';
import { logger } from '@/utils/logger';

interface OptimizedImageProps extends Omit<ImageProps, 'source'> {
  source: string;
  fallbackSource?: string;
  placeholder?: React.ReactNode;
  errorComponent?: React.ReactNode;
  optimization?: ImageOptimizationOptions;
  preset?: {
    type: keyof typeof imagePresets;
    size: string;
  };
  lazy?: boolean;
  containerStyle?: ViewStyle;
  showLoader?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  source,
  fallbackSource,
  placeholder,
  errorComponent,
  optimization,
  preset,
  lazy = true,
  containerStyle,
  showLoader = true,
  style,
  ...imageProps
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);

  // Determinar la fuente de imagen optimizada
  const getImageSource = () => {
    if (error && fallbackSource) {
      return getOptimizedImage(fallbackSource, optimization);
    }

    if (preset) {
      const presetConfig = imagePresets[preset.type]?.[preset.size as keyof typeof imagePresets[typeof preset.type]];
      if (presetConfig) {
        return getOptimizedImage(source, presetConfig);
      }
    }

    return getOptimizedImage(source, optimization);
  };

  // Efecto para lazy loading
  useEffect(() => {
    if (lazy && !shouldLoad) {
      // En una implementación real, aquí usarías Intersection Observer
      // Para simplificar, cargamos después de un delay corto
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [lazy, shouldLoad]);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = (errorEvent: any) => {
    logger.error('Error cargando imagen:', { source, error: errorEvent });
    setLoading(false);
    setError(true);
  };

  const imageSource = getImageSource();

  // Renderizar placeholder si no debe cargar aún
  if (!shouldLoad) {
    return (
      <View style={[defaultStyles.container, containerStyle]}>
        {placeholder || <View style={[defaultStyles.placeholder, style]} />}
      </View>
    );
  }

  // Renderizar componente de error
  if (error && !fallbackSource) {
    return (
      <View style={[defaultStyles.container, containerStyle]}>
        {errorComponent || (
          <View style={[defaultStyles.error, style]}>
            <Text style={defaultStyles.errorText}>❌</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={[defaultStyles.container, containerStyle]}>
      {/* Loader */}
      {loading && showLoader && (
        <View style={[defaultStyles.loader, style]}>
          <ActivityIndicator 
            size="small" 
            color={designTokens.colors.primary}
          />
        </View>
      )}

      {/* Imagen principal */}
      <Image
        {...imageProps}
        source={{ 
          uri: imageSource.uri,
          cache: imageSource.cache as any,
          headers: imageSource.headers
        }}
        style={[
          style,
          loading && showLoader && defaultStyles.hidden
        ]}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        resizeMode={imageProps.resizeMode || 'cover'}
      />
    </View>
  );
};

const defaultStyles = {
  container: {
    position: 'relative' as const,
  },
  loader: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: designTokens.colors.gray[100],
  },
  placeholder: {
    backgroundColor: designTokens.colors.gray[200],
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  error: {
    backgroundColor: designTokens.colors.gray[100],
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  errorText: {
    fontSize: designTokens.typography.fontSize.lg,
    color: designTokens.colors.text.secondary,
  },
  hidden: {
    opacity: 0,
  },
};

export default OptimizedImage;
