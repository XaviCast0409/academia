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
exports.assignMissionsToUser = exports.updateUserStreak = exports.updateUserXaviCoins = exports.getUserStats = exports.loginUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = exports.getUser = void 0;
const database_1 = __importDefault(require("../../config/database"));
const validations_1 = require("../../utils/validations");
const error_1 = require("../../utils/error");
const mission_service_1 = require("../mission/mission.service");
const getUser = async (id) => {
    try {
        const user = await database_1.default.User.findByPk(id, {
            include: [
                { model: database_1.default.Role, as: "role" },
                { model: database_1.default.Pokemon, as: "pokemon" }
            ],
        });
        // Verificar que el usuario existe
        if (!user) {
            throw new error_1.UserNotFoundError(`User with id ${id} not found`);
        }
        return user;
    }
    catch (error) {
        throw new error_1.UserNotFoundError(`User with id ${id} not found`);
    }
};
exports.getUser = getUser;
const getUsers = async (page = 1, limit = 10, section, isActive, search) => {
    try {
        // Construir where clause
        const whereClause = {};
        if (section && section.trim() !== '') {
            whereClause.section = section;
        }
        if (isActive !== undefined && isActive !== null) {
            whereClause.isActive = isActive;
        }
        if (search && search.trim() !== '') {
            whereClause[database_1.default.Sequelize.Op.or] = [
                { name: { [database_1.default.Sequelize.Op.iLike]: `%${search}%` } },
                { email: { [database_1.default.Sequelize.Op.iLike]: `%${search}%` } },
                { section: { [database_1.default.Sequelize.Op.iLike]: `%${search}%` } }
            ];
        }
        // Obtener total de usuarios
        const total = await database_1.default.User.count({ where: whereClause });
        // Calcular offset
        const offset = (page - 1) * limit;
        // Obtener usuarios con paginación
        const users = await database_1.default.User.findAll({
            where: whereClause,
            include: [
                { model: database_1.default.Role, as: "role" },
                { model: database_1.default.Pokemon, as: "pokemon" }
            ],
            order: [["createdAt", "DESC"]],
            limit,
            offset
        });
        const totalPages = Math.ceil(total / limit);
        return {
            users,
            total,
            totalPages,
            currentPage: page
        };
    }
    catch (error) {
        console.error('Error in getUsers:', error);
        throw error;
    }
};
exports.getUsers = getUsers;
const createUser = async (name, email, password, roleId, pokemonId, section) => {
    // Verificar si el usuario ya existe
    const findUser = await database_1.default.User.findOne({ where: { email } });
    if (findUser) {
        throw new error_1.UserAlreadyExistsError(`User with email ${email} already exists`);
    }
    // Encriptar contraseña
    const encryptedPassword = await (0, validations_1.encrypt)(password);
    // Crear usuario con TODOS los campos del modelo inicializados correctamente
    const userData = {
        // Campos obligatorios
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: encryptedPassword,
        roleId,
        pokemonId,
        // Campos con valores por defecto según el modelo
        section: section?.trim() || "default",
        level: 1,
        experience: 0,
        xavicoints: 0,
        currentStreak: 0,
        lastLogin: null,
        completedActivities: 0,
        isActive: true,
        isVerified: false,
        verificationCode: null,
        verificationCodeExpires: null,
    };
    const user = await database_1.default.User.create(userData);
    // Asignar logros automáticamente al nuevo usuario
    try {
        const { assignAllAchievementsToUser } = await Promise.resolve().then(() => __importStar(require("../achievement/achievement.service")));
        await assignAllAchievementsToUser(user.id);
    }
    catch (error) {
        console.error("Error asignando logros al nuevo usuario:", error);
    }
    // Asignar misiones automáticamente al nuevo usuario
    try {
        await (0, mission_service_1.assignActiveMissionsToUser)(user.id);
    }
    catch (error) {
        console.error("Error asignando misiones al nuevo usuario:", error);
    }
    return user;
};
exports.createUser = createUser;
const updateUser = async (id, userData) => {
    const user = await database_1.default.User.findByPk(id);
    if (!user) {
        throw new error_1.UserNotFoundError(`User with id ${id} not found`);
    }
    if (userData.password) {
        userData.password = await (0, validations_1.encrypt)(userData.password);
    }
    await user.update(userData);
    return user;
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    const user = await database_1.default.User.destroy({ where: { id } });
    return user;
};
exports.deleteUser = deleteUser;
const loginUser = async (email, password) => {
    const user = await database_1.default.User.findOne({
        where: { email },
        include: [
            { model: database_1.default.Role, as: "role" },
            { model: database_1.default.Pokemon, as: "pokemon" }
        ]
    });
    if (!user) {
        throw new error_1.UserNotFoundError("Invalid credentials");
    }
    const isPasswordValid = await (0, validations_1.verified)(password, user.password);
    if (!isPasswordValid) {
        throw new error_1.UserNotFoundError("Invalid credentials");
    }
    // Actualizar streak automáticamente al hacer login
    try {
        await (0, exports.updateUserStreak)(user.id);
    }
    catch (error) {
        console.error("Error actualizando streak en login:", error);
    }
    const token = (0, validations_1.generateToken)(user.id, user.roleId, user.roleId);
    return { token, user };
};
exports.loginUser = loginUser;
/**
 * Obtener estadísticas completas del usuario
 */
