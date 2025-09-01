"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerificationService = void 0;
const database_1 = __importDefault(require("../../config/database"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sequelize_1 = require("sequelize");
class EmailVerificationService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    generateVerificationCode() {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }
    async sendVerificationCode(email) {
        // Delete any existing unused codes for this email
        await database_1.default.VerificationCode.destroy({
            where: {
                email,
                isUsed: false,
            },
        });
        const code = this.generateVerificationCode();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
        await database_1.default.VerificationCode.create({
            email,
            code,
            expiresAt,
            isUsed: false,
        });
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: "Código de verificación - Academia",
            html: `
        <h1>Verificación de correo electrónico</h1>
        <p>Tu código de verificación es: <strong>${code}</strong></p>
        <p>Este código expirará en 15 minutos.</p>
        <p>Si no solicitaste este código, por favor ignora este correo.</p>
      `,
        });
    }
    async verifyCode(email, code) {
        const verificationCode = await database_1.default.VerificationCode.findOne({
            where: {
                email,
                code,
                isUsed: false,
                expiresAt: {
                    [sequelize_1.Op.gt]: new Date(),
                },
            },
        });
        if (!verificationCode) {
            return false;
        }
        await verificationCode.update({ isUsed: true });
        return true;
    }
    async isEmailVerified(email) {
        const verificationCode = await database_1.default.VerificationCode.findOne({
            where: {
                email,
                isUsed: true,
            },
            order: [["createdAt", "DESC"]],
        });
        return !!verificationCode;
    }
}
exports.emailVerificationService = new EmailVerificationService();
