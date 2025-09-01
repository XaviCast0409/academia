"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupExpiredMissions = exports.ensureMissionsExist = exports.generateMissions = exports.generateSpecialMissions = exports.generateWeeklyMissions = exports.updateMissionProgressForActivity = exports.generateDailyMissions = exports.getUserMissionHistory = exports.claimMissionReward = exports.updateMissionProgress = exports.assignActiveMissionsToUser = exports.getActiveMissionsForUser = void 0;
const database_1 = __importDefault(require("../../config/database"));
const getActiveMissionsForUser = async (userId) => {
    return await database_1.default.UserMission.findAll({
        where: { userId, isCompleted: false },
        include: [{ model: database_1.default.Mission, as: 'mission', where: { isActive: true } }],
    });
};
exports.getActiveMissionsForUser = getActiveMissionsForUser;
const assignActiveMissionsToUser = async (userId) => {
    const activeMissions = await database_1.default.Mission.findAll({ where: { isActive: true } });
    let assignedCount = 0;
    for (const mission of activeMissions) {
        const exists = await database_1.default.UserMission.findOne({ where: { userId, missionId: mission.id } });
        if (!exists) {
            await database_1.default.UserMission.create({
                userId,
                missionId: mission.id,
                progress: 0,
                isCompleted: false,
            });
            assignedCount++;
        }
    }
    return { assignedCount, totalMissions: activeMissions.length };
};
exports.assignActiveMissionsToUser = assignActiveMissionsToUser;
const updateMissionProgress = async (userId, missionId, increment = 1) => {
    const userMission = await database_1.default.UserMission.findOne({ where: { userId, missionId } });
    if (!userMission)
        return null;
    if (userMission.isCompleted)
        return userMission;
    userMission.progress += increment;
    const mission = await database_1.default.Mission.findByPk(missionId);
    if (mission && userMission.progress >= mission.requiredCount) {
        userMission.isCompleted = true;
        userMission.completedAt = new Date();
        // Otorgar recompensa si es necesario (ejemplo)
        // await userService.addCoins(userId, mission.rewardAmount);
    }
    await userMission.save();
    return userMission;
};
exports.updateMissionProgress = updateMissionProgress;
const claimMissionReward = async (userId, missionId) => {
    const userMission = await database_1.default.UserMission.findOne({ where: { userId, missionId } });
    if (!userMission || !userMission.isCompleted || userMission.rewardClaimed)
        return null;
    // Buscar la misión para obtener la recompensa
    const mission = await database_1.default.Mission.findByPk(missionId);
    if (mission && mission.rewardType === 'COINS') {
        // Buscar el usuario y sumarle las monedas
        const user = await database_1.default.User.findByPk(userId);
        if (user) {
            user.xavicoints = (user.xavicoints || 0) + mission.rewardAmount;
            await user.save();
        }
    }
    // Marcar la recompensa como reclamada
    userMission.rewardClaimed = true;
    userMission.claimedAt = new Date();
    await userMission.save();
    return userMission;
};
exports.claimMissionReward = claimMissionReward;
const getUserMissionHistory = async (userId) => {
    return await database_1.default.UserMission.findAll({
        where: { userId, isCompleted: true },
        include: [{ model: database_1.default.Mission, as: 'mission' }],
        order: [['completedAt', 'DESC']],
    });
};
exports.getUserMissionHistory = getUserMissionHistory;
const generateDailyMissions = async () => {
    await database_1.default.Mission.create({
        title: 'Completa y aprueba 5 actividades hoy',
        description: 'Realiza y aprueba 5 actividades diferentes en el día.',
        type: 'DAILY',
        requiredCount: 5,
        rewardType: 'COINS',
        rewardAmount: 10,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
};
exports.generateDailyMissions = generateDailyMissions;
const updateMissionProgressForActivity = async (userId) => {
    // Verificar si el usuario tiene misiones asignadas
    const allUserMissions = await database_1.default.UserMission.findAll({
        where: { userId },
        include: [{
                model: database_1.default.Mission,
                as: 'mission',
                where: { isActive: true }
            }],
    });
    // Si el usuario no tiene misiones asignadas, asignarlas automáticamente
    if (allUserMissions.length === 0) {
        await (0, exports.assignActiveMissionsToUser)(userId);
        // Volver a buscar las misiones después de asignarlas
        const updatedUserMissions = await database_1.default.UserMission.findAll({
            where: { userId },
            include: [{
                    model: database_1.default.Mission,
                    as: 'mission',
                    where: { isActive: true }
                }],
        });
    }
    // Busca todas las misiones activas del usuario que sean de completar actividades
    const userMissions = await database_1.default.UserMission.findAll({
        where: { userId, isCompleted: false },
        include: [{
                model: database_1.default.Mission,
                as: 'mission',
                where: {
                    isActive: true,
                    // Filtrar misiones que sean de completar actividades - filtro más amplio
                    title: {
                        [database_1.default.Sequelize.Op.or]: [
                            { [database_1.default.Sequelize.Op.like]: '%actividad%' },
                            { [database_1.default.Sequelize.Op.like]: '%activity%' },
                            { [database_1.default.Sequelize.Op.like]: '%completar%' },
                            { [database_1.default.Sequelize.Op.like]: '%complete%' },
                            { [database_1.default.Sequelize.Op.like]: '%aprueba%' },
                            { [database_1.default.Sequelize.Op.like]: '%approve%' },
                            { [database_1.default.Sequelize.Op.like]: '%realiza%' },
                            { [database_1.default.Sequelize.Op.like]: '%perform%' }
                        ]
                    }
                }
            }],
    });
    // Si no se encontraron misiones con el filtro, intentar con todas las misiones activas
    if (userMissions.length === 0) {
        const allActiveMissions = await database_1.default.UserMission.findAll({
            where: { userId, isCompleted: false },
            include: [{
                    model: database_1.default.Mission,
                    as: 'mission',
                    where: { isActive: true }
                }],
        });
        for (const userMission of allActiveMissions) {
            // Incrementar progreso en 1
            userMission.progress += 1;
            // Verificar si la misión se completó
            if (userMission.progress >= userMission.mission.requiredCount) {
                userMission.isCompleted = true;
                userMission.completedAt = new Date();
            }
            await userMission.save();
        }
    }
    else {
        for (const userMission of userMissions) {
            // Incrementar progreso en 1
            userMission.progress += 1;
            // Verificar si la misión se completó
            if (userMission.progress >= userMission.mission.requiredCount) {
                userMission.isCompleted = true;
                userMission.completedAt = new Date();
            }
            await userMission.save();
        }
    }
};
exports.updateMissionProgressForActivity = updateMissionProgressForActivity;
const generateWeeklyMissions = async () => {
    await database_1.default.Mission.create({
        title: 'Completa y aprueba 30 actividades esta semana',
        description: 'Realiza y aprueba 30 actividades diferentes en la semana.',
        type: 'WEEKLY',
        requiredCount: 30,
        rewardType: 'COINS',
        rewardAmount: 50,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
};
exports.generateWeeklyMissions = generateWeeklyMissions;
const generateSpecialMissions = async () => {
    await database_1.default.Mission.create({
        title: 'Completa y aprueba 100 actividades en un mes',
        description: 'Realiza y aprueba 100 actividades diferentes en un mes.',
        type: 'SPECIAL',
        requiredCount: 100,
        rewardType: 'COINS',
        rewardAmount: 100,
        isActive: true,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
};
exports.generateSpecialMissions = generateSpecialMissions;
const generateMissions = async () => {
    await (0, exports.generateDailyMissions)();
    await (0, exports.generateWeeklyMissions)();
    await (0, exports.generateSpecialMissions)();
};
exports.generateMissions = generateMissions;
/**
 * Verificar y crear misiones si no existen
 */
const ensureMissionsExist = async () => {
    const missionCount = await database_1.default.Mission.count({ where: { isActive: true } });
    if (missionCount === 0) {
        await (0, exports.generateMissions)();
    }
};
exports.ensureMissionsExist = ensureMissionsExist;
/**
 * Limpiar misiones expiradas
 */
const cleanupExpiredMissions = async () => {
    try {
        const now = new Date();
        const expiredMissions = await database_1.default.Mission.update({ isActive: false }, {
            where: {
                isActive: true,
                endDate: { [database_1.default.Sequelize.Op.lt]: now }
            }
        });
        // opcional: podrías registrar métricas con un logger si fuera necesario
    }
    catch (error) {
        console.error("Error limpiando misiones expiradas:", error);
        throw error;
    }
};
exports.cleanupExpiredMissions = cleanupExpiredMissions;
