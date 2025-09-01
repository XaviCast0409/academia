"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchedulerStatusController = exports.cleanupExpiredMissionsController = exports.regenerateWeeklyMissionsController = exports.regenerateDailyMissionsController = exports.generateMissionsController = exports.getMissionHistoryController = exports.claimMissionRewardController = exports.updateMissionProgressController = exports.getActiveMissionsController = void 0;
const mission_service_1 = require("./mission.service");
const scheduler_1 = __importDefault(require("../../utils/scheduler"));
const error_1 = require("../../utils/error");
const getActiveMissionsController = async (req, res) => {
    try {
        const userId = req.query.userId;
        const missions = await (0, mission_service_1.getActiveMissionsForUser)(Number(userId));
        res.status(200).json(missions);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getActiveMissionsController = getActiveMissionsController;
const updateMissionProgressController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const missionId = Number(req.params.id);
        const { increment } = req.body;
        const result = await (0, mission_service_1.updateMissionProgress)(Number(userId), missionId, increment || 1);
        res.status(200).json(result);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.updateMissionProgressController = updateMissionProgressController;
const claimMissionRewardController = async (req, res) => {
    try {
        const { userId } = req.body;
        const missionId = Number(req.params.id);
        const result = await (0, mission_service_1.claimMissionReward)(Number(userId), missionId);
        res.status(200).json(result);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.claimMissionRewardController = claimMissionRewardController;
const getMissionHistoryController = async (req, res) => {
    try {
        const userId = req.query.userId;
        const history = await (0, mission_service_1.getUserMissionHistory)(Number(userId));
        res.status(200).json(history);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getMissionHistoryController = getMissionHistoryController;
const generateMissionsController = async (req, res) => {
    try {
        await (0, mission_service_1.generateMissions)();
        res.status(200).json({ message: 'Misiones generadas correctamente' });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.generateMissionsController = generateMissionsController;
// ====== CONTROLADORES DEL SCHEDULER ======
const regenerateDailyMissionsController = async (req, res) => {
    try {
        await (0, mission_service_1.generateDailyMissions)();
        res.status(200).json({
            success: true,
            message: 'Misiones diarias regeneradas manualmente'
        });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.regenerateDailyMissionsController = regenerateDailyMissionsController;
const regenerateWeeklyMissionsController = async (req, res) => {
    try {
        await (0, mission_service_1.generateWeeklyMissions)();
        res.status(200).json({
            success: true,
            message: 'Misiones semanales regeneradas manualmente'
        });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.regenerateWeeklyMissionsController = regenerateWeeklyMissionsController;
const cleanupExpiredMissionsController = async (req, res) => {
    try {
        await (0, mission_service_1.cleanupExpiredMissions)();
        res.status(200).json({
            success: true,
            message: 'Limpieza de misiones expiradas completada manualmente'
        });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.cleanupExpiredMissionsController = cleanupExpiredMissionsController;
const getSchedulerStatusController = async (req, res) => {
    try {
        const scheduler = scheduler_1.default.getInstance();
        const status = scheduler.getStatus();
        res.status(200).json({
            success: true,
            data: status,
            message: 'Estado del programador de misiones'
        });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getSchedulerStatusController = getSchedulerStatusController;
