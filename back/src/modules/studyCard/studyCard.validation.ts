import { body, query, param } from "express-validator";

export const createStudyCardValidation = [
  body("title")
    .notEmpty()
    .withMessage("El título es requerido")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),
    
  body("question")
    .notEmpty()
    .withMessage("La pregunta es requerida")
    .isLength({ min: 10 })
    .withMessage("La pregunta debe tener al menos 10 caracteres"),
    
  body("answer")
    .notEmpty()
    .withMessage("La respuesta es requerida")
    .isLength({ min: 5 })
    .withMessage("La respuesta debe tener al menos 5 caracteres"),
    
  body("category")
    .isIn(["matematicas", "fisica", "quimica", "otros"])
    .withMessage("La categoría debe ser: matematicas, fisica, quimica u otros"),
    
  body("mathTopic")
    .optional()
    .isIn(["algebra", "trigonometria", "geometria", "aritmetica", "razonamiento_matematico"])
    .withMessage("El tema matemático debe ser válido"),
    
  body("subtopic")
    .optional()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage("El subtema debe tener entre 2 y 100 caracteres"),
    
  body("difficulty")
    .isIn(["basico", "intermedio", "avanzado", "experto"])
    .withMessage("La dificultad debe ser: basico, intermedio, avanzado o experto"),
    
  body("tags")
    .optional()
    .isArray()
    .withMessage("Los tags deben ser un array"),
    
  body("tags.*")
    .optional()
    .isString()
    .withMessage("Cada tag debe ser una cadena de texto"),
    
  body("hasLatex")
    .isBoolean()
    .withMessage("hasLatex debe ser un booleano"),
    
  body("xavicoinsReward")
    .isInt({ min: 1, max: 100 })
    .withMessage("La recompensa debe ser un número entre 1 y 100"),
    
  body("createdById")
    .optional()
    .isInt()
    .withMessage("El ID del creador debe ser un número entero")
];

export const updateStudyCardValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero"),
    
  body("title")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),
    
  body("question")
    .optional()
    .isLength({ min: 10 })
    .withMessage("La pregunta debe tener al menos 10 caracteres"),
    
  body("answer")
    .optional()
    .isLength({ min: 5 })
    .withMessage("La respuesta debe tener al menos 5 caracteres"),
    
  body("category")
    .optional()
    .isIn(["matematicas", "fisica", "quimica", "otros"])
    .withMessage("La categoría debe ser: matematicas, fisica, quimica u otros"),
    
  body("mathTopic")
    .optional()
    .isIn(["algebra", "trigonometria", "geometria", "aritmetica", "razonamiento_matematico"])
    .withMessage("El tema matemático debe ser válido"),
    
  body("difficulty")
    .optional()
    .isIn(["basico", "intermedio", "avanzado", "experto"])
    .withMessage("La dificultad debe ser: basico, intermedio, avanzado o experto"),
    
  body("tags")
    .optional()
    .isArray()
    .withMessage("Los tags deben ser un array"),
    
  body("hasLatex")
    .optional()
    .isBoolean()
    .withMessage("hasLatex debe ser un booleano"),
    
  body("xavicoinsReward")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("La recompensa debe ser un número entre 1 y 100"),
    
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive debe ser un booleano")
];

export const getStudyCardsValidation = [
  query("category")
    .optional()
    .isIn(["matematicas", "fisica", "quimica", "otros"])
    .withMessage("La categoría debe ser válida"),
    
  query("mathTopic")
    .optional()
    .isIn(["algebra", "trigonometria", "geometria", "aritmetica", "razonamiento_matematico"])
    .withMessage("El tema matemático debe ser válido"),
    
  query("difficulty")
    .optional()
    .isIn(["basico", "intermedio", "avanzado", "experto"])
    .withMessage("La dificultad debe ser válida"),
    
  query("search")
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage("La búsqueda debe tener al menos 2 caracteres"),
    
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La página debe ser un número mayor a 0"),
    
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("El límite debe ser entre 1 y 100")
];

export const getCardByIdValidation = [
  param("id")
    .isInt()
    .withMessage("El ID debe ser un número entero")
];

export const toggleFavoriteValidation = [
  param("cardId")
    .isInt()
    .withMessage("El ID de la tarjeta debe ser un número entero")
];

export const getRecommendedValidation = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("El límite debe ser entre 1 y 50")
];
