"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvidencesByActivityController = exports.deleteEvidenceController = exports.updateEvidenceController = exports.createEvidenceController = exports.getEvidenceController = void 0;
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
