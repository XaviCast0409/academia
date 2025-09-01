"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceUpdateAllUserAchievements = exports.updateAchievementProgressFromAction = exports.updateProgressFromRanking = exports.updateProgressFromCoins = exports.updateProgressFromStreak = exports.updateProgressFromLevelUp = exports.updateProgressFromActivity = void 0;
const database_1 = __importDefault(require("../../config/database"));
/**
 * Actualizar progreso de logros basado en actividades completadas
 */
const updateProgressFromActivity = async (userId, activityData) => {
    const user = await database_1.default.User.findByPk(userId);
    if (!user)
        throw new Error("Usuario no encontrado");
    const achievements = await database_1.default.Achievement.findAll({
        where: {
            isActive: true,
            requirementType: ['activities_completed', 'math_topic', 'perfect_scores']
        }
    });
    const unlockedAchievements = [];
    for (const achievement of achievements) {
        const userAchievement = await getUserAchievementOrCreate(userId, achievement.id);
        if (!userAchievement.isUnlocked) {
            const newProgress = await calculateProgressForAchievement(user, achievement, activityData);
            const wasUnlocked = await updateAchievementProgress(userAchievement, newProgress, achievement);
            if (wasUnlocked) {
                unlockedAchievements.push(achievement);
            }
        }
    }
    return unlockedAchievements;
};
exports.updateProgressFromActivity = updateProgressFromActivity;
/**
 * Actualizar progreso de logros basado en nivel alcanzado
 */
const updateProgressFromLevelUp = async (userId, newLevel) => {
    const user = await database_1.default.User.findByPk(userId);
    if (!user)
        throw new Error("Usuario no encontrado");
    const achievements = await database_1.default.Achievement.findAll({
        where: {
            isActive: true,
            requirementType: 'level_reached'
        }
    });
    const unlockedAchievements = [];
    for (const achievement of achievements) {
        const userAchievement = await getUserAchievementOrCreate(userId, achievement.id);
        if (!userAchievement.isUnlocked) {
            const newProgress = newLevel;
            const wasUnlocked = await updateAchievementProgress(userAchievement, newProgress, achievement);
            if (wasUnlocked) {
                unlockedAchievements.push(achievement);
            }
        }
    }
    return unlockedAchievements;
};
exports.updateProgressFromLevelUp = updateProgressFromLevelUp;
/**
 * Actualizar progreso de logros basado en racha de días
 */
const updateProgressFromStreak = async (userId, streakDays) => {
    const user = await database_1.default.User.findByPk(userId);
    if (!user)
        throw new Error("Usuario no encontrado");
    const achievements = await database_1.default.Achievement.findAll({
        where: {
            isActive: true,
            requirementType: 'streak_days'
        }
    });
    const unlockedAchievements = [];
    for (const achievement of achievements) {
        const userAchievement = await getUserAchievementOrCreate(userId, achievement.id);
        if (!userAchievement.isUnlocked) {
            const newProgress = streakDays;
            const wasUnlocked = await updateAchievementProgress(userAchievement, newProgress, achievement);
            if (wasUnlocked) {
                unlockedAchievements.push(achievement);
            }
        }
    }
    return unlockedAchievements;
};
exports.updateProgressFromStreak = updateProgressFromStreak;
/**
 * Actualizar progreso de logros basado en XaviCoins ganadas
 */
const updateProgressFromCoins = async (userId, totalCoins) => {
    const user = await database_1.default.User.findByPk(userId);
    if (!user)
        throw new Error("Usuario no encontrado");
    const achievements = await database_1.default.Achievement.findAll({
        where: {
            isActive: true,
            requirementType: 'coins_earned'
        }
    });
    const unlockedAchievements = [];
    for (const achievement of achievements) {
        const userAchievement = await getUserAchievementOrCreate(userId, achievement.id);
        if (!userAchievement.isUnlocked) {
            const newProgress = totalCoins;
            const wasUnlocked = await updateAchievementProgress(userAchievement, newProgress, achievement);
            if (wasUnlocked) {
                unlockedAchievements.push(achievement);
            }
        }
    }
    return unlockedAchievements;
};
exports.updateProgressFromCoins = updateProgressFromCoins;
/**
 * Actualizar progreso de logros basado en ranking
 */
const updateProgressFromRanking = async (userId, rankingPosition) => {
    const user = await database_1.default.User.findByPk(userId);
    if (!user)
        throw new Error("Usuario no encontrado");
    const achievements = await database_1.default.Achievement.findAll({
        where: {
            isActive: true,
            requirementType: 'ranking_position'
        }
    });
    const unlockedAchievements = [];
    for (const achievement of achievements) {
        const userAchievement = await getUserAchievementOrCreate(userId, achievement.id);
        if (!userAchievement.isUnlocked) {
            // Para ranking, menor posición = mejor (1er lugar es mejor que 10mo)
            const newProgress = rankingPosition;
            const wasUnlocked = await updateAchievementProgress(userAchievement, newProgress, achievement);
            if (wasUnlocked) {
                unlockedAchievements.push(achievement);
            }
        }
    }
    return unlockedAchievements;
};
exports.updateProgressFromRanking = updateProgressFromRanking;
/**
 * Función principal para actualizar progreso de logros
 * Esta función debe llamarse después de cualquier acción que pueda desbloquear logros
 */
