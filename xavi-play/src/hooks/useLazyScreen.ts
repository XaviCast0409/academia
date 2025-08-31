/**
 * Hook para implementar lazy loading de pantallas
 * Mejora el tiempo de carga inicial de la aplicación
 */

import { useState, useEffect, useRef } from 'react';
import { logger } from '@/utils/logger';

interface LazyScreenOptions {
  delay?: number; // Delay antes de cargar (ms)
  preload?: boolean; // Si debe precargar en background
  timeout?: number; // Timeout máximo para cargar
}

interface LazyScreenState {
  isLoaded: boolean;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook principal para lazy loading de pantallas
 */
export const useLazyScreen = (
  screenLoader: () => Promise<any>,
  options: LazyScreenOptions = {}
): LazyScreenState & {
  loadScreen: () => Promise<void>;
  retryLoad: () => Promise<void>;
} => {
  const {
    delay = 0,
    preload = false,
    timeout = 10000
  } = options;

  const [state, setState] = useState<LazyScreenState>({
    isLoaded: false,
    isLoading: false,
    error: null
  });

  const loadedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const loadScreen = async (): Promise<void> => {
    // Evitar cargas múltiples
    if (loadedRef.current || state.isLoading) {
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Aplicar delay si se especifica
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      // Configurar timeout
      const timeoutPromise = new Promise((_, reject) => {
        timeoutRef.current = setTimeout(() => {
          reject(new Error(`Timeout loading screen after ${timeout}ms`));
        }, timeout);
      });

      // Cargar pantalla con timeout
      await Promise.race([screenLoader(), timeoutPromise]);

      // Limpiar timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      loadedRef.current = true;
      setState({
        isLoaded: true,
        isLoading: false,
        error: null
      });

      logger.info('Pantalla cargada exitosamente');
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Error desconocido');
      
      setState({
        isLoaded: false,
        isLoading: false,
        error: errorObj
      });

      logger.error('Error cargando pantalla:', errorObj);
    }
  };

  const retryLoad = async (): Promise<void> => {
    loadedRef.current = false;
    setState({
      isLoaded: false,
      isLoading: false,
      error: null
    });
    await loadScreen();
  };

  // Precargar si se especifica
  useEffect(() => {
    if (preload) {
      loadScreen();
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [preload]);

  return {
    ...state,
    loadScreen,
    retryLoad
  };
};

/**
 * Hook para lazy loading con intersection observer (para listas)
 */
export const useLazyList = <T>(
  items: T[],
  initialCount: number = 10,
  batchSize: number = 5
): {
  visibleItems: T[];
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
} => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    if (isLoading || visibleCount >= items.length) {
      return;
    }

    setIsLoading(true);

    // Simular carga asíncrona
    await new Promise(resolve => setTimeout(resolve, 300));

    setVisibleCount(prev => Math.min(prev + batchSize, items.length));
    setIsLoading(false);

    logger.debug('Cargados más elementos:', { 
      visible: visibleCount + batchSize, 
      total: items.length 
    });
  };

  return {
    visibleItems: items.slice(0, visibleCount),
    loadMore,
    hasMore: visibleCount < items.length,
    isLoading
  };
};

/**
 * Factory para crear lazy loaders de pantallas específicas
 */
export const createLazyScreenLoader = (
  importFunction: () => Promise<{ default: any }>,
  screenName: string
) => {
  return () => useLazyScreen(
    async () => {
      logger.info(`Cargando pantalla: ${screenName}`);
      const module = await importFunction();
      return module.default;
    },
    {
      delay: 100, // Pequeño delay para mejorar UX
      timeout: 15000 // 15 segundos timeout
    }
  );
};

/**
 * Utilidad para crear componentes lazy
 */
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunction: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
): React.ComponentType<React.ComponentProps<T>> => {
  const LazyComponent: React.ComponentType<React.ComponentProps<T>> = (props) => {
    const { isLoaded, isLoading, error, loadScreen } = useLazyScreen(
      () => importFunction().then(module => module.default)
    );

    // Cargar automáticamente al montar
    useEffect(() => {
      loadScreen();
    }, []);

    if (error) {
      if (fallback) {
        const FallbackComponent = fallback;
        return <FallbackComponent />;
      }
      throw error; // Dejar que Error Boundary lo maneje
    }

    if (!isLoaded) {
      if (fallback) {
        const FallbackComponent = fallback;
        return <FallbackComponent />;
      }
      return null; // O un loader por defecto
    }

    // Aquí necesitarías renderizar el componente cargado
    // Esta es una implementación simplificada
    return null;
  };

  return LazyComponent;
};
