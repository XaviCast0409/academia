"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeEvidenceStatusAndAddXavicoints = exports.getAvailableActivitiesForStudentPaginated = exports.getActivityById = exports.getActivityByProfessorAndStudent = exports.getActivityByStudent = exports.getActivityByProfessor = exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivities = exports.getActivity = void 0;
const database_1 = __importDefault(require("../../config/database"));
const level_service_1 = require("../Level/level.service");
const mission_service_1 = require("../mission/mission.service");
const socket_1 = require("../../realtime/socket");
const push_service_1 = require("../notifications/push.service");
const getActivity = async (id) => {
    const activity = await database_1.default.Activity.findByPk(id, {
        include: [
            {
                model: database_1.default.User,
                as: "professor",
                attributes: ["id", "name"],
            },
        ],
    });
    return activity;
};
exports.getActivity = getActivity;
const getActivities = async () => {
    const activities = await database_1.default.Activity.findAll({
        include: [
            {
                model: database_1.default.User,
                as: "professor",
                attributes: ["id", "name"],
            },
        ],
    });
    return activities;
};
exports.getActivities = getActivities;
const createActivity = async (activity) => {
    if (!activity.title || !activity.description || !activity.xavicoints || !activity.professorId) {
        throw new Error("Title, description, and xavicoints are required.");
    }
    const newActivity = await database_1.default.Activity.create(activity);
    // Emitir evento realtime y crear notificación global
    try {
        (0, socket_1.emitToAll)('activity:created', {
            id: newActivity.id,
            title: newActivity.title,
            section: newActivity.section,
            professorId: newActivity.professorId,
            createdAt: newActivity.createdAt,
        });
    }
    catch { }
    try {
        // Crear notificaciones por usuario para garantizar que aparezcan en el historial
        const users = await database_1.default.User.findAll({ attributes: ['id'], raw: true });
        if (users && users.length > 0) {
            const notifications = users.map((u) => ({
                userId: u.id,
                type: 'activity_created',
                title: 'Nueva actividad',
                message: `${newActivity.title}`,
                data: {
                    activityId: newActivity.id,
                    section: newActivity.section,
                    professorId: newActivity.professorId,
                },
                isRead: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            }));
            await database_1.default.Notification.bulkCreate(notifications, { validate: false });
        }
    }
    catch { }
    // Enviar push a todos los usuarios (si tienen token registrado)
    try {
        const users = await database_1.default.User.findAll({ attributes: ['id', 'pushToken'], raw: true });
        const tokens = users.map((u) => u.pushToken).filter(Boolean);
        if (tokens.length) {
            await (0, push_service_1.sendPushToTokens)(tokens, {
                title: 'Nueva actividad',
                body: newActivity.title,
                sound: 'default',
                data: { type: 'activity_created', activityId: newActivity.id },
            });
        }
    }
    catch (err) {
        console.error('[PUSH] Error sending activity push', err);
    }
    return newActivity;
};
exports.createActivity = createActivity;
const updateActivity = async (id, activity) => {
    if (!activity.title || !activity.description || !activity.xavicoints) {
        throw new Error("Title, description, and xavicoints are required.");
    }
    const findActivity = await database_1.default.Activity.findByPk(id);
    if (!findActivity) {
        throw new Error("Activity not found.");
    }
    const updatedActivity = await database_1.default.Activity.update(activity, {
        where: { id },
    });
    return updatedActivity;
};
exports.updateActivity = updateActivity;
const deleteActivity = async (id) => {
    const activity = await database_1.default.Activity.destroy({ where: { id } });
    return activity;
};
exports.deleteActivity = deleteActivity;
const getActivityByProfessor = async (professorId, page = 1, pageSize = 10, section) => {
    const offset = (page - 1) * pageSize;
    // Construir las condiciones de where
    const whereConditions = { professorId };
    if (section) {
        whereConditions.section = section;
    }
    // Obtener el total de actividades que coinciden con los filtros
    const total = await database_1.default.Activity.count({
        where: whereConditions,
    });
    // Obtener las actividades paginadas y ordenadas por fecha de creación
    const activities = await database_1.default.Activity.findAll({
        where: whereConditions,
        include: [
            {
                model: database_1.default.User,
                as: "professor",
                attributes: ["id", "name"],
            },
        ],
        order: [['createdAt', 'DESC']], // Ordenar por fecha de creación descendente (más recientes primero)
        limit: pageSize,
        offset: offset,
    });
    return {
        activities,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / pageSize),
        pageSize,
    };
};
exports.getActivityByProfessor = getActivityByProfessor;
const getActivityByStudent = async (studentId) => {
    const activities = await database_1.default.Activity.findAll({
        include: [
            {
                model: database_1.default.User,
                as: "professor",
                attributes: ["id", "name"],
            },
            {
                model: database_1.default.Evidence,
                as: "evidences",
                where: { studentId },
            },
        ],
    });
    return activities;
};
exports.getActivityByStudent = getActivityByStudent;
const getActivityByProfessorAndStudent = async (professorId, studentId) => {
    const activities = await database_1.default.Activity.findAll({
        where: { professorId },
        include: [
            {
                model: database_1.default.User,
                as: "professor",
                attributes: ["id", "name"],
            },
            {
                model: database_1.default.Evidence,
                as: "evidences",
                where: { studentId },
            },
        ],
    });
    return activities;
};
exports.getActivityByProfessorAndStudent = getActivityByProfessorAndStudent;
const getActivityById = async (id) => {
    const activity = await database_1.default.Activity.findByPk(id, {
        include: [
            {
                model: database_1.default.User,
                as: "professor",
                attributes: ["id", "name"],
            },
            {
                model: database_1.default.Evidence,
                as: "evidences",
            },
        ],
    });
    return activity;
};
exports.getActivityById = getActivityById;
const getAvailableActivitiesForStudentPaginated = async (studentId, page = 1, pageSize = 10, section) => {
    const offset = (page - 1) * pageSize;
    // 1. Obtener IDs de actividades ya respondidas por el estudiante
    const evidences = await database_1.default.Evidence.findAll({
        where: { studentId },
        attributes: ["activityId"],
    });
    const respondedActivityIds = evidences.map((evidence) => evidence.activityId);
    // 2. Obtener actividades que NO estén en respondedActivityIds
    const allAvailableActivities = await database_1.default.Activity.findAll({
        include: [
            {
                model: database_1.default.User,
                as: "professor",
                attributes: ["id", "name", "email"],
            },
        ],
        order: [["createdAt", "DESC"]]
    });
    // 3. Filtrar manualmente (porque no usaremos Op)
    let filteredActivities = allAvailableActivities.filter((activity) => {
        return !respondedActivityIds.includes(activity.id);
    });
    // 4. Aplicar filtro por sección si se proporciona
    if (section) {
        filteredActivities = filteredActivities.filter((activity) => {
            return activity.section === section;
        });
    }
    // 5. Paginar manualmente
    const paginatedActivities = filteredActivities.slice(offset, offset + pageSize);
    return {
        total: filteredActivities.length,
        currentPage: page,
        totalPages: Math.ceil(filteredActivities.length / pageSize),
        pageSize,
        activities: paginatedActivities,
    };
};
exports.getAvailableActivitiesForStudentPaginated = getAvailableActivitiesForStudentPaginated;
const changeEvidenceStatusAndAddXavicoints = async (evidenceId, status, actividadId) => {
    const transaction = await database_1.default.sequelize.transaction();
    try {
        const evidence = await database_1.default.Evidence.findByPk(evidenceId, { transaction });
        if (!evidence) {
            throw new Error("Evidence not found.");
        }
        evidence.status = status;
        await evidence.save({ transaction });
        if (status === "approved") {
            const activity = await database_1.default.Activity.findByPk(actividadId, { transaction });
            if (!activity)
                throw new Error("Activity not found.");
            const student = await database_1.default.User.findByPk(evidence.studentId, { transaction });
            if (!student)
                throw new Error("Student not found.");
            // Añadir xavicoints
            student.xavicoints = (student.xavicoints || 0) + activity.xavicoints;
            student.completedActivities = (student.completedActivities || 0) + 1;
            await student.save({ transaction });
            // Añadir experiencia y actualizar nivel
            await (0, level_service_1.addExperience)(student.id, activity.difficulty, transaction);
            // Actualizar progreso de misiones relacionadas (no bloqueante)
            setImmediate(() => {
                (0, mission_service_1.updateMissionProgressForActivity)(student.id)
                    .catch((err) => console.error('Error updating mission progress:', err));
            });
            // Actualizar logros automáticamente (no bloqueante)
            setImmediate(async () => {
                try {
                    const { updateAchievementProgressFromAction } = await Promise.resolve().then(() => __importStar(require("../achievement/achievementProgress.service")));
                    await updateAchievementProgressFromAction({
                        userId: student.id,
                        activityType: "math_activity",
                        mathTopic: activity.mathTopic,
                        xavicoinsEarned: activity.xavicoints,
                    });
                }
                catch (error) {
                    console.error('Error updating achievement progress:', error);
                }
            });
        }
        // Obtener actividad actualizada con sus evidencias
        const updatedActivity = await database_1.default.Activity.findByPk(actividadId, {
            include: [
                {
                    model: database_1.default.Evidence,
                    as: "evidences",
                    include: [
                        {
                            model: database_1.default.Activity,
                            as: "activity",
                            attributes: ["id", "title", "xavicoints", "difficulty"]
                        },
                        {
                            model: database_1.default.User,
                            as: "student",
                            attributes: ["id", "name", "level", "experience", "xavicoints"]
                        }
                    ]
                }
            ],
            transaction,
        });
        await transaction.commit();
        if (!updatedActivity)
            throw new Error("Failed to retrieve updated activity.");
        return updatedActivity;
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
};
exports.changeEvidenceStatusAndAddXavicoints = changeEvidenceStatusAndAddXavicoints;
