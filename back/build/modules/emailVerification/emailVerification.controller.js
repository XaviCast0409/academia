"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVerificationController = exports.verifyCodeController = exports.sendVerificationCodeController = void 0;
const emailVerification_service_1 = require("./emailVerification.service");
const error_1 = require("../../utils/error");
const sendVerificationCodeController = async (req, res) => {
    try {
        const { email } = req.body;
        await emailVerification_service_1.emailVerificationService.sendVerificationCode(email);
        res.json({ message: "Código de verificación enviado" });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.sendVerificationCodeController = sendVerificationCodeController;
const verifyCodeController = async (req, res) => {
    try {
        const { email, code } = req.body;
        const isValid = await emailVerification_service_1.emailVerificationService.verifyCode(email, code);
        if (!isValid) {
            res.status(400).json({ message: "Código inválido o expirado" });
            return;
        }
        res.json({ message: "Código verificado correctamente" });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.verifyCodeController = verifyCodeController;
const checkVerificationController = async (req, res) => {
    try {
        const { email } = req.params;
        const isVerified = await emailVerification_service_1.emailVerificationService.isEmailVerified(email);
        res.json({ isVerified });
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.checkVerificationController = checkVerificationController;
