"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvidence = exports.updateEvidence = exports.createEvidence = exports.getEvidencesByActivity = exports.getEvidencesByStudent = exports.getEvidence = void 0;
const database_1 = __importDefault(require("../../config/database"));
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
const getEvidencesByStudent = async (studentId) => {
    const evidences = await database_1.default.Evidence.findAll({
        where: { studentId },
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
    return evidences;
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
