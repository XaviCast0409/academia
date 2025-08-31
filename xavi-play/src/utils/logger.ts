/**
 * Sistema de logging condicional para desarrollo y producción
 * En desarrollo: muestra todos los logs
 * En producción: solo errores críticos
 */

interface Logger {
  log: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
}

const createLogger = (): Logger => {
  const isDevelopment = __DEV__;
  
  return {
    log: (...args: any[]) => {
      if (isDevelopment) {
        console.log('[LOG]', ...args);
      }
    },
    
    info: (...args: any[]) => {
      if (isDevelopment) {
        console.info('[INFO]', ...args);
      }
    },
    
    warn: (...args: any[]) => {
      if (isDevelopment) {
        console.warn('[WARN]', ...args);
      }
    },
    
    error: (...args: any[]) => {
      // Los errores siempre se muestran, incluso en producción
      console.error('[ERROR]', ...args);
    },
    
    debug: (...args: any[]) => {
      if (isDevelopment) {
        console.debug('[DEBUG]', ...args);
      }
    }
  };
};

export const logger = createLogger();

// Helper para logs de red/API
export const apiLogger = {
  request: (method: string, url: string, data?: any) => {
    logger.debug(`🌐 API Request: ${method.toUpperCase()} ${url}`, data);
  },
  
  response: (method: string, url: string, status: number, data?: any) => {
    logger.debug(`✅ API Response: ${method.toUpperCase()} ${url} - ${status}`, data);
  },
  
  error: (method: string, url: string, error: any) => {
    logger.error(`❌ API Error: ${method.toUpperCase()} ${url}`, error);
  }
};

// Helper para logs de estado
export const stateLogger = {
  storeUpdate: (storeName: string, action: string, newState?: any) => {
    logger.debug(`🏪 Store Update: ${storeName}.${action}`, newState);
  },
  
  storeError: (storeName: string, action: string, error: any) => {
    logger.error(`❌ Store Error: ${storeName}.${action}`, error);
  }
};
