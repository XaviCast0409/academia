"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAchievementProgress = exports.assignAllAchievementsToUser = exports.getAllAchievements = exports.getAchievementProgress = exports.checkAndUpdateAchievements = exports.claimAchievementReward = exports.getAchievementsForUser = void 0;
const database_1 = __importDefault(require("../../config/database"));
const getAchievementsForUser = async (userId) => {
    return await database_1.default.UserAchievement.findAll({
        where: { userId },
        include: [{ model: database_1.default.Achievement, as: "achievement", where: { isActive: true } }],
        order: [["createdAt", "DESC"]],
    });
};
exports.getAchievementsForUser = getAchievementsForUser;
const claimAchievementReward = async (userId, achievementId) => {
    const userAchievement = await database_1.default.UserAchievement.findOne({
        where: { userId, achievementId },
        include: [{ model: database_1.default.Achievement, as: "achievement" }]
    });
    if (!userAchievement || !userAchievement.isUnlocked || userAchievement.rewardClaimed) {
        throw new Error("Logro no disponible para reclamar");
    }
    // Otorgar recompensa seg�n el tipo
    const achievement = userAchievement.achievement;
    if (achievement.rewardType === "coins") {
        const user = await database_1.default.User.findByPk(userId);
        if (user) {
            user.xavicoints = (user.xavicoints || 0) + Number(achievement.rewardValue);
            await user.save();
        }
    }
    // Marcar como reclamado
    userAchievement.rewardClaimed = true;
    userAchievement.claimedAt = new Date();
    await userAchievement.save();
    return userAchievement;
};
exports.claimAchievementReward = claimAchievementReward;
const checkAndUpdateAchievements = async (userId, activityData) => {
    const user = await database_1.default.User.findByPk(userId);
    if (!user)
        throw new Error("Usuario no encontrado");
    const newAchievements = [];
    const achievements = await database_1.default.Achievement.findAll({ where: { isActive: true } });
    for (const achievement of achievements) {
        const userAchievement = await database_1.default.UserAchievement.findOne({
            where: { userId, achievementId: achievement.id }
        });
        if (!userAchievement || !userAchievement.isUnlocked) {
            const shouldUnlock = await checkAchievementCondition(user, achievement, activityData);
            if (shouldUnlock) {
                if (!userAchievement) {
                    await database_1.default.UserAchievement.create({
                        userId,
                        achievementId: achievement.id,
                        progress: achievement.requirementValue,
                        isUnlocked: true,
                        unlockedAt: new Date(),
                        rewardClaimed: false,
                    });
                }
                else {
                    userAchievement.isUnlocked = true;
                    userAchievement.unlockedAt = new Date();
                    await userAchievement.save();
                }
                newAchievements.push(achievement);
            }
        }
    }
    return newAchievements;
};
exports.checkAndUpdateAchievements = checkAndUpdateAchievements;
const checkAchievementCondition = async (user, achievement, activityData) => {
    switch (achievement.requirementType) {
        case "activities_completed":
            return user.totalActivitiesCompleted >= achievement.requirementValue;
        case "level_reached":
            return user.level >= achievement.requirementValue;
        case "streak_days":
            return user.currentStreak >= achievement.requirementValue;
        case "coins_earned":
            return user.xavicoints >= achievement.requirementValue;
        case "perfect_scores":
            return user.perfectScores >= achievement.requirementValue;
        case "math_topic":
            if (achievement.mathTopic && activityData.mathTopic === achievement.mathTopic) {
                // Contar actividades del tema espec�fico
                const topicActivities = await database_1.default.Evidence.count({
                    where: {
                        studentId: user.id,
                        status: "approved"
                    },
                    include: [{
                            model: database_1.default.Activity,
                            as: "activity",
                            where: { mathTopic: achievement.mathTopic }
                        }]
                });
                return topicActivities >= achievement.requirementValue;
            }
            return false;
        default:
            return false;
    }
};
const getAchievementProgress = async (userId) => {
    return await database_1.default.UserAchievement.findAll({
        where: { userId },
        include: [{ model: database_1.default.Achievement, as: "achievement" }],
        order: [["createdAt", "DESC"]],
    });
};
exports.getAchievementProgress = getAchievementProgress;
const getAllAchievements = async () => {
    return await database_1.default.Achievement.findAll({
        where: { isActive: true },
        order: [["category", "ASC"], ["requirementValue", "ASC"]],
    });
};
exports.getAllAchievements = getAllAchievements;
/**
 * Calcular el progreso actual de un usuario para un logro específico
 */
