import db from "../../config/database";
import { encrypt, generateToken, verified } from "../../utils/validations";
import { UserOutput, UserInput } from "../../models/User";
import { UserNotFoundError, UserAlreadyExistsError } from "../../utils/error";
import { emailVerificationService } from "../../services/emailVerificationService";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const generateVerificationCode = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const getUser = async (id: number): Promise<UserOutput> => {
  try {
    const user = await db.User.findByPk(id, {
      include: [
        { model: db.Role, as: "role" },
        { model: db.Pokemon, as: "pokemon" }
      ],
    });
    return user;
  } catch (error) {
    throw new UserNotFoundError(`User with id ${id} not found`);
  }
};

export const getUsers = async (): Promise<UserOutput[]> => {
  const users = await db.User.findAll({ include: db.Role });
  return users;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  roleId: number,
  pokemonId: number,
  section?: string
): Promise<UserOutput> => {
  const findUser = await db.User.findOne({ where: { email } });
  if (findUser) {
    throw new UserAlreadyExistsError(`User with email ${email} already exists`);
  }

  // Generar código de verificación
  const verificationCode = generateVerificationCode();

  // Enviar código por email
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Código de verificación - Academia",
    html: `
      <h1>Verificación de correo electrónico</h1>
      <p>Tu código de verificación es: <strong>${verificationCode}</strong></p>
      <p>Este código expirará en 15 minutos.</p>
      <p>Si no solicitaste este código, por favor ignora este correo.</p>
    `,
  });

  // Crear usuario con el código de verificación
  password = await encrypt(password);
  const user = await db.User.create(
    { 
      name, 
      email, 
      password, 
      roleId, 
      pokemonId, 
      section,
      verificationCode,
      verificationCodeExpires: new Date(Date.now() + 15 * 60 * 1000) // 15 minutos
    },
  );

  return user;
};

export const updateUser = async (
  id: number,
  userData: Partial<UserInput>
): Promise<UserOutput> => {
  const user = await db.User.findByPk(id);
  if (!user) {
    throw new UserNotFoundError(`User with id ${id} not found`);
  }

  if (userData.password) {
    userData.password = await encrypt(userData.password);
  }

  await user.update(userData);
  return user;
};

export const deleteUser = async (id: number): Promise<number> => {
  const user = await db.User.destroy({ where: { id } });
  return user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: UserOutput }> => {
  const user = await db.User.findOne({ 
    where: { email },
    include: [
      { model: db.Role, as: "role" },
      { model: db.Pokemon, as: "pokemon" }
    ]
  });
  
  if (!user) {
    throw new UserNotFoundError(`User with email ${email} not found`);
  }

  const isCorrect = await verified(password, user.password);
  if (!isCorrect) {
    throw new Error("Incorrect password");
  }

  const token = generateToken(user.id, user.roleId, user.role.id);
  console.log(`User ${user.name} logged in successfully`);
  
  return { 
    token, 
    user: user.toJSON() 
  };
};
