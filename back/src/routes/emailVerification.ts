import { Router } from "express";
import { emailVerificationService } from "../services/emailVerificationService";
import { validateRequest } from "../middleware/validateRequest";
import { body } from "express-validator";

const router = Router();

// Send verification code
router.post(
  "/send-code",
  [
    body("email").isEmail().withMessage("Email inválido"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { email } = req.body;
      await emailVerificationService.sendVerificationCode(email);
      res.json({ message: "Código de verificación enviado" });
    } catch (error) {
      console.error("Error sending verification code:", error);
      res.status(500).json({ message: "Error al enviar el código de verificación" });
    }
  }
);

// Verify code
router.post(
  "/verify-code",
  [
    body("email").isEmail().withMessage("Email inválido"),
    body("code").isLength({ min: 5, max: 5 }).withMessage("El código debe tener 5 dígitos"),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { email, code } = req.body;
      const isValid = await emailVerificationService.verifyCode(email, code);
      
      if (!isValid) {
        return res.status(400).json({ message: "Código inválido o expirado" });
      }

      res.json({ message: "Código verificado correctamente" });
    } catch (error) {
      console.error("Error verifying code:", error);
      res.status(500).json({ message: "Error al verificar el código" });
    }
  }
);

// Check if email is verified
router.get(
  "/check-verification/:email",
  async (req, res) => {
    try {
      const { email } = req.params;
      const isVerified = await emailVerificationService.isEmailVerified(email);
      res.json({ isVerified });
    } catch (error) {
      console.error("Error checking email verification:", error);
      res.status(500).json({ message: "Error al verificar el estado del correo" });
    }
  }
);

export default router; 