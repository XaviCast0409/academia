"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const achievement_controller_1 = require("./achievement.controller");
const achievementProgress_routes_1 = __importDefault(require("./achievementProgress.routes"));
const routerAchievement = (0, express_1.Router)();
routerAchievement.get("/", achievement_controller_1.getAllAchievementsController);
routerAchievement.get("/user", achievement_controller_1.getAchievementsForUserController);
routerAchievement.post("/:id/claim", achievement_controller_1.claimAchievementRewardController);
routerAchievement.post("/check", achievement_controller_1.checkAndUpdateAchievementsController);
routerAchievement.get("/progress", achievement_controller_1.getAchievementProgressController);
// Nuevas rutas para asignación automática
routerAchievement.post("/assign/:userId", achievement_controller_1.assignAllAchievementsController);
routerAchievement.post("/update-progress", achievement_controller_1.updateAchievementProgressController);
// Ruta de debug para ver progreso detallado (temporalmente comentada)
// routerAchievement.get("/debug/user/:userId", debugUserAchievementsController);
// Incluir rutas de progreso de logros
routerAchievement.use("/progress", achievementProgress_routes_1.default);
exports.default = routerAchievement;
