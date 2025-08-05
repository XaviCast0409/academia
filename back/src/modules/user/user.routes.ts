import { Router } from "express";
import {
    getUserController,
    getUsersController,
    createUserController,
    updateUserController,
    deleteUserController,
    loginUserController,
    verifyCodeController,
    updateUserStreakController,
    getUserStatsController,
    updateUserXaviCoinsController,
    assignMissionsToUserController
} from "./user.controller";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";

const routerUser = Router();

routerUser.get("/", getUsersController);
routerUser.get("/byId/:id", getUserController);

// Ruta para crear usuario con validaciones completas
routerUser.post(
  "/create",
  [
    body("name")
      .isLength({ min: 2, max: 100 })
      .withMessage("El nombre debe tener entre 2 y 100 caracteres")
      .trim(),
    body("email")
      .isEmail()
      .withMessage("Email inválido")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("roleId")
      .isInt({ min: 1 })
      .withMessage("roleId debe ser un número entero positivo"),
    body("pokemonId")
      .isInt({ min: 1 })
      .withMessage("pokemonId debe ser un número entero positivo"),
    body("section")
      .optional()
      .isLength({ min: 1, max: 50 })
      .withMessage("La sección debe tener entre 1 y 50 caracteres")
      .trim(),
  ],
  validateRequest,
  createUserController
);
routerUser.put("/:id", updateUserController);
routerUser.delete("/:id", deleteUserController);
routerUser.post("/login", loginUserController);

// Ruta para verificar código
routerUser.post(
  "/verify-code",
  [
    body("email").isEmail().withMessage("Email inválido"),
    body("code").isLength({ min: 5, max: 5 }).withMessage("El código debe tener 5 dígitos"),
  ],
  validateRequest,
  verifyCodeController
);

// Ruta para actualizar streak del usuario
routerUser.post("/streak/:userId", updateUserStreakController);

// Ruta para obtener estadísticas del usuario
routerUser.get("/stats/:userId", getUserStatsController);

// Ruta para actualizar XaviCoins del usuario
routerUser.post("/xavicoins/:userId", updateUserXaviCoinsController);

// Ruta para asignar misiones al usuario
routerUser.post("/missions/:userId", assignMissionsToUserController);

export default routerUser;

