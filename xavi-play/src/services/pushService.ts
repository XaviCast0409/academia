import api from '@/services/api';

export const pushService = {
  async savePushToken(userId: number, pushToken: string) {
    await api.post(`/users/${userId}/push-token`, { pushToken });
  },
};

export default pushService;


