"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudyStatisticsValidation = exports.getSessionHistoryValidation = exports.recordCardStudyValidation = exports.finishSessionValidation = exports.startSessionValidation = void 0;
const express_validator_1 = require("express-validator");
exports.startSessionValidation = [
    (0, express_validator_1.body)("studyCardId")
        .optional()
        .isInt()
        .withMessage("El ID de la tarjeta debe ser un número entero"),
    (0, express_validator_1.body)("sessionType")
        .optional()
        .isIn(["individual", "review", "quiz", "general"])
        .withMessage("El tipo de sesión debe ser: individual, review, quiz o general"),
    (0, express_validator_1.body)("sessionGoal")
        .optional()
        .isInt({ min: 5, max: 180 })
        .withMessage("La meta de la sesión debe ser entre 5 y 180 minutos")
];
exports.finishSessionValidation = [
    (0, express_validator_1.param)("sessionId")
        .isInt()
        .withMessage("El ID de la sesión debe ser un número entero"),
    (0, express_validator_1.body)("cardsStudied")
        .isInt({ min: 0 })
        .withMessage("El número de tarjetas estudiadas debe ser un número mayor o igual a 0"),
    (0, express_validator_1.body)("notes")
        .optional()
        .isString()
        .isLength({ max: 500 })
        .withMessage("Las notas no pueden exceder 500 caracteres")
];
exports.recordCardStudyValidation = [
    (0, express_validator_1.param)("cardId")
        .isInt()
        .withMessage("El ID de la tarjeta debe ser un número entero"),
    (0, express_validator_1.body)("sessionId")
        .optional()
        .isInt()
        .withMessage("El ID de la sesión debe ser un número entero")
];
exports.getSessionHistoryValidation = [
    (0, express_validator_1.query)("sessionType")
        .optional()
        .isIn(["individual", "review", "quiz", "general"])
        .withMessage("El tipo de sesión debe ser válido"),
    (0, express_validator_1.query)("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("La página debe ser un número mayor a 0"),
    (0, express_validator_1.query)("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("El límite debe ser entre 1 y 100"),
    (0, express_validator_1.query)("startDate")
        .optional()
        .isISO8601()
        .withMessage("La fecha de inicio debe ser una fecha válida (ISO 8601)"),
    (0, express_validator_1.query)("endDate")
        .optional()
        .isISO8601()
        .withMessage("La fecha de fin debe ser una fecha válida (ISO 8601)")
];
exports.getStudyStatisticsValidation = [
    (0, express_validator_1.query)("timeframe")
        .optional()
        .isIn(["week", "month", "year"])
        .withMessage("El marco de tiempo debe ser: week, month o year")
];
