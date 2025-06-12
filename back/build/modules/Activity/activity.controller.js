"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeEvidenceStatusAndAddXavicointsController = exports.getAvailableActivitiesForStudentPaginatedController = exports.deleteActivityController = exports.updateActivityController = exports.createActivityController = exports.getActivitiesController = exports.getActivityController = void 0;
const activity_service_1 = require("./activity.service");
const error_1 = require("../../utils/error");
const getActivityController = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await (0, activity_service_1.getActivity)(parseInt(id));
        res.status(200).json(activity);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getActivityController = getActivityController;
const getActivitiesController = async (_req, res) => {
    try {
        const activities = await (0, activity_service_1.getActivities)();
        res.status(200).json(activities);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getActivitiesController = getActivitiesController;
const createActivityController = async (req, res) => {
    try {
        const { title, description, xavicoints, images, professorId } = req.body;
        const activity = await (0, activity_service_1.createActivity)({
            title,
            description,
            images,
            xavicoints,
            professorId,
        });
        res.status(201).json(activity);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.createActivityController = createActivityController;
const updateActivityController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, xavicoints, images } = req.body;
        const { professorId } = req.body;
        const activity = await (0, activity_service_1.updateActivity)(parseInt(id), {
            title,
            description,
            images,
            xavicoints,
            professorId,
        });
        res.status(200).json(activity);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.updateActivityController = updateActivityController;
const deleteActivityController = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await (0, activity_service_1.deleteActivity)(parseInt(id));
        res.status(200).json(activity);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.deleteActivityController = deleteActivityController;
const getAvailableActivitiesForStudentPaginatedController = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const studentId = req.params.studentId;
        const activities = await (0, activity_service_1.getAvailableActivitiesForStudentPaginated)(Number(studentId), parseInt(page), parseInt(limit));
        res.status(200).json(activities);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getAvailableActivitiesForStudentPaginatedController = getAvailableActivitiesForStudentPaginatedController;
const changeEvidenceStatusAndAddXavicointsController = async (req, res) => {
    try {
        const { activityId } = req.params;
        const { evidenceId, status } = req.body;
        const updatedEvidence = await (0, activity_service_1.changeEvidenceStatusAndAddXavicoints)(evidenceId, status, parseInt(activityId));
        res.status(200).json(updatedEvidence);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.changeEvidenceStatusAndAddXavicointsController = changeEvidenceStatusAndAddXavicointsController;
