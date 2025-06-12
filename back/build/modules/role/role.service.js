"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoles = exports.getRole = void 0;
const database_1 = __importDefault(require("../../config/database"));
const getRole = async (id) => {
    const role = await database_1.default.Role.findByPk(id);
    return role;
};
exports.getRole = getRole;
const getRoles = async () => {
    const roles = await database_1.default.Role.findAll();
    return roles;
};
exports.getRoles = getRoles;
const createRole = async (name) => {
    if (!name) {
        throw new Error("Name is required.");
    }
    const findRole = await database_1.default.Role.findOne({ where: { name } });
    if (findRole) {
        throw new Error("Role already exists.");
    }
    const role = await database_1.default.Role.create({ name });
    return role;
};
exports.createRole = createRole;
const updateRole = async (id, name) => {
    if (!name) {
        throw new Error("Name is required.");
    }
    const role = await database_1.default.Role.update({ name }, { where: { id } });
    return role;
};
exports.updateRole = updateRole;
const deleteRole = async (id) => {
    const role = await database_1.default.Role.destroy({ where: { id } });
    return role;
};
exports.deleteRole = deleteRole;
