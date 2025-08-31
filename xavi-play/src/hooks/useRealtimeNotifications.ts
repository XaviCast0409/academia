import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';
import api from '@/services/api';
import { logger } from '@/utils/logger';

// Note: requires socket.io-client to be installed by user
let socket: any = null;

export function useRealtimeNotifications() {
  const { user, isAuthenticated } = useAuthStore();
  const { prepend, fetch, bumpUnread } = useNotificationStore();

  React.useEffect(() => {
    let isMounted = true;

    async function connect() {
      if (!isAuthenticated || !user) {
        logger.info('Usuario no autenticado, omitiendo conexión WebSocket');
        return;
      }
      
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          logger.warn('No hay token disponible para WebSocket');
          return;
        }

        let io: any;
        try {
          ({ io } = await import('socket.io-client'));
        } catch (e) {
          logger.warn('socket.io-client no instalado; omitiendo conexión WebSocket');
          return;
        }

        const base = (api.defaults.baseURL || '').replace(/\/$/, '');
        socket = io(base, {
          auth: { token },
          timeout: 5000,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        });

        socket.on('connect', () => {
          logger.info('WebSocket conectado exitosamente');
          fetch(1);
        });

        socket.on('connect_error', (error: any) => {
          logger.error('Error de conexión WebSocket:', error);
        });

        socket.on('disconnect', (reason: string) => {
          logger.warn('WebSocket desconectado:', reason);
        });

        socket.on('activity:created', async (payload: any) => {
          logger.info('Nueva actividad recibida via WebSocket:', payload?.title);
          bumpUnread(1);
          fetch(1);
          
          // Notificación local si la app está en foreground (no Expo Go)
          try {
            const Constants = (await import('expo-constants')).default as any;
            const appOwnership = Constants?.appOwnership || Constants?.AppOwnership;
            if (appOwnership !== 'expo') {
              const { scheduleNotificationAsync } = await import('expo-notifications');
              await scheduleNotificationAsync({
                content: { title: 'Nueva actividad', body: payload?.title || 'Se creó una nueva actividad' },
                trigger: null,
              });
              logger.info('Notificación local programada para nueva actividad');
            }
          } catch (error) {
            logger.error('Error programando notificación local:', error);
          }
        });

        socket.on('evidence:statusChanged', async (payload: any) => {
          logger.info('Estado de evidencia cambiado via WebSocket:', payload?.status);
          bumpUnread(1);
          fetch(1);
          
          try {
            const Constants = (await import('expo-constants')).default as any;
            const appOwnership = Constants?.appOwnership || Constants?.AppOwnership;
            if (appOwnership !== 'expo') {
              const { scheduleNotificationAsync } = await import('expo-notifications');
              await scheduleNotificationAsync({
                content: { title: 'Actualización de evidencia', body: `Estado: ${payload?.status ?? ''}` },
                trigger: null,
              });
              logger.info('Notificación local programada para cambio de evidencia');
            }
          } catch (error) {
            logger.error('Error programando notificación de evidencia:', error);
          }
        });

      } catch (error) {
        logger.error('Error general en conexión WebSocket:', error);
      }
    }

    connect();

    const onAppStateChange = (state: string) => {
      if (state === 'active') {
        // reconectar si se perdió y refrescar
        if (!socket || !socket.connected) {
          connect();
        } else {
          fetch(1);
        }
      }
    };

    const sub = AppState.addEventListener('change', onAppStateChange);

    return () => {
      isMounted = false;
      if (socket) {
        socket.disconnect();
        socket = null;
      }
      sub.remove();
    };
  }, [isAuthenticated, user, fetch]);
}


