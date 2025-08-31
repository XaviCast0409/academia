import React from 'react';
import Constants from 'expo-constants';
import { useAuthStore } from '@/store/authStore';
import pushService from '@/services/pushService';

// Evita ejecutar expo-notifications en Expo Go (SDK 53) para no mostrar el warning
export function usePushNotifications() {
  React.useEffect(() => {
    (async () => {
      try {
        // En Expo Go (appOwnership === 'expo') salimos sin hacer nada
        if (Constants?.appOwnership === 'expo') {
          return;
        }

        const Notifications = (await import('expo-notifications')).default;
        const {
          getPermissionsAsync,
          requestPermissionsAsync,
          getExpoPushTokenAsync,
          setNotificationChannelAsync,
        } = await import('expo-notifications');

        // Android channel
        await setNotificationChannelAsync('default', {
          name: 'default',
          importance: 4,
          sound: true,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        } as any);

        const perm = await getPermissionsAsync();
        if (!perm.granted) {
          await requestPermissionsAsync();
        }

        // Request and store token in backend
        const tokenResponse = await getExpoPushTokenAsync();
        const pushToken = tokenResponse.data;
        const auth = useAuthStore.getState();
        const userId = auth.user ? Number(auth.user.id) : null;
        if (pushToken && userId) {
          await pushService.savePushToken(userId, pushToken);
        }

        // Foreground behavior (compatible con tipos actuales)
        (Notifications as any).setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          }),
        });
      } catch (e) {
        // silent
      }
    })();
  }, []);
}


