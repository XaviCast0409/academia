"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mission_controller_1 = require("./mission.controller");
const routerMission = (0, express_1.Router)();
routerMission.get('/active', mission_controller_1.getActiveMissionsController);
routerMission.post('/:id/progress', mission_controller_1.updateMissionProgressController);
routerMission.post('/:id/claim', mission_controller_1.claimMissionRewardController);
routerMission.get('/history', mission_controller_1.getMissionHistoryController);
routerMission.post('/generate', mission_controller_1.generateMissionsController);
// Rutas de administración del scheduler
routerMission.post('/admin/regenerate-daily', mission_controller_1.regenerateDailyMissionsController);
routerMission.post('/admin/regenerate-weekly', mission_controller_1.regenerateWeeklyMissionsController);
routerMission.post('/admin/cleanup-expired', mission_controller_1.cleanupExpiredMissionsController);
routerMission.get('/admin/scheduler-status', mission_controller_1.getSchedulerStatusController);
exports.default = routerMission;
