import { Router } from "express";
import {
  sendVerificationCodeController,
  verifyCodeController,
  checkVerificationController,
} from "./emailVerification.controller";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";

const routerEmailVerification = Router();

routerEmailVerification.post(
  "/send-code",
  [
    body("email").isEmail().withMessage("Email inválido"),
  ],
  validateRequest,
  sendVerificationCodeController
);

routerEmailVerification.post(
  "/verify-code",
  [
    body("email").isEmail().withMessage("Email inválido"),
    body("code").isLength({ min: 5, max: 5 }).withMessage("El código debe tener 5 dígitos"),
  ],
  validateRequest,
  verifyCodeController
);

routerEmailVerification.get(
  "/check-verification/:email",
  checkVerificationController
);

export default routerEmailVerification; 