"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePushTokenController = exports.assignMissionsToUserController = exports.updateUserXaviCoinsController = exports.getUserStatsController = exports.updateUserStreakController = exports.verifyCodeController = exports.loginUserController = exports.deleteUserController = exports.updateUserStatusController = exports.updateUserController = exports.createUserController = exports.getUsersController = exports.getUserController = void 0;
const user_service_1 = require("./user.service");
const error_1 = require("../../utils/error");
const database_1 = __importDefault(require("../../config/database"));
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
const getUsersController = async (req, res) => {
    try {
        const { page = 1, limit = 10, section, isActive, search } = req.query;
        // Parse and validate parameters
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const sectionStr = section || undefined;
        const isActiveBool = isActive !== undefined ? isActive === 'true' : undefined;
        const searchStr = search || undefined;
        const result = await (0, user_service_1.getUsers)(pageNum, limitNum, sectionStr, isActiveBool, searchStr);
        res.json({
            success: true,
            data: result
        });
    }
    catch (error) {
        console.error('Error in getUsersController:', error);
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getUsersController = getUsersController;
const createUserController = async (req, res) => {
    try {
        const { name, email, password, roleId, pokemonId, section } = req.body;
        // Validaciones básicas
        if (!name || !email || !password) {
            res.status(400).json({
                error: "Los campos nombre, email y contraseña son obligatorios"
            });
            return;
        }
        if (!roleId || !pokemonId) {
            res.status(400).json({
                error: "Los campos roleId y pokemonId son obligatorios"
            });
            return;
        }
        const user = await (0, user_service_1.createUser)(name, email, password, roleId, pokemonId, section);
        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: user
        });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.createUserController = createUserController;
const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        const user = await (0, user_service_1.updateUser)(parseInt(id), userData);
        res.json(user);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.updateUserController = updateUserController;
const updateUserStatusController = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        if (typeof isActive !== 'boolean') {
            res.status(400).json({ error: 'isActive debe ser un valor booleano' });
            return;
        }
        const user = await (0, user_service_1.updateUser)(parseInt(id), { isActive });
        res.json({
            success: true,
            message: `Usuario ${isActive ? 'activado' : 'desactivado'} correctamente`,
            user
        });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.updateUserStatusController = updateUserStatusController;
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
        const { token, user } = await (0, user_service_1.loginUser)(email, password);
        res.status(200).json({ token, user });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.loginUserController = loginUserController;
const verifyCodeController = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await database_1.default.User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        if (user.isVerified) {
            res.status(400).json({ message: "El usuario ya está verificado" });
            return;
        }
        if (!user.verificationCode || !user.verificationCodeExpires) {
            res.status(400).json({ message: "Código de verificación no encontrado" });
            return;
        }
        if (user.verificationCodeExpires < new Date()) {
            res.status(400).json({ message: "Código de verificación expirado" });
            return;
        }
        if (user.verificationCode !== code) {
            res.status(400).json({ message: "Código de verificación incorrecto" });
            return;
        }
        user.isVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpires = null;
        await user.save();
        res.status(200).json({ message: "Usuario verificado correctamente" });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.verifyCodeController = verifyCodeController;
const updateUserStreakController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'userId es requerido' });
            return;
        }
        const result = await (0, user_service_1.updateUserStreak)(parseInt(id));
        res.status(200).json({
            success: true,
            data: result,
            message: 'Streak actualizado correctamente'
        });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.updateUserStreakController = updateUserStreakController;
const getUserStatsController = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ error: 'userId es requerido' });
            return;
        }
        const stats = await (0, user_service_1.getUserStats)(parseInt(userId));
        res.status(200).json({
            success: true,
            data: stats,
            message: 'Estadísticas obtenidas correctamente'
        });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getUserStatsController = getUserStatsController;
const updateUserXaviCoinsController = async (req, res) => {
    try {
        const { userId } = req.params;
        const { amount, operation = 'add' } = req.body;
        if (!userId || !amount) {
            res.status(400).json({ error: 'userId y amount son requeridos' });
            return;
        }
        if (operation !== 'add' && operation !== 'subtract') {
            res.status(400).json({ error: 'operation debe ser "add" o "subtract"' });
            return;
        }
        const result = await (0, user_service_1.updateUserXaviCoins)(parseInt(userId), Number(amount), operation);
        res.status(200).json({
            success: true,
            data: result,
            message: 'XaviCoins actualizadas correctamente'
        });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.updateUserXaviCoinsController = updateUserXaviCoinsController;
const assignMissionsToUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ error: 'userId es requerido' });
            return;
        }
        const result = await (0, user_service_1.assignMissionsToUser)(parseInt(userId));
        res.status(200).json({
            success: true,
            data: result,
            message: 'Misiones asignadas correctamente'
        });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.assignMissionsToUserController = assignMissionsToUserController;
const savePushTokenController = async (req, res) => {
    try {
        const { userId } = req.params;
        const { pushToken } = req.body;
        if (!pushToken) {
            res.status(400).json({ error: 'pushToken requerido' });
            return;
        }
        const user = await database_1.default.User.findByPk(Number(userId));
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        user.pushToken = pushToken;
        await user.save();
        res.status(200).json({ success: true });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.savePushTokenController = savePushTokenController;
