"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUsersController = exports.getUserController = void 0;
const user_service_1 = require("./user.service");
const error_1 = require("../../utils/error");
const getUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, user_service_1.getUser)(parseInt(id));
        res.status(200).json(user);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getUserController = getUserController;
const getUsersController = async (_req, res) => {
    try {
        const users = await (0, user_service_1.getUsers)();
        res.json(users);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getUsersController = getUsersController;
const createUserController = async (req, res) => {
    try {
        const { name, email, password, roleId, pokemonId } = req.body;
        const user = await (0, user_service_1.createUser)(name, email, password, roleId, pokemonId);
        res.json(user);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.createUserController = createUserController;
const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, roleId } = req.body;
        const user = await (0, user_service_1.updateUser)(parseInt(id), name, email, password, roleId);
        res.json(user);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.updateUserController = updateUserController;
const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, user_service_1.deleteUser)(parseInt(id));
        res.json(user);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.deleteUserController = deleteUserController;
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await (0, user_service_1.loginUser)(email, password);
        res.json({ token });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.loginUserController = loginUserController;
