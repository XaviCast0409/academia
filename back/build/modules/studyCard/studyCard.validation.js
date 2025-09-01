"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendedValidation = exports.toggleFavoriteValidation = exports.getCardByIdValidation = exports.getStudyCardsValidation = exports.updateStudyCardValidation = exports.createStudyCardValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createStudyCardValidation = [
    (0, express_validator_1.body)("title")
        .notEmpty()
        .withMessage("El título es requerido")
        .isLength({ min: 3, max: 200 })
        .withMessage("El título debe tener entre 3 y 200 caracteres"),
    (0, express_validator_1.body)("question")
        .notEmpty()
        .withMessage("La pregunta es requerida")
        .isLength({ min: 10 })
        .withMessage("La pregunta debe tener al menos 10 caracteres"),
    (0, express_validator_1.body)("answer")
        .notEmpty()
        .withMessage("La respuesta es requerida")
        .isLength({ min: 5 })
        .withMessage("La respuesta debe tener al menos 5 caracteres"),
    (0, express_validator_1.body)("category")
        .isIn(["matematicas", "fisica", "quimica", "otros"])
        .withMessage("La categoría debe ser: matematicas, fisica, quimica u otros"),
    (0, express_validator_1.body)("mathTopic")
        .optional()
        .isIn(["algebra", "trigonometria", "geometria", "aritmetica", "razonamiento_matematico"])
        .withMessage("El tema matemático debe ser válido"),
    (0, express_validator_1.body)("subtopic")
        .optional()
        .isString()
        .isLength({ min: 2, max: 100 })
        .withMessage("El subtema debe tener entre 2 y 100 caracteres"),
    (0, express_validator_1.body)("difficulty")
        .isIn(["basico", "intermedio", "avanzado", "experto"])
        .withMessage("La dificultad debe ser: basico, intermedio, avanzado o experto"),
    (0, express_validator_1.body)("tags")
        .optional()
        .isArray()
        .withMessage("Los tags deben ser un array"),
    (0, express_validator_1.body)("tags.*")
        .optional()
        .isString()
        .withMessage("Cada tag debe ser una cadena de texto"),
    (0, express_validator_1.body)("hasLatex")
        .isBoolean()
        .withMessage("hasLatex debe ser un booleano"),
    (0, express_validator_1.body)("xavicoinsReward")
        .isInt({ min: 1, max: 100 })
        .withMessage("La recompensa debe ser un número entre 1 y 100"),
    (0, express_validator_1.body)("createdById")
        .optional()
        .isInt()
        .withMessage("El ID del creador debe ser un número entero")
];
exports.updateStudyCardValidation = [
    (0, express_validator_1.param)("id")
        .isInt()
        .withMessage("El ID debe ser un número entero"),
    (0, express_validator_1.body)("title")
        .optional()
        .isLength({ min: 3, max: 200 })
        .withMessage("El título debe tener entre 3 y 200 caracteres"),
    (0, express_validator_1.body)("question")
        .optional()
        .isLength({ min: 10 })
        .withMessage("La pregunta debe tener al menos 10 caracteres"),
    (0, express_validator_1.body)("answer")
        .optional()
        .isLength({ min: 5 })
        .withMessage("La respuesta debe tener al menos 5 caracteres"),
    (0, express_validator_1.body)("category")
        .optional()
        .isIn(["matematicas", "fisica", "quimica", "otros"])
        .withMessage("La categoría debe ser: matematicas, fisica, quimica u otros"),
    (0, express_validator_1.body)("mathTopic")
        .optional()
        .isIn(["algebra", "trigonometria", "geometria", "aritmetica", "razonamiento_matematico"])
        .withMessage("El tema matemático debe ser válido"),
    (0, express_validator_1.body)("difficulty")
        .optional()
        .isIn(["basico", "intermedio", "avanzado", "experto"])
        .withMessage("La dificultad debe ser: basico, intermedio, avanzado o experto"),
    (0, express_validator_1.body)("tags")
        .optional()
        .isArray()
        .withMessage("Los tags deben ser un array"),
    (0, express_validator_1.body)("hasLatex")
        .optional()
        .isBoolean()
        .withMessage("hasLatex debe ser un booleano"),
    (0, express_validator_1.body)("xavicoinsReward")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("La recompensa debe ser un número entre 1 y 100"),
    (0, express_validator_1.body)("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive debe ser un booleano")
];
exports.getStudyCardsValidation = [
    (0, express_validator_1.query)("category")
        .optional()
        .isIn(["matematicas", "fisica", "quimica", "otros"])
        .withMessage("La categoría debe ser válida"),
    (0, express_validator_1.query)("mathTopic")
        .optional()
        .isIn(["algebra", "trigonometria", "geometria", "aritmetica", "razonamiento_matematico"])
        .withMessage("El tema matemático debe ser válido"),
    (0, express_validator_1.query)("difficulty")
        .optional()
        .isIn(["basico", "intermedio", "avanzado", "experto"])
        .withMessage("La dificultad debe ser válida"),
    (0, express_validator_1.query)("search")
        .optional()
        .isString()
        .isLength({ min: 2 })
        .withMessage("La búsqueda debe tener al menos 2 caracteres"),
    (0, express_validator_1.query)("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("La página debe ser un número mayor a 0"),
    (0, express_validator_1.query)("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("El límite debe ser entre 1 y 100")
];
exports.getCardByIdValidation = [
    (0, express_validator_1.param)("id")
        .isInt()
        .withMessage("El ID debe ser un número entero")
];
exports.toggleFavoriteValidation = [
    (0, express_validator_1.param)("cardId")
        .isInt()
        .withMessage("El ID de la tarjeta debe ser un número entero")
];
exports.getRecommendedValidation = [
    (0, express_validator_1.query)("limit")
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage("El límite debe ser entre 1 y 50")
];
