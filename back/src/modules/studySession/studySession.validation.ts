import { body, query, param } from "express-validator";

export const startSessionValidation = [
  body("studyCardId")
    .optional()
    .isInt()
    .withMessage("El ID de la tarjeta debe ser un número entero"),
    
  body("sessionType")
    .optional()
    .isIn(["individual", "review", "quiz", "general"])
    .withMessage("El tipo de sesión debe ser: individual, review, quiz o general"),
    
  body("sessionGoal")
    .optional()
    .isInt({ min: 5, max: 180 })
    .withMessage("La meta de la sesión debe ser entre 5 y 180 minutos")
];

export const finishSessionValidation = [
  param("sessionId")
    .isInt()
    .withMessage("El ID de la sesión debe ser un número entero"),
    
  body("cardsStudied")
    .isInt({ min: 0 })
    .withMessage("El número de tarjetas estudiadas debe ser un número mayor o igual a 0"),
    
  body("notes")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("Las notas no pueden exceder 500 caracteres")
];

export const recordCardStudyValidation = [
  param("cardId")
    .isInt()
    .withMessage("El ID de la tarjeta debe ser un número entero"),
    
  body("sessionId")
    .optional()
    .isInt()
    .withMessage("El ID de la sesión debe ser un número entero")
];

export const getSessionHistoryValidation = [
  query("sessionType")
    .optional()
    .isIn(["individual", "review", "quiz", "general"])
    .withMessage("El tipo de sesión debe ser válido"),
    
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La página debe ser un número mayor a 0"),
    
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("El límite debe ser entre 1 y 100"),
    
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de inicio debe ser una fecha válida (ISO 8601)"),
    
  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de fin debe ser una fecha válida (ISO 8601)")
];

export const getStudyStatisticsValidation = [
  query("timeframe")
    .optional()
    .isIn(["week", "month", "year"])
    .withMessage("El marco de tiempo debe ser: week, month o year")
];
