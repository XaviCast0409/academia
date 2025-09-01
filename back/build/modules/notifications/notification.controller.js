"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsReadController = exports.listNotificationsController = void 0;
const error_1 = require("../../utils/error");
const notification_service_1 = require("./notification.service");
const listNotificationsController = async (req, res) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 20 } = req.query;
        const result = await (0, notification_service_1.listUserNotifications)(Number(userId), Number(page), Number(limit));
        res.status(200).json(result);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.listNotificationsController = listNotificationsController;
const markAsReadController = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const result = await (0, notification_service_1.markAsRead)(Number(id), Number(userId));
        res.status(200).json(result);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.markAsReadController = markAsReadController;