const getUserStats = async (userId) => {
    try {
        const user = await database_1.default.User.findByPk(userId, {
            include: [
                { model: database_1.default.Role, as: "role" },
                { model: database_1.default.Pokemon, as: "pokemon" },
                {
                    model: database_1.default.UserAchievement,
                    as: "userAchievements",
                    include: [{ model: database_1.default.Achievement, as: "achievement" }]
                },
                {
                    model: database_1.default.UserMission,
                    as: "userMissions",
                    include: [{ model: database_1.default.Mission, as: "mission" }]
                }
            ]
        });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        // Calcular estadísticas de logros
        const unlockedAchievements = user.userAchievements?.filter((ua) => ua.isUnlocked) || [];
        const claimedAchievements = user.userAchievements?.filter((ua) => ua.rewardClaimed) || [];
        const pendingClaimAchievements = user.userAchievements?.filter((ua) => ua.isUnlocked && !ua.rewardClaimed) || [];
        // Calcular estadísticas de misiones
        const completedMissions = user.userMissions?.filter((um) => um.isCompleted) || [];
        const activeMissions = user.userMissions?.filter((um) => !um.isCompleted) || [];
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                level: user.level,
                experience: user.experience,
                xavicoints: user.xavicoints,
                section: user.section,
                currentStreak: user.currentStreak,
                completedActivities: user.completedActivities,
                lastLogin: user.lastLogin,
                isVerified: user.isVerified,
                role: user.role,
                pokemon: user.pokemon
            },
            achievements: {
                total: user.userAchievements?.length || 0,
                unlocked: unlockedAchievements.length,
                claimed: claimedAchievements.length,
                pendingClaim: pendingClaimAchievements.length
            },
            missions: {
                total: user.userMissions?.length || 0,
                completed: completedMissions.length,
                active: activeMissions.length
            }
        };
    }
    catch (error) {
        throw error;
    }
};
exports.getUserStats = getUserStats;
/**
 * Actualizar XaviCoins del usuario
 */
const updateUserXaviCoins = async (userId, amount, operation = 'add') => {
    try {
        const user = await database_1.default.User.findByPk(userId);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        const currentCoins = user.xavicoints || 0;
        let newCoins;
        if (operation === 'add') {
            newCoins = currentCoins + amount;
        }
        else {
            newCoins = Math.max(0, currentCoins - amount); // No permitir valores negativos
        }
        user.xavicoints = newCoins;
        await user.save();
        // Actualizar logros automáticamente si se agregaron monedas
        if (operation === 'add' && amount > 0) {
            try {
                const { updateProgressFromCoins } = await Promise.resolve().then(() => __importStar(require("../achievement/achievementProgress.service")));
                await updateProgressFromCoins(userId, newCoins);
            }
            catch (error) {
                console.error("Error actualizando logros por XaviCoins:", error);
            }
        }
        return {
            success: true,
            previousCoins: currentCoins,
            newCoins: newCoins,
            change: operation === 'add' ? amount : -amount
        };
    }
    catch (error) {
        throw error;
    }
};
exports.updateUserXaviCoins = updateUserXaviCoins;
/**
 * Actualizar streak del usuario y verificar logros
 */
const updateUserStreak = async (userId) => {
    try {
        const user = await database_1.default.User.findByPk(userId);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        const now = new Date();
        const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        // Si es la primera vez que inicia sesión hoy
        if (!lastLogin || lastLogin < today) {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            // Si el último login fue ayer, incrementar streak
            if (lastLogin && lastLogin >= yesterday) {
                user.currentStreak = (user.currentStreak || 0) + 1;
            }
            else {
                // Si no fue ayer, reiniciar streak
                user.currentStreak = 1;
            }
            // Actualizar último login
            user.lastLogin = now;
            await user.save();
            // Actualizar logros automáticamente
            const { updateProgressFromStreak } = await Promise.resolve().then(() => __importStar(require("../achievement/achievementProgress.service")));
            await updateProgressFromStreak(userId, user.currentStreak);
            return {
                success: true,
                currentStreak: user.currentStreak,
                lastLogin: user.lastLogin
            };
        }
        return {
            success: true,
            currentStreak: user.currentStreak,
            lastLogin: user.lastLogin,
            message: "Ya has iniciado sesión hoy"
        };
    }
    catch (error) {
        throw error;
    }
};
exports.updateUserStreak = updateUserStreak;
/**
 * Asignar misiones activas al usuario
 */
const assignMissionsToUser = async (userId) => {
    try {
        await (0, mission_service_1.assignActiveMissionsToUser)(userId);
        return {
            success: true,
            message: "Misiones asignadas correctamente"
        };
    }
    catch (error) {
        throw error;
    }
};
exports.assignMissionsToUser = assignMissionsToUser;
