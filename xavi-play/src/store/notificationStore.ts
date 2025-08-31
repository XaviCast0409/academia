import { create } from 'zustand';
import { notificationService, NotificationItem } from '@/services/notificationService';
import { useAuthStore } from '@/store/authStore';

interface NotificationState {
  items: NotificationItem[];
  unreadCount: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  fetch: (page?: number) => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  prepend: (n: NotificationItem) => void;
  bumpUnread: (delta?: number) => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  items: [],
  unreadCount: 0,
  page: 1,
  totalPages: 1,
  isLoading: false,

  fetch: async (page = 1) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    set({ isLoading: true });
    try {
      const res = await notificationService.list(parseInt(user.id), page);
      const unread = res.notifications.filter((n) => !n.isRead).length;
      set({
        items: page === 1 ? res.notifications : [...get().items, ...res.notifications],
        unreadCount: page === 1 ? unread : get().unreadCount + unread,
        page: res.page,
        totalPages: res.totalPages,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  markAsRead: async (id: number) => {
    const user = useAuthStore.getState().user;
    if (!user) return;
    await notificationService.markAsRead(id, parseInt(user.id));
    set((state) => {
      const items = state.items.map((n) => (n.id === id ? { ...n, isRead: true } : n));
      const unreadCount = items.filter((n) => !n.isRead).length;
      return { items, unreadCount };
    });
  },

  prepend: (n: NotificationItem) => {
    set((state) => ({
      items: [n, ...state.items],
      unreadCount: state.unreadCount + (n.isRead ? 0 : 1),
    }));
  },

  bumpUnread: (delta = 1) => {
    set((state) => ({ unreadCount: Math.max(0, state.unreadCount + delta) }));
  },

  clear: () => set({ items: [], unreadCount: 0, page: 1, totalPages: 1 }),
}));


