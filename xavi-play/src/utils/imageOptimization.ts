/**
 * Utilidades para optimización de imágenes
 * Mejora el rendimiento y reduce el uso de datos
 */

import { logger } from './logger';

export interface ImageOptimizationOptions {
  quality?: number; // 0-100
  maxWidth?: number;
  maxHeight?: number;
  format?: 'jpeg' | 'png' | 'webp';
  enableCache?: boolean;
}

export interface OptimizedImageSource {
  uri: string;
  cache?: 'force-cache' | 'default';
  headers?: { [key: string]: string };
}

/**
 * Optimiza una URL de imagen para mejor rendimiento
 */
export const optimizeImageUrl = (
  originalUrl: string, 
  options: ImageOptimizationOptions = {}
): OptimizedImageSource => {
  const {
    quality = 80,
    maxWidth = 800,
    maxHeight = 600,
    format = 'jpeg',
    enableCache = true
  } = options;

  try {
    // Si es una URL de Cloudinary, aplicar transformaciones
    if (originalUrl.includes('cloudinary.com')) {
      const transformations = [
        `q_${quality}`,
        `w_${maxWidth}`,
        `h_${maxHeight}`,
        `c_limit`,
        `f_${format}`
      ].join(',');

      const optimizedUrl = originalUrl.replace(
        '/upload/',
        `/upload/${transformations}/`
      );

      logger.debug('Imagen optimizada con Cloudinary:', { original: originalUrl, optimized: optimizedUrl });

      return {
        uri: optimizedUrl,
        cache: enableCache ? 'force-cache' : 'default'
      };
    }

    // Para otras URLs, retornar con cache optimizado
    return {
      uri: originalUrl,
      cache: enableCache ? 'force-cache' : 'default',
      headers: {
        'Cache-Control': enableCache ? 'max-age=3600' : 'no-cache'
      }
    };
  } catch (error) {
    logger.error('Error optimizando imagen:', error);
    return { uri: originalUrl };
  }
};

/**
 * Genera múltiples tamaños de una imagen para responsive loading
 */
export const generateResponsiveSources = (
  originalUrl: string,
  sizes: Array<{ width: number; height: number; name: string }>
): { [key: string]: OptimizedImageSource } => {
  const sources: { [key: string]: OptimizedImageSource } = {};

  sizes.forEach(({ width, height, name }) => {
    sources[name] = optimizeImageUrl(originalUrl, {
      maxWidth: width,
      maxHeight: height,
      quality: 85
    });
  });

  return sources;
};

/**
 * Configuraciones predefinidas para diferentes tipos de imágenes
 */
export const imagePresets = {
  avatar: {
    small: { maxWidth: 48, maxHeight: 48, quality: 85 },
    medium: { maxWidth: 96, maxHeight: 96, quality: 85 },
    large: { maxWidth: 200, maxHeight: 200, quality: 90 }
  },
  thumbnail: {
    small: { maxWidth: 150, maxHeight: 150, quality: 75 },
    medium: { maxWidth: 300, maxHeight: 300, quality: 80 },
    large: { maxWidth: 600, maxHeight: 600, quality: 85 }
  },
  banner: {
    mobile: { maxWidth: 400, maxHeight: 200, quality: 80 },
    tablet: { maxWidth: 800, maxHeight: 400, quality: 85 },
    desktop: { maxWidth: 1200, maxHeight: 600, quality: 90 }
  },
  pokemon: {
    small: { maxWidth: 96, maxHeight: 96, quality: 85 },
    medium: { maxWidth: 200, maxHeight: 200, quality: 90 },
    large: { maxWidth: 400, maxHeight: 400, quality: 95 }
  }
} as const;

/**
 * Aplica un preset de optimización a una imagen
 */
export const applyImagePreset = (
  originalUrl: string,
  presetType: keyof typeof imagePresets,
  presetSize: string
): OptimizedImageSource => {
  const preset = imagePresets[presetType];
  const sizeConfig = preset[presetSize as keyof typeof preset];

  if (!sizeConfig) {
    logger.warn(`Preset no encontrado: ${presetType}.${presetSize}`);
    return { uri: originalUrl };
  }

  return optimizeImageUrl(originalUrl, sizeConfig);
};

/**
 * Cache de imágenes optimizadas para evitar recálculos
 */
class ImageCache {
  private cache = new Map<string, OptimizedImageSource>();
  private maxSize = 100;

  get(key: string): OptimizedImageSource | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: OptimizedImageSource): void {
    if (this.cache.size >= this.maxSize) {
      // Remover el primer elemento (LRU simple)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

export const imageCache = new ImageCache();

/**
 * Función optimizada para obtener imagen con cache
 */
export const getOptimizedImage = (
  originalUrl: string,
  options: ImageOptimizationOptions = {}
): OptimizedImageSource => {
  const cacheKey = `${originalUrl}_${JSON.stringify(options)}`;
  
  // Verificar cache primero
  const cached = imageCache.get(cacheKey);
  if (cached) {
    logger.debug('Imagen obtenida del cache:', cacheKey);
    return cached;
  }

  // Optimizar y cachear
  const optimized = optimizeImageUrl(originalUrl, options);
  imageCache.set(cacheKey, optimized);
  
  return optimized;
};
