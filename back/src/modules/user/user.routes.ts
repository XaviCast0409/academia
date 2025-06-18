import { Router } from "express";
import {
    getUserController,
    getUsersController,
    createUserController,
    updateUserController,
    deleteUserController,
    loginUserController,
    verifyCodeController,
} from "./user.controller";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";

const routerUser = Router();

routerUser.get("/", getUsersController);
routerUser.get("/byId/:id", getUserController);
routerUser.post("/create", createUserController);
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

export default routerUser;

