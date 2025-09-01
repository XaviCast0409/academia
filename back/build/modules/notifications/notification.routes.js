"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("./notification.controller");
const router = (0, express_1.Router)();
router.get('/:userId', notification_controller_1.listNotificationsController);
router.post('/:id/read', notification_controller_1.markAsReadController);
exports.default = router;
