"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeEvidenceStatusController = exports.getEvidencesByStudentController = exports.getProfessorEvidencesController = exports.getEvidencesByActivityController = exports.deleteEvidenceController = exports.updateEvidenceController = exports.createEvidenceController = exports.getEvidenceController = void 0;
const evidence_service_1 = require("./evidence.service");
const error_1 = require("../../utils/error");
const getEvidenceController = async (req, res) => {
    try {
        const { id } = req.params;
        const evidence = await (0, evidence_service_1.getEvidence)(parseInt(id));
        res.status(200).json(evidence);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getEvidenceController = getEvidenceController;
const createEvidenceController = async (req, res) => {
    try {
        const evidenceData = req.body;
        const evidence = await (0, evidence_service_1.createEvidence)(evidenceData);
        res.status(201).json(evidence);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.createEvidenceController = createEvidenceController;
const updateEvidenceController = async (req, res) => {
    try {
        const { id } = req.params;
        const evidenceData = req.body;
        const evidence = await (0, evidence_service_1.updateEvidence)(parseInt(id), evidenceData);
        res.status(200).json(evidence);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.updateEvidenceController = updateEvidenceController;
const deleteEvidenceController = async (req, res) => {
    try {
        const { id } = req.params;
        await (0, evidence_service_1.deleteEvidence)(parseInt(id));
        res.status(204).send();
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.deleteEvidenceController = deleteEvidenceController;
const getEvidencesByActivityController = async (req, res) => {
    try {
        const { activityId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const evidences = await (0, evidence_service_1.getEvidencesByActivity)(parseInt(activityId), Number(page), Number(limit));
        res.status(200).json(evidences);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getEvidencesByActivityController = getEvidencesByActivityController;
const getProfessorEvidencesController = async (req, res) => {
    try {
        const { professorId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const evidences = await (0, evidence_service_1.getProfessorEvidences)(parseInt(professorId), pageNum, limitNum);
        res.status(200).json(evidences);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getProfessorEvidencesController = getProfessorEvidencesController;
const getEvidencesByStudentController = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const evidences = await (0, evidence_service_1.getEvidencesByStudent)(parseInt(studentId), Number(page), Number(limit));
        res.status(200).json(evidences);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getEvidencesByStudentController = getEvidencesByStudentController;
const changeEvidenceStatusController = async (req, res) => {
    try {
        const { evidenceId } = req.params;
        const { status, professorId } = req.body;
        if (!status || !professorId) {
            res.status(400).json({ error: 'status y professorId son requeridos' });
            return;
        }
        if (status !== 'approved' && status !== 'rejected') {
            res.status(400).json({ error: 'status debe ser "approved" o "rejected"' });
            return;
        }
        const result = await (0, evidence_service_1.changeEvidenceStatusAndAddXavicoints)(parseInt(evidenceId), status, parseInt(professorId));
        res.status(200).json({
            success: true,
            data: result,
            message: `Evidencia ${status === 'approved' ? 'aprobada' : 'rechazada'} correctamente`
        });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.changeEvidenceStatusController = changeEvidenceStatusController;
