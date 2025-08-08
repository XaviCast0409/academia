import db from '../../config/database';
import { NotificationInput } from '../../models/Notification';

export type NotificationTarget = { userId?: number | null };

export async function createNotification(
  payload: Omit<NotificationInput, 'id'>
) {
  const notification = await db.Notification.create(payload);
  return notification;
}

export async function markAsRead(notificationId: number, userId: number) {
  const n = await db.Notification.findOne({ where: { id: notificationId, userId } });
  if (!n) throw new Error('Notification not found');
  await n.update({ isRead: true });
  return n;
}

export async function listUserNotifications(userId: number, page = 1, limit = 20) {
  const offset = (page - 1) * limit;
  const { rows, count } = await db.Notification.findAndCountAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
    offset,
    limit,
  });
  return {
    notifications: rows,
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
  };
}


