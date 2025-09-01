"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_controller_2 = require("./user.controller");
const router = (0, express_1.Router)();
// GET routes
router.get("/", user_controller_1.getUsersController);
router.get("/:id", user_controller_1.getUserController);
router.get("/:id/stats", user_controller_1.getUserStatsController);
// POST routes
router.post("/", user_controller_1.createUserController);
router.post("/login", user_controller_1.loginUserController);
router.post("/verify-code", user_controller_1.verifyCodeController);
router.post("/:id/missions", user_controller_1.assignMissionsToUserController);
// PUT routes
router.put("/:id", user_controller_1.updateUserController);
// PATCH routes
router.patch("/:id/streak", user_controller_1.updateUserStreakController);
router.patch("/:id/xavicoins", user_controller_1.updateUserXaviCoinsController);
router.patch("/:id/status", user_controller_1.updateUserStatusController);
router.post('/:userId/push-token', user_controller_2.savePushTokenController);
// DELETE routes
router.delete("/:id", user_controller_1.deleteUserController);
exports.default = router;
