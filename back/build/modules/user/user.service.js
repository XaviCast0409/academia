"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = exports.getUser = void 0;
const database_1 = __importDefault(require("../../config/database"));
const validations_1 = require("../../utils/validations");
const getUser = async (id) => {
    try {
        const user = await database_1.default.User.findByPk(id, {
            include: [
                { model: database_1.default.Role, as: "role" },
                { model: database_1.default.Pokemon, as: "pokemon" }
            ],
        });
        return user;
    }
    catch (error) {
        throw new Error("User not found");
    }
};
exports.getUser = getUser;
const getUsers = async () => {
    const users = await database_1.default.User.findAll({ include: database_1.default.Role });
    return users;
};
exports.getUsers = getUsers;
const createUser = async (name, email, password, roleId, pokemonId // opcional si no se requiere al crear
) => {
    const findUser = await database_1.default.User.findOne({ where: { email } });
    if (findUser) {
        throw new Error("User already exists");
    }
    password = await (0, validations_1.encrypt)(password);
    const user = await database_1.default.User.create({ name, email, password, roleId, pokemonId });
    return user;
};
exports.createUser = createUser;
const updateUser = async (id, name, email, password, roleId) => {
    password = await (0, validations_1.encrypt)(password);
    const user = await database_1.default.User.update({ name, email, password, roleId }, { where: { id }, include: database_1.default.Role });
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
        throw new Error("User not found");
    }
    const isCorrect = await (0, validations_1.verified)(password, user.password);
    if (!isCorrect) {
        throw new Error("Incorrect password");
    }
    const token = (0, validations_1.generateToken)(user.id, user.roleId, user.role.id); // ahora pasas el roleId también
    return { token, user: user.toJSON() }; // Devuelve el token y el usuario como JSON
};
exports.loginUser = loginUser;
