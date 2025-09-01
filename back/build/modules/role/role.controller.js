"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleController = exports.updateRoleController = exports.createRoleController = exports.getRolesController = exports.getRoleController = void 0;
const role_service_1 = require("./role.service");
const error_1 = require("../../utils/error");
const getRoleController = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await (0, role_service_1.getRole)(parseInt(id));
        res.status(200).json(role);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getRoleController = getRoleController;
const getRolesController = async (_req, res) => {
    try {
        const roles = await (0, role_service_1.getRoles)();
        res.status(200).json(roles); // Cambié el código a 200.
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getRolesController = getRolesController;
const createRoleController = async (req, res) => {
    try {
        const { name } = req.body;
        const role = await (0, role_service_1.createRole)(name);
        res.status(201).json(role);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.createRoleController = createRoleController;
const updateRoleController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const role = await (0, role_service_1.updateRole)(parseInt(id), name);
        res.status(200).json(role); // Cambié el código a 200.
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.updateRoleController = updateRoleController;
const deleteRoleController = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await (0, role_service_1.deleteRole)(parseInt(id));
        res.status(200).json(role); // Cambié el código a 200.
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.deleteRoleController = deleteRoleController;
