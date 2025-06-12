"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeEvidenceStatusAndAddXavicoints = exports.getAvailableActivitiesForStudentPaginated = exports.getActivityById = exports.getActivityByProfessorAndStudent = exports.getActivityByStudent = exports.getActivityByProfessor = exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivities = exports.getActivity = void 0;
const database_1 = __importDefault(require("../../config/database"));
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
    if (!activity.title || !activity.description || !activity.images || !activity.xavicoints) {
        throw new Error("Title, description, pdfPath and xavicoints are required.");
    }
    const findActivity = await database_1.default.Activity.findOne({
        where: { title: activity.title },
    });
    if (findActivity) {
        throw new Error("Activity already exists.");
    }
    const newActivity = await database_1.default.Activity.create(activity);
    return newActivity;
};
exports.createActivity = createActivity;
const updateActivity = async (id, activity) => {
    if (!activity.title || !activity.description || !activity.images || !activity.xavicoints) {
        throw new Error("Title, description, pdfPath and xavicoints are required.");
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
const getActivityByProfessor = async (professorId) => {
    const activities = await database_1.default.Activity.findAll({
        where: { professorId },
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
const getAvailableActivitiesForStudentPaginated = async (studentId, page = 1, pageSize = 10) => {
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
    });
    // 3. Filtrar manualmente (porque no usaremos Op)
    const filteredActivities = allAvailableActivities.filter((activity) => {
        return !respondedActivityIds.includes(activity.id);
    });
    // 4. Paginar manualmente
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
            student.xavicoints = (student.xavicoints || 0) + activity.xavicoints;
            await student.save({ transaction });
        }
        // 🟢 Aquí retornamos el activity actualizado con sus evidencias
        const updatedActivity = await database_1.default.Activity.findByPk(actividadId, {
            include: [{ model: database_1.default.Evidence, as: "evidences" }], // Asegúrate de tener la asociación configurada
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
