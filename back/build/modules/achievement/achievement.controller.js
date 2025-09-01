"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugUserAchievementsController = exports.updateAchievementProgressController = exports.assignAllAchievementsController = exports.getAllAchievementsController = exports.getAchievementProgressController = exports.checkAndUpdateAchievementsController = exports.claimAchievementRewardController = exports.getAchievementsForUserController = void 0;
const achievement_service_1 = require("./achievement.service");
const error_1 = require("../../utils/error");
const database_1 = __importDefault(require("../../config/database"));
const getAchievementsForUserController = async (req, res) => {
    try {
        const userId = req.query.userId;
        const achievements = await (0, achievement_service_1.getAchievementsForUser)(Number(userId));
        res.status(200).json(achievements);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getAchievementsForUserController = getAchievementsForUserController;
const claimAchievementRewardController = async (req, res) => {
    try {
        const { userId } = req.body;
        const achievementId = Number(req.params.id);
        const result = await (0, achievement_service_1.claimAchievementReward)(Number(userId), achievementId);
        res.status(200).json(result);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.claimAchievementRewardController = claimAchievementRewardController;
const checkAndUpdateAchievementsController = async (req, res) => {
    try {
        const { userId, activityData } = req.body;
        const newAchievements = await (0, achievement_service_1.checkAndUpdateAchievements)(Number(userId), activityData);
        res.status(200).json(newAchievements);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.checkAndUpdateAchievementsController = checkAndUpdateAchievementsController;
const getAchievementProgressController = async (req, res) => {
    try {
        const userId = req.query.userId;
        const progress = await (0, achievement_service_1.getAchievementProgress)(Number(userId));
        res.status(200).json(progress);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getAchievementProgressController = getAchievementProgressController;
const getAllAchievementsController = async (req, res) => {
    try {
        const achievements = await (0, achievement_service_1.getAllAchievements)();
        res.status(200).json(achievements);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getAllAchievementsController = getAllAchievementsController;
// Asignar todos los logros a un usuario
const assignAllAchievementsController = async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const result = await (0, achievement_service_1.assignAllAchievementsToUser)(userId);
        res.status(200).json({
            success: true,
            message: `Logros asignados exitosamente al usuario ${userId}`,
            data: result
        });
    }
    catch (error) {
        console.error('❌ Error en assignAllAchievementsController:', error);
        (0, error_1.errorHelper)(error, res);
    }
};
exports.assignAllAchievementsController = assignAllAchievementsController;
// Actualizar progreso de logros después de una acción
const updateAchievementProgressController = async (req, res) => {
    try {
        const { userId, activityData } = req.body;
        const result = await (0, achievement_service_1.updateAchievementProgress)(Number(userId), activityData);
        res.status(200).json({
            success: true,
            message: `Progreso de logros actualizado para usuario ${userId}`,
            data: result
        });
    }
    catch (error) {
        console.error('❌ Error en updateAchievementProgressController:', error);
        (0, error_1.errorHelper)(error, res);
    }
};
exports.updateAchievementProgressController = updateAchievementProgressController;
// NUEVO: Endpoint para debug - ver progreso detallado de logros de un usuario
const debugUserAchievementsController = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await database_1.default.User.findByPk(parseInt(userId));
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        // Contar actividades completadas
        const completedActivities = await database_1.default.Evidence.count({
            where: {
                studentId: parseInt(userId),
                status: "approved"
            }
        });
        // Obtener logros de actividades completadas
        const activityAchievements = await database_1.default.Achievement.findAll({
            where: {
                isActive: true,
                requirementType: 'activities_completed'
            }
        });
        // Obtener progreso del usuario para estos logros
        const userAchievements = await database_1.default.UserAchievement.findAll({
            where: { userId: parseInt(userId) },
            include: [{
                    model: database_1.default.Achievement,
                    as: 'achievement',
                    where: { requirementType: 'activities_completed' }
                }]
        });
        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    totalActivitiesCompleted: user.totalActivitiesCompleted,
                    completedActivitiesFromDB: completedActivities
                },
                activityAchievements: activityAchievements.map((a) => ({
                    id: a.id,
                    title: a.title,
                    requirementValue: a.requirementValue
                })),
                userProgress: userAchievements.map((ua) => ({
                    achievementId: ua.achievementId,
                    achievementTitle: ua.achievement.title,
                    currentProgress: ua.currentProgress,
                    isUnlocked: ua.isUnlocked,
                    requirementValue: ua.achievement.requirementValue
                }))
            }
        });
    }
    catch (error) {
        console.error('❌ Error en debugUserAchievementsController:', error);
        (0, error_1.errorHelper)(error, res);
    }
};
exports.debugUserAchievementsController = debugUserAchievementsController;
