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
exports.changeEvidenceStatusAndAddXavicoints = exports.getProfessorEvidences = exports.deleteEvidence = exports.updateEvidence = exports.createEvidence = exports.getEvidencesByActivity = exports.getEvidencesByStudent = exports.getEvidence = void 0;
const database_1 = __importDefault(require("../../config/database"));
const level_service_1 = require("../Level/level.service");
const socket_1 = require("../../realtime/socket");
const notification_service_1 = require("../notifications/notification.service");
const push_service_1 = require("../notifications/push.service");
const getEvidence = async (id) => {
    const evidence = await database_1.default.Evidence.findByPk(id, {
        include: [
            {
                model: database_1.default.User,
                as: "student",
                attributes: ["id", "name"],
            },
            {
                model: database_1.default.Activity,
                as: "activity",
                attributes: ["id", "title"],
            },
        ],
    });
    return evidence;
};
exports.getEvidence = getEvidence;
const getEvidencesByStudent = async (studentId, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const { rows: evidences, count: total } = await database_1.default.Evidence.findAndCountAll({
        where: { studentId },
        include: [
            {
                model: database_1.default.Activity,
                as: "activity",
                attributes: ["id", "title", "description"],
                include: [
                    {
                        model: database_1.default.User,
                        as: "professor",
                        attributes: ["id", "name"],
                    },
                ],
            },
        ],
        order: [
            [database_1.default.sequelize.literal(`CASE 
        WHEN "status" = 'pending' THEN 0
        WHEN "status" = 'approved' THEN 1
        WHEN "status" = 'rejected' THEN 2
      END`), 'ASC'],
            ['createdAt', 'ASC'],
        ],
        limit,
        offset,
    });
    return {
        evidences,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};
exports.getEvidencesByStudent = getEvidencesByStudent;
const getEvidencesByActivity = async (activityId, page, limit) => {
    const offset = (page - 1) * limit;
    const { rows: evidences, count: total } = await database_1.default.Evidence.findAndCountAll({
        where: { activityId },
        include: [
            {
                model: database_1.default.User,
                as: "student",
                attributes: ["id", "name", "email"],
            },
        ],
        order: [["createdAt", "DESC"]],
        limit,
        offset,
    });
    const formatted = evidences.map((e) => ({
        id: e.id,
        studentId: e.studentId,
        studentName: e.student?.name,
        studentEmail: e.student?.email,
        filePath: e.filePath,
        status: e.status,
        createdAt: e.createdAt,
        activityId: e.activityId,
        activityTitle: e.activity?.title,
        activityDescription: e.activity?.description,
        activityType: e.activity?.type,
    }));
    return {
        evidences: formatted,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};
exports.getEvidencesByActivity = getEvidencesByActivity;
const createEvidence = async (evidenceData) => {
    const evidence = await database_1.default.Evidence.create(evidenceData);
    return evidence;
};
exports.createEvidence = createEvidence;
const updateEvidence = async (id, evidenceData) => {
    const evidence = await database_1.default.Evidence.findByPk(id);
    if (!evidence) {
        throw new Error("Evidence not found");
    }
    await evidence.update(evidenceData);
    return evidence;
};
exports.updateEvidence = updateEvidence;
const deleteEvidence = async (id) => {
    const evidence = await database_1.default.Evidence.findByPk(id);
    if (!evidence) {
        throw new Error("Evidence not found");
    }
    await evidence.destroy();
};
exports.deleteEvidence = deleteEvidence;
const getProfessorEvidences = async (professorId, page = 1, limit = 10) => {
    // 1. Buscar actividades del profesor
    const activities = await database_1.default.Activity.findAll({
        where: { professorId },
        attributes: ["id"],
    });
    const activityIds = activities.map((a) => a.id);
    // 2. Paginación
    const offset = (page - 1) * limit;
    // 3. Evidencias con include, orden y paginado
    const { count, rows } = await database_1.default.Evidence.findAndCountAll({
        where: {
            activityId: activityIds,
        },
        include: [
            {
                model: database_1.default.User,
                as: "student",
                attributes: ["id", "name", "email"],
            },
            {
                model: database_1.default.Activity,
                as: "activity",
                attributes: ["id", "title", "xavicoints", "difficulty"],
            },
        ],
        order: [
            [database_1.default.sequelize.literal(`CASE 
        WHEN "status" = 'pending' THEN 0
        WHEN "status" = 'approved' THEN 1
        WHEN "status" = 'rejected' THEN 2
      END`), 'ASC'],
            ['createdAt', 'ASC'],
        ],
        limit,
        offset,
    });
    // 4. Respuesta paginada
    return {
        evidences: rows,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
    };
};
exports.getProfessorEvidences = getProfessorEvidences;
/**
 * Cambiar estado de evidencia y agregar XaviCoins al estudiante
 * También actualiza logros automáticamente
 */
const changeEvidenceStatusAndAddXavicoints = async (evidenceId, newStatus, professorId) => {
    const transaction = await database_1.default.sequelize.transaction();
    try {
        // 1. Buscar la evidencia con información del estudiante y actividad
        const evidence = await database_1.default.Evidence.findByPk(evidenceId, {
            include: [
                {
                    model: database_1.default.User,
                    as: "student",
                    attributes: ["id", "name", "xavicoints", "completedActivities"],
                },
                {
                    model: database_1.default.Activity,
                    as: "activity",
                    attributes: ["id", "title", "xavicoints", "mathTopic", "difficulty"],
                },
            ],
            transaction,
        });
        if (!evidence) {
            await transaction.rollback();
            throw new Error("Evidencia no encontrada");
        }
        // 2. Verificar que la actividad pertenece al profesor (uso correcto de where)
        const activity = await database_1.default.Activity.findOne({
            where: { id: evidence.activityId, professorId },
            transaction,
        });
        if (!activity) {
            await transaction.rollback();
            throw new Error("No tienes permisos para modificar esta evidencia");
        }
        // 3. Actualizar estado de la evidencia (evitar doble acreditación)
        const previousStatus = evidence.status;
        evidence.status = newStatus;
        await evidence.save({ transaction });
        // 4. Si se aprueba (y antes no estaba aprobada), otorgar XaviCoins y programar actualizaciones
        if (newStatus === "approved" && previousStatus !== "approved") {
            const student = evidence.student;
            const activityXavicoints = evidence.activity.xavicoints || 0;
            // Actualizar XaviCoins del estudiante
            student.xavicoints = (student.xavicoints || 0) + activityXavicoints;
            student.completedActivities = (student.completedActivities || 0) + 1;
            await student.save({ transaction });
            // Actualizar experiencia y nivel del estudiante
            await (0, level_service_1.addExperience)(student.id, evidence.activity.difficulty, transaction);
            // Agendar actualización de logros de forma asíncrona (fuera de la transacción)
            setImmediate(async () => {
                try {
                    const { updateAchievementProgressFromAction } = await Promise.resolve().then(() => __importStar(require("../achievement/achievementProgress.service")));
                    await updateAchievementProgressFromAction({
                        userId: student.id,
                        activityType: "math_activity",
                        mathTopic: evidence.activity.mathTopic,
                        xavicoinsEarned: activityXavicoints,
                    });
                }
                catch (err) {
                    console.error("[EVIDENCE SERVICE] Error actualizando logros asíncronamente:", err);
                }
            });
            // Agendar actualización de misiones de forma asíncrona (fuera de la transacción)
            setImmediate(async () => {
                try {
                    const { updateMissionProgressForActivity } = await Promise.resolve().then(() => __importStar(require("../mission/mission.service")));
                    await updateMissionProgressForActivity(student.id);
                }
                catch (err) {
                    console.error("[EVIDENCE SERVICE] Error actualizando misiones asíncronamente:", err);
                }
            });
        }
        await transaction.commit();
        // Emitir notificación realtime y persistir histórico después del commit
        try {
            const studentId = evidence.studentId;
            (0, socket_1.emitToUser)(studentId, 'evidence:statusChanged', {
                evidenceId: evidence.id,
                activityId: evidence.activityId,
                status: evidence.status,
                timestamp: new Date().toISOString(),
            });
        }
        catch { }
        try {
            await (0, notification_service_1.createNotification)({
                userId: evidence.studentId,
                type: 'evidence_status',
                title: `Evidencia ${evidence.status === 'approved' ? 'aprobada' : 'rechazada'}`,
                message: `Tu evidencia de la actividad ${evidence.activity?.title ?? evidence.activityId} fue ${evidence.status}.`,
                data: {
                    evidenceId: evidence.id,
                    activityId: evidence.activityId,
                    status: evidence.status,
                },
                isRead: false,
            });
        }
        catch { }
        // Enviar push al alumno afectado (si tiene token)
        try {
            const student = await database_1.default.User.findByPk(evidence.studentId, { attributes: ['pushToken'], raw: true });
            const token = student?.pushToken;
            if (token) {
                await (0, push_service_1.sendPushToTokens)([token], {
                    title: evidence.status === 'approved' ? 'Evidencia aprobada' : 'Evidencia rechazada',
                    body: `Actividad: ${evidence.activity?.title ?? evidence.activityId}`,
                    sound: 'default',
                    data: { type: 'evidence_status', evidenceId: evidence.id, activityId: evidence.activityId, status: evidence.status },
                });
            }
        }
        catch (err) {
            console.error('[PUSH] Error sending evidence push', err);
        }
        return {
            success: true,
            evidence: {
                id: evidence.id,
                status: evidence.status,
                studentId: evidence.studentId,
                activityId: evidence.activityId,
            },
            student: {
                id: evidence.student.id,
                name: evidence.student.name,
                xavicoints: evidence.student.xavicoints,
                completedActivities: evidence.student.completedActivities,
            },
        };
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
};
exports.changeEvidenceStatusAndAddXavicoints = changeEvidenceStatusAndAddXavicoints;