const updateAchievementProgressFromAction = async (progressData) => {
    const { userId, activityType, mathTopic, xavicoinsEarned, levelReached, streakDays, perfectScore, rankingPosition } = progressData;
    const unlockedAchievements = [];
    // Actualizar por actividad completada
    if (activityType) {
        const activityAchievements = await (0, exports.updateProgressFromActivity)(userId, {
            type: activityType,
            mathTopic,
            perfectScore
        });
        unlockedAchievements.push(...activityAchievements);
    }
    // Actualizar por nivel alcanzado
    if (levelReached) {
        const levelAchievements = await (0, exports.updateProgressFromLevelUp)(userId, levelReached);
        unlockedAchievements.push(...levelAchievements);
    }
    // Actualizar por racha
    if (streakDays !== undefined) {
        const streakAchievements = await (0, exports.updateProgressFromStreak)(userId, streakDays);
        unlockedAchievements.push(...streakAchievements);
    }
    // Actualizar por XaviCoins
    if (xavicoinsEarned !== undefined) {
        const coinAchievements = await (0, exports.updateProgressFromCoins)(userId, xavicoinsEarned);
        unlockedAchievements.push(...coinAchievements);
    }
    // Actualizar por ranking
    if (rankingPosition !== undefined) {
        const rankingAchievements = await (0, exports.updateProgressFromRanking)(userId, rankingPosition);
        unlockedAchievements.push(...rankingAchievements);
    }
    if (unlockedAchievements.length > 0) {
    }
    return unlockedAchievements;
};
exports.updateAchievementProgressFromAction = updateAchievementProgressFromAction;
/**
 * Obtener o crear un UserAchievement para un usuario y logro específico
 */
const getUserAchievementOrCreate = async (userId, achievementId) => {
    let userAchievement = await database_1.default.UserAchievement.findOne({
        where: { userId, achievementId }
    });
    if (!userAchievement) {
        userAchievement = await database_1.default.UserAchievement.create({
            userId,
            achievementId,
            progress: 0,
            isUnlocked: false,
            rewardClaimed: false,
        });
    }
    return userAchievement;
};
/**
 * Calcular el progreso actual para un logro específico
 */
const calculateProgressForAchievement = async (user, achievement, activityData) => {
    switch (achievement.requirementType) {
        case "activities_completed":
            // Contar actividades completadas desde la base de datos
            const completedActivities = await database_1.default.Evidence.count({
                where: {
                    studentId: user.id,
                    status: "approved"
                }
            });
            // Debug adicional: verificar todas las evidencias del usuario
            const allEvidences = await database_1.default.Evidence.findAll({
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
            // Por ahora, contar todas las evidencias aprobadas como "perfect scores"
            // ya que no hay sistema de puntuación implementado
            const approvedEvidences = await database_1.default.Evidence.count({
                where: {
                    studentId: user.id,
                    status: "approved"
                }
            });
            return approvedEvidences;
        case "math_topic":
            if (achievement.mathTopic) {
                // Contar evidencias aprobadas que pertenecen a actividades del tema específico
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
                // Debug adicional: verificar todas las evidencias del usuario
                const allEvidences = await database_1.default.Evidence.findAll({
                    where: {
                        studentId: user.id,
                        status: "approved"
                    },
                    include: [{
                            model: database_1.default.Activity,
                            as: "activity"
                        }]
                });
                return topicActivities;
            }
            return 0;
        case "ranking_position":
            // Obtener la mejor posición en ranking del usuario
            const bestRanking = await database_1.default.User.findOne({
                where: { id: user.id },
                attributes: ['rankingPosition']
            });
            return bestRanking?.rankingPosition || 999; // 999 como posición por defecto
        default:
            return 0;
    }
};
/**
 * Actualizar el progreso de un logro específico
 */
const updateAchievementProgress = async (userAchievement, newProgress, achievement) => {
    const oldProgress = userAchievement.progress;
    const wasUnlocked = userAchievement.isUnlocked;
    // Actualizar progreso
    userAchievement.progress = newProgress;
    // Verificar si se debe desbloquear
    let shouldBeUnlocked = false;
    if (achievement.requirementType === 'ranking_position') {
        // Para ranking, menor posición = mejor
        shouldBeUnlocked = newProgress <= achievement.requirementValue;
    }
    else {
        shouldBeUnlocked = newProgress >= achievement.requirementValue;
    }
    // Si se desbloqueó
    if (!wasUnlocked && shouldBeUnlocked) {
        userAchievement.isUnlocked = true;
        userAchievement.unlockedAt = new Date();
    }
    await userAchievement.save();
    return !wasUnlocked && shouldBeUnlocked;
};
/**
 * Función para forzar la actualización de todos los logros de un usuario
 * Útil para debugging o cuando se sospecha que hay inconsistencias
 */
const forceUpdateAllUserAchievements = async (userId) => {
    const user = await database_1.default.User.findByPk(userId);
    if (!user)
        throw new Error("Usuario no encontrado");
    const achievements = await database_1.default.Achievement.findAll({ where: { isActive: true } });
    const results = { updated: 0, unlocked: 0, errors: 0 };
    for (const achievement of achievements) {
        try {
            const userAchievement = await getUserAchievementOrCreate(userId, achievement.id);
            const newProgress = await calculateProgressForAchievement(user, achievement);
            const wasUnlocked = await updateAchievementProgress(userAchievement, newProgress, achievement);
            results.updated++;
            if (wasUnlocked)
                results.unlocked++;
        }
        catch (error) {
            console.error(`❌ Error actualizando logro ${achievement.title}:`, error);
            results.errors++;
        }
    }
    return results;
};
exports.forceUpdateAllUserAchievements = forceUpdateAllUserAchievements;
