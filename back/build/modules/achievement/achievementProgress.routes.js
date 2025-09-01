"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const achievementProgress_controller_1 = require("./achievementProgress.controller");
const routerAchievementProgress = (0, express_1.Router)();
// ====== RUTAS DE ACTUALIZACIÓN DE PROGRESO ======
// Actualizar progreso por actividad completada
routerAchievementProgress.post('/activity/:userId', achievementProgress_controller_1.updateProgressFromActivityController);
// Actualizar progreso por subida de nivel
routerAchievementProgress.post('/level/:userId', achievementProgress_controller_1.updateProgressFromLevelUpController);
// Actualizar progreso por racha de días
routerAchievementProgress.post('/streak/:userId', achievementProgress_controller_1.updateProgressFromStreakController);
// Actualizar progreso por XaviCoins ganadas
routerAchievementProgress.post('/coins/:userId', achievementProgress_controller_1.updateProgressFromCoinsController);
// Actualizar progreso por ranking
routerAchievementProgress.post('/ranking/:userId', achievementProgress_controller_1.updateProgressFromRankingController);
// Función principal para actualizar progreso desde cualquier acción
routerAchievementProgress.post('/action/:userId', achievementProgress_controller_1.updateProgressFromActionController);
// ====== RUTAS DE DEBUGGING Y CONSULTA ======
// Forzar actualización de todos los logros de un usuario (para debugging)
routerAchievementProgress.post('/force-update/:userId', achievementProgress_controller_1.forceUpdateAllUserAchievementsController);
// Obtener progreso detallado de logros de un usuario
routerAchievementProgress.get('/progress/:userId', achievementProgress_controller_1.getUserAchievementProgressController);
// Debug endpoint para verificar estado de logros
routerAchievementProgress.get('/debug/:userId', achievementProgress_controller_1.debugUserAchievementsController);
exports.default = routerAchievementProgress;
