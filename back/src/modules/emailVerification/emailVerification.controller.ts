import { Request, Response } from "express";
import { emailVerificationService } from "./emailVerification.service";
import { errorHelper } from "../../utils/error";

export const sendVerificationCodeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    await emailVerificationService.sendVerificationCode(email);
    res.json({ message: "Código de verificación enviado" });
  } catch (error) {
    errorHelper(error, res);
  }
};

export const verifyCodeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code } = req.body;
    const isValid = await emailVerificationService.verifyCode(email, code);
    
    if (!isValid) {
      res.status(400).json({ message: "Código inválido o expirado" });
      return;
    }

    res.json({ message: "Código verificado correctamente" });
  } catch (error) {
    errorHelper(error, res);
  }
};

export const checkVerificationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;
    const isVerified = await emailVerificationService.isEmailVerified(email);
    res.json({ isVerified });
  } catch (error) {
    errorHelper(error, res);
  }
}; 