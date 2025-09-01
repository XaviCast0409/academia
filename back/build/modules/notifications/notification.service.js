"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = createNotification;
exports.markAsRead = markAsRead;
exports.listUserNotifications = listUserNotifications;
const database_1 = __importDefault(require("../../config/database"));
async function createNotification(payload) {
    const notification = await database_1.default.Notification.create(payload);
    return notification;
}
async function markAsRead(notificationId, userId) {
    const n = await database_1.default.Notification.findOne({ where: { id: notificationId, userId } });
    if (!n)
        throw new Error('Notification not found');
    await n.update({ isRead: true });
    return n;
}
async function listUserNotifications(userId, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const { rows, count } = await database_1.default.Notification.findAndCountAll({
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
