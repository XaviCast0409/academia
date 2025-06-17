import { VerificationCode } from "../models/VerificationCode";
import { Op } from "sequelize";
import nodemailer from "nodemailer";

class EmailVerificationService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  private generateVerificationCode(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  async sendVerificationCode(email: string): Promise<void> {
    // Delete any existing unused codes for this email
    await VerificationCode.destroy({
      where: {
        email,
        isUsed: false,
      },
    });

    const code = this.generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    await VerificationCode.create({
      email,
      code,
      expiresAt,
      isUsed: false,
    });

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Código de verificación - Academia",
      html: `
        <h1>Verificación de correo electrónico</h1>
        <p>Tu código de verificación es: <strong>${code}</strong></p>
        <p>Este código expirará en 15 minutos.</p>
        <p>Si no solicitaste este código, por favor ignora este correo.</p>
      `,
    });
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const verificationCode = await VerificationCode.findOne({
      where: {
        email,
        code,
        isUsed: false,
        expiresAt: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!verificationCode) {
      return false;
    }

    await verificationCode.update({ isUsed: true });
    return true;
  }

  async isEmailVerified(email: string): Promise<boolean> {
    const verificationCode = await VerificationCode.findOne({
      where: {
        email,
        isUsed: true,
      },
      order: [["createdAt", "DESC"]],
    });

    return !!verificationCode;
  }
}

export const emailVerificationService = new EmailVerificationService(); 