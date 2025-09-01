"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailVerification_controller_1 = require("./emailVerification.controller");
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../../middlewares/validateRequest");
const routerEmailVerification = (0, express_1.Router)();
routerEmailVerification.post("/send-code", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email inválido"),
], validateRequest_1.validateRequest, emailVerification_controller_1.sendVerificationCodeController);
routerEmailVerification.post("/verify-code", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email inválido"),
    (0, express_validator_1.body)("code").isLength({ min: 5, max: 5 }).withMessage("El código debe tener 5 dígitos"),
], validateRequest_1.validateRequest, emailVerification_controller_1.verifyCodeController);
routerEmailVerification.get("/check-verification/:email", emailVerification_controller_1.checkVerificationController);
exports.default = routerEmailVerification;
