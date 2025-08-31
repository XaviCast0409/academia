import api from '@/services/api';

export interface NotificationItem {
  id: number;
  userId: number | null;
  type: string;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationListResponse {
  notifications: NotificationItem[];
  total: number;
  page: number;
  totalPages: number;
}

export const notificationService = {
  async list(userId: number, page = 1, limit = 20): Promise<NotificationListResponse> {
    const res = await api.get(`/notifications/${userId}?page=${page}&limit=${limit}`);
    return res.data;
  },

  async markAsRead(id: number, userId: number): Promise<NotificationItem> {
    const res = await api.post(`/notifications/${id}/read`, { userId });
    return res.data;
  },
};

export default notificationService;