const calculateAchievementProgress = async (user, achievement) => {
    switch (achievement.requirementType) {
        case "activities_completed":
            // Contar actividades completadas desde la base de datos para mayor precisión
            const completedActivities = await database_1.default.Evidence.count({
                where: {
                    studentId: user.id,
                    status: "approved"
                }
            });
            return completedActivities;
        case "level_reached":
            return user.level || 1;
        case "streak_days":
            return user.currentStreak || 0;
        case "coins_earned":
            return user.xavicoints || 0;
        case "perfect_scores":
            return user.perfectScores || 0;
        case "math_topic":
            if (achievement.mathTopic) {
                const topicActivities = await database_1.default.Evidence.count({
                    where: {
                        studentId: user.id,
                        status: "approved"
                    },
                    include: [{
                            model: database_1.default.Activity,
                            as: "activity",
                            where: { mathTopic: achievement.mathTopic }
                        }]
                });
                return topicActivities;
            }
            return 0;
        default:
            return 0;
    }
};
/**
 * Asignar todos los logros activos a un usuario si no los tiene
 * Esto permite que el usuario vea su progreso desde el inicio
 */
const assignAllAchievementsToUser = async (userId) => {
    const user = await database_1.default.User.findByPk(userId);
    if (!user)
        throw new Error("Usuario no encontrado");
    const achievements = await database_1.default.Achievement.findAll({ where: { isActive: true } });
    const assignedCount = { created: 0, updated: 0 };
    for (const achievement of achievements) {
        const userAchievement = await database_1.default.UserAchievement.findOne({
            where: { userId, achievementId: achievement.id }
        });
        if (!userAchievement) {
            // Calcular progreso actual del usuario para este logro
            const currentProgress = await calculateAchievementProgress(user, achievement);
            // Verificar si ya debería estar desbloqueado
            const isUnlocked = currentProgress >= achievement.requirementValue;
            await database_1.default.UserAchievement.create({
                userId,
                achievementId: achievement.id,
                progress: currentProgress,
                isUnlocked: isUnlocked,
                unlockedAt: isUnlocked ? new Date() : null,
                rewardClaimed: false,
            });
            assignedCount.created++;
        }
        else {
            // Actualizar progreso si ya existe
            const currentProgress = await calculateAchievementProgress(user, achievement);
            const wasUnlocked = userAchievement.isUnlocked;
            const shouldBeUnlocked = currentProgress >= achievement.requirementValue;
            userAchievement.progress = currentProgress;
            if (!wasUnlocked && shouldBeUnlocked) {
                userAchievement.isUnlocked = true;
                userAchievement.unlockedAt = new Date();
            }
            await userAchievement.save();
            assignedCount.updated++;
        }
    }
    return assignedCount;
};
exports.assignAllAchievementsToUser = assignAllAchievementsToUser;
/**
 * Actualizar progreso de logros después de completar una actividad
 * Esta función debería llamarse cada vez que el usuario complete una acción
 */
const updateAchievementProgress = async (userId, activityData) => {
    const user = await database_1.default.User.findByPk(userId);
    if (!user)
        throw new Error("Usuario no encontrado");
    const achievements = await database_1.default.Achievement.findAll({ where: { isActive: true } });
    const updatedAchievements = [];
    for (const achievement of achievements) {
        let userAchievement = await database_1.default.UserAchievement.findOne({
            where: { userId, achievementId: achievement.id }
        });
        // Si no existe, asignar el logro primero
        if (!userAchievement) {
            const currentProgress = await calculateAchievementProgress(user, achievement);
            const isUnlocked = currentProgress >= achievement.requirementValue;
            userAchievement = await database_1.default.UserAchievement.create({
                userId,
                achievementId: achievement.id,
                progress: currentProgress,
                isUnlocked: isUnlocked,
                unlockedAt: isUnlocked ? new Date() : null,
                rewardClaimed: false,
            });
        }
        else if (!userAchievement.isUnlocked) {
            // Actualizar progreso si no está desbloqueado
            const currentProgress = await calculateAchievementProgress(user, achievement);
            const oldProgress = userAchievement.progress;
            userAchievement.progress = currentProgress;
            // Log específico para logros de actividades completadas
            if (achievement.requirementType === 'activities_completed') {
            }
            // Verificar si se desbloqueó
            if (currentProgress >= achievement.requirementValue) {
                userAchievement.isUnlocked = true;
                userAchievement.unlockedAt = new Date();
            }
            else if (currentProgress > oldProgress) {
            }
            await userAchievement.save();
        }
        updatedAchievements.push(userAchievement);
    }
    return updatedAchievements;
};
exports.updateAchievementProgress = updateAchievementProgress;
