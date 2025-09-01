"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.verified = exports.encrypt = void 0;
const bcryptjs_1 = require("bcryptjs");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = require("jsonwebtoken");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "toke.01010101";
const encrypt = async (pass) => {
    const passHash = await (0, bcryptjs_1.hash)(pass, 8);
    return passHash;
};
exports.encrypt = encrypt;
const verified = async (pass, passHash) => {
    const isCorrect = await (0, bcryptjs_1.compare)(pass, passHash);
    return isCorrect;
};
exports.verified = verified;
const generateToken = (id, roleId, idRole) => {
    const jwt = (0, jsonwebtoken_1.sign)({ id, roleId, idRole }, JWT_SECRET, {
        expiresIn: "2h",
    });
    return jwt;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    const decoded = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
    return decoded;
};
exports.verifyToken = verifyToken;
