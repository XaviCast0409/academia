import { Request, Response } from "express";
import { body } from "express-validator";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "../models/User";
import { emailVerificationService } from "../services/emailVerificationService";
import { validateRequest } from "../middlewares/validateRequest";
import { Router } from "express";

const router = Router();

// Register
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email inválido"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("section").notEmpty().withMessage("La sección es requerida"),
    body("roleId").isInt().withMessage("El rol es requerido"),
  ],
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, name, section, roleId } = req.body;

      // Check if email is verified
      const isVerified = await emailVerificationService.isEmailVerified(email);
      if (!isVerified) {
        res.status(400).json({
          message: "El correo electrónico no ha sido verificado",
        });
        return;
      }

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({
          message: "El usuario ya existe",
        });
        return;
      }

      // Create user
      const user = await User.create({
        email,
        password: await bcrypt.hash(password, 10),
        name,
        section,
        roleId,
        pokemonId: 1, // Valor por defecto, puedes cambiarlo según tus necesidades
        xavicoints: 0, // Valor por defecto
      });

      // Generate token
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          roleId: user.roleId 
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );

      res.status(201).json({
        message: "Usuario creado exitosamente",
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          section: user.section,
          roleId: user.roleId,
          xavicoints: user.xavicoints,
        },
      });
    } catch (error) {
      console.error("Error in register:", error);
      res.status(500).json({
        message: "Error al registrar el usuario",
      });
    }
  }
);

export default router; 